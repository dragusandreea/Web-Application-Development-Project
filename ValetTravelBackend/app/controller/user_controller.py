from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from app.service.user_service import UserService


class UserController:
    def __init__(self, db):
        self.user_service = UserService(db)
        self.user_bp = Blueprint('user_bp', __name__, url_prefix='/users')
        self.register_routes()

    def register_routes(self):
        self.user_bp.add_url_rule('/get_by_id/<int:user_id>', view_func=self.get_user, methods=['GET'])
        self.user_bp.add_url_rule('/get_by_username/<string:username>', view_func=self.get_user_by_username, methods=['GET'])
        self.user_bp.add_url_rule('/create', view_func=self.create_user, methods=['POST'])

    def get_user(self, user_id):
        user = self.user_service.get_user(user_id)
        user.user_type = user.user_type.name
        if user:
            return jsonify(user.to_dict())
        return jsonify({"error": "User not found"}), 404

    def get_user_by_username(self, username):
        user = self.user_service.get_user_by_username(username)
        print(user)
        print("username " + username)
        if user:
            user.user_type = user.user_type.name
            return jsonify(user.to_dict())
        return jsonify({"error": "User not found"}), 404

    def create_user(self):
        data = request.json
        try:
            user = self.user_service.create_user(**data)
            user.user_type = user.user_type.name
        except ValidationError as err:
            return jsonify(err.messages), 400
        return jsonify(user.to_dict()), 201
