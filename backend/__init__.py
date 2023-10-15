from flask import Flask
from .views import views
from .auth import auth
import random, string, os
from dotenv import load_dotenv
from .database import establish_sql_connection, get_user_by_id
from flask_login import LoginManager
from .models import User
import uuid

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

establish_sql_connection()

app = Flask(__name__)

login_manager = LoginManager()
login_manager.login_view = "auth.login"
login_manager.init_app(app)


@login_manager.user_loader
def load_user(id: uuid) -> User:
    user = get_user_by_id(id)
    return user


def generate_secret(length: int):
    return "".join(random.choice(string.ascii_letters) for i in range(length))


def initapp():
    if not SECRET_KEY:
        app.config["SECRET_KEY"] = generate_secret(random.choice(25, 45))
    else:
        app.config["SECRET_KEY"] = SECRET_KEY

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/")

    return app
