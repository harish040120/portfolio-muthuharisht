@echo off
set NODE_PATH=%~dp0node_modules
cd /d %~dp0
npx next start --port 3000
