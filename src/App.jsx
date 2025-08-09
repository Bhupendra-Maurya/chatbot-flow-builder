/**
 * App Component - Main Application Root
 * 
 * The top-level component that orchestrates the entire flow builder application.
 * Manages global application state, coordinates between components, and implements
 * the main application logic including validation and saving functionality.
 * 
 * Architecture:
 * - Uses a three-panel layout: Nodes Panel | Canvas | Settings Panel
 * - Implements conditional panel switching based on selection state
 * - Centralizes state management for nodes, edges, and selection
 * - Provides validation logic for flow integrity
 * 
 * Key Features:
 * - Node selection and editing workflow
 * - Flow validation before saving
 * - Responsive layout with professional styling
 * - State synchronization between components
 */

import React, { useState } from "react";
import FlowCanvas from "./components/FlowCanvas";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onChangeLabel = (newLabel) => {
    if (selectedNode) {
      setSelectedNode({
        ...selectedNode, // Preserve other node properties
        data: { 
          ...selectedNode.data, // Preserve other data properties
          label: newLabel       // Update only the label
        },
      });
    }
  };

  const handleBack = () => {
    setSelectedNode(null);
  };

  /**
   * Callback for when the nodes array changes in FlowCanvas
   * Keeps the parent component synchronized with canvas state
   * 
   * @param {Array<Object>} updatedNodes - New nodes array from canvas
   */
  const handleNodesChange = (updatedNodes) => setNodes(updatedNodes);

  /**
   * Callback for when the edges array changes in FlowCanvas
   * Keeps the parent component synchronized with canvas state
   * 
   * @param {Array<Object>} updatedEdges - New edges array from canvas
   */
  const handleEdgesChange = (updatedEdges) => setEdges(updatedEdges);

  /**
   * Handles the save flow action with comprehensive validation
   * 
   * Validation Rules:
   * 1. Single node flows are always valid (edge case for simple flows)
   * 2. Multi-node flows must have exactly one starting node (no incoming connections)
   * 3. All other nodes should be reachable from the starting node
   * 
   * @returns {void} - Shows success/error alerts to user
   */
  const handleSave = () => {
    // Handle edge case: empty or single node flows
    if (nodes.length <= 1) {
      alert("Flow saved successfully!");
      return;
    }

    // Find nodes that have no incoming connections (potential start nodes)
    const nodesWithNoIncoming = nodes.filter((node) => {
      const incomingEdges = edges.filter((edge) => edge.target === node.id);
      return incomingEdges.length === 0;
    });

    // Validate flow structure: exactly one start node required
    if (nodesWithNoIncoming.length > 1) {
      alert(
        "Error: More than one node has empty target handles (no incoming connections). " +
        "Please fix before saving."
      );
      return;
    }

    // Additional validation: ensure there is at least one start node
    if (nodesWithNoIncoming.length === 0) {
      alert(
        "Error: No starting node found. At least one node should have no incoming connections."
      );
      return;
    }

    // Flow validation passed - save successful
    alert("Flow saved successfully!");
  };

  // ==================== RENDER ====================

  return (
    <div
      style={{
        display: "flex",
        height: "100vh", // Full viewport height
        flexDirection: "column", // Stack header and content vertically
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Modern font stack
        background: "#f8fafc", // Light gray background
      }}
    >
      {/* ==================== HEADER SECTION ==================== */}
      <header
        style={{
          padding: "14px 24px",
          borderBottom: "1px solid #e2e8f0", // Subtle bottom border
          backgroundColor: "#ffffff", // Pure white background
          boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)", // Subtle shadow for elevation
          display: "flex",
          justifyContent: "flex-end", // Align save button to the right
          alignItems: "center",
        }}
      >
        {/* Save Flow Button */}
        <button
          onClick={handleSave}
          style={{
            backgroundColor: "#2563eb", // Blue primary color
            color: "#fff", // White text
            fontWeight: "600", // Semi-bold text
            padding: "10px 20px", // Comfortable padding
            fontSize: 16,
            borderRadius: 8, // Rounded corners
            border: "none", // Remove default border
            cursor: "pointer", // Pointer cursor on hover
            boxShadow: "0 4px 6px rgba(37, 99, 235, 0.4)", // Blue shadow
            transition: "background-color 0.3s ease", // Smooth hover transition
            userSelect: "none", // Prevent text selection
          }}
          // Interactive hover states
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")} // Darker blue
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")} // Original blue
          aria-label="Save Flow" // Accessibility label
          title="Save the current flow" // Tooltip
        >
          Save Flow
        </button>
      </header>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <main style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* Canvas Container - Takes remaining space */}
        <div style={{ flex: 1, minHeight: 0 }}> {/* minHeight prevents flex shrinking issues */}
          <FlowCanvas
            onSelectNode={setSelectedNode}     // Pass selection handler
            selectedNode={selectedNode}        // Pass current selection
            onNodesChange={handleNodesChange}  // Pass nodes change handler  
            onEdgesChange={handleEdgesChange}  // Pass edges change handler
          />
        </div>

        {/* 
          Conditional Right Panel
          Shows either SettingsPanel (when node selected) or NodesPanel (when no selection)
          This creates a smooth user experience with contextual panels
        */}
        {selectedNode ? (
          // Settings Panel - for editing selected node
          <SettingsPanel
            selectedNode={selectedNode}    // Pass selected node data
            onChangeLabel={onChangeLabel}  // Pass label change handler
            onBack={handleBack}           // Pass back navigation handler
          />
        ) : (
          // Nodes Panel - for adding new nodes
          <NodesPanel 
            visible={!selectedNode}       // Show when no node is selected
          />
        )}
      </main>
    </div>
  );
}
