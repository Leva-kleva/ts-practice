import os

pg_database = os.environ.get('DB_NAME') if os.environ.get('DB_NAME') else 'hackymal'
pg_login = os.environ.get('DB_LOGIN') if os.environ.get('DB_LOGIN') else 'admin'
pg_password = os.environ.get('DB_PASSWORD') if os.environ.get('DB_PASSWORD') else 'admin'
pg_host = os.environ.get('DB_HOST') if os.environ.get('DB_HOST') else 'localhost'
pg_port = os.environ.get('DB_PORT') if os.environ.get('DB_PORT') else 5432

debug = os.environ.get('DEBUG') if os.environ.get('DEBUG') else True
if debug == "False":
    debug = False

host = "0.0.0.0"
port = os.environ.get('BOOK_PORT') if os.environ.get('BOOK_PORT') else 5002

secret_key = os.environ.get('SECRET_KEY') if os.environ.get('SECRET_KEY') else "secret"

auth_host = os.environ.get('LOGIN_HOST') if os.environ.get('LOGIN_HOST') else "localhost"
auth_port = os.environ.get('LOGIN_PORT') if os.environ.get('LOGIN_PORT') else 5003

if debug:
    url_auth = "http://localhost/api/v1/login"
else:
    url_auth = "http://{0}:8000/login".format(auth_host)
