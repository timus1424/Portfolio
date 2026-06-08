# Portfolio Implementation Notes

## Spline 3D Integration

The hero section uses a Spline 3D robot scene. The current implementation uses a placeholder URL. To integrate your own Spline scene:

1. **Create or find your Spline robot scene** with cursor-following interaction
2. **Export from Spline**: Get the public URL (File → Export → Get embed code)
3. **Update the iframe URL** in `/src/app/components/Hero.tsx`:
   ```tsx
   <iframe
     src="YOUR_SPLINE_PUBLIC_URL_HERE"
     frameBorder="0"
     width="100%"
     height="100%"
     className="w-full h-full"
     loading="eager"
     title="3D Robot Scene"
   />
   ```

### Spline Setup Guidelines

- Ensure the robot has cursor-tracking enabled in Spline
- Keep the scene optimized for web (low poly count)
- Test on mobile devices for performance
- The fallback image (provided robot image) displays if Spline fails to load

## Contact Information

Update the contact links in `/src/app/components/Contact.tsx`:

```tsx
const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:your.email@example.com', // Update this
    icon: Mail,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/yourusername', // Update this
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/yourprofile', // Update this
    icon: Linkedin,
  },
  {
    label: 'Resume',
    href: '/resume.pdf', // Place your resume PDF in /public folder
    icon: FileDown,
  },
];
```

## Design System

### Colors
- Background: `#0B0B0E`
- Primary Text: `#E5E7EB`
- Muted Text: `#9CA3AF`
- Accent: `#06b6d4` (Cyan)

### Typography
- Font: Inter (Google Fonts)
- Tight letter spacing for headings
- Font weights: 300 (light), 400 (regular), 500 (medium), 600 (semibold)

### Animation Philosophy
- Restrained micro-animations only
- Fade and slide transitions
- Scroll-triggered reveals
- No flashy or distracting effects

## Deployment (Vercel)

This portfolio is optimized for Vercel deployment:

1. Push to GitHub
2. Import repository in Vercel
3. Deploy (no special configuration needed)

## Performance Considerations

- Spline iframe may increase initial load time
- Consider adding a loading state if needed
- Images are optimized with fallbacks
- Smooth scroll behavior enabled
- All animations use GPU-accelerated transforms

## Mobile Optimization

- Fully responsive design
- Navigation hidden on mobile (scroll-based)
- Touch-friendly contact cards
- Optimized typography scaling
- Spline fallback for low-power devices
