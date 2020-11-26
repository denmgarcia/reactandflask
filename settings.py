from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config['SECRET_KEY'] = "gebbirish/123"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:denmark@localhost/flaskmethod"