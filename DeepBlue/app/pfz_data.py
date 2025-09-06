
import pandas as pd
import os

def get_pfz(csv_path=None):
	if csv_path is None:
		csv_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'pfz.csv')
	df = pd.read_csv(csv_path)
	grouped = df.groupby('zone_id')
	result = []
	for zone_id, group in grouped:
		coords = group[['lat', 'lon']].values.tolist()
		result.append({
			'zone_id': zone_id,
			'coordinates': coords
		})
	return result
