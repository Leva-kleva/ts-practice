import os
from datetime import datetime

pg_database = os.environ.get('DB_NAME') if os.environ.get('DB_NAME') else 'hackymal'
pg_login = os.environ.get('DB_LOGIN') if os.environ.get('DB_LOGIN') else 'admin'
pg_password = os.environ.get('DB_PASSWORD') if os.environ.get('DB_PASSWORD') else 'admin'
pg_host = os.environ.get('DB_HOST') if os.environ.get('DB_HOST') else 'localhost'
pg_port = os.environ.get('DB_PORT') if os.environ.get('DB_PORT') else 5432

token = "2079817520:AAHvymk7izEhowr73NeryV4uL40DboBCyOg"
