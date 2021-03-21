from flask import Flask,jsonify,request
from directory import Directory
from provas import Provas
from items import Items
from flask_cors import CORS

util = {"directory":Directory, "provas":Provas, "items":Items}

app = Flask(__name__)
CORS(app)

@app.route('/api/get/<string:table>', methods=['GET'])
def get_all(table):
	create = util.get(table)
	if create:
		dados = create.select().dicts()
		return jsonify(list(dados))
	else:
		return {"error":"some error!"}

@app.route('/api/sel/<string:table>/<string:field>', methods=['POST'])
def get_select(table, field):
	create = util.get(table)
	body = request.get_json()
	print(body)
	if create:
		dados = create.select().where(getattr(create, field).in_(body)).dicts()
		return jsonify(list(dados))
	else:
		return {"error":"some error!"}

@app.route('/api/get/<string:table>/<string:field>/<int:id>',methods=['GET'])
def home(table,field,id):
	create = util.get(table)
	if create:
		dados = create.select().where(getattr(create,field) == id).dicts()
		return jsonify(list(dados))
	else:
		return {"error":"an error occured!"}

@app.route('/api/add/<string:table>', methods=['POST'])
def add(table):

	body = request.get_json()
	create = util.get(table)
	if create:
		return create.create(**body).__data__
	else:
		return {"error":"table not found!"}
@app.route('/api/del/<string:table>', methods=['POST'])
def delete(table):
	create = util.get(table)
	create.delete().where(getattr(create,'id') != 1).execute()
	return {"sucess":True}

app.run(host='0.0.0.0', debug=True)