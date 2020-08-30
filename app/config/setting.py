# 开发/生产环境下相同的配置
DEBUG = True
REMEMBER_COOKIE_DURATION = 14  # flask_login的Cookie过期时间（天）
TOKEN_EXPIRATION = 1 * 1 * 3600  # Token的过期时间（天*小时*秒(3600)）
UPLOAD_PATH = '\\upload'
