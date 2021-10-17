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


@app.route('/books', methods=['GET'])
@cross_origin()
def get_books_list():
    page = request.args.get("page")
    if page is None: page = 1
    ans = data.procedure.get_books_list({"page": page})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/<id_book>', methods=['GET'])
@cross_origin()
def get_book(id_book=1):
    ans = data.procedure.get_book({"book_id": id_book}, array=False)
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    if ans == "null": is_json=False
    return template_response(body, code, is_json)


@app.route('/wish', methods=['GET'])
@cross_origin()
def get_wish():
    page = request.args.get("page")
    if page is None: page = 1
    user_id = g.user["user_id"]
    if g.user.get('role') >= roles['admin']: user_id = 0
    ans = data.procedure.get_wish(user_id, {"user_id": user_id, "page": page})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/wish/all', methods=['GET'])
@cross_origin()
@check_role('admin')
def get_all_wish():
    page = request.args.get("page")
    if page is None: page = 1
    user_id = 0
    # if g.user.get('role') >= roles['admin']: user_id = 0
    ans = data.procedure.get_wish(user_id, {"user_id": user_id, "page": page})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/wish', methods=['DELETE'])
@cross_origin()
def delete_wish():
    indexes = tuple(request.json['indexes'])
    user_id = g.user["user_id"]
    if g.user.get('role') >= roles['admin']: user_id = 0
    ans = data.procedure.delete_wish(user_id, {"user_id": user_id, "indexes": indexes})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False
    return template_response(body, code, is_json)


@app.route('/wish', methods=['POST'])
@cross_origin()
def post_wish():
    name = request.json['name']
    author = request.json['author']
    dttm = datetime.datetime.now()
    ans = data.procedure.post_wish({"user_id": g.user["user_id"], "name": name, "author": author, "dttm": dttm})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False
    return template_response(body, code, is_json)


@app.route('/author', methods=['GET'])
@cross_origin()
def get_author_page():
    page = request.args.get("page")
    if page is None: page = 1
    ans = data.procedure.get_author_page({"page": page})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/genres', methods=['GET'])
@cross_origin()
def get_genres_page():
    page = request.args.get("page")
    if page is None: page = 1
    ans = data.procedure.get_genres_page({"page": page})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/search', methods=['POST'])
@cross_origin()
def get_search_book():
    author_id = request.json['authorId']
    name = request.json['name']
    page = request.args.get("page")
    if page is None: page = 1
    ans = data.procedure.get_search_book({"author_id": author_id, "name": name, "page": page})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


@app.route('/blank', methods=['POST'])
@cross_origin()
def post_blank():
    author_id = request.json['author_id']
    genres_id = request.json['genre_id']
    ans = data.procedure.post_blank({"author_id": author_id, "genres_id": genres_id, "user_id": g.user["user_id"]})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False
    return template_response(body, code, is_json)


@app.route('/last', methods=['GET'])
@cross_origin()
def get_last():
    ans = data.procedure.get_last({"user_id": g.user["user_id"]})
    body, code = data.check_errors(ans, body=ans, code=200)
    is_json = False if body != ans else True
    return template_response(body, code, is_json)


if __name__ == '__main__':
    app.run(debug=conf.debug, port=conf.port, host=conf.host)
