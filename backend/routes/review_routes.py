# review_routes.py
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..models import db, Review, Course

review_bp = Blueprint('review', __name__)

@review_bp.route('/courses/<int:course_id>/reviews', methods=['GET'])
def get_reviews(course_id):
    Course.query.get_or_404(course_id)
    reviews = Review.query.filter_by(course_id=course_id).all()
    reviews_list = [{
        'id': review.id,
        'user_id': review.user_id,
        'rating': review.rating,
        'comment': review.comment,
        'created_at': review.created_at.isoformat()
    } for review in reviews]
    return jsonify({'course_id': course_id, 'reviews': reviews_list}), 200

@review_bp.route('/courses/<int:course_id>/reviews', methods=['POST'])
@login_required
def post_review(course_id):
    Course.query.get_or_404(course_id)
    data = request.get_json()
    rating = data.get('rating')
    comment = data.get('comment')
    if rating is None:
        return jsonify({'error': 'Rating is required'}), 400
    review = Review(course_id=course_id, user_id=current_user.id, rating=rating, comment=comment)
    db.session.add(review)
    db.session.commit()
    return jsonify({'message': 'Review submitted successfully'}), 201
