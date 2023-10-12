from flask import Blueprint, request, render_template

auth = Blueprint("auth", __name__)


@auth.route("/signup", methods=["POST"])
def signin():
    pass


@auth.route("/login", methods=["POST"])
def login():
    pass
