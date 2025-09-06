
import pandas as pd
import os

class AISReplay:
	def __init__(self, csv_path=None):
		if csv_path is None:
			csv_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'ais.csv')
		self.df = pd.read_csv(csv_path)
		self.index = 0
		self.total = len(self.df)

	def get_next(self):
		if self.total == 0:
			return None
		row = self.df.iloc[self.index]
		result = {
			'vessel_id': row['vessel_id'],
			'timestamp': row['timestamp'],
			'lat': row['lat'],
			'lon': row['lon']
		}
		self.index += 1
		if self.index >= self.total:
			self.index = 0
		return result
