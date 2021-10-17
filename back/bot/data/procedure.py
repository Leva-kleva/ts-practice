from . import execute, query
import json


def search_code(*args, **kwargs):
    ans = execute(query.search_code, *args, **kwargs)
    return ans


def save_tg(*args, **kwargs):
    ans = execute(query.save_tg, *args, **kwargs)
    return ans


def get_name(*args, **kwargs):
    ans = execute(query.get_name, *args, **kwargs)
    return ans


def get_user_id(*args, **kwargs):
    ans = execute(query.get_user_id, *args, **kwargs)
    return ans
