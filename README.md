# RelaxZone

Hindi highway radio in the browser. Pick a station; it plays that station’s YouTube playlist.

## Stations

| Station | Playlist |
| --- | --- |
| Highway (truck) | [PLfH-6xXh3waM](https://www.youtube.com/playlist?list=PLfH-6xXh3waM) |
| Dhaba | [PLDd3GFEUXVbA](https://www.youtube.com/playlist?list=PLDd3GFEUXVbA) |
| Dance 2000s | [PLPo3EhjC8W4A](https://www.youtube.com/playlist?list=PLPo3EhjC8W4A) |
| Retro 90s | [PLEFafAVNRJBo](https://www.youtube.com/playlist?list=PLEFafAVNRJBo) |
| Anti-depression | [PLANlPz-KKq6k](https://www.youtube.com/playlist?list=PLANlPz-KKq6k) |
| Fred again | [PLZIT0z5Rfu98](https://www.youtube.com/playlist?list=PLZIT0z5Rfu98) |

## Run

```bash
cp .env.example .env
# set OWM_API_KEY in .env for live weather
python3 server.py
```

Open http://localhost:3000

Secrets stay in `.env` (not committed). The OpenWeatherMap key is used only on the server via `/api/weather`.
