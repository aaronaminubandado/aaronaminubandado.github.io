# My Portfolio

A modern, data-driven portfolio built with HTML, CSS, and JavaScript. Fully static and deployable to GitHub Pages.

## Quick Start

Simply open `index.html` in your browser. No build step required.

## Editing Projects

All projects are defined in `data/projects.json`. To add or edit projects:

```json
[
  {
    "id": "unique-project-slug",
    "title": "Project Title",
    "shortDescription": "Brief 10-15 word summary for project cards.",
    "longDescription": "2-3 sentence explanation of what the project does and your role.",
    "tech": ["React", "Node.js", "MongoDB"],
    "repoUrl": "https://github.com/yourusername/project",
    "liveUrl": "https://project-demo.com (leave empty string if not available)",
    "images": [
      "./assets/projects/project-slug/1.png",
      "./assets/projects/project-slug/2.png"
    ]
  }
]
```

### Adding Project Images

1. Create a folder in `assets/` for your project (e.g., `assets/projects/my-project/`)
2. Add your screenshots
3. Reference them in `projects.json` with relative paths

## Project Schema Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (used for folder naming) |
| `title` | string | Yes | Project title |
| `shortDescription` | string | Yes | Brief summary shown on project cards |
| `longDescription` | string | Yes | Full description shown in modal |
| `tech` | array | Yes | List of technologies used |
| `repoUrl` | string | Yes | GitHub repository URL |
| `liveUrl` | string | No | Live demo URL (leave empty if none) |
| `images` | array | Yes | Array of image paths (at least one) |

## Keyboard Shortcuts (Modal)

- `Escape` - Close modal
- `Arrow Left` - Previous image
- `Arrow Right` - Next image

## Deployment to GitHub Pages

1. Go to Repository Settings
2. Navigate to Pages section
3. Select `main` branch as source
4. Save and wait for deployment

All paths use relative URLs, so it works in subpaths automatically.
