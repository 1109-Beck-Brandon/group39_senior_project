from flask import Flask
from .extensions import db, migrate, cors
from .auth import auth as auth_blueprint
from .routes import main as main_blueprint
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configure CORS first
    cors.init_app(app, resources={
        r"/*": {
            "origins": ["https://1109-beck-brandon.github.io", "http://localhost:5173"],
            "supports_credentials": True,
            "allow_headers": ["Content-Type", "Authorization"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        }
    })

    # Initialize database and migrations
    db.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
    app.register_blueprint(main_blueprint)

    return app