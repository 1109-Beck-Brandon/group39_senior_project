from flask import Flask
from .config import Config
from .extensions import db, cors, migrate
from flask_migrate import Migrate

# Import blueprints from your route modules
from .routes.auth_routes import auth_bp
from .routes.profile_routes import profile_bp
from .routes.teacher_routes import teacher_bp
from .routes.gradebook_routes import gradebook_bp
from .routes.course_routes import course_bp
from .routes.review_routes import review_bp
from .routes.password_reset_routes import password_reset_bp
from .routes.enrollment_routes import enrollment_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    # Configure CORS first
    cors = CORS(app, resources={
        r"/*": {
            "origins": ["https://1109-beck-brandon.github.io", "http://localhost:10000"],
            "supports_credentials": True,
            "allow_headers": ["Content-Type", "Authorization"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        }
    })

    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(teacher_bp)
    app.register_blueprint(gradebook_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(review_bp)
    app.register_blueprint(password_reset_bp)
    app.register_blueprint(enrollment_bp)

    return app