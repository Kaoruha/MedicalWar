from flask import request
from ..authorization.token_auth import login_required
from ..libs.yellowprint import YellowPrint
from ..validators.forms import HospitalForm, FilterForm
from ..models.hospital import Hospital
from ..libs.error_code import ParameterException
from ..libs.error import NoException
from ..authorization.token_auth import creat_token, verify_token

yp_hospital = YellowPrint('yp_hospital', url_prefix='/hospital')


@yp_hospital.route('/register', methods=['POST'])
# @login_required
def hospital_register():
    # data = request.json
    # account = data['account']
    # password = data['password']

    # 1、request.data 会自动传入ClientForm
    form = HospitalForm()
    # 2、对ClientForm对实例进行校验
    if form.validate():
        # 3.1、查询用户名是否已经存在
        if Hospital.query.filter_by(name=form.name.data).first():
            # 4、如果用户名存在返回报错601
            return ParameterException(error_code=601, msg='用户名已经存在')
        else:
            # 5、若用户名不存在，尝试注册用户
            Hospital.creat_Hospital(name=form.name.data,
                          description=form.description.data,
                          scale=form.scale.data,
                          type_=form.type_.data)
            return NoException(msg='医院创建成功')

    else:
        # 若form不满足校验规则，返回报错600，后续可以细化
        raise ParameterException()



@yp_hospital.route('/filter', methods=['POST'])
# @login_required
def hospital_get():
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

        result = Hospital.query.filter(
            Hospital.name.contains(account_filter)  # 根据account_filter筛选
        ).filter(
            Hospital.status == 1  # 筛选没被软删除的用户
        ).order_by(
            Hospital.id.desc() if descending else Hospital.id  # 根据descending选择正序or倒序
        ).all()[start_row:start_row + count]  # 根据start_row和count选择切片
        print(result)
        data = []
        for item in result:
            t = {
                "name": item.name,
                "id": item.id,
                "description":item.description,
                "scale":item.scale,
                "type": item.type_
            }
            data.append(t)
        print(data)
        return NoException(data=data)
    else:
        raise ParameterException


@yp_hospital.route('/delete', methods=['POST'])
@login_required
def hospital_delete():
    uid = request.get_json()['uid']
    t = Hospital.is_exist(uid=uid)
    if t:
        u = Hospital.query.filter_by(id=uid).first()
        u.delete()
        return NoException(msg='删除成功')
    else:
        return ParameterException(msg="不存在该医院", error_code=602)