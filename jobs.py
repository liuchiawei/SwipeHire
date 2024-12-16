#TODO: fetch data from api しごとナビ
import requests
import json
from urllib.parse import unquote

# しごとナビ API の基本パラメータ
API_URL = "https://www.shigotonavi.co.jp/api/search/"
APP_ID = "6e155f076b7b74ac50c1c519c4869b74"

params = {
    "key": APP_ID
}

response = requests.get(API_URL, params=params)

data = response.content.decode('utf-8')
decoded_data = unquote(data)

#TODO: 取得データをDBに保存
print(decoded_data)