import http.server
import socketserver
import json
import os
import urllib.parse

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class HornOkPleaseHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query = urllib.parse.parse_qs(parsed_url.query)

        # Dynamic API Endpoint to fetch wallpapers from local image folders
        if path == '/api/wallpapers':
            genre_id = query.get('genre', ['highway'])[0]
            # Prevent directory traversal
            genre_id = os.path.basename(genre_id)
            genre_dir = os.path.join(DIRECTORY, 'images', genre_id)

            wallpapers = []
            valid_extensions = ('.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif')

            if os.path.exists(genre_dir) and os.path.isdir(genre_dir):
                for filename in sorted(os.listdir(genre_dir)):
                    if filename.lower().endswith(valid_extensions):
                        # Construct relative web URL
                        rel_path = f"images/{genre_id}/{filename}"
                        wallpapers.append(rel_path)

            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'genre': genre_id, 'wallpapers': wallpapers}).encode('utf-8'))
            return

        # API Endpoint to list available genres / folders
        if path == '/api/genres':
            images_dir = os.path.join(DIRECTORY, 'images')
            genres = []
            if os.path.exists(images_dir):
                genres = [d for d in os.listdir(images_dir) if os.path.isdir(os.path.join(images_dir, d))]
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'genres': genres}).encode('utf-8'))
            return

        # Serve static files
        return super().do_GET()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), HornOkPleaseHandler) as httpd:
        print(f"[HORN OK PLEASE] Python server running at http://localhost:{PORT}")
        httpd.serve_forever()
