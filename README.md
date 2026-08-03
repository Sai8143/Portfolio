# Terminal 1 — Frontend
cd frontend
npm run dev

# Terminal 2 — Real-Time Backend
cd backend
.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000

git remote set-url origin https://github.com/Sai8143/Portfolio.git

git push -u origin main --force