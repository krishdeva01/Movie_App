PYTHON = python3.10.12

.PHONY = create  install format validate freeze run migrate migrations superuser
 
create:
	@virtualenv -p ${PYTHON} venv

install:
	@pip3 install -r requirements.txt

format:
	@isort .
	@black .

validate:
	@isort . --check
	@black . --check

freeze:
	pip freeze > requirements.txt

run:
	python3 manage.py runserver 0.0.0.0:8000

migrate:
	python3 manage.py migrate

migrations:
	python3 manage.py makemigrations

superuser:
	python3 manage.py createsuperuser