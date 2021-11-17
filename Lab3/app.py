from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
import json


app = Flask(__name__)
CORS(app, support_credentials=True)
DATABSE_URI='mysql+pymysql://alexf:Alex123456788!@localhost/lab_6_db'

# app.config['SQLALCHEMY_DATABASE_URI'] = DATABSE_URI
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Good(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)
    price = db.Column(db.Float)
    weight = db.Column(db.Float)
    producer = db.Column(db.String)
    country = db.Column(db.String)


    def __init__(self, name, price, weight, producer, country):
        self.name = name
        self.price = price
        self.weight = weight
        self.producer = producer
        self.country = country

    def __repr__(self):
        return '<Good %r>' % self.name

class GoodSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('name', 'price',  'weight', 'producer', 'country')


good_schema = GoodSchema()
goods_schema = GoodSchema(many=True)
db.create_all()

# endpoint to create new good

@app.route("/good", methods=["POST"])
@cross_origin(supports_credentials=True)
def add_good():
    data = GoodSchema().load(request.json)
    new_good = Good(**data)

    db.session.add(new_good)
    db.session.commit()
    return "Added : " + new_good.name

# endpoint to show all goods
@app.route("/all_goods", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_goods():
    goods = Good.query.all()
    output = goods_schema.dump(goods)
    return jsonify({'goods': output})

# endpoint to update good
@app.route("/good/<id>", methods=["PUT"])
@cross_origin(supports_credentials=True)
def good_update(id):
    good = Good.query.get(id)
    if good is None:
        abort(404)
    else:
        data = good_schema.load(request.json)
        for i in data:
            setattr(good, i, request.json[i])
        db.session.commit()
        return good_schema.jsonify(good)

# endpoint to delete good
@app.route("/good/<id>", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def good_delete(id):
    good = Good.query.get(id)
    if good is None:
        abort(404)
    else:
        db.session.delete(good)
        db.session.commit()
        return "Deleted: " + good.name



if __name__ == '__main__':
    app.run(debug=True)
