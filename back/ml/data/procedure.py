from . import execute, query


def get_love_author(*args, **kwargs):
    ans = execute(query.get_love_author, *args, **kwargs)
    return ans


def get_love_genre(*args, **kwargs):
    ans = execute(query.get_love_genre, *args, **kwargs)
    return ans


def get_all_books(*args, **kwargs):
    ans = execute(query.get_all_books, *args, **kwargs)
    return ans


def get_all_tickets(*args, **kwargs):
    ans = execute(query.get_all_tickets, *args, **kwargs)
    return ans


def get_rec(*args, **kwargs):
    ans = execute(query.get_rec, *args, **kwargs)
    return ans
