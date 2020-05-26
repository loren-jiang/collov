# Collov Kanban Board

### [See demo](https://collov-kanban.herokuapp.com/#/)

## Note

Repo for take home assignment for Collov software position. This project was bootstrapped from minimal template starter (https://github.com/gtalarico/django-vue-template).

  

## Stack

-  ### Backend:
	- Django 2.2 server
	- PostgreSQL database
	- Django REST Framework

-  ### Frontend:
	- Vue + Vue CLI
	- Vuetify (Material Design framework)
	- Vue.Draggable (https://github.com/SortableJS/Vue.Draggable)

  
-  ### Deployment:
	- Heroku (free dynos)
		- Caveat: I didn't realize upon deployment that dynos can't serve media uploads (see section on "Things to Improve" for CDN solution)
  
 
## Running local (if you wish)
### Prereqs:
-   Yarn - [instructions](https://yarnpkg.com/en/docs/install)
-   Vue CLI 3 - [instructions](https://cli.vuejs.org/guide/installation.html)
-   Python 3 - [instructions](https://wiki.python.org/moin/BeginnersGuide)
-   Pipenv - [instructions](https://pipenv.readthedocs.io/en/latest/install/#installing-pipenv)

Running Development Servers
- `$ python manage.py runserver`

  

From another tab in the same directory:
- `$ yarn serve`

  

The Vue application will be served from localhost:8080 and the Django API and static files will be served from localhost:8000.
## Things to improve

- Adding rating system
	- Finish up backend serializers
	- Create DRF endpoints for aggregated averages
	- Aggregation would be all done with Django ORM ([aggregation](https://docs.djangoproject.com/en/2.2/topics/db/aggregation/#generating-aggregates-for-each-item-in-a-queryset))

- Admin login
	- Done through [JWT authentication](https://www.pydanny.com/drf-jwt-axios-vue.html)

- S3 + CloudFront to serve media files
	- Using boto3 and django-storages packages to serve media uploads through AWS

- Docker
    - Containerize with Docker

## Author

- Loren Jiang
