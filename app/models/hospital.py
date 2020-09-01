from datetime import datetime

from sqlalchemy import Column, String, Integer, SmallInteger
from ..models.base import Base, db


class Hospital(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255), default='-')
    scale = Column(String(255), default='-')
    type_ = Column(String(255), default='-')

    @staticmethod
    def creat_Hospital(name, description, scale, type_):
        with db.auto_commit():
            temp = Hospital()
            temp.name = name
            temp.description = description
            temp.scale = scale
            temp.type_ = type_
            temp.update_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            db.session.add(temp)

    @classmethod
    def is_name_exist(cls, name):
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