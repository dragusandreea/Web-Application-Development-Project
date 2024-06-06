from marshmallow import Schema, fields, validate
from app import UserType


class UserDto(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1))
    username = fields.Str(required=True,
                          validate=validate.Regexp('^[A-Za-z0-9+_.-]+@[A-Za-z0-9]{2,5}\\.[A-Za-z]{2,4}$'))
    password = fields.Str(required=True) #validate=validate.Regexp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*.]).{7,}$'))
    user_type = fields.Enum(UserType)
