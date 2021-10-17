from psycopg2.extras import RealDictCursor
from contextlib import closing
import psycopg2.errors
import psycopg2
import json
import conf


class Errors:
    unprocessable_entity = 0
    invalid_request = -1
    database_not_avalable = -2


def check_errors(ans, body, code):
    if ans == Errors.invalid_request:
        return "Невалидный запрос", 400
    if ans == Errors.database_not_avalable:
        return 'Ошибка сервера', 500
    return body, code


def execute(*sql, array=True, to_json=True, add_commit=False):
    try:
        with closing(psycopg2.connect(dbname=conf.pg_database, user=conf.pg_login,
                                      password=conf.pg_password, host=conf.pg_host,
                                      port=conf.pg_port)) as connect:
            with connect.cursor(cursor_factory=RealDictCursor) as cur:
                try:
                    cur.execute(*sql)
                except Exception:
                    return -1
                if cur.description:
                    result = cur.fetchall() if array else cur.fetchone()
                    if add_commit: connect.commit()
                    return json.dumps(result, indent=4, default=str, ensure_ascii=False) if to_json else result
                else:
                    connect.commit()
                    return cur.rowcount
    except psycopg2.OperationalError:
        return -2


import data.query
import data.procedure
