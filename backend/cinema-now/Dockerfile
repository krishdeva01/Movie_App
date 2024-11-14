FROM python:3.10.12

ENV PYTHONDONTWRITEBYTECODE=1 
ENV PYTHONUNBUFFERED=1        

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app/

EXPOSE 8000

CMD ./manage.py migrate --noinput && ./manage.py collectstatic --noinput && gunicorn moviebooking.wsgi --bind 0.0.0.0:8000 --workers 2 --worker-class sync --threads 6
