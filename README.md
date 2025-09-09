# DeepBlue Marine Monitoring Dashboard

## Overview
A full-stack marine monitoring dashboard for real-time vessel detection, biodiversity (eDNA), otolith morphometrics, and more. Built with React (Vite), Node.js/Express, FastAPI ML microservice, and PostgreSQL.

---

## Project Structure

- **backend/**: Node.js/Express API, PostgreSQL (Sequelize)
- **frontend/**: React dashboard (Vite)
- **ml_service/**: FastAPI ML microservice (YOLOv8, eDNA, otolith, correlation)
- **ml_service/data/**: Realistic sample CSV datasets

---

## Prerequisites
- Node.js 18+
- Python 3.9+
- (Recommended) [pnpm](https://pnpm.io/) or npm

---

## Setup Instructions

### 1. Backend (Node.js/Express)
```sh
cd backend
npm install
npm run dev
```
- Runs on `http://localhost:5000`

### 2. ML Service (FastAPI)
```sh
cd ml_service
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt  # or install: fastapi uvicorn sqlalchemy pandas scikit-learn ultralytics
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
- Runs on `http://localhost:8000`
- Interactive docs: [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend (React)
```sh
cd frontend
npm install
npm run dev
```
- Runs on `http://localhost:5173` (or as shown in terminal)

---

## Environment Variables
- `frontend/.env`:
  ```
  VITE_API_URL=http://localhost:8000
  ```
- `backend/.env`:
  - Configure PostgreSQL connection as needed.

---

## Features
- **Live vessel detection** (YOLOv8, upload satellite image)
- **Biodiversity (eDNA) analysis**
- **Otolith morphometrics**
- **Correlation analytics**
- **PFZ, field survey, and more**
- **Modern dashboard UI**

---

## Demo Data
- All ML endpoints use realistic sample data for demo/testing.
- Replace with real models/data as needed.

---

## Troubleshooting
- Ensure all services are running on correct ports.
- For Python errors, check that all dependencies are installed in the `.venv`.
- For CORS/API errors, verify `VITE_API_URL` in `frontend/.env`.

---

## Credits
- Architecture & code: Goutham-K-278
- ML/data integration: DeepBlue project

---

## License
MIT
