from flask import Blueprint, request, url_for, flash, redirect
from flask_login import login_user, current_user
import uuid, bcrypt
from .models import User
from .database import add_user, get_user_by_email
from .utils import is_email_taken

auth = Blueprint("auth", __name__)


@auth.route("/signup", methods=["POST"])
def signup():
    if request.method == "POST":
        data = request.form
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if len(username) < 3:
            flash("Username must be at least 3 characters", "error")
        elif len(email) < 9:
            flash("Email must be at least 9 characters", "error")
        elif is_email_taken(email):
            flash("email not available", "error")
        elif len(password) < 5:
            flash("Password must be at least 5 characters", "error")
        else:
            password_hash = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
            new_user = User(
                id=uuid.uuid4(),
                username=username,
                email=email,
                password_hash=str(password_hash),
            )

            add_user(new_user)

            flash("Account successfully created", "success")
            login_user(new_user, remember=True)
            return redirect(url_for("views.dashboard"))

        return redirect(url_for("views.index"))


@auth.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        email: str = request.form.get("email")
        password: str = request.form.get("password")

        user = get_user_by_email(email)

        if not user:
            flash("user with this email does not exist", "error")
        elif not user.is_valid_password(password):
            flash("invalid password", "warning")
        else:
            login_user(user, remember=True)
            flash("login successful", "success")
            return redirect(url_for("views.dashboard", user=current_user))

    return redirect(url_for("views.index"))
