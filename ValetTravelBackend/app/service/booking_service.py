from app.dtos.booking_dto import BookingDto
from app.repository.booking_repository import BookingRepository
from app import Booking
from app.service.destination_service import DestinationService


class BookingService:
    def __init__(self, db):
        self.booking_repository = BookingRepository(db)
        self.destination_service = DestinationService(db)
        self.db = db

    def create(self, **data):
        booking_dto = BookingDto()
        booking_data = booking_dto.load(data)
        new_booking = Booking(
            date_start=booking_data.get('date_start'),
            date_end=booking_data.get('date_end'),
            date_booking=booking_data.get('date_booking'),
            destination_id=booking_data.get('destination_id'),
            user_id=booking_data.get('user_id'),
            total_cost=booking_data.get('total_cost'))

        return self.booking_repository.create(new_booking)

    def get_destination(self, booking_id):
        return self.booking_repository.find_by_id(booking_id)

    def get_by_destination_id(self, destination_id):
        bookings = self.booking_repository.find_by_destination_id(destination_id)
        return [booking.to_dict() for booking in bookings]

    def get_by_location(self, location):
        bookings = self.booking_repository.find_by_location(location)
        return [booking.to_dict() for booking in bookings]

    def get_all(self):
        bookings = self.booking_repository.find_all()
        return [booking.to_dict() for booking in bookings]

    def delete(self, booking_id):
        return self.booking_repository.delete(booking_id)
