from flask import Blueprint, request, jsonify
from ..models import User
from .. import db
import jwt
import datetime
import os

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
        # Here you can implement session management or token generation
        session['user_id'] = user.id
        return jsonify({'message': 'Logged in successfully', 
                        'user': {'id': user.id, 'name': user.name, 'email': user.email}}), 200
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'student')
    if not name or not email or not password:
        return jsonify({'error': 'Name, email, and password are required'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 400

    user = User(name=name, email=email, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully', 
                    'user': {'id': user.id, 'name': user.name, 'email': user.email}}), 201



'''
@auth.route('/createProfile', methods=['POST'])
def create_profile():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')
    first_name = data.get('first_name')
    last_name = data.get('last_name')

    if not username or not email or not password or not first_name or not last_name:
        return jsonify({'message': 'Missing required fields'}), 400

    if User.query.filter((User.username == username) | (User.email == email)).first():
        return jsonify({'message': 'User already exists'}), 409

    new_user = User(username=username, email=email, role=role,
                    first_name=first_name, last_name=last_name)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Profile created successfully'}), 201

@auth.route('/resetPassword', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('newPassword')
    confirm_password = data.get('confirmPassword')

    if new_password != confirm_password:
        return jsonify({'message': 'Passwords do not match'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    user.set_password(new_password)
    db.session.commit()

    return jsonify({'message': 'Password reset successfully'}), 200
'''