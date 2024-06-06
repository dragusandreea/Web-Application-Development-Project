from app.dtos.destination_dto import DestinationDto
from app.repository.destination_repository import DestinationRepository
from app import Destination


class DestinationService:
    def __init__(self, db):
        self.destination_repository = DestinationRepository(db)
        self.db = db

    def create(self, **data):
        destination_dto = DestinationDto()
        destination_data = destination_dto.load(data)
        new_destination = Destination(
                                      description=destination_data.get('description'),
                                      location=destination_data.get('location'),
                                      price=destination_data.get('price'),
                                      available_seats=destination_data.get('available_seats'),
                                      offer_percent=destination_data.get('offer_percent'))
        return self.destination_repository.create(new_destination)

    def get_destination(self, destination_id):
        return self.destination_repository.find_by_id(destination_id)

    def get_by_location(self, location):
        destinations = self.destination_repository.find_by_location(location)
        return [destination.to_dict() for destination in destinations]

    def get_all(self):
        destinations = self.destination_repository.find_all()
        return [destination.to_dict() for destination in destinations]

    def update(self, data):
        return self.destination_repository.update(data)

    def delete(self, destination_id):
        return self.destination_repository.delete(destination_id)

