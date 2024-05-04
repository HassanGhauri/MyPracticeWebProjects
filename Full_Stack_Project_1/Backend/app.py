from flask import Flask,request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
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

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Event: {self.description}"
    
    def __init__(self,description):
        self.description = description


def format_event(event):
    return {
        "description": event.description,
        "id": event.id,
        "created_at": event.created_at
    }


@app.route("/")
def home():
    return"<h1>hi dunya</h1>"


@app.route("/events", methods=["POST"])
def create_event():
    description = request.json['description']
    event = Event(description)
    db.session.add(event)
    db.session.commit()
    return format_event(event)

@app.route("/events", methods=["GET"])
def get_events():
    events = Event.query.order_by(Event.id.asc()).all()
    event_list = []

    for event in events:
        event_list.append(format_event( event))

    return {"events":event_list}

@app.route("/events/<id>", methods=["GET"])
def get_event(id):
    event =Event.query.filter_by(id=id).one()
    formatted_event = format_event(event)
    return {"event":formatted_event}

@app.route("/events/<id>", methods=["DELETE"])
def delete_event(id):
    event = Event.query.filter_by(id=id).one()
    db.session.delete(event)
    db.session.commit()
    return f"event (id: {id}) deleted!"

@app.route("/events/<id>", methods=["PUT"])
def update_event(id):
    event = Event.query.filter_by(id=id)
    description = request.json['description']
    event.update(dict(description=description,created_at=datetime.utcnow()))
    db.session.commit()
    return {'event':format_event(event.one())}







if __name__=="__main__":
    db.create_all()
    app.run(debug=True)