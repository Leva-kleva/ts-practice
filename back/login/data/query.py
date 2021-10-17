get_user = """SELECT * FROM "user" WHERE lower(email)=lower(%(login)s) and password=%(password)s;"""
