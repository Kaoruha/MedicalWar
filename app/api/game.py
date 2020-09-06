from flask import request, jsonify
from ..authorization.token_auth import login_required
from ..libs.yellowprint import YellowPrint
from ..validators.forms import GameForm, FilterForm
from ..models.game import Game
from ..libs.error_code import ParameterException
from ..libs.error import NoException
from ..authorization.token_auth import creat_token, verify_token
from ..models.base import db
import pandas as pd
yp_game = YellowPrint('yp_game', url_prefix='/game')


@yp_game.route('/register', methods=['POST'])
# @login_required
def game_register():
    # data = request.json
    # account = data['account']
    # password = data['password']

    # 1、request.data 会自动传入ClientForm
    form = GameForm()
    # 2、对ClientForm对实例进行校验
    if form.validate():
        # 3.1、查询用户名是否已经存在
        if Game.query.filter_by(name=form.name.data).first():
            # 4、如果用户名存在返回报错601
            return ParameterException(error_code=601, msg='用户名已经存在')
        else:
            # 5、若用户名不存在，尝试注册用户
            Game.creat_game(name=form.name.data,
                            description=form.description.data)
            return NoException(msg='游戏创建成功')

    else:
        # 若form不满足校验规则，返回报错600，后续可以细化
        raise ParameterException()


@yp_game.route('/filter', methods=['POST'])
# @login_required
def game_get():
    # data = request.get_json()
    # page = data['page']
    # rows_per_page = data['rowsPerPage']
    # sort_by = data['sortBy']
    # descending = data['descending']
    # page, rowsPerPage, sortBy, descending
    form = FilterForm()
    if form.validate_for_api():
        start_row = form.start_row.data
        count = form.count.data
        account_filter = form.account_filter.data
        sort_by = form.sort_by.data
        descending = form.descending.data

        result = Game.query.filter(
            Game.name.contains(account_filter)  # 根据account_filter筛选
        ).filter(
            Game.status == 1  # 筛选没被软删除的用户
        ).order_by(
            Game.id.desc() if descending else Game.id  # 根据descending选择正序or倒序
        ).all()[start_row:start_row + count]  # 根据start_row和count选择切片

        data = []
        for item in result:
            t = {
                "name": item.name,
                "id": item.id,
                "description": item.description,
                "rounds": item.rounds,
                "update": item.update_time
            }
            data.append(t)

        return NoException(data=data)
    else:
        raise ParameterException


@yp_game.route('/delete', methods=['POST'])
@login_required
def game_delete():
    uid = request.get_json()['uid']
    t = Game.is_exist(game_id=uid)
    if t:
        u = Game.query.filter_by(id=uid).first()
        u.delete()
        return NoException(msg='删除成功')
    else:
        return ParameterException(msg="不存在该局", error_code=602)


# 提交
@yp_game.route('/submit', methods=['POST'])
def strategy_submit():
    data = request.get_json()['data']
    game_id = request.get_json()['game_id']
    company_id = request.get_json()['company_id']
    # print(game_id)
    # print(company_id)
    print('开始试图解析数据')
    # TODO 本地化存储成csv
    try:
        for row in data:
            print(row)
    except Exception as e:
        print(e)
    return '解析传过来的数据'


# 获取某局某个回合某个公司的策略
@yp_game.route('/get_com_data', methods=['POST'])
def get_com_data():
    game_id = request.get_json()['game_id']
    rounds = request.get_json()['rounds']
    company_id = request.get_json()['company_id']

    df = Game.get_com_data(game_id=game_id,
                           rounds=rounds,
                           company_id=company_id)
    data = []
    for index, row in df.iterrows():
        t = {
            "name": row['医院名称'],
            "operation_count": row['年手术台数'],
            "hc_sensitivity": row['HC敏感度'],
            "advertising_sensitivity": row['推广敏感度'],
            "price_sensitivity": row['价格敏感度'],
            "hc": row['当前HC'],
            "hc_low_limit": row['HC下限'],
            "advertising": row['推广费用'],
            "a_price": row['产品A价格'],
            "a_mean": row['产品A均价'],
            "a_share": row['产品A份额'],
            "b_price": row['产品B价格'],
            "b_mean": row['产品B均价'],
            "b_share": row['产品B份额'],
            "c_price": row['产品C价格'],
            "c_mean": row['产品C均价'],
            "c_share": row['产品C份额'],
            "hc_strategy": row['HC决策'],
            "advertising_strategy": row['推广决策'],
            "a_strategy": row['产品A价格决策'],
            "b_strategy": row['产品B价格决策'],
            "c_strategy": row['产品C价格决策'],
            "channel": row['渠道牌'],
            "permission": row['准入牌'],
            "info": row['信息牌']
        }
        data.append(t)

    return NoException(data=data,
                       msg=f'成功获取第{game_id}局游戏，第{rounds}轮，{company_id}公司数据')


# 获取某局某个回合公司信息
@yp_game.route('/get_com_info', methods=['POST'])
def get_com_info():
    game_id = request.get_json()['game_id']
    rounds = request.get_json()['rounds']

    df = Game.get_com_info(game_id=game_id, rounds=rounds)
    data = []
    for index, row in df.iterrows():
        t = {
            "name": row['公司名称'],
            "capital": row['总资金'],
            "hc_limit": row['可分配人数'],
            "hc_price": row['人力成本'],
            "channel_price": row['渠道牌价格'],
            "channel": row['渠道牌剩余数量'],
            "permission_price": row['准入牌价格'],
            "permission": row['准入牌剩余数量'],
            "info_price": row['信息牌价格'],
            "info": row['信息牌剩余数量'],
            "profit": row['营收']
        }
        data.append(t)

    return NoException(data=data, msg=f'成功获取第{game_id}局游戏，第{rounds}轮公司信息')


# 获取某局的信息
@yp_game.route('/get_game_info', methods=['POST'])
def get_game_info():
    game_id = request.get_json()['game_id']
    if not Game.is_exist(game_id):
        return '不存在'  # TODO回头用Exception抱一下
    else:
        game = Game.query.filter_by(id=game_id).first()
        data = {
            "name": game.name,
            "rounds": game.rounds,
            "player_rounds": game.player_rounds
        }
        return NoException(data=data)


# 下一回合
@yp_game.route('/next', methods=['POST'])
def next_round():
    game_id = request.get_json()['game_id']
    data = request.get_json()['data']
    if not Game.is_exist(game_id):
        return '不存在'  # TODO回头用Exception抱一下
    else:
        game = Game.query.filter_by(id=game_id).first()
        game.rounds+=1
        db.session.commit()
        df_list = []
        for d in data:
            df_list.append(pd.DataFrame(d))
        Game.next_round(game, df_list=df_list)
        return NoException(msg='提交成功')
    return NoException()