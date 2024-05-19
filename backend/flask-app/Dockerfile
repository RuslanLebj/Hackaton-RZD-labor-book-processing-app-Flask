FROM python:3.11

WORKDIR /app

ADD ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./app /app/app

ENV PYTHONPATH "/app"

CMD ["python", "app/app.py"]
