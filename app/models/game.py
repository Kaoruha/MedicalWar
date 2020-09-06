import os
import sys
import shutil
import pandas as pd
from datetime import datetime

from sqlalchemy import Column, String, Integer, SmallInteger
from ..models.base import Base, db


class Game(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255), default='-')
    rounds = Column(Integer)
    player_rounds = Column(Integer)
    update_time = Column(String(30))

    @staticmethod
    def creat_game(name, description):
        # 数据库添加
        with db.auto_commit():
            temp = Game()
            temp.name = name
            temp.description = description
            temp.rounds = 1
            temp.player_rounds = 0
            temp.update_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            db.session.add(temp)

        # 本地生成目录
        path = 'app/data/game_' + name
        if not os.path.exists(path):
            os.makedirs(path)
            os.makedirs(path + '/round1')
        # 拷贝初始CSV
        files = [
            'companyInfo.xlsx', 'InputTableA.xlsx', 'InputTableB.xlsx',
            'InputTableC.xlsx', 'InputTableD.xlsx'
        ]
        for file in files:
            source_path = os.getcwd() + '/app/data/mould/' + file
            df = pd.read_excel(source_path)
            df = df.fillna(0)
            df.to_csv(path + '/round1/' + file.split('.')[0] + '.csv', index=0)

    @classmethod
    def is_game_exist(cls, name):
        if cls.query.filter_by(name=name, status=1).first():
            return True
        else:
            return False

    @classmethod
    def is_exist(cls, game_id):
        if cls.query.filter_by(id=game_id, status=1).first():
            return True
        else:
            return False

    @classmethod
    def get_com_data(cls, game_id: int, rounds: int, company_id: str):
        if not cls.is_exist(game_id=game_id):
            print('不存在该局游戏')
            return
        if rounds > cls.query.filter_by(id=game_id, status=1).first().rounds:
            print('游戏回合超出')
            return
        # 允许输入a,b,c,d,A,B,C,D
        _company = company_id.upper()
        game_name = cls.query.filter_by(id=game_id, status=1).first().name
        path = os.getcwd() + '/app/data/game_' + game_name + '/round' + str(
            rounds) + '/InputTable' + _company + '.csv'
        # print(path)
        try:
            df = pd.read_csv(path)
            return df
        except Exception as e:
            print(e)

    @classmethod
    def get_com_info(cls, game_id: int, rounds: int):
        if not cls.is_exist(game_id=game_id):
            print('不存在该局游戏')
            return
        if rounds > cls.query.filter_by(id=game_id, status=1).first().rounds:
            print('游戏回合超出')
            return
        # 允许输入a,b,c,d,A,B,C,D
        game_name = cls.query.filter_by(id=game_id, status=1).first().name
        path = os.getcwd() + '/app/data/game_' + game_name + '/round' + str(
            rounds) + '/companyInfo.csv'
        print(path)
        try:
            df = pd.read_csv(path)
            return df
        except Exception as e:
            print(e)

    @classmethod
    def next_round(cls, game, df_list):
        files = [
            'companyInfo', 'InputTableA', 'InputTableB', 'InputTableC',
            'InputTableD'
        ]
        df = df_list
        path = os.getcwd(
        ) + '/app/data/game_' + game.name + '/' + 'round' + str(game.rounds)
        print(path)
        dict1 = {
            'name': '公司名称',
            'capital': '总资金',
            'hc_limit': '可分配人数',
            'hc_price': '人力成本',
            'channel_price': '渠道牌价格',
            'channel': '渠道牌剩余数量',
            'permission_price': '准入牌价格',
            'permission': '准入牌剩余数量',
            'info_price': '信息牌价格',
            'info': '信息牌剩余数量',
            'profit': '营收'
        }
        dict2 = {
            'name': '医院名称',
            'operation_count': '年手术台数',
            'hc_sensitivity': 'HC敏感度',
            'advertising_sensitivity': '推广敏感度',
            'price_sensitivity': '价格敏感度',
            'hc': '当前HC',
            'hc_low_limit': 'HC下限',
            'advertising': '推广费用',
            'a_price': '产品A价格',
            'a_mean': '产品A均价',
            'a_share': '产品A份额',
            'b_price': '产品B价格',
            'b_mean': '产品B均价',
            'b_share': '产品B份额',
            'c_price': '产品C价格',
            'c_mean': '产品C均价',
            'c_share': '产品C份额',
            'hc_strategy': 'HC决策',
            'advertising_strategy': '推广决策',
            'a_strategy': '产品A价格决策',
            'b_strategy': '产品B价格决策',
            'c_strategy': '产品C价格决策',
            'channel': '渠道牌',
            'permission': '准入牌',
            'info': '信息牌'
        }
        for i in range(len(files)):
            try:
                if not os.path.exists(path):
                    os.makedirs(path)
                if i == 0:
                    df[i].rename(columns=dict1, inplace=True)
                else:
                    df[i].rename(columns=dict2, inplace=True)
                # 生成下一轮的csv
                # TODO 传到后面去，拿到返回再写入
                # 目前直接返回把拿到的值
                df[i].to_csv(path + '/' + files[i] + '.csv', index=0)
            except Exception as e:
                print(e)
