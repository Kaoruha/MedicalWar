from contextlib import contextmanager
from flask_sqlalchemy import SQLAlchemy as _SQLAlchemy, BaseQuery
from sqlalchemy import Column, Integer, SmallInteger, String
from datetime import datetime


class SQLAlchemy(_SQLAlchemy):
    @contextmanager
    def auto_commit(self):
        try:
            yield
            self.session.commit()
        except Exception as e:
            self.session.rollback()
            raise e


db = SQLAlchemy()


class Base(db.Model):
    __abstract__ = True  # 变成抽象类，只声明不实现

    create_time = Column(String(30))
    status = Column(SmallInteger, default=1)  # 1 是True激活；  0 是False删除

    def __init__(self):
        self.create_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    def delete(self):
        with db.auto_commit():
            self.status = 0
