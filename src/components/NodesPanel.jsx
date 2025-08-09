/**
 * NodesPanel Component
 * 
 * A sidebar panel that displays available node types that can be dragged onto the canvas.
 * Provides the node palette for the flow builder interface with drag-and-drop functionality.
 * 
 * Features:
 * - Displays all available node types from configuration
 * - HTML5 drag and drop implementation
 * - Smooth visibility transitions
 * - Visual feedback during drag operations
 * - Accessibility support with tooltips and labels
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Controls visibility and interaction state of the panel
 */

import { NODE_TYPES } from "../utils/nodeConfig.js";

const NodesPanel = ({ visible }) => {
  return (
    <aside
      style={{
        padding: 16,
        background: "#fafafa", // Light gray background
        borderRight: "1px solid #e0e0e0", // Subtle border
        width: 280, // Fixed width for consistent layout
        transition: "opacity 0.3s ease", // Smooth show/hide transition
        opacity: visible ? 1 : 0, // Fade in/out based on visibility
        pointerEvents: visible ? "auto" : "none", // Disable interactions when hidden
        boxSizing: "border-box", // Include padding in width calculation
        userSelect: "none", // Prevent text selection in UI elements
      }}
    >
      {/* Panel Header */}
      <h4
        style={{
          marginBottom: 16,
          marginTop: 12,
          fontWeight: "600",
          color: "#333",
          fontSize: 18,
          borderBottom: "1px solid #ddd", // Separator line
          paddingBottom: 8,
        }}
      >
        Nodes Panel
      </h4>

      {/* 
        Render each available node type as a draggable item
        Maps through NODE_TYPES configuration to create consistent items
      */}
      {NODE_TYPES.map((node) => (
        <div
          key={node.type} // Unique key for React reconciliation
          style={{
            padding: "10px 12px",
            background: "#fff", // White background for contrast
            border: "1px solid #ccc", // Light border
            borderRadius: 6, // Rounded corners
            cursor: "grab", // Indicates draggable nature
            marginBottom: 12, // Space between items
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)", // Subtle shadow
            fontWeight: "500",
            color: "#222", // Dark text for readability
            userSelect: "none", // Prevent text selection
            transition: "box-shadow 0.2s ease", // Smooth shadow transition
          }}
          
          // HTML5 Drag and Drop API setup
          draggable={true} // Enable dragging
          onDragStart={(event) => {
            // Store node type data for drop handler
            event.dataTransfer.setData("application/reactflow", node.type);
            event.dataTransfer.effectAllowed = "move"; // Set drag effect
          }}
          
          // Visual feedback during drag interaction
          onMouseDown={(e) => {
            // Change cursor to grabbing when mouse is pressed
            e.currentTarget.style.cursor = "grabbing";
          }}
          onMouseUp={(e) => {
            // Reset cursor when mouse is released
            e.currentTarget.style.cursor = "grab";
          }}
          onMouseLeave={(e) => {
            // Reset cursor when mouse leaves the element
            e.currentTarget.style.cursor = "grab";
          }}
          
          // Accessibility and user experience
          title={`Drag to add a ${node.label} node`} // Tooltip for guidance
          role="button" // Screen reader support
          tabIndex={0} // Keyboard navigation support
        >
          {/* Display the human-readable label for the node type */}
          {node.label}
        </div>
      ))}
    </aside>
  );
};

export default NodesPanel;