import urllib.request
import re
import os

url = "https://hornokplease.xyz/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

with open("hornokplease_index.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Saved HTML, length:", len(html))

scripts = re.findall(r'<script[^>]*src=["\']([^"\']+)["\']', html)
print("Scripts:", scripts)

for s in scripts:
    if s.startswith("http"):
        s_url = s
    elif s.startswith("/"):
        s_url = "https://hornokplease.xyz" + s
    else:
        s_url = "https://hornokplease.xyz/" + s
    print("Fetching script:", s_url)
    try:
        s_req = urllib.request.Request(s_url, headers={'User-Agent': 'Mozilla/5.0'})
        s_content = urllib.request.urlopen(s_req).read().decode('utf-8')
        s_filename = "horn_" + os.path.basename(s_url.split("?")[0])
        with open(s_filename, "w", encoding="utf-8") as sf:
            sf.write(s_content)
        print("Saved", s_filename, "length:", len(s_content))
    except Exception as e:
        print("Error fetching", s_url, e)
