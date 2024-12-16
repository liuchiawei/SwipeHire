import requests
import json

# Yahoo! Japan API の基本パラメータ
API_URL = "https://job.yahooapis.jp/v1/furusato/jobinfo/"
APP_ID = "dj00aiZpPXRnNFAxYWNpOW1zdiZzPWNvbnN1bWVyc2VjcmV0Jng9YjI-"  # 実際のアプリケーションIDに置き換え

# リクエストパラメータ
params = {
    "appid": APP_ID,
    "results": 1000,  # max 1000
    "start": 1,      # start
    #"fields": "full" # full info
}

for _ in range(1):  # 1回繰り返す
    response = requests.get(API_URL, params=params)
    if response.status_code == 200:
        job_data = response.json()

        with open("origin/yahoo_jobs.json", "a", encoding="utf-8-sig") as f:
            json.dump(job_data, f, ensure_ascii=False, indent=4)
        
        params["start"] += params["results"]  # start を更新
    else:
        print(f"エラー：{response.status_code} - {response.text}")

print("仕事情報が正常に保存されました yahoo_jobs.json！")
