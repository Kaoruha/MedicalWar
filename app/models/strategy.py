from datetime import datetime

from sqlalchemy import Column, String, Integer, SmallInteger
from ..models.base import Base, db


class Strategy(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    game_id = Column(Integer)
    game_name = Column(String(255))
    company_id = Column(Integer)
    rounds = Column(Integer)
    strategy = Column(String(255))
    update_time = Column(String(30))

    @staticmethod
    def creat_strategy(name, description):
        with db.auto_commit():
            temp = Game()
            temp.name = name
            temp.description = description
            temp.rounds = 0
            temp.update_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            db.session.add(temp)

    @classmethod
    def is_strategy_exist(cls, name):
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