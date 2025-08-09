/**
 * CustomNode Component
 * 
 * A React Flow custom node component that represents a message node in the flow builder.
 * Features:
 * - Visual representation of a message with customizable content
 * - Remove functionality with confirmation
 * - Input/output handles for flow connections
 * - Clean, professional UI with hover states
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Node data containing label and callbacks
 * @param {string} props.data.label - The message content to display
 * @param {Function} props.data.onRemove - Callback function to remove this node
 */

import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";

const CustomNode = ({ data }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 6,
        background: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        minWidth: 200,
      }}
    >
      {/* 
        Top Bar Section
        Contains the node type indicator and remove button
        Uses a light green background to distinguish message nodes
      */}
      <div
        style={{
          background: "#a7f3d0", // Light green background for message nodes
          padding: "5px 10px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Node type indicator with emoji for visual clarity */}
        <span>📩 Send Message</span>
        
        {/* Action buttons container */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Spacer element for future actions */}
          <span style={{ marginRight: 8 }}></span>
          
          {/* Remove button - styled as a simple X with hover effects */}
          <button
            onClick={data.onRemove}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: 1,
              color: "#900", // Dark red color for delete action
              padding: 0,
              userSelect: "none", // Prevent text selection on button
            }}
            aria-label="Remove node"
            title="Remove this node from the flow"
          >
            ×
          </button>
        </div>
      </div>

      {/* 
        Message Content Section
        Displays the actual message content with proper text wrapping
        Uses pre-wrap to preserve line breaks and formatting
      */}
      <div
        style={{
          padding: 10,
          whiteSpace: "pre-wrap", // Preserve line breaks and spaces
          fontFamily: "inherit", // Use parent font family
        }}
      >
        {data.label}
      </div>

      {/* 
        React Flow Connection Handles
        These allow the node to be connected to other nodes in the flow
      */}
      
      {/* Input handle on the left side - receives connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        aria-label="Input connection point"
      />
      
      {/* Output handle on the right side - creates connections */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
        aria-label="Output connection point"
      />
    </div>
  );
};

export default CustomNode;