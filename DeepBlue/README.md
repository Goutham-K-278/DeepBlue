# DeepBlue

## Phase 1 Backend (FastAPI)

### Run the API server

```
uvicorn app.main:app --reload --port 8000
```

### Endpoints
- `GET /vessels` → Returns next vessel position from AISReplay
- `GET /pfz` → Returns grouped PFZ zone coordinates
- `GET /detect-ship` → Returns dummy detection result
- `POST /send-alert` → Returns mock SMS sent status

### Data
- `data/ais.csv` — Sample vessel positions near Chennai
- `data/pfz.csv` — Sample PFZ zone coordinates near Chennai
