from . import execute, query


def get_info(*args, **kwargs):
    ''' get all info about one user'''
    ans = execute(query.get_info, *args, **kwargs)
    return ans


def get_users_page(*args, **kwargs):
    '''get all email, sname, fname'''
    ans = execute(query.get_users_page, *args, **kwargs)
    return ans


def get_userinfo(*args, **kwargs):
    '''get all info about ine user'''
    ans = execute(query.get_userinfo, *args, **kwargs)
    return ans


def get_feedback(*args, **kwargs):
    '''get page feedback'''
    ans = execute(query.get_feedback, *args, **kwargs)
    return ans


def post_feedback(*args, **kwargs):
    '''post feedback'''
    ans = execute(query.post_feedback, *args, **kwargs)
    if isinstance(ans, int) and ans == 1: ans = "OK"
    return ans


def get_tg_link(*args, **kwargs):
    ans = execute(query.get_tg_link, *args, **kwargs)
    return ans


def get_achivements(*args, **kwargs):
    ans = execute(query.get_achivements, *args, **kwargs)
    return ans


def get_bindBook(*args, **kwargs):
    ans = execute(query.get_bindBook, *args, **kwargs)
    return ans


def post_bindBook(*args, **kwargs):
    ans = execute(query.post_bindBook, *args, **kwargs)
    return ans
