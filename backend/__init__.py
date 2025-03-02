from flask import Flask
from .config import Config
from .extensions import db, migrate, cors, bcrypt, login_manager
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

    db.init_app(app)
    migrate.init_app(app, db)

    cors.init_app(app, resources={
        r"/*": {
            "origins": ["https://1109-beck-brandon.github.io","http://localhost:8080"],
            "supports_credentials": True,
            "allow_headers": ["Content-Type", "Authorization"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        }
    })

    bcrypt.init_app(app)
    login_manager.init_app(app)

    from .models import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(teacher_bp)
    app.register_blueprint(gradebook_bp)
    app.register_blueprint(course_bp)
    app.register_blueprint(review_bp)
    app.register_blueprint(password_reset_bp)
    app.register_blueprint(enrollment_bp)

    return app