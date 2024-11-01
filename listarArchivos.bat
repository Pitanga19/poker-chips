@echo off
PowerShell -Command "Get-ChildItem -Recurse | Where-Object { $_.FullName -notlike '*node_modules*' }"
pause