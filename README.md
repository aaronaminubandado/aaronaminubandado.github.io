# My Portfolio

A modern, accessible, and fully static portfolio built with semantic HTML, CSS, and JavaScript. Deployable to GitHub Pages with no build step required.

## Features

- Fully responsive (mobile, tablet, desktop)
- Data-driven project management via JSON
- Modal with image carousel (swipe support on mobile)
- Keyboard navigation (arrow keys + ESC for modal)
- Focus trap for accessibility
- Dark/Light theme toggle
- Lazy loading images
- Semantic HTML with ARIA labels

## File Structure

```
/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # All styles
├── scripts/
│   └── main.js            # JavaScript functionality
├── data/
│   └── projects.json      # Project data
├── assets/
│   ├── placeholder.png    # Fallback image
│   ├── profile-pic-1.jpg # Profile image
│   ├── about-pic.jpg     # About section image
│   └── projects/         # Project screenshots
│       ├── jias-gadgets/
│       ├── billa/
│       └── ezclean/
└── README.md
```

## Quick Start

1. Clone the repository
2. Open `index.html` in your browser
3. No build step or server required

## How to Deploy to GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** > **Pages**
3. Under **Source**, select `main` branch
4. Click **Save**
5. Wait 1-2 minutes for deployment

Your site will be available at: `https://yourusername.github.io`

## How to Add/Edit Projects

### 1. Edit Project Data

Open `data/projects.json` and modify or add projects:

```json
[
  {
    "id": "unique-project-slug",
    "title": "Project Title",
    "shortDescription": "Brief 10-15 word summary for the project card.",
    "longDescription": "Full description shown in the modal. Can be 2-3 sentences.",
    "tech": ["React", "Node.js", "MongoDB"],
    "repoUrl": "https://github.com/yourusername/project",
    "liveUrl": "https://project-demo.com",
    "images": [
      "./assets/projects/project-slug/1.png",
      "./assets/projects/project-slug/2.png"
    ]
  }
]
```

### 2. Add Project Images

1. Create a folder: `assets/projects/<project-slug>/`
2. Add screenshots (recommended: 1200x800px, PNG/JPG)
3. Reference them in `projects.json`

### Project Schema Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (use kebab-case) |
| `title` | string | Yes | Project title |
| `shortDescription` | string | Yes | Brief summary (10-15 words) |
| `longDescription` | string | Yes | Full description (2-3 sentences) |
| `tech` | array | Yes | List of technologies |
| `repoUrl` | string | Yes | GitHub repository URL |
| `liveUrl` | string | No | Live demo URL (empty string if none) |
| `images` | array | Yes | Array of image paths |

## How to Edit Personal Information

### Change Name & Title

In `index.html`:
```html
<h1 class="hero-name">Your Name</h1>
<p class="hero-title">Your Title</p>
```

### Update Resume

Replace `assets/Aaron Aminu Bandado Resume.pdf` with your resume (keep the same filename or update the link in the HTML).

### Update Social Links

In `index.html`, find and update:
- LinkedIn: `href="https://www.linkedin.com/in/your-profile/"`
- GitHub: `href="https://github.com/yourusername"`
- Email: `href="mailto:your@email.com"`

### Update About Section

1. Replace `assets/about-pic.jpg` with your photo
2. Edit the about content in `index.html`

## How to Change Theme Colors

In `styles/main.css`, modify the CSS variables:

```css
:root {
    /* Accent Color */
    --color-accent: #2563eb;
    --color-accent-hover: #1d4ed8;
    
    /* Light Mode Colors */
    --color-bg: #ffffff;
    --color-text: #212529;
    
    /* Dark Mode Colors */
    --color-dark-bg: #121212;
    --color-dark-text: #e9ecef;
}
```

## How to Add New Skills

In `index.html`, find the Skills section and add new skill categories:

```html
<div class="skill-category">
    <h4>Category Name</h4>
    <ul class="skill-list">
        <li class="skill-tag">
            <svg>...</svg>
            Skill Name
        </li>
    </ul>
</div>
```

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation
- Focus management in modal
- Focus trap in modal
- Skip links support
- Alt text for all images
- Lazy loading images

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Escape` | Close modal / Close mobile menu |
| `Arrow Left` | Previous image in carousel |
| `Arrow Right` | Next image in carousel |
| `Tab` | Navigate focusable elements |

## Mobile Gestures

- Swipe left: Next image in carousel
- Swipe right: Previous image in carousel

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Testing Checklist

- [ ] Open index.html in browser
- [ ] Check responsive layout on mobile, tablet, desktop
- [ ] Click project cards to open modal
- [ ] Test carousel navigation (buttons + arrows)
- [ ] Test swipe gestures on mobile
- [ ] Test ESC key closes modal
- [ ] Test Tab navigation in modal (focus trap)
- [ ] Toggle dark/light mode
- [ ] Check all images load (or show placeholder)
- [ ] Verify resume PDF downloads
- [ ] Test all external links open correctly

## Notes

- All paths are relative for GitHub Pages subpath compatibility
- No build step required
- No environment variables needed
- No API keys required
- Safe for public repository hosting
