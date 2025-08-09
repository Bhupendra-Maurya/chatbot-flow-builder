# React Flow Builder

A modern, intuitive visual flow builder application built with React and React Flow. Create, edit, and manage message flows with a drag-and-drop interface.

## 🚀 Features

- **Visual Flow Builder**: Intuitive drag-and-drop interface for creating message flows
- **Real-time Editing**: Edit node properties with instant visual feedback
- **Flow Validation**: Comprehensive validation ensures flow integrity before saving
- **Professional UI**: Modern, responsive design with smooth animations
- **Connection Management**: Smart connection handling with validation rules
- **Interactive Canvas**: Pan, zoom, and navigate flows with ease

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Configuration](#configuration)
- [Development](#development)
- [Contributing](#contributing)

## 🛠 Installation

### Prerequisites

- Node.js (version 16.0 or higher)
- npm or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd react-flow-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎯 Usage

### Creating a Flow

1. **Add Nodes**: Drag nodes from the left panel onto the canvas
2. **Connect Nodes**: Click and drag from output handles (right side) to input handles (left side)
3. **Edit Content**: Click on any node to open the settings panel and edit its content
4. **Save Flow**: Click the "Save Flow" button to validate and save your flow

### Interface Overview

- **Left Panel**: Available node types for dragging onto canvas
- **Center Canvas**: Main work area for building flows
- **Right Panel**: Settings panel for editing selected nodes (appears when a node is selected)
- **Header**: Contains the save button and application title

### Flow Validation Rules

- Each output handle can only have one outgoing connection
- Multi-node flows must have exactly one starting node (no incoming connections)
- All nodes should be reachable through connections

## 📁 Project Structure

```
src/
├── components/
│   ├── CustomNode.jsx      # Individual node component
│   ├── FlowCanvas.jsx      # Main canvas with React Flow
│   ├── NodesPanel.jsx      # Left sidebar with available nodes
│   └── SettingsPanel.jsx   # Right sidebar for editing nodes
├── utils/
│   └── nodeConfig.js       # Node type definitions and mappings
├── App.jsx                 # Main application component
└── index.js               # Application entry point
```

## 🧩 Components

### App.jsx
The main application container that manages global state and coordinates between all components.

**Key Responsibilities:**
- State management for nodes, edges, and selection
- Flow validation logic
- Component coordination and data flow

### FlowCanvas.jsx
The central canvas component built on React Flow that handles the visual flow builder.

**Key Features:**
- Drag and drop node creation
- Connection management with validation
- Node selection and interaction
- Real-time canvas updates

### CustomNode.jsx
Individual node component that represents message nodes in the flow.

**Features:**
- Editable content display
- Remove functionality
- Connection handles
- Professional styling

### NodesPanel.jsx
Left sidebar panel displaying available node types.

**Functionality:**
- Displays available node types
- Drag and drop initiation
- Smooth visibility transitions

### SettingsPanel.jsx
Right sidebar panel for editing selected nodes.

**Features:**
- Real-time text editing
- Form validation
- Back navigation
- Focused editing experience

## ⚙️ Configuration

### Adding New Node Types

To add a new node type, modify `utils/nodeConfig.js`:

1. Create your new node component:
```jsx
// components/NewNodeType.jsx
const NewNodeType = ({ data }) => {
  // Your component implementation
};
export default NewNodeType;
```

2. Add to the configuration:
```javascript
// utils/nodeConfig.js
import NewNodeType from '../components/NewNodeType';

export const NODE_TYPES = [
  // ... existing nodes
  {
    type: 'newNodeType',
    label: 'New Node Type',
    component: NewNodeType
  }
];
```

The node will automatically appear in the nodes panel and be available for use.

### Customizing Styles

The application uses inline styles for maximum compatibility. Key styling areas:

- **Color Scheme**: Modify colors in component style objects
- **Layout**: Adjust dimensions in panel and canvas components
- **Animations**: Update transition properties in style definitions

## 🔧 Development

### Development Guidelines

1. **Code Style**: Follow established patterns in existing components
2. **Comments**: Add comprehensive comments for complex logic
3. **State Management**: Keep state as close to usage as possible
4. **Event Handling**: Use useCallback for performance optimization
5. **Accessibility**: Include proper ARIA labels and keyboard navigation

### Key Dependencies

- **React**: ^18.0.0 - Core framework
- **React Flow**: ^11.0.0 - Flow diagram functionality
- **React Hooks**: useState, useCallback, useEffect, useRef

### Performance Considerations

- Components use React.memo where appropriate
- Event handlers are memoized with useCallback
- State updates are optimized to prevent unnecessary re-renders

### Testing Approach

- Test component rendering and basic interactions
- Validate flow creation and editing workflows
- Ensure accessibility compliance
- Test drag and drop functionality across browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

### Contribution Guidelines

- Maintain existing code style and patterns
- Add comprehensive comments for new features
- Update documentation for any API changes
- Test across multiple browsers
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- None currently reported

## 🗺️ Roadmap

- [ ] Multiple node type support
- [ ] Conditional logic nodes  
- [ ] Flow export/import functionality
- [ ] Advanced validation rules
- [ ] Keyboard shortcuts
- [ ] Undo/redo functionality
- [ ] Flow templates

## 📞 Support

For questions or issues, please:
1. Check the documentation above
2. Search existing issues
3. Create a new issue with detailed information

---

Built with ❤️ using React and React Flow