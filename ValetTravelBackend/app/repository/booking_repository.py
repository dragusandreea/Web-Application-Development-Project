from app import Booking


class BookingRepository:

    def __init__(self, db1):
        self.db = db1
        self.booking = Booking()

    def create(self, booking):
        self.db.session.add(booking)
        self.db.session.commit()
        return booking

    def find_by_id(self, booking_id):
        return self.booking.query.get(booking_id)

    def find_by_destination_id(self, destination_id):
        return self.booking.query.filter_by(destination_id=destination_id).all()

    def find_by_location(self, location):
        return self.booking.query.filter(self.booking.location.ilike(f'%{location}%')).all()

    def find_all(self):
        return self.booking.query.all()

    def delete(self, booking_id):
        booking= self.booking.query.get(booking_id)
        if booking:
            self.db.session.delete(booking)
            self.db.session.commit()
        return booking
