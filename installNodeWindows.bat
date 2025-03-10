@echo off

winget install Schniz.fnm
fnm install 22
node -v
:: Should 22.14.0
npm -v
:: Should 10.9.2
