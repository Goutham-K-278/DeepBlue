
# DeepBlue Backend

## What is this?
DeepBlue is a backend system for vessel tracking and PFZ (Potential Fishing Zone) data, built with FastAPI.

## Getting Started

### 1. Clone the Repo
Use GitHub Desktop or `git clone`:
```
git clone https://github.com/Goutham-K-278/DeepBlue.git
```

### 2. Install Python, VS Code, and GitHub Desktop
Make sure you have Python 3.10+, VS Code, and GitHub Desktop installed.

### 3. Create a Virtual Environment (Recommended)
Open the project in VS Code and run:
```
python -m venv venv
```
Activate the environment:
- On Windows: `venv\Scripts\activate`
- On Mac/Linux: `source venv/bin/activate`

### 4. Install Requirements
```
pip install -r requirements.txt
```

### 5. Run the Server
```
uvicorn app.main:app --reload --port 8000
```

Visit [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to see all endpoints.

## Endpoints
- `GET /vessels` → Returns next vessel position from AISReplay
- `GET /pfz` → Returns grouped PFZ zone coordinates
- `GET /detect-ship` → Returns dummy detection result
- `POST /send-alert` → Returns mock SMS sent status

## Data Files
All data is stored in the `/data` folder:
- `data/ais.csv` — Sample vessel positions near Chennai
- `data/pfz.csv` — Sample PFZ zone coordinates near Chennai

Sample data is included so you can run and test the backend immediately after cloning.

## Requirements
All Python libraries are listed in `requirements.txt`:
```
fastapi
uvicorn
pandas
geopandas
shapely
python-dotenv
```
Install with:
```
pip install -r requirements.txt
```

## Git Workflow
- Push to GitHub regularly after each milestone:
	```
	git add .
	git commit -m "Your update message"
	git push origin main
	```
- When teammates join, they should create feature branches (e.g. `frontend`, `ml`) to avoid breaking main.

## First-Time Setup for Teammates
1. Install Python, VS Code, and GitHub Desktop.
2. Clone the repo using GitHub Desktop.
3. Open in VS Code, create a virtual environment, and install requirements.
4. Run the server with uvicorn.
5. Visit `/docs` to test endpoints.

---
If you have any questions, ask in the project chat!
