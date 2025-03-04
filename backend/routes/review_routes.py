# review_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Review, Course

review_bp = Blueprint('reviews', __name__, url_prefix='/reviews')

@review_bp.route('/', methods=['GET'])
def get_reviews():
    reviews = Review.query.order_by(Review.created_at.desc()).all()
    return jsonify([review.to_dict() for review in reviews])

@review_bp.route('/', methods=['POST'])
@login_required
def add_review():
    data = request.get_json()
    
    if not data or 'content' not in data:
        return jsonify({'error': 'Review content is required'}), 400
        
    review_content = data['content'].strip()
    
    # Validation logic remains the same
    if not review_content:
        return jsonify({'error': 'Message cannot be blank!'}), 400
    
    if len(review_content) <= 3:
        return jsonify({'error': 'Message is less than 3 characters long!'}), 400
    
    import re
    if not re.match(r'^[a-zA-Z0-9!?.,\s]+$', review_content):
        return jsonify({'error': 'Message contains invalid special characters!'}), 400
    
    if len(review_content) > 20:
        return jsonify({'error': 'Message exceeds the maximum length of 20 characters!'}), 400
    
    # Create and save the review
    review = Review(content=review_content)
    if current_user.is_authenticated:
        review.user_id = current_user.id
    
    db.session.add(review)
    db.session.commit()
    
    return jsonify({'message': 'Review submitted successfully', 'review': review.to_dict()}), 201

# Add these new routes to handle course-specific reviews
@review_bp.route('/courses/<int:course_id>/reviews', methods=['GET'])
def get_course_reviews(course_id):
    course = Course.query.get_or_404(course_id)
    reviews = Review.query.filter_by(course_id=course_id).order_by(Review.created_at.desc()).all()
    return jsonify([review.to_dict() for review in reviews])

@review_bp.route('/courses/<int:course_id>/reviews', methods=['POST'])
@login_required
def add_course_review(course_id):
    course = Course.query.get_or_404(course_id)
    data = request.get_json()
    
    if not data or 'content' not in data:
        return jsonify({'error': 'Review content is required'}), 400
        
    review_content = data['content'].strip()
    
    # Same validation logic
    if not review_content:
        return jsonify({'error': 'Message cannot be blank!'}), 400
    
    if len(review_content) <= 3:
        return jsonify({'error': 'Message is less than 3 characters long!'}), 400
    
    import re
    if not re.match(r'^[a-zA-Z0-9!?.,\s]+$', review_content):
        return jsonify({'error': 'Message contains invalid special characters!'}), 400
    
    if len(review_content) > 20:
        return jsonify({'error': 'Message exceeds the maximum length of 20 characters!'}), 400
    
    # Create and save the course review
    review = Review(content=review_content, course_id=course_id)
    if current_user.is_authenticated:
        review.user_id = current_user.id
    
    db.session.add(review)
    db.session.commit()
    
    return jsonify({'message': 'Review submitted successfully', 'review': review.to_dict()}), 201

@review_bp.route('/courses/<int:course_id>/reviews', methods=['OPTIONS'])
def options_courses_reviews(course_id):
    response = jsonify({})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

@review_bp.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response
