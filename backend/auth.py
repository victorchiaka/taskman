from flask import Blueprint, request, url_for, flash, redirect
import uuid, bcrypt
from .models import User
from .database import add_user

auth = Blueprint("auth", __name__)


@auth.route("/signup", methods=["POST"])
def signup():
    data = request.form
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or len(username) < 3:
        flash("Username must be at least 3 characters", "error")
    elif not email or len(email) < 9:
        flash("Email must be at least 9 characters", "error")
    elif not password or len(password) < 5:
        flash("Password must be at least 5 characters", "error")
    else:
        password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
        new_user = User(
            id=uuid.uuid4(), username=username, email=email, password_hash=password_hash
        )

        add_user(new_user)

        flash("Account successfully created", "success")
        return redirect(url_for("views.dashboard"))


@auth.route("/login", methods=["POST"])
def login():
    pass
