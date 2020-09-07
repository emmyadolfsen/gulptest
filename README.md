# Nodejs och Gulp

Syftet med en automatiserings-process är att göra jobbet enklare genom automatisering. Filer minifieras och läggs till automatiskt.

För att starta projektet och skapa en package.json fil körde jag en **$ npm init** följt av en Gulp installation, **$ npm install --save-dev gulp**.

Jag har skapat ett system där följande Tasks har lagts in:
- concat - för att lägga ihop(konkatenera) filer i en katalog.
- uglify - minifiering av Javascript.
- cleanCSS - minifiering av CSS.
- imagemin - minifiering av bilder.
- htmlmin - minifiering av HTML.

Metoden watch() har lagts in för att känna av om det blir ändringar i filer och då köra Tasks.

För att köra automatiseringen under utveckling används kommandot **$ Gulp**.