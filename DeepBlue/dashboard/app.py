import streamlit as st
import folium
from streamlit_folium import st_folium
import requests

st.set_page_config(page_title="DeepBlue Dashboard", layout="wide")
st.title("🌊 DeepBlue – Smart Maritime Monitoring")

# Map setup
m = folium.Map(location=[20.5937, 78.9629], zoom_start=4)  # India focus

# Fetch AIS vessel positions
try:
    vessels = requests.get("http://127.0.0.1:8000/vessels").json()
    # If single dict, wrap in list for compatibility
    if isinstance(vessels, dict):
        vessels = [vessels]
    for v in vessels:
        folium.Marker(
            [v["lat"], v["lon"]],
            tooltip=f"{v.get('vessel_name', v['vessel_id'])} (Speed: {v.get('sog', 0)} kn)"
        ).add_to(m)
except Exception as e:
    st.error(f"⚠ Could not fetch vessels: {e}")

# Fetch PFZ polygons
try:
    pfz = requests.get("http://127.0.0.1:8000/pfz").json()
    for f in pfz["features"]:
        folium.Polygon(
            locations=[(lat, lon) for lon, lat in f["geometry"]["coordinates"][0]],
            color="blue",
            fill=True,
            fill_opacity=0.2
        ).add_to(m)
except Exception as e:
    st.error(f"⚠ Could not fetch PFZ data: {e}")

st_folium(m, width=1000, height=600)

# Detection button
if st.button("🚨 Run Ship Detection"):
    result = requests.get("http://127.0.0.1:8000/detect-ship").json()
    st.json(result)
