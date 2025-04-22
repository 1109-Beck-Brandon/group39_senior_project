# course_routes.py
from flask import Blueprint, request, jsonify
from ..models import db, Course, TeacherCourseSelection, User

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
    
    # Get teachers who selected this course
    teacher_selections = TeacherCourseSelection.query.filter_by(course_id=course_id).all()
    teacher_ids = [selection.teacher_id for selection in teacher_selections]
    
    course_data = {
        'id': course.id,
        'title': course.title,
        'description': course.description,
        'teacher_ids': teacher_ids,  # List of teachers who selected this course
        'created_at': course.created_at.isoformat()
    }
    return jsonify(course_data), 200
