from marshmallow import Schema, fields, validate


class BookingDto(Schema):
    id = fields.Integer()
    date_start = fields.Str(required=True)
    date_end = fields.Str(required=True, validate=validate.Length(min=1))
    date_booking = fields.Str(required=True, validate=validate.Length(min=1))
    destination_id = fields.Integer(required=True, validate=validate.Range(min=1))
    user_id = fields.Integer(required=True, validate=validate.Range(min=1))
    total_cost = fields.Integer(required=True, validate=validate.Range(min=1))

