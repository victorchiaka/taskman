from uuid import UUID


class User:
    def __init__(
        self, id: UUID, username: str, email: str, password_hash: bytes
    ) -> None:
        self.id: UUID = id
        self.username: str = username
        self.email: str = email
        self.password_hash: bytes = password_hash

    def __str__(self) -> str:
        return f"User(id={self.id}, username={self.username}, email={self.email}, password_hash={self.password_hash})"
