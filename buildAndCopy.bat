del .\builds\* /Q /S /F
call npm run build
copy ".\builds\compromise.js" "..\..\Dropbox\MaterialiserSourceCode\WordScannerWebAddIn\WordScannerWebAddInWeb\Scripts" /Y