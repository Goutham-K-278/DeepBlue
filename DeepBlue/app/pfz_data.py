

import pandas as pd
import os

def get_pfz(csv_path=None):
	if csv_path is None:
		csv_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'pfz.csv')
	df = pd.read_csv(csv_path)
	grouped = df.groupby(['zone_id', 'zone_name'])
	feature_collection = {
		"type": "FeatureCollection",
		"features": []
	}
	for (zone_id, zone_name), group in grouped:
		# GeoJSON expects [lon, lat] order
		coordinates = list(group[['lon', 'lat']].itertuples(index=False, name=None))
		if coordinates and coordinates[0] != coordinates[-1]:
			coordinates.append(coordinates[0])  # Close the polygon
		feature = {
			"type": "Feature",
			"properties": {
				"zone_id": zone_id,
				"zone_name": zone_name
			},
			"geometry": {
				"type": "Polygon",
				"coordinates": [coordinates]
			}
		}
		feature_collection["features"].append(feature)
	return feature_collection
