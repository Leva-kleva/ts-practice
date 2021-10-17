get_books_list = """
        select * from 
        (select row_number() over() rn, f.* from book f) as kek
        where  rn >= (%(page)s-1)*100 and rn < %(page)s*100; 
        """

get_book = """
    select * from book where id=%(book_id)s;
    """

get_wish = """
        select * from
        (select row_number() over() rn, * from wishlist where user_id=%(user_id)s) as kek
        where  rn >= (%(page)s-1)*100 and rn < %(page)s*100;
        """

get_wish_0 = """
        select * from
        (select row_number() over() rn, * from wishlist) as kek
        where  rn >= (%(page)s-1)*100 and rn < %(page)s*100;
        """

delete_wish = """
        delete from wishlist where user_id=%(user_id)s and id in %(indexes)s;
        """

delete_wish_0 = """
        delete from wishlist where id in %(indexes)s;
        """

post_wish = """
        insert into wishlist (user_id, dttm, name, author)
        values (%(user_id)s, %(dttm)s, %(name)s, %(author)s);
        """

get_author_page = """
        select * from
        (select row_number() over() rn, * from author) as kek
        where  rn >= (%(page)s-1)*100 and rn < %(page)s*100;
        """

get_genres_page = """
        select * from
        (select row_number() over() rn, * from genres) as kek
        where  rn >= (%(page)s-1)*100 and rn < %(page)s*100;
        """


get_search_book = """
        select * from
        (select row_number() over() rn, * from book where author_id=%(author_id)s and lower(name)=lower(%(name)s)) as kek
        where  rn >= (%(page)s-1)*100 and rn < %(page)s*100;
        """


post_blank = "UPDATE userinfo SET love_genre_id=%(genres_id)s, love_author_id=%(author_id)s, sent_blank=true WHERE user_id=%(user_id)s;"

get_last = """
        select t3.*, t4.name author_name
        from
        ( select t1.*, t2.name name_book, t2.author_id from
        (select * from ticket where user_id=1 order by id desc limit 4) t1 join book t2
        on t1.book_id=t2.id) t3 join author t4 on t3.author_id=t4.id ;
    """

get_love_author = """
        select love_author_id from userinfo where user_id=%(user_id)s;
    """

get_love_genre = """
        select love_genre_id from userinfo where user_id=%(user_id)s;
        """

get_all_books = """
        select * from book;    
        """

get_all_tickets = """
        select * from ticket;
        """

get_rec = """
        select a.id author_id, a.name author, b.* from author a
        join (select * from book where id in %(res)s) b 
        on b.author_id=a.id;
        """