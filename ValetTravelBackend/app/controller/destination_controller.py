from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from app.service.destination_service import DestinationService


class DestinationController:
    def __init__(self, db):
        self.destination_service = DestinationService(db)
        self.destination_bp = Blueprint('destination_bp', __name__, url_prefix='/destinations')
        self.register_routes()

    def register_routes(self):
        self.destination_bp.add_url_rule('/get_by_location/<string:location>', view_func=self.get_by_location,
                                         methods=['GET'])
        self.destination_bp.add_url_rule('/get_all', view_func=self.get_all, methods=['GET'])
        self.destination_bp.add_url_rule('/create', view_func=self.create, methods=['POST'])
        self.destination_bp.add_url_rule('/update', view_func=self.update, methods=['PUT'])
        self.destination_bp.add_url_rule('/delete/<int:destination_id>', view_func=self.delete, methods=['DELETE'])

    def get_by_location(self, location):
        destinations = self.destination_service.get_by_location(location)
        return jsonify(destinations)

    def get_all(self):
        destinations = self.destination_service.get_all()
        return jsonify(destinations)

    def create(self):
        data = request.json
        try:
            destination = self.destination_service.create(**data)
        except ValidationError as err:
            return jsonify(err.messages), 400
        return jsonify(destination.to_dict()), 201

    def update(self):
        data = request.json
        destination = self.destination_service.update(data)
        if destination:
            return jsonify(destination.to_dict()), 200
        return jsonify({"error": "Destination not found"}), 404

    def delete(self, destination_id):
        destination = self.destination_service.delete(destination_id)
        if destination:
            return jsonify(destination.to_dict()), 200
        return jsonify({"error": "Destination not found"}), 404


