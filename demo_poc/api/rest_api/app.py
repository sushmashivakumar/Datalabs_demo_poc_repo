from flask import Flask,request,jsonify,url_for
from flask.helpers import make_response
from werkzeug.wrappers import response
from flask_sqlalchemy import SQLAlchemy
import psycopg2
# import pytest


app = Flask(__name__)

#-----postgresql connection-----------
pgconn = psycopg2.connect(host="localhost", port = 5433, database="grocery", user="postgres", password="vb2021")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
pgcursor = pgconn.cursor()
db = SQLAlchemy(app)

@app.route("/")
# @pytest.fixture
def index():

    # return {"url":"Welcome to Datalab","status_code":200}
    response=jsonify('Welcome to Datalab')
    response.status_code = 200
    return response

# def index():
#     return "Choose api"
#----------api for filters using GET method------------
@app.route("/api/state", methods=['GET'])
# @pytest.fixture
def state():

    if request.method == 'GET':
        pgcursor.execute("select * from state")
        states = pgcursor.fetchall()
        if(states !=[]):

            state_list=[]
            for state in states:
                print(f"{state}")
                state_list.append({
                    'state_id':str(state[0]),
                    'state_name':state[1],
                    # 'state_status':state[2]
                })
            print("list",state_list)
            response= jsonify({"states":state_list})
            response.status_code = 200
            return response
        else:
          response= jsonify({'Message':"There is no data available"})
          return response 
        pgcursor.close()
        pgconn.close()
    else:
        response=jsonify({'Error':"Failed to retrieve data"})
        response.status_code=406
        return response


@app.route("/api/item_category", methods=['GET'])
def item_category():
    if request.method == 'GET':
        pgcursor.execute("select * from category")
        category = pgcursor.fetchall()
        print(category,"category list")
        if(category !=[]):
            category_list =[]
            for ctgry in category:
                # print(f"{category}")
                category_list.append({
                    'category_id':str(ctgry[0]),
                    'category_name':ctgry[1],
                    # 'category_status':ctgry[2]
                })
            print("list",category_list)
            response= jsonify({"category_list":category_list})
            response.status_code = 200
            return response
        else:
            response=jsonify({'Message':"There is no item available in selected category"})
            return response

            pgcursor.close()
            pgconn.close()
    else:
        response=jsonify({'Error':"Failed to retrieve data"})
        response.status_code=406
        return response
# @app.route("/store_outlet", methods=['GET'])
# def store_outlet():
#     if request.method == 'GET':
#         pgcursor.execute("select * from store_outlet")
#         store_outlet = pgcursor.fetchall()
#         print(f"{store_outlet}")
#     return jsonify({'store_outlet' : store_outlet })
#     pgcursor.close()
#     pgconn.close()

@app.route("/api/item_list", methods=['GET'])
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
        response= jsonify({'item_list' : item_list})
        response.status_code = 200
        return response
    # return jsonify({'item_list' : item_list})
        pgcursor.close()
        pgconn.close()
    else:
        response=jsonify({'Error':"Failed to retrieve data"})
        response.status_code=406
        return response

#-----POST the request to frontend-------------
@app.route("/api/city_filter", methods = ['GET','POST'])
def city_filter():
    # print("Inside")
    # data=request.get_json()
    # print(data)
    # return data
    # if request.method == 'GET':
    #     return "Method is GET"
    city_list =[]
    if request.method == 'POST':
        print("Method is post")
    #     if request.is_json:
            # state_id= request.get_data['state_id']
            # category_id = request.get_data['category_id']
            # item_id= request.get_data['item_id']
            # create_row_data = {'state_id': str(state_id),'category_id':str(category_id),'item_id':str(  item_id)}
            # response = request.post(
            # url_for, data=create_row_data.json.dumps(create_row_data)
        # )
        # print(response,"Response Data")
        # print(state_id,category_id,item_id)
        # return request.get_data
        # return response.content
        # db.session.add(submit_data)       
    # else:
    #     return {"error": "The request payload is not in JSON format"}
    
        data=request.get_json()
        # state_name= data['state_name']
        category_id = data['category_id']
        item_id = data['item_id']
        state_id =data['state_id']
        print(category_id,item_id,state_id,"Raw data")
    # pgcursor.execute("select * from public.submit_filter where item_id")
    # db_session=any
    # qry = db_session.query(submit_filter).filter(
    #             item_id.item_id==item_id)
    # item_id = qry.first()
    # print(item_id)
        
        # pgcursor.execute("SELECT city_id,city_name,brand_name,brand_id,item_price FROM submit_filter WHERE state_id = %s and category_id=%s and item_id=%s",(state_id,category_id,item_id))
        pgcursor.execute("SELECT state_id,city_id,city_name FROM export_data WHERE state_id = %s and item_id = %s",(state_id,item_id))
        print(state_id,item_id,"state's raw data")
        value = pgcursor.fetchall()
        print(value,"Values-----------------------------------------------")
        if(value !=[]):
            for cities in value :
                print(f"{value }")
                city_list.append({
                'state_id':str(cities[0]),
                'city_id':str(cities[1]),
                'city_name':str(cities[2]),
                 
                # 'brand_name':str(cities[2]),
                # 'brand_id':str(cities[3]),
                # 'item_price':str(cities[4])
                    # 'city_id':str(cities[0]),
                    # 'brand_id':str(cities[0]),
                   
                    # 'item_status':item[2]
                })
                # print("city and brand",city_list)
                response =jsonify({'city_list':city_list})   
                response.status_code = 200
                # return jsonify({'city_list' : city_list})
                return response
        else:
            response=jsonify({'Message':"There is no city available in selected item"})
            return response
            response.status_code = 204
           
            pgcursor.close()
            pgconn.close()
    # return jsonify({'category_id': category_id, 'item_id':item_id, 'state_id':state_id})
    else:
        response=jsonify({'Error':"Failed to retrieve data"})
        response.status_code=406
        return response

#-----POST the request to frontend-------------
@app.route("/api/brand_filter", methods = ['GET','POST'])
def brand_filter():
    brand =[]
    if request.method == 'POST':
        print("Method is post")
        data=request.get_json()
        city_id =data['city_id']
        item_id =data['item_id']
        store_outlet_id=data['store_outlet_id']
        print(data,"Raw data for city & item selected")
        print(item_id,"Testing var")
        
        # pgcursor.execute("SELECT city_id,city_name,brand_name,brand_id,item_price FROM submit_filter WHERE state_id = %s and category_id=%s and item_id=%s",(state_id,category_id,item_id))
        pgcursor.execute("SELECT brand_id,brand_name FROM export_data WHERE city_id = %s and item_id = %s and  store_outlet_id=%s",(city_id,item_id,store_outlet_id))
        print(city_id,item_id,"filtered raw data")
        brand_list = pgcursor.fetchall()
        if(brand_list !=[]):
            for brow in brand_list :
                print(f"{ brand_list }")
                brand.append({
                    'brand_id':str( brow [0]),
                    'brand_name':brow [1],
                    })
            response =jsonify({'brand':brand})   
            response.status_code = 200
            return response
        else:
            response=jsonify({'Message':"There is no brand available in selected city"})
            return response
            pgcursor.close()
            pgconn.close()
    else:
        response=jsonify({'Error':"Failed to retrieve data"})
        response.status_code=406
        return response

@app.route("/api/price_filter", methods = ['GET','POST'])
def price_filter():
    item_price =[]
    if request.method == 'POST':
        print("Method is post")
        data=request.get_json()
        brand_id = data['brand_id'],
        store_outlet_id=data['store_outlet_id']
        print(brand_id,"Raw data for city selected")
        pgcursor.execute("SELECT item_price FROM export_data WHERE brand_id = %s and store_outlet_id = %s",(brand_id,store_outlet_id))
        price_list = pgcursor.fetchall()
        if(price_list !=[]):
            print(price_list)
            for price in price_list  :
                print(f"{ price_list  }")
                item_price .append({
                    'item_price':str( price[0]),
                    })
            response =jsonify({'item_price':item_price})   
            response.status_code = 200
            return response
        else:
            response=jsonify({'Message':"There is no item price available in selected brand"})
            return response
            pgcursor.close()
            pgconn.close()
    else:
        response=jsonify({'Error':"Failed to retrieve data"})
        response.status_code=406
        return make_response("",204)

@app.route("/api/update", methods = ['GET','PUT'])
def update():
    if request.method == 'PUT':
        print("Method is put")
        data=request.get_json()
        item_price=data['item_price']
        eff_price = data['eff_price']
        status=data['status']
        brand_id=data['brand_id']
        discount=data['discount']
        store_outlet_id=data['store_outlet_id']
        item_id=data['item_id']
        city_id=data['city_id']
        print(item_price,eff_price,status,brand_id,discount,store_outlet_id,"Raw data to update db")
        pgcursor.execute("UPDATE export_data SET item_price=%s,effective_price=%s,status=%s,discount_value=%s WHERE brand_id=%s and store_outlet_id=%s and item_id=%s and city_id=%s",(item_price,eff_price,status,discount,brand_id,store_outlet_id,item_id,city_id))
        pgconn.commit()
        response =jsonify({'Message':"Data successfully Updated "})   
        response.status_code = 200
        return response
        pgcursor.close()
        pgconn.close()  
    else:
        response=jsonify({'Error':"Updation failed"})
        response.status_code=406
        return response

# @app.route("/export", methods=['GET'])
# def export():
#      if request.method == 'GET':
#         pgcursor.execute("COPY export_data TO 'datalab_sheet.csv' DELIMITER ',' CSV HEADER")
#         # pgcursor.execute("COPY export_data TO 'C:\Users\vb\OneDrive - Capgemini\Desktop\export_data.csv' CSV HEADER;")
#         response =jsonify( "Successfully Exported from db" )   
#         response.status_code = 200
#         return response
#         pgcursor.close()
#         pgconn.close()
       
        
#      else:
#         response=jsonify({'Error':"Export failed"})
#         response.status_code=406
#         return response

#---app to run----


if __name__ == '__main__':
    app.run(debug= True)

    