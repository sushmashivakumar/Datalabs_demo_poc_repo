from logging import debug
from flask import Flask

app = Flask(__name__)

@app.route("/")
@app.route("/api", methods=["GET"])
def index():
    return {
        'name': 'Hello Vaish'
    }

if __name__ == '__main__':
    app.run(debug= True)