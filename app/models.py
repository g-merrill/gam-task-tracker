from . import db

class List(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  items = db.relationship('Item')

class Item(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  description = db.Column(db.String(50))
  list_id = db.Column(db.Integer, db.ForeignKey('list.id'))
