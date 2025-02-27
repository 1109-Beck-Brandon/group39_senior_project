from flask import Blueprint, request, jsonify
from ..models import db, User
from ..middleware import jwt_required

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/users/<int:user_id>', methods=['GET'])
@jwt_required
def get_profile(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'role': user.role
    }), 200

@profile_bp.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required
def update_profile(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    # Optionally update the password
    if 'password' in data:
        user.set_password(data['password'])
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200