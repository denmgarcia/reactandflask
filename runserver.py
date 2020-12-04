import os
from settings import app
from accounts.views import Users, Authentication

app.add_url_rule("/api/v1/accounts", view_func=Users.as_view("users"))
app.add_url_rule("/api/v1/accounts/<todo_id>", view_func=Users.as_view("todo"))
app.add_url_rule("/api/v1/auth", view_func=Authentication.as_view("auth"))


if __name__ == "__main__":
	app.run(debug=True)