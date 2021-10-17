create_user = """
        INSERT INTO 
            "user" (email, password, role) VALUES (%(email)s, %(password)s, %(role)s)
        RETURNING id;
        """

create_userinfo = """
        INSERT INTO 
            userinfo (sname, fname, mname, user_id) VALUES (%(sname)s, %(fname)s, %(mname)s, %(user_id)s)
        WHERE not exists(select * from users where login=%(login)s)
        RETURNING id;
        """

create_telegram = """
                INSERT INTO
                    telegram (user_id, link) 
                    VALUES (%(user_id)s, %(token)s)
                    RETURNING id;
                """

put_userinfo = "UPDATE userinfo SET address=%(address)s, phone=%(phone)s WHERE id=%(user_id)s"
