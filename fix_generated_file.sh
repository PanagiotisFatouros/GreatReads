#!/bin/sh
#This takes the broken file and inserts in the fix required
FILE_LOCATION=build/server/chunks/lucia-*.js
CODE_FIX="import path from 'path';\nimport \{ fileURLToPath \} from 'url';\nconst __filename = fileURLToPath\(import.meta.url\);\nconst __dirname = path.dirname\(__filename\);\n"
sed -i '1s/^/'"$CODE_FIX"'/' $FILE_LOCATION