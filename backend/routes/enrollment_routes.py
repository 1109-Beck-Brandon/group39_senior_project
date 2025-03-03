# enrollment_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Enrollment, Course, User

enrollment_bp = Blueprint('enrollment', __name__)

@enrollment_bp.route('/users/<int:user_id>/courses', methods=['POST'])
@login_required
def enroll_course(user_id):
    if current_user.id != user_id:
        return jsonify({'error': 'Unauthorized access'}), 403
    data = request.get_json()
    course_id = data.get('courseId') or data.get('course_id')
    if not course_id:
        return jsonify({'error': 'Course ID is required'}), 400

    course = Course.query.get_or_404(course_id)
    if Enrollment.query.filter_by(user_id=user_id, course_id=course.id).first():
        return jsonify({'error': 'User already enrolled in this course'}), 400

    enrollment = Enrollment(user_id=user_id, course_id=course.id)
    db.session.add(enrollment)
    db.session.commit()
    return jsonify({'message': f'User {user_id} enrolled in course {course.id} successfully'}), 201
