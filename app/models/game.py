from datetime import datetime

from sqlalchemy import Column, String, Integer, SmallInteger
from ..models.base import Base, db


class Game(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255), default='-')
    rounds = Column(Integer)
    update_time = Column(String(30))

    @staticmethod
    def creat_game(name, description):
        with db.auto_commit():
            temp = Game()
            temp.name = name
            temp.description = description
            temp.rounds = 0
            temp.update_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            db.session.add(temp)

    @classmethod
    def is_game_exist(cls, name):
        if cls.query.filter_by(name=name, status=1).first():
            return True
        else:
            return False

    @classmethod
    def is_exist(cls, uid):
        if cls.query.filter_by(id=uid, status=1).first():
            return True
        else:
            return False