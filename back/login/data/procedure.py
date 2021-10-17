from . import execute, query


def get_user(*args, **kwargs):
    ans = execute(query.get_user, *args, **kwargs)
    return ans
