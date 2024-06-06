from flask import request, jsonify, Blueprint
from marshmallow import ValidationError

from app.service.user_service import UserService


class AuthController:
    def __init__(self, db):
        self.user_service = UserService(db)
        self.auth_bp = Blueprint('auth_bp', __name__, url_prefix='/auth')
        self.register_routes()

    def register_routes(self):
        self.auth_bp.add_url_rule('/login', view_func=self.login, methods=['POST'])
        self.auth_bp.add_url_rule('/register', view_func=self.register, methods=['POST'])

    def login(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"message": "Missing username or password"}), 400

        found_user = self.user_service.get_user_by_username_and_password(username, password)

        if found_user:
            found_user.user_type = found_user.user_type.name
            return jsonify(found_user.to_dict()), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401

    def register(self):
        data = request.get_json()
        username = data.get('username')

        if self.user_service.get_user_by_username(username):
            return jsonify({"message": "Username already exists"}), 400
        try:
            user = self.user_service.create_user(**data)
            user.user_type = user.user_type.name
        except ValidationError as err:
            return jsonify(err.messages), 400
        return jsonify(user.to_dict()), 201
