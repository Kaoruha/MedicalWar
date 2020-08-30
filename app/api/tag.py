import os
from flask import request
from ..authorization.token_auth import login_required, get_account_by_token
from ..libs.yellowprint import YellowPrint
from ..config.setting import UPLOAD_PATH
from ..validators.forms import TagForm, FilterForm, TagImageForm
from ..models.tag import Tag
from ..libs.error_code import ParameterException
from ..libs.error import NoException
import uuid

yp_tag = YellowPrint('yp_tag', url_prefix='/tag')


@yp_tag.route('/register', methods=['POST'])
# @login_required
def tag_register():
    # data = request.json
    # account = data['account']
    # password = data['password']

    # 1、request.data 会自动传入ClientForm
    form = TagForm()
    # 2、对TagForm对实例进行校验
    if form.validate():
        # 3.1、查询标签名是否已经存在
        if Tag.query.filter_by(name=form.name.data).first():
            # 4、如果标签名存在返回报错601
            return ParameterException(error_code=601, msg='标签名已经存在')
        else:
            # 5、若标签名不存在，尝试注册标签
            try:
                author = get_account_by_token()
            except Exception:
                author = 'God'
            Tag.add_tag(name=form.name.data,
                        description=form.description.data,
                        author=author)
            return NoException(msg='注册成功')

    else:
        # 若form不满足校验规则，返回报错600，后续可以细化
        raise ParameterException()


@yp_tag.route('/filter', methods=['POST'])
# @login_required
def tag_get():
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

        result = Tag.query.filter(
            Tag.name.contains(account_filter)  # 根据account_filter筛选
        ).filter(
            Tag.status == 1  # 筛选没被软删除的标签
        ).order_by(
            Tag.id.desc() if descending else Tag.id  # 根据descending选择正序or倒序
        ).all()[start_row:start_row + count]  # 根据start_row和count选择切片
        print(result)
        data = []
        for item in result:
            t = {
                "id": item.id,
                "name": item.name,
                "description": item.description,
                "author": item.author,
                "icon_url": item.icon_url,
                "update": item.update_time
            }
            data.append(t)
        print(data)
        return NoException(data=data)
    else:
        raise ParameterException


@yp_tag.route('/delete', methods=['POST'])
# @login_required
def tag_delete():
    uid = request.get_json()['id']
    t = Tag.is_exist(uid=uid)
    if t:
        u = Tag.query.filter_by(id=uid).first()
        u.delete()
        return NoException(msg='删除成功')
    else:
        return ParameterException(msg="查无此人", error_code=602)


@yp_tag.route('/upload', methods=['POST'])
def tag_upload():
    # form = TagImageForm()
    # print(form)
    file = request.files.get('file')
    form = TagImageForm(data={'file': file})
    if form.validate():
        img = form.file.data
        file_name = uuid.uuid4().hex + '.' + img.filename.split('.')[-1]
        path = os.getcwd() + '\\app' + UPLOAD_PATH + '\\' + file_name
        img.save(path)

        t = Tag.is_exist(tag_id=1)
        if t:
            u = Tag.query.filter_by(id=1).first()
            u.update(icon_url=file_name)
            return NoException(msg="上传成功")
        else:
            return ParameterException(msg="查无此人", error_code=602)


    else:
        raise ParameterException()
