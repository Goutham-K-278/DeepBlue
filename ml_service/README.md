# ML Service (FastAPI)

## Endpoints
- `/api/ml/ship-detection` (POST, image upload)
- `/api/ml/edna` (GET, eDNA analysis)
- `/api/ml/otolith` (GET, otolith morphometrics)
- `/api/ml/correlation` (GET, correlation analytics)

## Usage
- Start with: `uvicorn main:app --reload --host 0.0.0.0 --port 8000`
- Docs: [http://localhost:8000/docs](http://localhost:8000/docs)

## Requirements
- See `requirements.txt`
