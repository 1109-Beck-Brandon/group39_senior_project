from datetime import datetime, timedelta
from flask_login import UserMixin
from .extensions import db, bcrypt

class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)  # Keep for backwards compatibility
    first_name = db.Column(db.String(64))  # Add this line
    last_name = db.Column(db.String(64))   # Add this line
    email = db.Column(db.String(128), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(64), default='student')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    courses = db.relationship('Course', backref='teacher', lazy=True)
    enrollments = db.relationship('Enrollment', backref='student', lazy=True)
    reviews = db.relationship('Review', backref='author', lazy=True)
    grades = db.relationship('Grade', backref='student', lazy=True)
    password_reset_tokens = db.relationship('PasswordResetToken', backref='user', lazy=True)

    def set_password(self, password):
        # bcrypt.generate_password_hash returns bytes, so decode to get a string
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.email}>'

class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text)
    teacher_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    modules = db.relationship('Module', back_populates='course', lazy=True)
    enrollments = db.relationship('Enrollment', backref='course', lazy=True)
    reviews = db.relationship('Review', backref='course', lazy=True)
    grades = db.relationship('Grade', backref='course', lazy=True)

    def __repr__(self):
        return f'<Course {self.title}>'

class Module(db.Model):
    __tablename__ = 'modules'
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    order = db.Column(db.Integer, nullable=False)

    course = db.relationship('Course', back_populates='modules')

    def __repr__(self):
        return f'<Module {self.title}>'

class Assessment(db.Model):
    __tablename__ = 'assessments'
    id = db.Column(db.Integer, primary_key=True)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    max_score = db.Column(db.Integer, nullable=False)
    module = db.relationship('Module', backref='assessments')

    def __repr__(self):
        return f'<Assessment {self.title}>'

class Enrollment(db.Model):
    __tablename__ = 'enrollments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Enrollment User:{self.user_id} Course:{self.course_id}>'

class Grade(db.Model):
    __tablename__ = 'grades'
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    grade = db.Column(db.Float, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f'<Grade User:{self.user_id} Course:{self.course_id} Grade:{self.grade}>'

class PasswordResetToken(db.Model):
    __tablename__ = 'password_reset_tokens'
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(128), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    expiration = db.Column(db.DateTime, nullable=False, default=lambda: datetime.utcnow() + timedelta(hours=1))

    def is_expired(self):
        return datetime.utcnow() > self.expiration

    def __repr__(self):
        return f'<PasswordResetToken User:{self.user_id} Expires:{self.expiration}>'

class Progress(db.Model):
    __tablename__ = 'progress'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    module_id = db.Column(db.Integer, db.ForeignKey('modules.id'), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer)
    last_accessed = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Progress {self.id}>'

class Resource(db.Model):
    __tablename__ = 'resources'
    resource_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    url = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<Resource {self.title}>'

class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=True)  # Changed to nullable
    comment = db.Column(db.Text, nullable=False)   # Comment is required
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Review Course:{self.course_id} Rating:{self.rating}>'

class Classroom(db.Model):
    __tablename__ = 'classrooms'
    classroom_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    students = db.relationship('Student', backref='classroom', lazy=True)


    def __repr__(self):
        return f'<Classroom {self.name}>'

class Student(db.Model):
    __tablename__ = 'students'
    student_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    classroom_id = db.Column(db.Integer, db.ForeignKey('classrooms.classroom_id'), nullable=False)

    def __repr__(self):
        return f'<Student {self.first_name} {self.last_name}>'

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Message {self.id}>'