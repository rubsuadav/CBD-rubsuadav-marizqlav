@echo off

cd backend
echo "Iniciando el servidor backend..."
start /b cmd /k "npm i && npm run dev"
timeout /t 3 /nobreak >nul

cd ../frontend
echo "Iniciando el servidor frontend..."
start /b cmd /k "npm i && npm run dev"
