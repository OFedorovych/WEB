from flask import Flask, request, jsonify, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_cors import CORS, cross_origin
# import app_init

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:asdQWE_123@localhost/iot_test_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class ItemOrdered(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True, nullable=False)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    weight_kg = db.Column(db.Float, nullable=False)
    item_count = db.Column(db.Integer, nullable=False)
    item_type = db.Column(db.String(50), nullable=False)

    def __init__(self,
                    name,
                    price,
                    weight_kg,
                    item_count,
                    item_type,
                    ):

        self.name = name
        self.price = price
        self.weight_kg = weight_kg
        self.item_count = item_count
        self.item_type = item_type

class ItemOrderedSchema(ma.Schema):
    class Meta:
        fields = (
        'id',
        'name',
        'price',
        'weight_kg',
        'item_count',
        'item_type'
        )

item_ordered_schema = ItemOrderedSchema()
items_ordered_schema = ItemOrderedSchema(many=True)
        

@app.route('/item_ordered', methods=['POST'])
@cross_origin(allow_headers=['Content-Type'])
def add_item_ordered():
    name = request.json['name']
    price = request.json['price']
    weight_kg = request.json['weight_kg']
    item_count = request.json['item_count']
    item_type = request.json['item_type']

    new_item = ItemOrdered(name,
                            price,
                            weight_kg,
                            item_count,
                            item_type)

    db.session.add(new_item)
    db.session.commit()

    return item_ordered_schema.jsonify(new_item)


@app.route('/item_ordered', methods=['GET'])
@cross_origin(origin='*')
def get_items_ordered():
    all_items = ItemOrdered.query.all()

    def contains(x, search_string):
        return x.upper().replace(" ", "") \
            .find(search_string.upper().replace(" ", "")) != -1

    try:
        search = request.args.get('search')
        if search:
            all_items = list(filter(lambda item: contains(item.name, search), all_items))
        else:
            pass
    except Exception as e:
	    print(e)

    reverse_condition=False


    try:
        order = request.args.get('order')
        if order:
            reverse_condition = True if order == 'desc' else False
    except Exception as e:
	    print(e)


    try:
        parameter = request.args.get('parameter')
        if parameter:
            selected_coef, selected_parameter = parameter.split('-')

            sort_parameters = {
                'name': lambda item: item.name,
                'price': lambda item: item.price,
                'weight': lambda item: item.weight_kg
            }

            def sort_coef(item):
                if selected_coef == 'single':
                    return 1
                else:
                    return item.item_count

            if selected_parameter == 'name':
                all_items.sort(key=lambda item: item.name, reverse=reverse_condition)
            else:            
                all_items.sort(key=lambda item: sort_parameters[selected_parameter](item) \
                    * sort_coef(item), reverse=reverse_condition)
        else:
            all_items.sort(key=lambda item: item.name, reverse=reverse_condition)
    except Exception as e:
	    print(e)

    return items_ordered_schema.jsonify(all_items)


@app.route('/item_ordered/<id>', methods=['GET'])
def item_ordered_info(id):
    item = ItemOrdered.query.get(id)

    if not item:
        abort(404)
    return item_ordered_schema.jsonify(item)


@app.route('/item_ordered/<id>', methods=['PUT'])
def update_item_ordered(id):
    item = ItemOrdered.query.get(id)

    if not item:
        abort(404)
    name = request.json['name']
    price = request.json['price']
    weight_kg = request.json['weight_kg']
    item_count = request.json['item_count']
    item_type = request.json['item_type']
        
    item.name = name
    item.price = price
    item.weight_kg = weight_kg
    item.item_count = item_count
    item.item_type = item_type
        
    db.session.commit()
    return item_ordered_schema.jsonify(item)


@app.route('/item_ordered/<id>', methods=['DELETE'])
def delete_item_ordered(id):
    item = ItemOrdered.query.get(id)

    if not item:
        abort(404)
    db.session.delete(item)
    db.session.commit()
    return item_ordered_schema.jsonify(item)


if __name__ == '__main__':
    app.run(debug=True)