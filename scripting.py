import requests
import json

# api link: https://api.jikan.moe/v4/anime?q=

count = 0

def getInfo(call):
  r = requests.get(call)
  return r.json()

def main():
  count = 0
  search = input('What anime are you looking for? ')
  anime = f"https://api.jikan.moe/v4/anime?q={search}"
  animeinfo = getInfo(anime)
  for i in animeinfo['data']:
    title = animeinfo['data'][count]['title']
    img = animeinfo['data'][count]['images']['jpg']['image_url']
    eps = animeinfo['data'][count]['episodes'], 'Episodes'
    print('\n')
    count += 1
    with open("data.json") as fp:
        listObj = json.load(fp)
    listObj.append({
        "Title": f"{title}",
        "Image": f"{img}",
        "Episodes": f"{eps}"
    })
    with open("data.json", 'w') as json_file:
        json.dump(listObj, json_file, 
                            indent=4,  
                            separators=(',',': '))

main()