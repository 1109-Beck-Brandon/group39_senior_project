# password_reset_routes.py
from flask import Blueprint, request, jsonify
from ..models import db, PasswordResetToken, User
import uuid
from datetime import datetime, timedelta

password_reset_bp = Blueprint('password_reset', __name__)

@password_reset_bp.route('/password-reset', methods=['POST'])
def password_reset():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'No user found with that email'}), 404

    token = str(uuid.uuid4())
    expiration = datetime.utcnow() + timedelta(hours=1)
    reset_token = PasswordResetToken(token=token, user_id=user.id, expiration=expiration)
    db.session.add(reset_token)
    db.session.commit()
    return jsonify({'message': 'Password reset token generated', 'token': token}), 200
