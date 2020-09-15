from flask import request
from ..authorization.token_auth import login_required
from ..libs.yellowprint import YellowPrint
from ..validators.forms import ClientForm, FilterForm
from ..models.user import User
from ..libs.error_code import ParameterException
from ..libs.error import NoException
from ..authorization.token_auth import creat_token, verify_token

yp_test = YellowPrint('yp_test', url_prefix='/test')


@yp_test.route('/test', methods=['GET'])
# @login_required
def test():
    t = request.args['co_num']
    print(t)
    return NoException(msg='NoProblem')