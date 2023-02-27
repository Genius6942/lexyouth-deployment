from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "test-key"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=720)

jwt = JWTManager(app)

# just for testing
username = 'username'
password = 'password'


@app.route("/")
def hello_world():
    return """<form action="/auth" method="POST">
        <input name="username" required/><input name="password" type="password" required/><input type="submit" value="submit"/>
    </form>"""


@app.route("/auth", methods=['POST'])
def login():
    print(request.method)
    if not request.json:
        return jsonify({"success": False, "msg": "invalid request"}), 200
    username = request.json.get('username')
    password = request.json.get('password')
    if 'username' != username or 'password' != password:
        return jsonify({"success": False, "msg": "incorrect username or password"}), 200
    else:
        access_token = create_access_token(identity='username')
        return jsonify({"success": True, "access_token": access_token}), 200


# @jwt_required() for when you need a authorization guarrentee

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(days=7))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response
