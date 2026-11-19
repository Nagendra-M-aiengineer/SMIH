@echo off
echo ========================================================
echo   Pushing SMIH to GitHub (Nagendra-M-aiengineer/SMIH)
echo ========================================================
echo.
cd /d "%~dp0"
echo Current directory: %CD%
echo.
echo Running: git push -u origin main
echo.
git push -u origin main
echo.
echo ========================================================
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] SMIH Code pushed to GitHub successfully!
    echo Visit: https://github.com/Nagendra-M-aiengineer/SMIH
) else (
    echo [NOTICE] If prompted above, please complete the GitHub sign-in in your browser.
)
echo ========================================================
echo.
pause
