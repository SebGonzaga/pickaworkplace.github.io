# Pick A Name Studio

Open `index.html` in a browser (needs internet once for JSZip + the Nunito font).

## Structure
- `index.html` - editor shell (toolbar, panels, dialogs)
- `css/base.css` - editor UI layout; `css/editor.css` - selection, handles, guides
- `js/runtime-styles.js` - CSS shared by editor canvas and exports (becomes exported `css/styles.css`)
- Script order (classic scripts, shared globals): runtime-styles, core (helpers + characters), render (element -> HTML), runtime (standalone code shipped in exports), state (document JSON, undo, autosave), ui (drawing panels), events, export (ZIP), templates, tools, main
- The runtime (`runtime.js`) never touches editor state, so exports work without the editor.

## Status vs master prompt
Done: slides, drag/resize/rotate, layers, groups, undo/redo, 13 characters, timer / counter / accordion / tabs / progress widgets, living decor, quiz, speech dialogue, popup + link actions, device preview, hide on mobile/tablet, 24 modern templates (4 layouts: split, bold, editorial, poster; each with its own palette and font), ZIP export.
Animation timeline: entrance presets (fade/slide/zoom/rise/bounce/flip/turn) with delay, duration, easing, repeat and a timeline view.
Next: more animation states, accordion/tabs/countdown widgets, more templates (target 60-80), then React/TS port, then backend.
