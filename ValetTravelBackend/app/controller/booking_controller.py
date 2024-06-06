from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from app.service.booking_service import BookingService


class BookingController:
    def __init__(self, db):
        self.booking_service = BookingService(db)
        self.booking_dp = Blueprint('booking_bp', __name__, url_prefix='/bookings')
        self.register_routes()

    def register_routes(self):
        self.booking_dp.add_url_rule('/get_by_location/<string:location>', view_func=self.get_by_location,
                                     methods=['GET'])
        self.booking_dp.add_url_rule('/get_all', view_func=self.get_all, methods=['GET'])
        self.booking_dp.add_url_rule('/get_by_destination_id/<int:destination_id>', view_func=self.get_by_destination_id, methods=['GET'])
        self.booking_dp.add_url_rule('/create', view_func=self.create, methods=['POST'])
        self.booking_dp.add_url_rule('/delete/<int:booking_id>', view_func=self.delete, methods=['DELETE'])

    def get_by_destination_id(self, destination_id):
        bookings = self.booking_service.get_by_destination_id(destination_id)
        return jsonify(bookings)

    def get_by_location(self, location):
        bookings = self.booking_service.get_by_location(location)
        return jsonify(bookings)

    def get_all(self):
        bookings = self.booking_service.get_all()
        return jsonify(bookings)

    def create(self):
        data = request.json
        try:
            booking = self.booking_service.create(**data)
        except ValidationError as err:
            return jsonify(err.messages), 400
        return jsonify(booking.to_dict()), 201

    def delete(self, booking_id):
        booking = self.booking_service.delete(booking_id)
        if booking:
            return jsonify(booking.to_dict()), 200
        return jsonify({"error": "Destination not found"}), 404


