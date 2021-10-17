import datetime
import json

from flask import Flask, request, make_response, abort, session, g
import data
import conf
from hashlib import sha256
import requests as rq
import os
from flask_cors import CORS, cross_origin
from model import make_predictions
import pandas as pd


app = Flask(__name__)
app.config['SECRET_KEY'] = conf.secret_key
CORS(app)


def template_response(body, code, is_json=False):
    if not is_json:
        status = "info" if code < 400 else "error"
        tmp = f'{{"{status}": "{body}"}}'
        body = tmp
    response = make_response(body, code)
    response.headers["Content-Type"] = "application/json"
    return response


@app.before_request
def check_access():
    try:
        headers = dict(request.headers)
        headers['Content-Length'] = '0'
        response = rq.get(conf.url_auth, headers=headers)
    except:
        return template_response("Ошибка сервера.", 500)
    if response.status_code >= 400:
        return template_response(response.json(), response.status_code, is_json=True)
    g.user = response.json()


roles = {
    'user': 0,
    'admin': 1,
}


def check_role(role):
    def decorator(func):
        def wrapped(*args, **kwargs):
            user_role_number = g.user.get('role')
            if user_role_number is not None and user_role_number < roles[role]:
                return template_response("Нет доступа", 403)
            return func(*args, **kwargs)

        wrapped.__name__ = func.__name__
        return wrapped

    return decorator


@app.route('/recommendations', methods=['GET'])
@cross_origin()
def get_recommendations():
    books_df = pd.DataFrame(data.procedure.get_all_books(to_json=False))
    tickets_df = pd.DataFrame(data.procedure.get_all_tickets(to_json=False))
    form_author_id = data.procedure.get_love_author({"user_id": g.user["user_id"]})
    form_topic_id = data.procedure.get_love_genre({"user_id": g.user["user_id"]})
    res = make_predictions(user_id=g.user["user_id"], interaction_df=tickets_df, book_df=books_df, form_author_id=form_author_id,
                       form_topic_id=form_topic_id)
    res = tuple(res)
    ans = data.procedure.get_rec({"res": res})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


if __name__ == '__main__':
    app.run(debug=conf.debug, port=conf.port, host=conf.host)
