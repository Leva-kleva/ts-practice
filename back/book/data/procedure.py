from . import execute, query


def get_books_list(*args, **kwargs):
    ans = execute(query.get_books_list, *args, **kwargs)
    return ans


def get_book(*args, **kwargs):
    ans = execute(query.get_book, *args, **kwargs)
    return ans


def get_wish(user_id, *args, **kwargs):
    if user_id == 0: ans = execute(query.get_wish_0, *args, **kwargs)
    else: ans = execute(query.get_wish, *args, **kwargs)
    return ans


def delete_wish(user_id, *args, **kwargs):
    if user_id == 0: ans = execute(query.delete_wish_0, *args, **kwargs)
    else: ans = execute(query.delete_wish, *args, **kwargs)
    return ans


def post_wish(*args, **kwargs):
    ans = execute(query.post_wish, *args, **kwargs)
    return ans


def get_author_page(*args, **kwargs):
    ans = execute(query.get_author_page, *args, **kwargs)
    return ans


def get_genres_page(*args, **kwargs):
    ans = execute(query.get_genres_page, *args, **kwargs)
    return ans


def get_search_book(*args, **kwargs):
    ans = execute(query.get_search_book, *args, **kwargs)
    return ans


def post_blank(*args, **kwargs):
    ans = execute(query.post_blank, *args, **kwargs)
    return ans


def get_last(*args, **kwargs):
    ans = execute(query.get_last, *args, **kwargs)
    return ans
