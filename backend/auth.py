from flask import Blueprint, request, jsonify
from .models import User
from . import db
import jwt
import datetime

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        token = jwt.encode({
            'user_id': user.user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, 'your_secret_key', algorithm='HS256')

        return jsonify({'token': token})

    return jsonify({'message': 'Invalid credentials'}), 401

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], role=data['role'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201