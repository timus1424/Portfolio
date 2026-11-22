# Portfolio notes

## Direction

The site uses a quiet dark editorial system with warm gold as its accent. The hero paints the supplied ASCII self-portrait first, then dynamically loads a Three.js phoenix medallion on capable desktop browsers. Scroll progress turns the medallion; reduced-motion, data-saver, low-memory, mobile, and WebGL fallback paths keep the poster. The scene pauses offscreen and disposes its WebGL resources on teardown. The workflow band and capability map use lightweight CSS/SVG signals. No external scene or font is loaded.

The core palette is defined in `src/styles/theme.css`: background `#09090B`, surface `#171715`, text `#F1EEE6`, accent `#D6B36A`, and accent 2 `#8A6A38`. Each featured project carries its own five-color study in `src/app/components/Projects.tsx`.

## Editing projects

Project copy, links, images, and palettes live in the `projects` array in `src/app/components/Projects.tsx`. Keep titles and claims accurate, use optimized image formats with an explicit aspect ratio, and mark below-the-fold images lazy. Check every project link before publishing.

## Contact links

Update the contact links in `src/app/components/Contact.tsx`. External links need a complete `https://` URL. The current resume points to Google Drive; replace it if the resume moves.

## Local workflow

- `npm run dev` starts the Vite development server.
- `npm run build` checks the production bundle.

Respect reduced-motion preferences, keep the initial view lightweight, and load Three.js only for the hero scene after first paint. Spline and remote 3D embeds are not part of this project.
