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

    return app