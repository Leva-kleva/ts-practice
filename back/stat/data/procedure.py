from . import execute, query


def get_user_stat(*args, **kwargs):
    ans = execute(query.get_user_stat, *args, **kwargs)
    return ans


def get_user_rating(*args, **kwargs):
    ans = execute(query.get_user_rating, *args, **kwargs)
    return ans


def get_book_rating(*args, **kwargs):
    ans = execute(query.get_book_rating, *args, **kwargs)
    return ans


def get_admin_stat(*args, **kwargs):
    ans = execute(query.get_admin_stat, *args, **kwargs)
    return ans
