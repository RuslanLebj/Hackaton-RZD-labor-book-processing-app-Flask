TITLE = 'title'
JOB_INFORMATION = 'job_information'
AWARDS = 'awards'


class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:12345@localhost/pillow'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    CELERY_BROKER_URL = 'redis://localhost:6379/0'
    CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'

    UPLOAD_FOLDER = 'uploads'
    MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # 10 MB

    SWAGGER_URL = '/swagger'
    API_URL = '/static/swagger.json'


