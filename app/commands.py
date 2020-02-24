import click
from flask.cli import with_appcontext

from . import db
from .models import List

@click.command(name='reset_lists')
@with_appcontext
def reset_lists():
  db.drop_all()
  db.create_all()