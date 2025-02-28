# teacher_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, User, Course, Classroom

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

@teacher_bp.route('/dashboard', methods=['GET'])
@login_required
def teacher_dashboard():
    # Assume current_user is available via Flask-Login
    teacher = current_user
    # Retrieve teacher's classrooms and students from the database
    classrooms = Classroom.query.filter_by(teacher_id=teacher.id).all()
    classroom_names = [{'id': cls.id, 'name': cls.name} for cls in classrooms]
    all_students = {}
    for cls in classrooms:
        # Assuming a relationship cls.students exists
        all_students[cls.id] = [student.to_dict() for student in cls.students]
    
    return jsonify({
        "email": teacher.email,
        "username": teacher.username,
        "classroomNames": classroom_names,
        "allStudents": all_students,
    }), 200
