

import pandas as pd
import os

class AISReplay:
	def __init__(self, filepath="data/ais.csv", sample_size=5000):
		# Load AIS data
		self.df = pd.read_csv(filepath)

		# Optional: only take a random sample for faster replay
		if sample_size and len(self.df) > sample_size:
			self.df = self.df.sample(sample_size).reset_index(drop=True)

		# Reset index for replay loop
		self.index = 0

	def next_position(self):
		# Get current row
		row = self.df.iloc[self.index]
		self.index = (self.index + 1) % len(self.df)

		return {
			"vessel_id": row["vessel_id"],
			"timestamp": row["timestamp"],
			"lat": row["lat"],
			"lon": row["lon"],
			"vessel_name": row.get("vessel_name", "Unknown") if hasattr(row, 'get') else row["vessel_name"] if "vessel_name" in row else "Unknown",
			"sog": row.get("sog", 0) if hasattr(row, 'get') else row["sog"] if "sog" in row else 0,
			"cog": row.get("cog", 0) if hasattr(row, 'get') else row["cog"] if "cog" in row else 0,
		}
