from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os
load_dotenv('./backend/.env')

app = Flask(__name__)
URL = os.environ['DB_URL']
app.config['SQLALCHEMY_DATABASE_URI'] =URL
db = SQLAlchemy(app)
CORS(app)
#required for database running
app.app_context().push()

class users(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(100),nullable=False)
    salary = db.Column(db.String(100),nullable=False)

    def __init__(self,name,salary):
        self.name = name
        self.salary = salary


def format_users(user):
    return {
        "name": user.name,
        "id": user.id,
        "salary": user.salary
    }


@app.route("/")
def home():
    return"<h2>hi, dunya </h2>"
        
@app.route("/users" , methods=["POST"])
def register_users():
    name = request.json['name']
    salary = request.json['salary']
    user = users(name,salary)
    db.session.add(user)
    db.session.commit()
    return format_users(user)

@app.route("/users",methods=["GET"])
def get_users():
    usrs = users.query.all()
    usrs_list = []
    for usr in usrs:
        usrs_list.append(format_users(usr))

    return {"Users": usrs_list}


@app.route("/users/<id>",methods=["GET"])
def get_user(id):
    usr = users.query.filter_by(id=id).first()
    formatted_usr= format_users(usr)
    return {"User": formatted_usr}


@app.route("/users/<id>",methods=["DELETE"])
def delete_user(id):
    usr = users.query.filter_by(id=id).first()
    db.session.delete(usr)
    db.session.commit()
    return f"user with id: ({id}) is deleted!"

@app.route("/users/<id>",methods=["PUT"])
def update_user(id):
    usr = users.query.filter_by(id=id)
    name = request.json['name']
    salary = request.json['salary']
    usr.update(dict(name=name,salary=salary))
    db.session.commit()
    return {'user':format_users(usr.first())}

@app.route("/users/login",methods=["POST"])
def login_user():
    id = request.json['id']
    name = request.json['name']
    user = users.query.filter_by(id=id).first()
    

    if user is None:
        return jsonify({"error":"Unauthorized User"}),401
    else:
        user_name = user.name
        if user_name != name:
            return jsonify({"error":"Invalid User name"}),401
        else:
            return {'user':format_users(user)}
    

if __name__=="__main__":
    db.create_all()
    app.run(debug=True)