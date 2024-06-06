from app import User


class UserRepository:
    def __init__(self, db):
        self.db = db
        self.user = User()

    def create(self, user):
        self.db.session.add(user)
        self.db.session.commit()
        return user

    def find_by_id(self, user_id):
        return self.user.query.get(user_id)

    def find_by_username(self, username):
        return self.user.query.filter_by(username=username).first()

    def find_by_username_and_password(self, username, password):
        return self.user.query.filter_by(username=username, password=password).first()
