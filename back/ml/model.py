#!/usr/bin/env python
# coding: utf-8

def diff(first, second):
    second = set(second)
    return [item for item in first if item not in second]


def make_predictions(user_id, interaction_df, book_df, form_author_id, form_topic_id):
    interaction_df = interaction_df.merge(book_df, left_on='book_id', right_on='id', how='left')

    top_books_at_all = interaction_df.groupby(['book_id', 'author_id'])['user_id'].count().sort_values(ascending=False).reset_index()
    top_books_at_all_list = top_books_at_all.drop_duplicates('author_id')['book_id'].tolist()

    user_inter = interaction_df[interaction_df.user_id == user_id]

    user_read = user_inter.book_id.tolist()

    if (len(user_read) != 0) | ((form_author_id is not None) & (form_topic_id is not None)):
        if len(user_read) != 0:
            favorite_topic = user_inter.genres_id.value_counts().sort_values(ascending=False).index[0]
            favorute_author = user_inter.author_id.value_counts().sort_values(ascending=False).index[0]
        else:
            favorite_topic = form_topic_id
            favorute_author = form_author_id
        topic_rec = interaction_df[interaction_df.genres_id == favorite_topic].groupby(['book_id', 'author_id'])[
            'user_id'].count().sort_values(ascending=False).reset_index()

        topic_list_rec = topic_rec.drop_duplicates('author_id')['book_id'].tolist()
        author_list_rec = interaction_df[
            interaction_df.author_id == favorute_author].book_id.value_counts().sort_values(ascending=False).index

        topic_rec_3 = diff(topic_list_rec, user_read)[0:3]
        author_rec_2 = diff(diff(author_list_rec, user_read), topic_rec_3)[0:2]

        recommend_book_ids = topic_rec_3 + author_rec_2
        if len(recommend_book_ids) < 5:
            recommend_book_ids = recommend_book_ids + top_books_at_all_list[0:2]
        else:
            recommend_book_ids
    else:
        recommend_book_ids = top_books_at_all_list[0:5]
    return recommend_book_ids


if __name__ == '__main__':
    rec = make_predictions(user_id=user_id, interaction_df=tickets_df, book_df=books_df, form_author_id=form_author_id,
                       form_topic_id=form_topic_id)
