@echo off
echo ===================================================
echo   Pushing GymSetup to GitHub...
echo ===================================================
git add .
git commit -m "update: latest changes for GymSetup"
git push -u origin main
echo ===================================================
echo   Done!
echo ===================================================
pause
