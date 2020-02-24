import click
from flask.cli import with_appcontext

from . import db
from .models import List, Item

@click.command(name='reset_models')
@with_appcontext
def reset_models():
  db.drop_all()
  db.create_all()