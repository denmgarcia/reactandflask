import os
from settings import app
from accounts.views import Animal

app.add_url_rule("/accounts", view_func=Animal.as_view("animal"))
app.add_url_rule("/accounts/<todo_id>", view_func=Animal.as_view("todo"))




if __name__ == "__main__":
	app.run(debug=True)