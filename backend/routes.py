from flask import Blueprint, jsonify, request
from .models import User
from . import db

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def index():
    return jsonify({"message": "Welcome to the Flask API"})

@main.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"user_id": user.user_id, "username": user.username, "email": user.email} for user in users])

@main.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'], role=data.get('role'))
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully!"}), 201

@main.route('/api/data', methods=['GET'])
def get_data():
    # Example data
    data = {"message": "Hello from Flask!"}
    return jsonify(data)