import uuid, bcrypt
from flask_login import UserMixin


class User(UserMixin):
    def __init__(self, id: uuid, username: str, email: str, password_hash: str) -> None:
        self.id: uuid = id
        self.username: str = username
        self.email: str = email
        self.password_hash: str = password_hash

    def __str__(self) -> str:
        return f"User({self.id}, {self.username}, {self.email}, {self.password_hash})"

    def is_valid_password(self, password: str) -> bool:
        return bcrypt.checkpw(
            password.encode("utf-8"), self.password_hash.encode("utf-8")
        )
