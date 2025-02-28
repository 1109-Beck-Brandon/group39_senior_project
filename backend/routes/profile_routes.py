from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, User

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/users/<int:user_id>', methods=['GET'])
@login_required
def get_profile(user_id):
    if current_user.id != user_id:
        return jsonify({"message": "Unauthorized access"}), 403
    user = current_user
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role
    }), 200

@profile_bp.route('/users/<int:user_id>', methods=['PUT'])
@login_required
def update_profile(user_id):
    if current_user.id != user_id:
        return jsonify({"message": "Unauthorized access"}), 403
    user = current_user
    data = request.get_json()
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    if 'password' in data:
        user.set_password(data['password'])
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200

@profile_bp.route('/users/<int:user_id>', methods=['PUT'])
@login_required
def update_profile(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    # Update fields if they are provided in the request data
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'classroomName' in data:
        # If storing a single classroom name
        user.classroom_name = data['classroomName']
    if 'phoneNumber' in data:
        user.phone_number = data['phoneNumber']
    if 'schoolName' in data:
        user.school_name = data['schoolName']
    if 'preferredContactMethod' in data:
        user.preferred_contact_method = data['preferredContactMethod']
    if 'gradeLevel' in data:
        user.grade_level = data['gradeLevel']
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully', 'user': user.to_dict()}), 200
