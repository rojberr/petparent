# syntax=docker/dockerfile:1
FROM python:3.10.6

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

EXPOSE 8000

WORKDIR /code
COPY requirements.txt /code/

RUN pip3 install -r requirements.txt
COPY . /code/

CMD python manage.py runserver 0.0.0.0:8000