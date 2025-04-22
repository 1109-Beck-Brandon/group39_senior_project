# enrollment_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Enrollment, Course, User

enrollment_bp = Blueprint('enrollment', __name__)

@enrollment_bp.route('/users/<int:user_id>/courses', methods=['POST'])
@login_required
def enroll_course(user_id):
    data = request.json
    course_id = data.get('course_id')

    if not course_id:
        return jsonify({'error': 'Course ID is required'}), 400

    # Check if the user and course exist (removed duplicate user lookup)
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    course = Course.query.get(course_id)
    if not course:
        return jsonify({'error': 'Course not found'}), 404

    # Check if the user is already enrolled
    existing_enrollment = Enrollment.query.filter_by(user_id=user_id, course_id=course_id).first()
    if existing_enrollment:
        return jsonify({'message': 'User is already enrolled in this course'}), 200

    # Create a new enrollment
    enrollment = Enrollment(user_id=user_id, course_id=course_id)
    db.session.add(enrollment)
    db.session.commit()

    return jsonify({'message': 'Enrollment successful'}), 201

@enrollment_bp.route('/users/<int:user_id>/courses', methods=['GET'])
@login_required
def get_user_courses(user_id):
    # Check if the user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    # Get all enrollments for the user
    enrollments = Enrollment.query.filter_by(user_id=user_id).all()
    course_ids = [enrollment.course_id for enrollment in enrollments]
    
    # Get course details for each enrollment
    courses = Course.query.filter(Course.id.in_(course_ids)).all()
    courses_data = [
        {
            'id': course.id,
            'title': course.title,
            'description': course.description
        } for course in courses
    ]
    
    return jsonify({'courses': courses_data}), 200
