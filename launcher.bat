@echo off

start cmd /c "cd hub && npm run dev -- --port 5173"
start cmd /c "cd goose && npm run dev -- --port 5174"
start cmd /c "cd pokemon && npm run dev -- --port 5175"
start cmd /c "cd memory && npm run dev -- --port 5176"
start cmd /c "cd vampire && npm run dev -- --port 5177"
start cmd /c "cd bomb && npm run dev -- --port 5178"
start cmd /c "cd morpion && npm run dev -- --port 5179"
start cmd /c "cd casino && npm run dev -- --port 5180"