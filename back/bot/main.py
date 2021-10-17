# справка
# пидорбот
# уведомления
# куар
import json
import time
from datetime import datetime
from random import randint
import threading

import qrcode

import conf
import telebot
import requests
import data

token = conf.token
bot = telebot.TeleBot(token)


@bot.message_handler(commands=["start"])
def cmd_start(message):
    if message.chat.type == "private":
        message_text = message.text.split()
        if len(message_text) > 1:
            code = message_text[1]
            flg = data.procedure.search_code({"link": code}, array=False, to_json=False)
            if flg is not None:
                ans = data.procedure.save_tg({"link": code, "tg_id": message.chat.id, "is_deactive": "true"}, add_commit=True)
                name = data.procedure.get_name({"link": code, "tg_id": message.chat.id, "user_id": ans}, array=False, to_json=False)
                print(name)
                name = name["fname"]
                bot.send_message(message.chat.id,
                                 "Добрый день, {0}, вы успешно авторизировались в Мобильной Библиотеке. \nДанный бот может подсказать Вам справочную информацию о работе библиотеки, выдать QR-код читательского билета, а также может прислать важные увдомелния. Также его можно добавить ради развлечения в беседу.".format(
                                     name))


@bot.message_handler(commands=["qr"])
def all_messages(message):
    if message.chat.type == "private":
        user_id = data.procedure.get_user_id({"tg_id": message.chat.id})
        link = "127.0.0.1/bindBook?userId={}".format(user_id)
        filename = "site.png"
        img = qrcode.make(link)
        img.save(filename)
        bot.send_photo(message.chat.id, open("site.png", "rb"))


@bot.message_handler(commands=["quote"])
def all_messages(message):
    mes = ["Под старость жизнь такая гадость...",
           "На дне каждого сердца есть осадок.",
           "Многие люди подобны колбасам: чем их начинят, то и носят в себе.",
           "Никогда не теряй из виду, что гораздо легче многих не удовлетворить, чем удовольствовать.",
           "Что скажут о тебе другие, коли ты сам о себе ничего сказать не можешь?",
           "Щелкни кобылу в нос – она махнет хвостом.",
           "Если на клетке слона прочтешь надпись «буйвол», не верь глазам своим.",
           "Взирая на солнце, прищурь глаза свои, и ты смело разглядишь в нем пятна.",
           "Не всякому офицеру мундир к лицу.",
           "Купи прежде картину, а после рамку!",
           "Отыщи всему начало, и ты многое поймешь.",
           "В спертом воздухе при всем старании не отдышишься.",
           "1"]
    ind = randint(0, len(mes)-1)
    bot.send_message(message.chat.id, mes[ind])


@bot.message_handler(commands=["help"])
def all_messages(message):
    if message.chat.type == "private":
        bot.send_message(message.chat.id, "Сайт национальной библиотеки ЯНАО: https://nb.yanao.ru/")



if __name__ == "__main__":
    # while True:
    #     try:
    bot.polling(none_stop=True)
    # except:
    #     print("Fail")
