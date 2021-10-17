search_code = """
            select * from telegram where link=%(link)s and is_deactive=false;
        """

save_tg = """
            update telegram set tg_id=%(tg_id)s, is_deactive=%(is_deactive)s where link=%(link)s;
        """

get_name = """
            select a.fname from userinfo a 
            join telegram b 
            on b.user_id=a.user_id
            limit 1;
        """

get_user_id = """
            
        """