import json

from flask import Flask, request, make_response, abort, session
import data
import conf
from hashlib import sha256
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SECRET_KEY'] = conf.secret_key
app.secret_key = conf.secret_key
CORS(app)

refresh_list = set()


def template_response(body, code, is_json=False):
    if not is_json:
        status = "info" if code < 400 else "error"
        tmp = f'{{"{status}": "{body}"}}'
        body = tmp
    response = make_response(body, code)
    response.headers["Content-Type"] = "application/json"
    # response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    # response.headers["Access-Control-Allow-Credentials"] = "true"
    # response.headers["Access-Control-Allow-Headers"] = "Cache-Control"
    # response.headers["Access-Control-Allow-Headers"] = "X-Requested-With"
    # response.headers["Access-Control-Allow-Headers"] = "Authorization"
    # response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, DELETE"
    # response.headers["Access-Control-Allow-Origin"] = request.headers["Referer"]
    # response.headers.add('Access-Control-Allow-Origin', '*')
    print(111)
    # print(response.headers['Set-Cookie'])
    # print(response.headers)
    # print(response.get)
    return response


@app.route('/login', methods=['GET'])
@cross_origin()
def is_auth():
    if 'user_id' in session and 'role' in session and session["user_id"] not in refresh_list:
        body = json.dumps({"user_id": session["user_id"], "role": session["role"]})
        return template_response(body, 200, is_json=True)
    return template_response("Пользователь не авторизован", 401)


@app.route('/login', methods=['POST'])
@cross_origin()
def login_post():
    login = request.json['email']
    password = sha256(request.json['password'].encode()).hexdigest()
    ans = data.procedure.get_user({"password": password, "login": login}, array=False, to_json=False)

    body, code = data.check_errors(ans, body="OK", code=202)

    if code < 400:
        if ans["id"] in refresh_list:
            refresh_list.remove(ans["id"])
        session["user_id"] = ans["id"]
        session["role"] = ans["role"]

    return template_response(body, code)


@app.route('/login', methods=["DELETE"])
@cross_origin()
def logout():
    if 'user_id' in session and 'role' in session:
        session.clear()
        return template_response('OK', 200)
    return template_response('Пользователь не авторизован', 401)


if __name__ == '__main__':
    app.run(debug=conf.debug, port=conf.port, host=conf.host)
