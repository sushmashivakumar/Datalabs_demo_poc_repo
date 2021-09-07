from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
import psycopg2


app = Flask(__name__)

#-----postgresql connection-----------
pgconn = psycopg2.connect(host="localhost", port = 5433, database="grocery", user="postgres", password="vb2021")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
pgcursor = pgconn.cursor()
db = SQLAlchemy(app)

# @app.route("/")
# def index():
#     return "Choose api"
#----------api for filters using GET method------------
@app.route("/state", methods=['GET'])
def state():
    if request.method == 'GET':
        pgcursor.execute("select * from state")
        rows = pgcursor.fetchall()
        print(f"{rows}")
    return jsonify({'states' : rows })
    pgcursor.close()
    pgconn.close()

@app.route("/item_category", methods=['GET'])
def item_category():
    if request.method == 'GET':
        pgcursor.execute("select * from category")
        category = pgcursor.fetchall()
        print(f"{category}")
    return jsonify({'item_category' : category })
    pgcursor.close()
    pgconn.close()

@app.route("/store_outlet", methods=['GET'])
def store_outlet():
    if request.method == 'GET':
        pgcursor.execute("select * from store_outlet")
        store_outlet = pgcursor.fetchall()
        print(f"{store_outlet}")
    return jsonify({'store_outlet' : store_outlet })
    pgcursor.close()
    pgconn.close()

#---app to run----
if __name__ == '__main__':
    app.run(debug= True)

    