import os
import shutil
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
        # 数据库添加
        with db.auto_commit():
            temp = Game()
            temp.name = name
            temp.description = description
            temp.rounds = 0
            temp.update_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            db.session.add(temp)
        
        # 本地生成目录
        path = 'app/data/game_'+ name
        if not os.path.exists(path):
            os.makedirs(path)
            os.makedirs(path+'/round1')
        # 拷贝初始CSV
        files = ['companyInfo.xlsx','InputTableA.xlsx','InputTableB.xlsx','InputTableC.xlsx']
        for file in files:
            shutil.copyfile('app/data/mould/'+file, path+'/round1/'+file)


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

    @classmethod
    def get_data(cls, uid, round):
        pass

    @classmethod
    def get_com_data(cls,uid,round,company_id):
        if not cls.is_exist(uid=uid):
            print('不存在该局游戏')
            return
        
