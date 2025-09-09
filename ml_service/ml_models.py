# ML model stubs for API integration
from fastapi import UploadFile
from typing import List
import random

def yolo_ship_detection(image: UploadFile):
    # Simulate YOLOv8 ship detection output
    return [{
        'id': f'VSL-{random.randint(1000,9999)}',
        'lat': 12.34 + random.random(),
        'lng': 45.67 + random.random(),
        'confidence': round(random.uniform(0.8, 0.99), 2)
    } for _ in range(random.randint(2, 5))]

def edna_species_analysis(lat: float, lng: float):
    # Simulate eDNA analysis output
    species = ['Tuna', 'Dolphin', 'Shark', 'Mackerel', 'Sea Turtle', 'Squid']
    rare = ['Blue Whale'] if random.random() > 0.7 else []
    detected = random.sample(species, random.randint(2, 5))
    return {
        'detected_species': detected,
        'rare_species': rare,
        'diversity_index': round(random.uniform(0.6, 0.9), 2)
    }

def otolith_morphometrics(species: str):
    # Simulate otolith morphometrics output
    return {
        'species': species,
        'avg_length': random.randint(200, 2000),
        'avg_weight': random.randint(500, 90000),
        'shape_factor': round(random.uniform(0.6, 0.99), 2),
        'age_estimate': random.randint(2, 20)
    }

def correlation_engine():
    # Simulate correlation analytics
    return {
        'correlation': round(random.uniform(0.5, 0.95), 2),
        'feature_a': 'SST',
        'feature_b': 'Fish Density'
    }
