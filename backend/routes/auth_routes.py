from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required
from ..models import User
from ..extensions import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify({
            'message': 'Logged in successfully', 
            'user': {'id': user.id, 'name': user.name, 'email': user.email}
        }), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # Create the user with first and last name
    user = User(
        name=data.get('name', ''),
        first_name=data.get('first_name', ''),
        last_name=data.get('last_name', ''),
        email=data.get('email'),
        role=data.get('role', 'student')
    )
    user.set_password(data.get('password'))
    db.session.add(user)
    db.session.commit()
    # Rest of your code
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/refresh-token', methods=['POST'])
@login_required
def refresh_token():
    return jsonify({'message': 'Token refreshed successfully'}), 200

