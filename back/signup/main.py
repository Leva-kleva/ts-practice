import json
from datetime import datetime, timedelta

from flask import Flask, request, make_response, session, g
import requests as rq
from hashlib import sha256

from werkzeug.exceptions import abort
from flask_cors import CORS, cross_origin

import data
import conf

app = Flask(__name__)
app.config['SECRET_KEY'] = conf.secret_key
CORS(app)

roles = {
    'user': 0,
    'admin': 1,
}


def template_response(body, code, is_json=False):
    if not is_json:
        status = "info" if code < 400 else "error"
        tmp = f'{{"{status}": "{body}"}}'
        body = tmp
    response = make_response(body, code)
    response.headers["Content-Type"] = "application/json"
    return response


# @app.before_request
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


@app.route('/signup', methods=['POST'])
@cross_origin()
def signup_post():
    email = request.json['email']
    password = sha256(request.json['password'].encode()).hexdigest()
    sname = request.json['sname']
    fname = request.json['fname']
    token = sha256(email.encode()).hexdigest()

    ans = data.procedure.create_user({"password": password, "email": email, "role": 0, "sname": sname, "fname": fname}, array=False,
                                     to_json=False, to_commit=True)
    ans1 = data.procedure.create_userinfo({"sname": sname, "fname": fname, "user_id": ans}, array=False, to_json=False, to_commit=True)
    ans2 = data.procedure.create_telegram({"token": token, "user_id": ans}, array=False, to_json=False, to_commit=True)
    body, code = data.check_errors(ans, body="OK", code=201)
    return template_response(body, code)


@app.route('/signup', methods=['PUT'])
@cross_origin()
def signup_put():
    check_access()
    fio = request.json['name']
    address = request.json['address']
    phone = request.json['phone']
    ans = data.procedure.put_userinfo({"user_id": g.user["user_id"], "address": address, "phone": phone})
    body, code = data.check_errors(ans, body="OK", code=200)

    return template_response(body, code, is_json=False)


if __name__ == '__main__':
    app.run(debug=conf.debug, port=conf.port, host=conf.host)
