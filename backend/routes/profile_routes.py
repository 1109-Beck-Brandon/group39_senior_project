from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, User, Progress, Module
from datetime import datetime

profile_bp = Blueprint('profile', __name__)
progress_bp = Blueprint('progress', __name__)

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
    if 'name' in data:
        user.name = data.get('name')
        # Split the name into first_name and last_name
        name_parts = user.name.split(' ', 1)
        user.first_name = name_parts[0]
        user.last_name = name_parts[1] if len(name_parts) > 1 else ''
    user.email = data.get('email', user.email)
    if 'password' in data:
        user.set_password(data['password'])
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200

@progress_bp.route('/progress', methods=['POST'])
@login_required
def save_progress():
    data = request.get_json()
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    user_id = data.get('user_id')
    module_id = data.get('module_id')
    status = data.get('status', 'completed')
    score = data.get('score')
    
    if not user_id or not module_id:
        return jsonify({'error': 'User ID and Module ID are required'}), 400
    
    # Check if progress record exists
    progress = Progress.query.filter_by(user_id=user_id, module_id=module_id).first()
    
    if progress:
        # Update existing record
        progress.status = status
        progress.score = score
        progress.last_accessed = datetime.utcnow()
    else:
        # Create new record
        progress = Progress(
            user_id=user_id,
            module_id=module_id,
            status=status,
            score=score
        )
        db.session.add(progress)
    
    db.session.commit()
    return jsonify({'message': 'Progress saved successfully'}), 200

@progress_bp.route('/users/<int:user_id>/progress', methods=['GET'])
@login_required
def get_user_progress(user_id):
    """Retrieve progress history for a specific user."""
    # Check authorization - only allow users to access their own progress
    if current_user.id != user_id and current_user.role != 'teacher':
        return jsonify({"error": "Unauthorized access"}), 403
    
    # Get all progress records for this user
    progress_records = Progress.query.filter_by(user_id=user_id).all()
    
    # Format the response with module details
    progress_data = []
    for record in progress_records:
        # Get module information
        module = Module.query.get(record.module_id)
        module_title = module.title if module else f"Module {record.module_id}"
        
        progress_data.append({
            'id': record.id,
            'module_id': record.module_id,
            'module_title': module_title,
            'status': record.status,
            'score': record.score,
            'last_accessed': record.last_accessed.isoformat() if record.last_accessed else None
        })
    
    return jsonify({
        'user_id': user_id,
        'progress': progress_data
    }), 200
