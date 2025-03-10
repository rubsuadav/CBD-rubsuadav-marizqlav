#!/bin/bash

cd backend
echo "Iniciando el servidor backend..."
npm i
npm run dev
sleep 3

cd ../frontend
echo "Iniciando el servidor frontend..."
npm i
npm run dev
