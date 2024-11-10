from . import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    date_joined = db.Column(db.DateTime, default=datetime.utcnow)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

class Course(db.Model):
    __tablename__ = 'courses'
    course_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Course {self.title}>'

class Module(db.Model):
    __tablename__ = 'modules'
    module_id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    order = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Module {self.title}>'

class Assessment(db.Model):
    __tablename__ = 'assessments'
    assessment_id = db.Column(db.Integer, primary_key=True)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.module_id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    max_score = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Assessment {self.title}>'

class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    enrollment_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.course_id'), nullable=False)
    date_enrolled = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Enrollment {self.enrollment_id}>'

class Progress(db.Model):
    __tablename__ = 'progress'
    progress_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.module_id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer)
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Progress {self.progress_id}>'