import streamlit as st
import streamlit.components.v1 as components
import os
import tempfile
import pathlib

st.set_page_config(
    page_title="हॉर्न ओके प्लीज — हिंदी हाईवे रेडियो",
    page_icon="🚛",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# ── Hide all Streamlit chrome for full-screen immersive app ──────────────────
st.markdown("""
<style>
  /* Hide every piece of Streamlit UI chrome */
  #MainMenu, footer, header,
  [data-testid="stToolbar"],
  [data-testid="stDecoration"],
  [data-testid="stStatusWidget"],
  [data-testid="stHeader"],
  [data-testid="stSidebar"],
  [data-testid="collapsedControl"] {
    visibility: hidden !important;
    height: 0 !important;
    min-height: 0 !important;
    display: none !important;
  }

  /* Zero out all Streamlit padding/margins at every container level */
  .block-container,
  [data-testid="block-container"],
  [data-testid="stAppViewContainer"],
  [data-testid="stAppViewContainer"] > section,
  [data-testid="stVerticalBlock"],
  [data-testid="stVerticalBlockBorderWrapper"] {
    padding: 0 !important;
    margin: 0 !important;
    max-width: 100% !important;
    gap: 0 !important;
  }

  /* Make the component iframe fill the entire viewport */
  iframe {
    border: none !important;
    width: 100vw !important;
    height: 100vh !important;
    display: block !important;
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
  }

  /* Remove any scroll from the outer Streamlit page */
  html, body { overflow: hidden !important; }
</style>
""", unsafe_allow_html=True)

APP_DIR = os.path.dirname(os.path.abspath(__file__))


def load_app_html() -> str:
    """Inline CSS and JS into the HTML for seamless Streamlit iframe rendering."""
    html_path = os.path.join(APP_DIR, "index.html")
    css_path  = os.path.join(APP_DIR, "style.css")
    js_path   = os.path.join(APP_DIR, "app.js")

    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()
    with open(js_path, "r", encoding="utf-8") as f:
        js = f.read()

    # Inline stylesheet (replaces <link rel="stylesheet" href="style.css" />)
    html = html.replace(
        '<link rel="stylesheet" href="style.css" />',
        f"<style>\n{css}\n</style>"
    )
    # Inline script — keep the external YT iframe API tag, replace only app.js
    html = html.replace(
        '<script src="app.js"></script>',
        f"<script>\n{js}\n</script>"
    )
    return html


# Render the full-screen app inside a Streamlit component iframe.
# Large height value ensures the internal position:fixed layout fills any screen.
components.html(load_app_html(), height=10000, scrolling=False)
