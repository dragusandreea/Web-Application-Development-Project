from app.dtos.user_dto import UserDto
from app import User
from app import UserType
from app import bcrypt
from app.repository.user_repository import UserRepository


def check_password(db_pass, login_pass):
    return bcrypt.check_password_hash(db_pass, login_pass)


class UserService:
    def __init__(self, db):
        self.user_repository = UserRepository(db)
        self.db = db

    def create_user(self, **data):
        user_dto = UserDto()
        user_data = user_dto.load(data)
        user_type = UserType.client if user_data.get('user_type') == UserType.client else UserType.agent
        password = user_data.get('password')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(name=user_data.get('name'),
                        username=user_data.get('username'), password=hashed_password,
                        user_type=user_type)
        return self.user_repository.create(new_user)

    def get_user(self, user_id):
        return self.user_repository.find_by_id(user_id)

    def get_user_by_username_and_password(self, username, password):
        user = self.user_repository.find_by_username(username)
        if check_password(user.password, password):
            return user

    def get_user_by_username(self, username):
        return self.user_repository.find_by_username(username)
