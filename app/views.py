from flask import Blueprint, jsonify

api = Blueprint('api', __name__)

@api.route('/api/lists')
def lists():

  lists = []

  return jsonify({ 'lists': lists })

@api.route('/api/add_list', methods=['POST'])
def add_list():

  return 'The POST request to this route worked!', 201