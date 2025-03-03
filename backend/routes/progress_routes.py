# In backend/routes/progress_routes.py
from flask import Blueprint, request, jsonify, make_response
from flask_login import login_required, current_user
from ..models import Progress, db
from datetime import datetime

progress_bp = Blueprint('progress', __name__, url_prefix='/progress')

@progress_bp.route('/', methods=['POST', 'OPTIONS'])
def save_progress():
    # Handle OPTIONS request for CORS preflight directly - don't redirect!
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', 'https://1109-beck-brandon.github.io')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST,OPTIONS')
        return response
        
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


@progress_bp.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')  # Or limit to your domains
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response