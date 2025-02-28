# gradebook_routes.py
from flask import Blueprint, request, jsonify
from ..models import db, Grade

gradebook_bp = Blueprint('gradebook', __name__)

@gradebook_bp.route('/gradebook/<int:user_id>', methods=['GET'])
def get_gradebook(user_id):
    grades = Grade.query.filter_by(user_id=user_id).all()
    grade_list = [{'course_id': grade.course_id, 'grade': grade.grade} for grade in grades]
    return jsonify({'user_id': user_id, 'grades': grade_list}), 200

@gradebook_bp.route('/gradebook/<int:user_id>', methods=['PUT'])
def update_gradebook(user_id):
    data = request.get_json()
    updated_grades = []
    for grade_data in data.get('grades', []):
        course_id = grade_data.get('course_id')
        new_grade = grade_data.get('grade')
        grade = Grade.query.filter_by(user_id=user_id, course_id=course_id).first()
        if grade:
            grade.grade = new_grade
        else:
            grade = Grade(user_id=user_id, course_id=course_id, grade=new_grade)
            db.session.add(grade)
        updated_grades.append({'course_id': course_id, 'grade': new_grade})
    db.session.commit()
    return jsonify({'message': 'Gradebook updated successfully', 'grades': updated_grades}), 200
