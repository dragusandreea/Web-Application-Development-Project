import enum

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum

from config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

    from .controller.user_controller import UserController
    user_controller = UserController(db)
    app.register_blueprint(user_controller.user_bp)

    from .controller.destination_controller import DestinationController
    destination_controller = DestinationController(db)
    app.register_blueprint(destination_controller.destination_bp)

    from .controller.authentication_controller import AuthController
    auth_controller = AuthController(db)
    app.register_blueprint(auth_controller.auth_bp)

    from .controller.booking_controller import BookingController
    booking_controller = BookingController(db)
    app.register_blueprint(booking_controller.booking_dp)

    return app


class Destination(db.Model):
    db = db
    __tablename__ = 'destinations'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(), nullable=False)
    location = db.Column(db.String(), nullable=False)
    price = db.Column(db.Float, nullable=False)
    available_seats = db.Column(db.Integer, nullable=False)
    offer_percent = db.Column(db.Integer, nullable=False, default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "location": self.location,
            "price": self.price,
            "available_seats": self.available_seats,
            "offer_percent": self.offer_percent
        }


class UserType(enum.Enum):
    client = 'CLIENT',
    agent = 'AGENT'


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    username = db.Column(db.String(), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    user_type = db.Column(Enum(UserType, name='user_type', create_type=False))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "username": self.username,
            "user_type": self.user_type
        }


class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    date_start = db.Column(db.String(), nullable=False)
    date_end = db.Column(db.String(), unique=True, nullable=False)
    date_booking = db.Column(db.String(), unique=True, nullable=False)
    destination_id = db.Column(db.Integer(), nullable=False)
    user_id = db.Column(db.Integer(), nullable=False)
    total_cost = db.Column(db.Integer(), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "date_start": self.date_start,
            "date_end": self.date_end,
            "date_booking": self.date_booking,
            "destination_id": self.destination_id,
            "user_id": self.user_id,
            "total_cost": self.total_cost,
        }
