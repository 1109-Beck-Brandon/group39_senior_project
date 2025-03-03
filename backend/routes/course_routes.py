# course_routes.py
from flask import Blueprint, request, jsonify
from ..models import db, Course

course_bp = Blueprint('course', __name__)

@course_bp.route('/courses', methods=['GET'])
def get_courses():
    courses = Course.query.all()
    courses_list = [{'id': course.id, 'title': course.title, 'description': course.description} 
                    for course in courses]
    return jsonify({'courses': courses_list}), 200

@course_bp.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    course = Course.query.get_or_404(course_id)
    course_data = {
        'id': course.id,
        'title': course.title,
        'description': course.description,
        'teacher_id': course.teacher_id,
        'created_at': course.created_at.isoformat()
    }
    return jsonify(course_data), 200
