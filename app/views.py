from flask import Blueprint, jsonify, request
from . import db
from .models import List, Item

api = Blueprint('api', __name__)

@api.route('/api/lists')
def lists():
  lists_all = List.query.order_by(List.id.asc())
  lists = []

  for list_in_db in lists_all:
    lists.append({ 
      'id': list_in_db.id, 
      'name': list_in_db.name
    })

  return jsonify({ 'lists': lists })

@api.route('/api/add_list', methods=['POST'])
def add_list():
  list_data = request.get_json()

  new_list = List(name=list_data['name'])

  db.session.add(new_list)
  db.session.commit()

  return 'The POST request for this list worked!', 201

@api.route('/api/lists/<list_id_num>/items')
def items(list_id_num):
  items_all = Item.query.filter_by(list_id=int(list_id_num))
  items = []

  for item_in_db in items_all:
    items.append({ 
      'id': item_in_db.id,
      'description': item_in_db.description
    })

  return jsonify({ 'items': items })

@api.route('/api/lists/<list_id_num>/add_item', methods=['POST'])
def add_item(list_id_num):
  item_data = request.get_json()

  new_item = Item(description=item_data['description'], list_id=int(list_id_num))

  db.session.add(new_item)
  db.session.commit()

  return 'The POST request for this item worked!', 201