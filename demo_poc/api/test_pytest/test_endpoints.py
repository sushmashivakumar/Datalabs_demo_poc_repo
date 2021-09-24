import pytest
import requests 
import json
import jsonpath
from flask import jsonify
import ast


url = 'http://127.0.0.1:5000'

def test_index_page():
    r=requests.get(url+'/')
    assert r.status_code == 200
    

def test_get_state():
    resp=requests.get(url+'/api/state')
    assert resp.status_code == 200
    
def test_get_item_category():
    resCategory=requests.get(url+'/api/item_category')
    assert resCategory.status_code == 200

def test_get_item_list():
    resItem=requests.get(url+'/api/item_list')
    print(type(resItem))
    print(
        {'Length':resItem.text}
    )

    assert resItem.status_code == 200

def test_post_city_response():
    '''Cheking the server response'''
    CITY_API=url+'/api/city_filter'
    f=open('request_city.json','r')
    request_json=json.loads(f.read())
    # print(type(request_json.text))
    response=requests.post('http://127.0.0.1:5000/api/city_filter',data=request_json)
    print(response.text,"response posted") 
    
    assert response.status_code==500
  
    
    # id=jsonpath.jsonpath(response.json(),'id')
    
    # assert res.status_code == 200
def test_post_brand_response():
    resItem=requests.post(url+'/api/brand_filter')
    assert resItem.status_code == 500

def test_put_db_response():
    resItem=requests.put(url+'/api/update')
    assert resItem.status_code == 500   