import urllib.request

url = "https://hornokplease.xyz/styles.css"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
css = urllib.request.urlopen(req).read().decode('utf-8')

with open("horn_styles.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Saved horn_styles.css length:", len(css))
