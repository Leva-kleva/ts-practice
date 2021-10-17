import json

from flask import Flask, request, make_response, abort, session, g
import data
import conf
from hashlib import sha256
import requests as rq
import os
from flask_cors import CORS, cross_origin

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


@app.route('/user', methods=['GET'])
@cross_origin()
def get_user_stat():
    user_id = g.user["user_id"]
    if g.user.get('role') >= roles['admin']:
        user_id = request.args.get("user_id")
        if user_id is None: user_id = g.user["user_id"]
    ans = data.procedure.get_user_stat({"user_id": user_id,})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/user/rating', methods=['GET'])
@cross_origin()
def get_user_rating():
    ans = data.procedure.get_user_rating()
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/book/rating', methods=['GET'])
@cross_origin()
def get_book_rating():
    ans = data.procedure.get_book_rating()
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/admin', methods=['GET'])
@cross_origin()
@check_role('admin')
def get_admin_stat():
    ans = data.procedure.get_admin_stat()
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


if __name__ == '__main__':
    app.run(debug=conf.debug, port=conf.port, host=conf.host)
