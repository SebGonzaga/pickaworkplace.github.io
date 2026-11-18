# Pick A Name Studio

Open `index.html` in a browser (needs internet once for JSZip + the Nunito font).

## Structure
- `index.html` - editor shell (toolbar, panels, dialogs)
- `css/base.css` - editor UI layout; `css/editor.css` - selection, handles, guides
- `js/runtime-styles.js` - CSS shared by editor canvas and exports (becomes exported `css/styles.css`)
- Script order (classic scripts, shared globals): runtime-styles, core (helpers + characters), render (element -> HTML), runtime (standalone code shipped in exports), state (document JSON, undo, autosave), ui (drawing panels), events, export (ZIP), templates, tools, main
- The runtime (`runtime.js`) never touches editor state, so exports work without the editor.

## Status vs master prompt
Done: slides, drag/resize/rotate, layers, groups, undo/redo, 19 characters, timer / counter / accordion / tabs / progress widgets, living decor, quiz, speech dialogue, popup + link actions, device preview, hide on mobile/tablet, 36 templates (24 original layouts + 12 custom builders with stickers, widgets and per-slide transitions) (4 layouts: split, bold, editorial, poster; each with its own palette and font), ZIP export.
Animation timeline: entrance presets (fade/slide/zoom/rise/bounce/flip/turn/rotate/scale), loop presets (float/pulse/spin/bounce/wobble/dance/walk/swing/glow/shake/wave) with delay, duration, easing, repeat and a timeline view.
Exit presets (fade/slide/shrink/zoom/rotate, triggered by 'On click: Exit') and hover presets (jump/wiggle/wave/grow/speech bubble). Slide transitions (fade/slide/zoom/flip, per slide). Next: automatic exits (timed or on slide leave), character expressions, more characters, accordion/tabs/countdown widgets, more templates (target 60-80), then React/TS port, then backend.


## Tests
- `node tests/run.js`: syntax, template bounds, rendering and export output (no browser needed).
- `node tests/export-check.js`: exports the default project, a feature project and all 36 templates, then checks HTML structure, file references, offline behaviour (only Google Fonts is remote), CSS, JavaScript and assets.
- `tests/ui.spec.js`: Playwright browser tests. Not run yet; see the setup comment at the top of the file.

## Editor helpers (js/pro.js)
- Snap toggle (header): dragged objects snap to an 8px grid.
- Recent colours: the last 8 colours used appear first in swatch rows.
- Layers: ▲/▼ move an object forward or backward; double-click a layer to rename it.
- Shortcuts: press ? or the header ? button. Esc closes it.
- Layers can be dragged onto another layer to reorder them.
- Hold Space and drag on the canvas to pan.

## Animation library
- Slide transitions: fade, slide, zoom, flip, wipe, iris, cube, blur, drop, shutter, flash, swing, spiral, up. Use Preview transition in the slide panel to play one on the canvas.
- Entrances: fade, slide, zoom, rise, bounce, flip, turn, rotate, scale, pop, spin, drop, blur, reveal, glitch.
- Loops: float, pulse, spin, bounce, wobble, dance, walk, swing, glow, shake, wave, breathe, bob, hue, flicker.
- Hover: jump, wiggle, wave, grow, speech bubble, tilt, lift.

## Magic Move (slide morphing)
Give an object a Magic Move key (Animation section of its properties). An object with the same key on the next slide glides from its old position and size into the new one while the slides change. Respects the reduced-motion setting. The "Magic Move Showcase" template demonstrates it.
