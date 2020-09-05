from flask import request
from ..authorization.token_auth import login_required
from ..libs.yellowprint import YellowPrint
from ..validators.forms import GameForm, FilterForm
from ..models.game import Game
from ..libs.error_code import ParameterException
from ..libs.error import NoException
from ..authorization.token_auth import creat_token, verify_token

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
                "description":item.description,
                "rounds":item.rounds,
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
    t = Game.is_exist(uid=uid)
    if t:
        u = Game.query.filter_by(id=uid).first()
        u.delete()
        return NoException(msg='删除成功')
    else:
        return ParameterException(msg="不存在该局", error_code=602)

@yp_game.route('/submit', methods=['POST'])
def strategy_submit():
    data = request.get_json()['data']
    game_id = request.get_json()['game_id']
    company_id = request.get_json()['company_id']
    print(game_id)
    print(company_id)
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

    Game.get_com_data(uid=game_id,rounds=rounds,company_id=company_id)

    return '解析传过来的数据'


# TODO 接受某局某回合所有公司的策略


# TODO 公司获取当前回合结果
# 1、没结果
# 2、有结果