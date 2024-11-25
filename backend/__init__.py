from flask import Flask
from .extensions import db
from .auth import auth as auth_blueprint
from .routes import main as main_blueprint
from .config import Config  # Use relative import

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)  # Use the Config class directly

    db.init_app(app)

    app.register_blueprint(auth_blueprint, url_prefix='/auth')
    app.register_blueprint(main_blueprint)

    return app