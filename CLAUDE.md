# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a vanilla JavaScript project that implements a confetti fireworks animation system. The application consists of a simple UI with a button that triggers animated confetti bursts when clicked.

## Development Commands
This project uses vanilla HTML/CSS/JavaScript and can be run directly in a browser:
- **Serve locally**: Use any static file server (e.g., `python -m http.server 8000` or VS Code Live Server)
- **Open directly**: Open `index.html` in any modern web browser

## Architecture
The project follows a simple client-side architecture:

### Core Components
- **index.html**: Main HTML structure with canvas element and button
- **script.js**: Contains the confetti animation system with two main classes:
  - `ConfettiPiece`: Individual confetti particle with physics properties
  - `ConfettiSystem`: Manages the canvas, animation loop, and particle lifecycle
- **style.css**: Styling with gradient backgrounds and button animations

### Key Design Patterns
- **Class-based animation system**: Uses ES6 classes for particle management
- **Canvas-based rendering**: Full-screen canvas overlay for smooth animations
- **Responsive design**: Canvas automatically resizes with window
- **Event-driven interactions**: Button clicks trigger confetti bursts

### Animation System
- Particles have randomized physics (velocity, gravity, friction, rotation)
- Multiple colors and shapes (squares and circles)
- Life cycle management with decay and cleanup
- Staggered burst effects with multiple waves

## GitHub Integration
- **Code Review**: Automated Claude Code Review workflow runs on pull requests
- **Review Focus**: Code quality, performance, security, and test coverage
- **Permissions**: Git operations are pre-approved for commits and pushes