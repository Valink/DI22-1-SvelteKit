@echo off

start cmd /c "cd hub && npm i && npm run dev -- --port 5173"
start cmd /c "cd goose && npm i && npm run dev -- --port 5174"
start cmd /c "cd pokemon && npm i && npm run dev -- --port 5175"
start cmd /c "cd memory && npm i && npm run dev -- --port 5176"
start cmd /c "cd vampire && npm i && npm run dev -- --port 5177"
start cmd /c "cd bomb && npm i && npm run dev -- --port 5178"
start cmd /c "cd morpion && npm i && npm run dev -- --port 5179"
start cmd /c "cd casino && npm i && npm run dev -- --port 5180"