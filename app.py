from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
import json


app = Flask(__name__)
CORS(app, support_credentials=True)
DATABSE_URI='mysql+pymysql://root:asdQWE_123@localhost/web_db'

app.config['SQLALCHEMY_DATABASE_URI'] = DATABSE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Lamp(db.Model):
    id = db.Column(db.Integer, primary_key=True, auto_increment = True)
    type = db.Column(db.String)
    power = db.Column(db.Integer)
    diodes = db.Column(db.Integer)
    producer = db.Column(db.String)


    def __init__(self, type, power, diodes, producer):
        self.type = type
        self.power = power
        self.diodes = diodes
        self.producer = producer

    # def __repr__(self):
    #     return '<Lamp %r>' % self.type

class LampSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('type', 'power',  'diodes', 'producer')


Lamp_schema = LampSchema()
Lamps_schema = LampSchema(many=True)
db.create_all()

# endpoint to create new Lamp

@app.route("/lamp", methods=["POST"])
@cross_origin(supports_credentials=True)
def add_Lamp():
    data = LampSchema().load(request.json)
    new_Lamp = Lamp(**data)

    db.session.add(new_Lamp)
    db.session.commit()
    return "Added : " + new_Lamp.type

# endpoint to show all Lamps
@app.route("/lamp", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_Lamps():
    Lamps = Lamp.query.all()
    output = Lamps_schema.dump(Lamps)
    return jsonify({'Lamps': output})

# endpoint to update Lamp
@app.route("/lamp/<id>", methods=["PUT"])
@cross_origin(supports_credentials=True)
def Lamp_update(id):
    Lamp = Lamp.query.get(id)
    if Lamp is None:
        abort(404)
    else:
        data = Lamp_schema.load(request.json)
        for i in data:
            setattr(Lamp, i, request.json[i])
        db.session.commit()
        return Lamp_schema.jsonify(Lamp)

# endpoint to delete Lamp
@app.route("/lamp/<id>", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def Lamp_delete(id):
    Lamp = Lamp.query.get(id)
    if Lamp is None:
        abort(404)
    else:
        db.session.delete(Lamp)
        db.session.commit()
        return "Deleted: " + Lamp.type



if __name__ == '__main__':
    app.run(debug=True)
