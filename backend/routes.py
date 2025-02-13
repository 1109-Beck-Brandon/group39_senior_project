from flask import Blueprint, jsonify, request, send_from_directory
from .models import User, Course, Module, Resource, Review, Classroom, Student
from .middleware import jwt_required
from . import db
import os

main = Blueprint('main', __name__)

# Frontend serving route (should be last route)
@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("docs/" + path):
        return send_from_directory('docs', path)
    return send_from_directory('docs', 'index.html')

# API Routes
@main.route('/api', methods=['GET'])
def index():
    return jsonify({
        "message": "Welcome to the Cybersecurity Learning Platform API",
        "endpoints": {
            "users": "/api/users",
            "courses": "/api/courses",
            "auth": "/auth/*"
        }
    })

@main.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email
    } for user in users])

@main.route('/api/users', methods=['POST'])
def add_user():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing required fields'}), 400

    if User.query.filter((User.username == data['username']) | (User.email == data['email'])).first():
        return jsonify({'message': 'Username or email already exists'}), 409
    
    new_user = User(
        username=data['username'],
        email=data['email'],
        role=data.get('role', 'student')
    )
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'message': 'User created successfully',
        'user_id': new_user.user_id
    }), 201

@main.route('/api/users/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        "user_id": user.user_id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
        "joined": user.date_joined.isoformat(),  # Fixed from date_created to date_joined
        "profile_picture": user.profile_picture,
        "grade_level": user.grade_level,  # New field
        "school_name": user.school_name,   # New field
        "courses_enrolled": [{
            "course_id": course.course_id,
            "title": course.title
        } for course in user.courses]
    })

@main.route('/api/users/<int:user_id>', methods=['PUT'])
@jwt_required
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    # Update allowed fields
    if 'profile_picture' in data:
        user.profile_picture = data['profile_picture']
    if 'grade_level' in data:
        user.grade_level = data['grade_level']
    if 'school_name' in data:
        user.school_name = data['school_name']
    
    db.session.commit()
    
    return jsonify({"message": "User updated successfully"}), 200

@main.route('/api/classrooms/join', methods=['POST'])
@jwt_required
def join_classroom():
    data = request.get_json()
    user_id = data.get('user_id')
    classroom_id = data.get('classroom_id')

    if not user_id or not classroom_id:
        return jsonify({"message": "Missing user_id or classroom_id"}), 400

    user = User.query.get_or_404(user_id)
    classroom = Classroom.query.get_or_404(classroom_id)

    user.classroom_id = classroom_id
    db.session.commit()

    return jsonify({
        "message": "Joined classroom successfully",
        "classroom_name": classroom.name
    }), 200

@main.route('/api/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    return jsonify([{
        "course_id": course.course_id,
        "title": course.title,
        "description": course.description,
        "instructor": course.instructor.username if course.instructor else None,
        "date_created": course.date_created.isoformat()
    } for course in courses])

@main.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get_or_404(course_id)
    return jsonify({
        "course_id": course.course_id,
        "title": course.title,
        "description": course.description,
        "modules": [{
            "module_id": module.module_id,
            "title": module.title,
            "order": module.order
        } for module in course.modules]
    })

@main.route('/api/courses/<int:course_id>/modules', methods=['GET'])
def get_course_modules(course_id):
    modules = Module.query.filter_by(course_id=course_id).order_by(Module.order).all()
    return jsonify([{
        "module_id": module.module_id,
        "title": module.title,
        "content": module.content,
        "order": module.order,
        "resources": [{
            "resource_id": resource.resource_id,
            "title": resource.title,
            "url": resource.url
        } for resource in module.resources]
    } for module in modules])

@main.route('/api/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.order_by(Review.timestamp.desc()).limit(10).all()
    return jsonify([{
        "review_id": review.review_id,
        "content": review.content,
        "author": {
            "user_id": review.user.user_id,
            "username": review.user.username
        },
        "timestamp": review.timestamp.isoformat()
    } for review in reviews])

@main.route('/api/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    if not data or not data.get('content') or not data.get('user_id'):
        return jsonify({"message": "Missing required fields"}), 400
    
    new_review = Review(
        content=data['content'],
        user_id=data['user_id']
    )
    db.session.add(new_review)
    db.session.commit()
    
    return jsonify({
        "message": "Review added successfully",
        "review_id": new_review.review_id
    }), 201


# Error handling
@main.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Not Found",
        "message": "The requested resource was not found"
    }), 404

@main.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal Server Error",
        "message": "An unexpected error occurred"
    }), 500