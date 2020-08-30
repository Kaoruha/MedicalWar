from datetime import datetime

from sqlalchemy import Column, String, Integer, SmallInteger
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.base import Base, db


class Works(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255), default='-')
    author = Column(String(50))
    status = Column(SmallInteger, default=1)
    update_time = Column(String(30))

    # @property
    # def password(self):
    #     return self._password
    #
    # @password.setter
    # def password(self, raw):
    #     self._password = generate_password_hash(raw)
    #
    # @staticmethod
    # def add_user(account, password):
    #     with db.auto_commit():
    #         temp = User()
    #         temp.account = account
    #         temp.password = password
    #         temp.update_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    #         db.session.add(temp)
    #
    # @classmethod
    # def is_user_exist(cls, account):
    #     if cls.query.filter_by(account=account, status=1).first():
    #         return True
    #     else:
    #         return False
    #
    # @classmethod
    # def is_user_exist(cls, uid):
    #     if cls.query.filter_by(id=uid, status=1).first():
    #         return True
    #     else:
    #         return False
    #
    # @classmethod
    # def is_password_right(cls, account, password):
    #     t = cls.query.filter_by(account=account).first()
    #     t_hash = t.password
    #     if check_password_hash(pwhash=t_hash, password=password):
    #         return t
    #     else:
    #         return None
