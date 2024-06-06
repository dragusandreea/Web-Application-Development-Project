from marshmallow import Schema, fields, validate


class DestinationDto(Schema):
    id = fields.Integer()
    description = fields.Str(required=True)
    location = fields.Str(required=True, validate=validate.Length(min=1))
    price = fields.Float(required=True, validate=validate.Range(min=0))
    available_seats = fields.Integer(required=True, validate=validate.Range(min=1))
    offer_percent = fields.Integer(required=True, validate=validate.Range(min=0, max=100))
