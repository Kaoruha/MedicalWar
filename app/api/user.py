from flask import request
from ..authorization.token_auth import login_required
from ..libs.yellowprint import YellowPrint
from ..validators.forms import ClientForm, FilterForm
from ..models.user import User
from ..libs.error_code import ParameterException
from ..libs.error import NoException
from ..authorization.token_auth import creat_token, verify_token

yp_user = YellowPrint('yp_user', url_prefix='/user')


@yp_user.route('/register', methods=['POST'])
# @login_required
def user_register():
    # data = request.json
    # account = data['account']
    # password = data['password']

    # 1、request.data 会自动传入ClientForm
    form = ClientForm()
    # 2、对ClientForm对实例进行校验
    if form.validate():
        # 3.1、查询用户名是否已经存在
        if User.query.filter_by(account=form.account.data).first():
            # 4、如果用户名存在返回报错601
            return ParameterException(error_code=601, msg='用户名已经存在')
        else:
            # 5、若用户名不存在，尝试注册用户
            User.add_user(account=form.account.data,
                          password=form.password.data)
            return NoException(msg='注册成功')

    else:
        # 若form不满足校验规则，返回报错600，后续可以细化
        raise ParameterException()


@yp_user.route('/login', methods=['POST'])
def user_login():
    # data = request.get_json
    # account = data['account']
    # password = data['password']

    # 1、request.get_json 会自动传入ClientForm
    print(request.get_json())
    form = ClientForm()

    print(form.account)
    print(form.password)
    # 2、对ClientForm对实例进行校验
    if form.validate():
        account = form.account.data
        password = form.password.data
        try:
            user = User.is_password_right(account=account, password=password)
            if user:
                token = creat_token(user.id)
                return NoException(data=token)
            else:
                raise ParameterException(msg="查无此人", error_code=602)
        except Exception:
            raise ParameterException(msg="登录失败", error_code=602)

    else:
        # 若form不满足校验规则，返回报错600，后续可以细化
        raise ParameterException()


@yp_user.route('/filter', methods=['POST'])
# @login_required
def user_get():
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

        result = User.query.filter(
            User.account.contains(account_filter)  # 根据account_filter筛选
        ).filter(
            User.status == 1  # 筛选没被软删除的用户
        ).order_by(
            User.id.desc() if descending else User.id  # 根据descending选择正序or倒序
        ).all()[start_row:start_row + count]  # 根据start_row和count选择切片
        print(result)
        data = []
        for item in result:
            t = {
                "account": item.account,
                "id": item.id,
                "update": item.update_time
            }
            data.append(t)
        print(data)
        return NoException(data=data)
    else:
        raise ParameterException


@yp_user.route('/delete', methods=['POST'])
@login_required
def user_delete():
    uid = request.json['uid']
    t = User.is_exist(uid=uid)
    if t:
        u = User.query.filter_by(id=uid).first()
        u.delete()
        return NoException(msg='删除成功')
    else:
        return ParameterException(msg="查无此人", error_code=602)


