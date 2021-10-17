from . import execute, query


def create_user(*args, **kwargs):
    ans = execute(query.create_user, *args, **kwargs)
    return ans


def create_userinfo(*args, **kwargs):
    ans = execute(query.create_userinfo, *args, **kwargs)
    return ans


def create_telegram(*args, **kwargs):
    ans = execute(query.create_telegram, *args, **kwargs)
    return ans


def put_userinfo(*args, **kwargs):
    ans = execute(query.put_userinfo, *args, **kwargs)
    return ans
