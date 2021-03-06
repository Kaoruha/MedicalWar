import os
import sys
import shutil
import pandas as pd
from datetime import datetime
from sqlalchemy import Column, String, Integer, SmallInteger
from ..models.base import Base, db
from .company import Company
from ..libs.wargame import result_calculate


class Game(Base):
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), unique=True, nullable=False)
    description = Column(String(255), default='-')
    rounds = Column(Integer)
    player_rounds = Column(Integer)
    update_time = Column(String(30))
    a_uuid = Column(String(255), default='-')
    b_uuid = Column(String(255), default='-')
    c_uuid = Column(String(255), default='-')
    d_uuid = Column(String(255), default='-')

    @classmethod
    def creat_game(cls, name, description):
        # 数据库添加
        with db.auto_commit():
            temp = Game()
            temp.name = name
            temp.description = description
            temp.rounds = 1
            temp.player_rounds = 0
            temp.update_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            db.session.add(temp)
        # 创建公司
        game = cls.query.filter_by(name=name, status=1).first()
        print(game.id)
        Company.creat_Company(str(game.id), 'a')
        Company.creat_Company(str(game.id), 'b')
        Company.creat_Company(str(game.id), 'c')
        Company.creat_Company(str(game.id), 'd')
        game.a_uuid = Company.get_com_uuid(game_id=game.id, company_id='a')
        game.b_uuid = Company.get_com_uuid(game_id=game.id, company_id='b')
        game.c_uuid = Company.get_com_uuid(game_id=game.id, company_id='c')
        game.d_uuid = Company.get_com_uuid(game_id=game.id, company_id='d')
        db.session.commit()

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
            try:
                source_path = os.getcwd() + '/app/data/mould_new/' + file
                df = pd.read_excel(source_path)
                df = df.fillna(0)
                df.to_csv(path + '/round1/' + file.split('.')[0] + '.csv',
                          index=0,
                          encoding="utf_8")
            except Exception as e:
                print(e)

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
            df = pd.read_csv(path).fillna(0)
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
        if rounds == 0:
            print('游戏还未开始')
            return
        # 允许输入a,b,c,d,A,B,C,D
        game_name = cls.query.filter_by(id=game_id, status=1).first().name
        path = os.getcwd() + '/app/data/game_' + game_name + '/round' + str(
            rounds) + '/companyInfo.csv'
        print(path)
        try:
            df = pd.read_csv(path).fillna(0)
            return df
        except Exception as e:
            print(e)

    @classmethod
    def next_round(cls, game, df_list):
        if (game.rounds - game.player_rounds) > 1:
            print('需要开始当前回合能允许下一回合')
            return  # 需要开始当前回合能允许下一回合

        game.rounds += 1

        files = [
            'companyInfo', 'InputTableA', 'InputTableB', 'InputTableC',
            'InputTableD'
        ]
        df = df_list
        path = os.getcwd(
        ) + '/app/data/game_' + game.name + '/round' + str(game.rounds)
        print(path)

        for i in range(len(files)):
            try:
                if not os.path.exists(path):
                    os.makedirs(path)
                if i == 0:
                    df[i].rename(columns=dict1, inplace=True)
                    # company_info = df[i]
                else:
                    df[i].rename(columns=dict2, inplace=True)
                    # company_list.append(df[i])
                # 生成下一轮的csv
                # TODO 传到后面去，拿到返回再写入
                # 目前直接返回把拿到的值
                # cls.test()
                df[i].to_csv(path + '/' + files[i] + '.csv',
                             index=0,
                             encoding="utf_8")
            except Exception as e:
                print(e)

        company_list = []
        for i in range(len(files)):

            if i == 0:
                print(path + '/' + files[i] + '.csv')
                company_info = pd.read_csv(path + '/' + files[i] + '.csv').fillna(0)
            else:
                print(path + '/' + files[i] + '.csv')
                company_list.append(pd.read_csv(path + '/' + files[i] +
                                                '.csv').fillna(0))
        
        c_list, c_info = result_calculate(company_list=company_list,
                                          company_info=company_info,
                                          game=game.rounds -1)

        for i in range(len(c_list)):
            c_list[i].to_csv(path + '/' + files[i + 1] + '.csv',
                             index=0,
                             encoding="utf_8")
            # c_list[i].to_csv(path + '/' + files[i + 1] + '_hah.csv')

        c_info.to_csv(path + '/' + 'companyInfo.csv',
                      index=0,
                      encoding="utf_8")
        
        db.session.commit()

    @classmethod
    def player_commit(cls, game_id: int, company_id: str, rounds: int, data):
        if not cls.is_exist(game_id=game_id):
            print('不存在该局游戏')
            return

        # 更新第回合数不能超过game的playerrounds
        game = cls.query.filter_by(id=game_id, status=1).first()
        if rounds > game.player_rounds:
            print('游戏回合超出')
            return

        path = os.getcwd(
        ) + '/app/data/game_' + game.name + '/' + 'round' + str(
            game.player_rounds) + '/' + 'InputTable' + company_id.upper(
            ) + '.csv'
        try:
            # df1 = pd.read_csv(path)

            df2 = pd.DataFrame(data)
            df2.rename(columns=dict2, inplace=True)
            df2.to_csv(path, index=0,
                             encoding="utf_8")
            print(path)
        except Exception as e:
            print(e)

    @classmethod
    def round_start(cls, game_id: int, df_list):
        if not cls.is_exist(game_id=game_id):
            print('不存在该局游戏')
            return
        game = cls.query.filter_by(id=game_id, status=1).first()

        files = [
            'companyInfo', 'InputTableA', 'InputTableB', 'InputTableC',
            'InputTableD'
        ]
        df = df_list

        path = os.getcwd(
        ) + '/app/data/game_' + game.name + '/' + 'round' + str(game.rounds)

        for i in range(len(files)):
            try:
                if not os.path.exists(path):
                    os.makedirs(path)
                if i == 0:
                    df[i].rename(columns=dict1, inplace=True)
                else:
                    df[i].rename(columns=dict2, inplace=True)

                df[i].to_csv(path + '/' + files[i] + '.csv',
                             index=0,
                             encoding='utf_8')
            except Exception as e:
                print(e)

        if game.player_rounds < game.rounds:
            game.player_rounds += 1
            db.session.commit()


dict1 = {
    'name': '公司名称',
    'capital': '总资金',
    # 'hc_limit': '可分配人数',
    # 可分配人数修改为起始人数,已分配人数、可新增人数
    'hc_init':'起始人数',
    'hc_assigned':'已分配人数',
    'hc_can_be_added':'可新增人数',
    'hc_price': '人力成本',
    'channel_price': '渠道牌价格',
    'channel': '渠道牌剩余数量',
    'permission_price': '准入牌价格',
    'permission': '准入牌剩余数量',
    'info_price': '信息牌价格',
    'info': '信息牌剩余数量',
    'profit': '营收',
    'last_profit': '上轮营收',
    "total_profit": '总营收',
    "profit_change": '营收增长净值',
    "profit_change_ratio": '营收增长比例',
    "vbp_price": 'VBP价格',
    "vbp_share": 'VBP份额',
    "a_cost": '产品A成本',
    "b_cost": '产品B成本',
    "c_cost": '产品C成本',
    "total_investment": '总资金投入',
    "total_cost": '总生产成本'
}
dict2 = {
    'uid':'ID',
    'name': '医院名称',
    'operation_count': '年手术台数',
    'hc_sensitivity': 'HC敏感度',
    'advertising_sensitivity': '推广敏感度',
    'price_sensitivity': '价格敏感度',
    'hc': '当前HC',
    'share': '份额',
    'hc_low_limit': 'HC下限',
    'advertising': '推广费用',
    'a_price': '产品A价格',
    'a_mean': '产品A均价',
    'a_share': '产品A份额',
    # 0922 新增a台数
    'a_count':'产品A台数',
    'b_price': '产品B价格',
    'b_mean': '产品B均价',
    'b_share': '产品B份额',
    # 0922 新增b台数
    'b_count':'产品B台数',
    'c_price': '产品C价格',
    'c_mean': '产品C均价',
    'c_share': '产品C份额',
    # 0922 新增c台数
    'c_count':'产品C台数',
    'hc_strategy': 'HC决策',
    'advertising_strategy': '推广决策',
    'a_strategy': '产品A价格决策',
    'b_strategy': '产品B价格决策',
    'c_strategy': '产品C价格决策',
    'channel': '渠道牌',
    'permission': '准入牌',
    'info': '信息牌',
    'share_visibility': '份额可见',
    'total_share': '总份额',
    'last_share': '上轮份额',
    'share_change': '份额增长净值',
    'share_change_ratio': '份额增长比例',
    'last_operation_count': '上轮台数',
    'current_operation_count': '本轮台数',
    'operation_count_change': '台数增长净值',
    'operation_count_change_ratio': '台数增长比例'
}
col_dict = {
    'name': '医院名称',
    'operation_count': '年手术台数',
    'hc_sensitivity': 'HC敏感度',
    'advertising_sensitivity': '推广敏感度',
    'price_sensitivity': '价格敏感度',
    'hc': '当前HC',
    'share': '份额',
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
