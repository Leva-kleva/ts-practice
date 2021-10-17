get_info = """select uu.*, t.tg_id 
from (select u.id, u.email, u.role, uf.sname, uf.fname, uf.mname, uf.phone, 
	uf.address, uf.sent_blank, uf.active_ticket from "user" u join userinfo uf on u.id=uf.user_id where u.id=%(user_id)s) uu
join telegram t on uu.id=t.user_id limit 1;"""

get_users_page = """
select *
from
    (select row_number() over() rn, u.email, u2.sname, u2.fname from "user" u join userinfo u2 on u.id=u2.user_id) as kek
where  rn >= (%(page)s-1)*100 and rn < %(page)s*100;  
        """

get_userinfo = """select uu.*, t.tg_id 
from (select u.id, u.email, uf.sname, uf.fname, uf.mname, uf.phone,
	uf.address, uf.active_ticket from "user" u join userinfo uf on u.id=uf.user_id where u.id=%(user_id)s) uu
join telegram t on uu.id=t.user_id limit 1;"""

get_feedback = """
        select ttt.*, bbb.email from
        (select * from 
        (select row_number() over() rn, f.* from feedback f order by dttm desc) as kek
        where  rn >= (%(page)s-1)*100 and rn < %(page)s*100) as ttt
        join "user" bbb on bbb.id=ttt.user_id; 
        """

post_feedback = """
        insert into feedback (user_id, dttm, header, message)
        values (%(user_id)s, %(dttm)s, %(header)s, %(message)s);
        """

get_tg_link = """
            select link, is_deactive from telegram where user_id=%(user_id)s limit 1; 
            """

get_achivements = """
            
        """

get_bindBook = """
            select uu.*, t.tg_id 
from (select u.id, u.email, uf.sname, uf.fname, uf.mname, 
	uf.age, uf.passport, uf.work, uf.snils, uf.address, uf.active_ticket from "user" u join userinfo uf on u.id=uf.user_id where u.id=%(user_id)s) uu
join telegram t on uu.id=t.user_id limit 1;
        """

post_bindBook = """
        insert into ticket (user_id, dttm, author, name)
        values (%(user_id)s, %(dttm)s, %(author)s, %(name)s);
        """
