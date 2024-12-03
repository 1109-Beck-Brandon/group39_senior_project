<<<<<<< HEAD
from flask import Blueprint, jsonify, request
from .models import User, Course, Module, Resource, Review, Classroom, Student
from . import db

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to the Flask API"})

@main.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"user_id": user.user_id, "username": user.username, "email": user.email} for user in users])

@main.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], role=data.get('role'))
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully!"}), 201

@main.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

@main.route('/course/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get_or_404(course_id)
    return jsonify({
        "course_id": course.course_id,
        "title": course.title,
        "description": course.description,
        "instructor_id": course.instructor_id,
        "date_created": course.date_created
    })

@main.route('/course/<int:course_id>/modules', methods=['GET'])
def get_course_modules(course_id):
    modules = Module.query.filter_by(course_id=course_id).order_by(Module.order).all()
    return jsonify([{
        "module_id": module.module_id,
        "title": module.title,
        "content": module.content,
        "order": module.order
    } for module in modules])

@main.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([{
        "course_id": course.course_id,
        "name": course.title,
        "description": course.description,
        "progress": 0  # Assuming progress is not stored in the database
    } for course in courses])

@main.route('/resources', methods=['GET'])
def get_resources():
    resources = Resource.query.all()
    return jsonify([{
        "resource_id": resource.resource_id,
        "title": resource.title,
        "description": resource.description,
        "url": resource.url
    } for resource in resources])

@main.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    return jsonify([{
        "review_id": review.review_id,
        "content": review.content,
        "user_id": review.user_id,
        "timestamp": review.timestamp
    } for review in reviews])

@main.route('/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    new_review = Review(content=data['content'], user_id=data['user_id'])
    db.session.add(new_review)
    db.session.commit()
    return jsonify({"message": "Review added successfully!"}), 201

@main.route('/classrooms', methods=['GET'])
def get_classrooms():
    classrooms = Classroom.query.all()
    return jsonify([{
        "classroom_id": classroom.classroom_id,
        "name": classroom.name
    } for classroom in classrooms])

@main.route('/classrooms/<int:classroom_id>/students', methods=['GET'])
def get_students(classroom_id):
    students = Student.query.filter_by(classroom_id=classroom_id).all()
    return jsonify([{
        "student_id": student.student_id,
        "first_name": student.first_name,
        "last_name": student.last_name,
        "classroom_id": student.classroom_id
    } for student in students])

@main.route('/user/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "fullName": f"{user.first_name} {user.last_name}",
        "membershipDuration": user.date_created.strftime('%Y-%m-%d'),
        "role": user.role,
        "profilePicture": user.profile_picture,  # Assuming you have this field
        "class": user.classroom.name if user.role == 'Student' else None
    })
=======
from flask import Blueprint, jsonify, request
from .models import User
from . import db

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to the Flask API"})

@main.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"user_id": user.user_id, "username": user.username, "email": user.email} for user in users])

@main.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], role=data.get('role'))
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully!"}), 201

@main.route('/api/data', methods=['GET'])
def get_data():
    # Example data
    data = {"message": "Hello from Flask!"}
    return jsonify(data)
>>>>>>> main
