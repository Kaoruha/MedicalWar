from flask import Blueprint
from .user import yp_user
from .test import yp_test
from .game import yp_game
from .hospital import yp_hospital


def create_blueprint():
    bp = Blueprint('bp_api', __name__, url_prefix='/api')
    yp_user.register(bp)
    yp_game.register(bp)
    yp_hospital.register(bp)
    yp_test.register(bp)
    return bp
