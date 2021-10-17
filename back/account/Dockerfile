FROM python:3

COPY ./ /service
RUN rm /service/Dockerfile

ENV TZ=Europe/Moscow
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN pip install -r /service/requirements.txt

CMD [ "gunicorn", "--workers=1", "--bind=0.0.0.0:8000", "--chdir", "/service", "main:app" ]
