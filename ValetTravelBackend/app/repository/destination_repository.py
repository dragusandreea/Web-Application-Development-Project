from app import Destination


class DestinationRepository:

    def __init__(self, db1):
        self.db = db1
        self.destination = Destination()

    def create(self, destination):
        self.db.session.add(destination)
        self.db.session.commit()
        return destination

    def find_by_id(self, destination_id):
        return self.destination.query.get(destination_id)

    def find_by_location(self, location):
        return self.destination.query.filter(self.destination.location.ilike(f'%{location}%')).all()

    def find_all(self):
        return self.destination.query.all()

    def update(self, data):
        destination = self.destination.query.get(data.get('id'))
        print(data)
        if destination:
            if (description := data.get('description')) not in (None, ''):
                destination.description = description
            if (location := data.get('location')) not in (None, ''):
                destination.location = location
            if (price := data.get('price')) not in (None, ''):
                destination.price = price
            if (available_seats := data.get('available_seats')) is not None:
                try:
                    available_seats = int(available_seats)
                    if available_seats > 0:
                        destination.available_seats = available_seats
                except ValueError:
                    pass
            if (offer_percentage := data.get('offer_percent', destination.offer_percent)) is not None:
                try:
                    offer_percentage = float(offer_percentage)
                    if 0 <= offer_percentage <= 100:
                        destination.discount_percent = offer_percentage
                except ValueError:
                    pass
            print(destination.to_dict())
            self.db.session.add(destination)
            self.db.session.commit()

        return destination

    def delete(self, destination_id):
        destination = self.destination.query.get(destination_id)
        if destination:
            self.db.session.delete(destination)
            self.db.session.commit()
        return destination
