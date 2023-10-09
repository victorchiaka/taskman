from flask import Flask
from .views import views

app = Flask(__name__)

def initapp():
    app.register_blueprint(views, url_prefix="/")
    
    return app