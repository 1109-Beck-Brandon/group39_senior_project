# teacher_routes.py
from flask import Blueprint, request, jsonify
from ..models import db, User, Course

teacher_bp = Blueprint('teacher', __name__)

@teacher_bp.route('/teachers/<int:teacher_id>', methods=['GET'])
def get_teacher(teacher_id):
    teacher = User.query.filter_by(id=teacher_id, role='teacher').first_or_404()
    courses = [{'id': course.id, 'title': course.title, 'description': course.description} 
               for course in teacher.courses]
    return jsonify({
        'id': teacher.id,
        'name': teacher.name,
        'email': teacher.email,
        'courses': courses
    }), 200
