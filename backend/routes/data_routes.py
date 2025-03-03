from flask import Blueprint, jsonify

data_bp = Blueprint('data', __name__, url_prefix='/data-endpoint')

@data_bp.route('/', methods=['GET'])
def get_data():
    return jsonify({"message": "API connection successful"})