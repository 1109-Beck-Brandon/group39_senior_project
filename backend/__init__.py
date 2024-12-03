<<<<<<< HEAD
from flask import Flask
from .extensions import db, migrate, cors
from .auth import auth as auth_blueprint
from .routes import main as main_blueprint
from .config import Config  # Use relative import

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Use the Config class directly

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, resources={r"/api/*": {"origins": "http://localhost:8080"}})

    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(main_blueprint)

=======
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from .config import Config  # Use relative import

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    migrate.init_app(app, db)

    from .routes import main
    app.register_blueprint(main, url_prefix='/')  # Adjust url_prefix as needed

    from .auth import auth
    app.register_blueprint(auth, url_prefix='/auth')  # Example prefix

>>>>>>> main
    return app