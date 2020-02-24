from flask import Blueprint, jsonify, request
from . import db
from .models import List

api = Blueprint('api', __name__)

@api.route('/api/lists')
def lists():
  lists_all = List.query.order_by(List.id.desc())
  lists = []

  for list_in_db in lists_all:
    lists.append({ 'name': list_in_db.name })

  return jsonify({ 'lists': lists })

@api.route('/api/add_list', methods=['POST'])
def add_list():
  list_data = request.get_json()

  new_list = List(name=list_data['name'])

  db.session.add(new_list)
  db.session.commit()

  return 'The POST request to this route worked!', 201