from flask import Blueprint, jsonify, request, send_from_directory
from .models import User, Course, Module, Resource, Review, Classroom, Student
from . import db
import os

main = Blueprint('main', __name__)

@main.route('/api/users', methods=['GET'])
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

@main.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get_or_404(course_id)
    return jsonify(course.to_dict())

@main.route('/courses/<int:course_id>/modules', methods=['GET'])
def get_course_modules(course_id):
    modules = Module.query.filter_by(course_id=course_id).all()
    return jsonify([module.to_dict() for module in modules])

@main.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([course.to_dict() for course in courses])

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

@main.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    students_data = [
        {
            'id': student.id,
            'firstName': student.first_name,
            'lastName': student.last_name,
            'classroomId': student.classroom_id,
            'grade': student.grade
        } for student in students
    ]
    return jsonify(students_data)

@main.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    student = Student.query.get_or_404(student_id)
    student_data = {
        'id': student.id,
        'firstName': student.first_name,
        'lastName': student.last_name,
        'classroomId': student.classroom_id,
        'grade': student.grade
    }
    return jsonify(student_data)

@main.route('/students', methods=['POST'])
def add_student():
    data = request.get_json()
    new_student = Student(
        first_name=data['firstName'],
        last_name=data['lastName'],
        classroom_id=data['classroomId'],
        grade=data.get('grade', 0)
    )
    db.session.add(new_student)
    db.session.commit()
    return jsonify({'message': 'Student added successfully'}), 201

@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("docs/" + path):
        return send_from_directory('docs', path)
    else:
        return send_from_directory('docs', 'index.html')