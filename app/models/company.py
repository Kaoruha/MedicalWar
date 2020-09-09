from datetime import datetime
import uuid
from sqlalchemy import Column, String, Integer, SmallInteger
from ..models.base import Base, db


class Company(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    uuid = Column(String(255))
    company_id = Column(String(1), default='a')
    game_id = Column(Integer(), default=0)

    @staticmethod
    def creat_Company(game_id, company_id):
        try:
            with db.auto_commit():
                temp = Company()
                temp.company_id = company_id
                namespace = uuid.NAMESPACE_URL
                uid = str(uuid.uuid3(namespace,game_id+company_id))
                temp.uuid = ''.join(uid.split('-'))
                temp.game_id = int(game_id)
                db.session.add(temp)
        except Exception as e:
            print(e)

    @classmethod
    def is_uuid_exist(cls, uuid):
        if cls.query.filter_by(uuid=uuid, status=1).first():
            return True
        else:
            return False

    @classmethod
    def get_com_uuid(cls, game_id, company_id):
        try:
            company = cls.query.filter_by(game_id=game_id,company_id=company_id, status=1).first()
            return company.uuid
        except Exception as e:
            print(e)