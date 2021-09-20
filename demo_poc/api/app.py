from flask import Flask,request,jsonify,url_for
from flask_sqlalchemy import SQLAlchemy
import psycopg2



app = Flask(__name__)

#-----postgresql connection-----------
pgconn = psycopg2.connect(host="localhost", port = 3333, database="grocery", user="postgres", password="Tin@0212")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
pgcursor = pgconn.cursor()
db = SQLAlchemy(app)
@app.route("/")
def index():
    return "Welcome to Datalab"
# def index():
#     return "Choose api"
#----------api for filters using GET method------------
@app.route("/state", methods=['GET'])
def state():

    if request.method == 'GET':
        pgcursor.execute("select * from state")
        states = pgcursor.fetchall()
        state_list=[]
        for state in states:
            print(f"{state}")
            state_list.append({
                'state_id':str(state[0]),
                'state_name':state[1],
                # 'state_status':state[2]
            })
        print("list",state_list)
    return jsonify({"states":state_list})
    pgcursor.close()
    pgconn.close()


@app.route("/item_category", methods=['GET'])
def item_category():
    if request.method == 'GET':
        pgcursor.execute("select * from category")
        category = pgcursor.fetchall()
        category_list =[]
        for ctgry in category:
            print(f"{category}")
            category_list.append({
                'category_id':str(ctgry[0]),
                'category_name':ctgry[1],
                # 'category_status':ctgry[2]
            })
        print("list",category_list)
       
    return jsonify({'item_category' : category_list })
    pgcursor.close()
    pgconn.close()

# @app.route("/store_outlet", methods=['GET'])
# def store_outlet():
#     if request.method == 'GET':
#         pgcursor.execute("select * from store_outlet")
#         store_outlet = pgcursor.fetchall()
#         print(f"{store_outlet}")
#     return jsonify({'store_outlet' : store_outlet })
#     pgcursor.close()
#     pgconn.close()

@app.route("/item_list", methods=['GET'])
def item_list():
    if request.method == 'GET':
        pgcursor.execute("select * from itemlist")
        items = pgcursor.fetchall()
        item_list =[]
        for item in items:
           print(f"{items}")
           item_list.append({
                'item_id':str(item[0]),
                'item_name':item[1],
                'category_id':str(item[3])
                # 'item_status':item[2]
            })
        print("list",item_list)
        
    return jsonify({'item_list' : item_list})
    pgcursor.close()
    pgconn.close()

#-----POST the request to frontend-------------
@app.route("/submit_filter", methods = ['POST', 'GET'])
def submit_filters():
    # if request.method == 'POST':
    #     if request.is_json:
    #         state_name= request.json['state_name']
    #         category_name = request.json['category_name']
    #         item_name= request.json['item_name']
    #         create_row_data = {'state_name': str(state_name),'category_name':str(category_name),'item_name':str(  item_name)}
    #         response = request.post(
    #         url_for, data=create_row_data.json.dumps(create_row_data)
    #     )
    #     print(response)
    #     return response.content
    #     # db.session.add(submit_data)       
    # else:
    #     return {"error": "The request payload is not in JSON format"}
    data=request.get_json()
    state_name= data['state_name']
    category_name = data['category_name']
    item_name = data['item_name']
    state_id =data['state_id']
    return jsonify({'state_name' : state_name,'category_name': category_name, 'item_name': item_name, 'state_id':state_id})




#---app to run----


if __name__ == '__main__':
    app.run(debug= True)

    