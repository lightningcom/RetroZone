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

## Streamlit

The live app is `retroapp.py` (also `streamlit_app.py`). Streamlit Cloud inlines the player and bakes in each station’s YouTube tracks, so it does not need `server.py`.

```bash
pip install -r requirements.txt
streamlit run retroapp.py
```

Optional Streamlit secrets: `OWM_API_KEY`, `WEATHER_LAT`, `WEATHER_LON`.

Secrets stay in `.env` (not committed). The OpenWeatherMap key is used only on the server via `/api/weather`.
