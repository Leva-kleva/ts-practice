import datetime
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


@app.route('/info', methods=['GET'])
@cross_origin()
def get_info():
    ans = data.procedure.get_info({"user_id": g.user["user_id"]}, array=False, to_json=False)
    if ans == "null":
        return template_response("Not found", 404)
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/users', methods=['GET'])
@cross_origin()
@check_role('admin')
def get_users_list():
    page = request.args.get("page")
    if page is None: page = 1
    ans = data.procedure.get_users_page({"page": page})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/users/<id_user>', methods=['GET'])
@cross_origin()
@check_role('admin')
def get_userinfo(id_user=1):
    ans = data.procedure.get_userinfo({"user_id": id_user}, array=False, to_json=False)
    if ans == "null":
        return template_response("Not found", 404)
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/feedback', methods=['GET'])
@cross_origin()
@check_role('admin')
def get_feedback():
    page = request.args.get("page")
    if page is None: page = 1
    ans = data.procedure.get_feedback({"page": page})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/feedback', methods=['POST'])
@cross_origin()
def post_feedback():
    dttm = datetime.datetime.now()
    name = request.json['name']
    phone = request.json['phone']
    email = request.json['email']
    header = request.json['header']
    message = request.json['message']
    ans = data.procedure.post_feedback({"user_id": g.user["user_id"], "dttm": dttm,
                                        "header": header, "message": message})
    body, code = data.check_errors(ans, body=ans, code=200)
    return template_response(body, code, is_json=False)


# @app.route('/qr', methods=['GET'])
# def get_qr():
#     pass


@app.route('/tg-link', methods=['GET'])
@cross_origin()
def get_tg_link():
    user_id = g.user["user_id"]
    ans = data.procedure.get_tg_link({"user_id": user_id}, array=False, to_json=False)
    if ans["is_deactive"]: return template_response("Ссылка уже активирована", 400)
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/achivements', methods=['GET'])
@cross_origin()
def get_achivements():
    ans = data.procedure.get_achivements({"user_id": g.user["user_id"]})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/bindBook', methods=['GET'])
@cross_origin()
@check_role('admin')
def get_bindBook():
    user_id = request.args.get("user_id")
    if user_id is None: user_id = 1
    ans = data.procedure.get_bindBook({"user_id": user_id}, array=False, to_json=False)
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/user/bind', methods=['POST'])
@cross_origin()
@check_role('admin')
def post_bindBook():
    dttm = datetime.datetime.now()
    author = request.json['author']
    name = request.json['name']
    user_id = request.json['user_id']
    ans = data.procedure.post_bindBook({"user_id": user_id, "name": name, "author": author, "dttm": dttm}, array=False, to_json=False)
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False
    return template_response(body, code, is_json)


if __name__ == '__main__':
    app.run(debug=conf.debug, port=conf.port, host=conf.host)
