from config import Config
#from flask_migrate import Migrate
from routes import app, db

#app.config.from_object(Config)
#migrate = Migrate(app, db)

db.init_app(app)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
