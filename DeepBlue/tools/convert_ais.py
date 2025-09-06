import pandas as pd

# Load AIS data
# Change the path below to your raw file location if needed
raw_file = "E:/SIH DeepBlue Project Doc/AIS_2024_01_01.csv"
out_file = "E:/DeepBluegit/DeepBlue/data/ais.csv"

df = pd.read_csv(raw_file)

# Select and rename columns
columns = ["MMSI", "BaseDateTime", "LAT", "LON", "SOG", "COG", "VesselName"]
df_out = df[columns].copy()
df_out.columns = ["vessel_id", "timestamp", "lat", "lon", "sog", "cog", "vessel_name"]

df_out.to_csv(out_file, index=False)
print(f"✅ Saved {len(df_out)} rows to {out_file}")
