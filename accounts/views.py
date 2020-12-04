from flask.views import MethodView
from accounts.models import Todo, User
from flask import jsonify, request
from accounts.models import db, app
from sqlalchemy import desc
from flask import session
import bcrypt, jwt
import datetime
from sqlalchemy.sql import exists

class Users(MethodView):

	def get(self, todo_id=None):
		if todo_id is None:
			todos = Todo.query.order_by(Todo.created_at.desc()) 

			output = []
			for todo in todos:
				todo_list = {
					"id": todo.id,
					"uid": todo.uid,
					"text": todo.text,
					"complete": todo.complete,
					"user_id": todo.user_id,
				}

				output.append(todo_list)
			return jsonify(output)

		else:
			try:
				one_q = Todo.query.filter_by(id=todo_id).first()
				one = {
					"text": one_q.text,
					"complete": one_q.complete,
					"user_id": one_q.user_id,
				}
				return jsonify(one)

			except:
				return jsonify({'message': "No todo found!"})

	def post(self):
		todo = request.get_json()

		todos = Todo(
			text=todo['text'],
			uid=todo['uid'],
			complete=True,
			user_id=1712,
		)

		db.session.add(todos)
		db.session.commit()

		return jsonify({'message': "Todo created!"})

	def put(self, todo_id):
		todo = request.get_json()
		
		try:
			todos = Todo.query.filter_by(id=todo_id).first()

			todos.text = todo['text']
			todos.complete = True

			db.session.commit()

			return jsonify({'message': "Successfully updated!"})
		except:
			return jsonify({'message': "Todo not found!"})


	def delete(self, todo_id):

		try:
			todos = Todo.query.filter_by(uid=todo_id).first()

			db.session.delete(todos)
			db.session.commit()

		except:
			return jsonify({'message': "Error in deleting todo"})

		return jsonify({'message': "Deleting {} is successful".format(todos.text)})


class Authentication(MethodView):

	def get(self):
		login = request.get_json()

		username = login["name"]
		password = login["password"]

		try:
			user = User.query.filter_by(name=login["name"]).first()
		except:
			return jsonify({"message": "No username found!"})

		if (username and password):
			token = jwt.encode({
				'name': user.name,
				'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
			}, app.config["SECRET_KEY"])


			return jsonify({
				"message": "Successfully authenticate",
				"token": token.decode("UTF-8")
				})

		else:
			return jsonify({"message": "Please provide username or password"})

	def post(self):

		salt = bcrypt.gensalt()

		user = request.get_json()
		hashed = user['password']

		hashed = hashed.encode("UTF-8")

		create_user = User(
			public_id=user['public_id'],
			name=user['name'],
			password=bcrypt.hashpw(hashed, salt),
			admin=True,
		)

		db.session.add(create_user)
		db.session.commit()
		
		return jsonify({
			"messsage": "Successfully added User!",
		})
