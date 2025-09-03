# Historian

A modern Electron + Svelte application for organizing and browsing history resources. Features a beautiful card-based interface for exploring historical content across different time periods and topics.

## Features

- **Organized Categories**: Browse resources by era (Ancient, Medieval, Modern) and topic (Military History, Historical Maps, Primary Sources)
- **Search Functionality**: Quickly find resources by title, description, or tags
- **Dark Mode Support**: Toggle between light and dark themes
- **External Links**: Safely open resources in your default browser
- **Responsive Design**: Works well on different screen sizes
- **Favorites System**: Mark your favorite resources (coming soon)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone this repository:
```bash
git clone https://github.com/guildmasterdev/Historian.git
cd Historian
```

2. Install dependencies:
```bash
npm install
```

## Development

Run the app in development mode with hot reload:
```bash
npm run dev
```

## Building

Build the Svelte app:
```bash
npm run build
```

Run the built app:
```bash
npm run electron
```

## Packaging

Create distributable packages for different platforms:

```bash
# For all platforms
npm run dist

# For specific platforms
npm run dist-mac     # macOS
npm run dist-win     # Windows
npm run dist-linux   # Linux
```

The packaged applications will be available in the `dist` folder.

## Customizing Resources

Edit the `resources.json` file to add your own history resources. The structure is:

```json
{
  "id": "category-id",
  "name": "Category Name",
  "icon": "📚",
  "resources": [
    {
      "id": "unique-id",
      "title": "Resource Title",
      "description": "Brief description",
      "url": "https://example.com",
      "tags": ["tag1", "tag2"],
      "thumbnail": "optional-image-url"
    }
  ]
}
```

## Project Structure

```
historian/
├── src/
│   ├── components/       # Svelte components
│   ├── lib/              # Utilities and types
│   ├── app.css           # Global styles with Tailwind
│   ├── App.svelte        # Main app component
│   └── main.ts           # App entry point
├── public/
│   ├── build/            # Compiled Svelte app
│   └── index.html        # HTML template
├── main.js               # Electron main process
├── preload.js            # Electron preload script
├── resources.json        # History resources data
└── package.json          # Project configuration
```

## Technologies Used

- **Electron**: Cross-platform desktop application framework
- **Svelte**: Reactive UI framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Rollup**: Module bundler

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- History resources curated from various public educational sources
- Icons from system emoji set
- Built with modern web technologies