import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .commands import reset_lists

def create_app():
  app = Flask(__name__)

  app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
  
  db.init_app(app)

  from .views import api
  app.register_blueprint(api)

  app.cli.add_command(reset_lists)

  return app