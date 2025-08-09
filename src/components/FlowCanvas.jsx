/**
 * FlowCanvas Component
 * 
 * The main React Flow canvas component that handles the visual flow builder interface.
 * Manages the flow diagram with nodes and edges, drag-and-drop functionality,
 * node selection, and connection validation.
 * 
 * Features:
 * - Drag and drop nodes from panel
 * - Connect nodes with validated connections (one outgoing per handle)
 * - Node selection and editing
 * - Edge deletion with confirmation
 * - Real-time synchronization with parent component
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onSelectNode - Callback when a node is selected/deselected
 * @param {Object|null} props.selectedNode - Currently selected node data
 * @param {Function} props.onNodesChange - Callback when nodes array changes
 * @param {Function} props.onEdgesChange - Callback when edges array changes
 */

import { useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypesMap } from "../utils/nodeConfig.js";

// Configuration to hide React Flow attribution
const proOptions = { hideAttribution: true };

export default function FlowCanvas({ 
  onSelectNode, 
  selectedNode, 
  onNodesChange, 
  onEdgesChange 
}) {
  // React Flow state management hooks
  const [nodes, setNodes, rfOnNodesChange] = useNodesState([]);
  const [edges, setEdges, rfOnEdgesChange] = useEdgesState([]);
  
  // Counter for generating unique node IDs
  const nodeIdCounter = useRef(1);

  /**
   * Removes a node and all its connected edges from the flow
   * Called when user clicks the remove button on a node
   * 
   * @param {string} id - The ID of the node to remove
   */
  const removeNode = useCallback(
    (id) => {
      // Remove the node from nodes array
      setNodes((nds) => nds.filter((node) => node.id !== id));
      
      // Remove all edges connected to this node (both incoming and outgoing)
      setEdges((eds) => eds.filter((edge) => 
        edge.source !== id && edge.target !== id
      ));
    },
    [setNodes, setEdges]
  );

  /**
   * Handles connection attempts between nodes
   * Validates that each source handle can only have one outgoing connection
   * 
   * @param {Object} params - Connection parameters from React Flow
   * @param {string} params.source - Source node ID
   * @param {string} params.target - Target node ID
   * @param {string} params.sourceHandle - Source handle ID
   * @param {string} params.targetHandle - Target handle ID
   */
  const onConnect = useCallback(
    (params) => {
      // Check if the source handle already has an outgoing connection
      const hasOutgoing = edges.some(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      // Prevent multiple outgoing connections from the same handle
      if (hasOutgoing) {
        alert("Only one outgoing connection is allowed from this handle.");
        return;
      }

      // Create the new edge with animation
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [edges]
  );

  /**
   * Handles drop events when dragging nodes from the panel onto the canvas
   * Creates a new node at the drop position with auto-generated ID and label
   * 
   * @param {DragEvent} event - The drop event
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      
      // Get the node type from drag data
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      // Calculate position relative to canvas (accounting for panel width)
      const position = { 
        x: event.clientX - 250, // Offset for left panel
        y: event.clientY - 40   // Offset for header
      };
      
      // Generate unique ID using timestamp
      const id = `${type}-${+new Date()}`;

      // Create new node with default data
      const newNode = {
        id,
        type,
        position,
        data: {
          label: `text message ${nodeIdCounter.current}`,
          onRemove: () => removeNode(id), // Bind remove function
        },
      };
      
      // Increment counter for next node
      nodeIdCounter.current += 1;
      
      // Add the new node to the canvas
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, removeNode]
  );

  /**
   * Handles drag over events to enable dropping
   * Required for HTML5 drag and drop to work properly
   * 
   * @param {DragEvent} event - The drag over event
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move"; // Show move cursor
  }, []);

  /**
   * Handles edge click events for deletion
   * Shows confirmation dialog before removing the connection
   * 
   * @param {MouseEvent} event - The click event
   * @param {Object} edge - The edge object that was clicked
   */
  const onEdgeClick = useCallback((event, edge) => {
    event.stopPropagation(); // Prevent canvas deselection
    
    // Confirm before deletion
    if (window.confirm("Delete this connection?")) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
  }, [setEdges]);

  /**
   * Handles node click events for selection
   * Notifies parent component about the selected node
   * 
   * @param {MouseEvent} event - The click event
   * @param {Object} node - The node object that was clicked
   */
  const onNodeClick = useCallback(
    (event, node) => {
      event.stopPropagation(); // Prevent canvas deselection
      onSelectNode(node); // Notify parent of selection
    },
    [onSelectNode]
  );

  /**
   * Handles clicks on empty canvas space
   * Clears the current node selection
   */
  const onPaneClick = useCallback(() => {
    onSelectNode(null); // Clear selection
  }, [onSelectNode]);

  // Effect: Sync nodes with parent component
  useEffect(() => {
    onNodesChange && onNodesChange(nodes);
  }, [nodes, onNodesChange]);

  // Effect: Sync edges with parent component
  useEffect(() => {
    onEdgesChange && onEdgesChange(edges);
  }, [edges, onEdgesChange]);

  // Effect: Update node data when parent passes changes (for editing)
  useEffect(() => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id 
            ? { ...node, data: selectedNode.data } 
            : node
        )
      );
    }
  }, [selectedNode, setNodes]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        // Core data
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypesMap} // Custom node type mappings
        
        // Event handlers
        onNodesChange={rfOnNodesChange} // React Flow internal changes
        onEdgesChange={rfOnEdgesChange} // React Flow internal changes
        onConnect={onConnect}           // Node connection events
        onDrop={onDrop}                // Drag and drop events
        onDragOver={onDragOver}        // Drag over events
        onEdgeClick={onEdgeClick}      // Edge interaction events
        onNodeClick={onNodeClick}      // Node interaction events
        onPaneClick={onPaneClick}      // Canvas click events
        
        // Configuration
        proOptions={proOptions}        // Hide attribution
      >
        {/* Visual enhancements */}
        <Background />  {/* Grid/dot pattern background */}
        <MiniMap />     {/* Small overview map */}
        <Controls />    {/* Zoom and pan controls */}
      </ReactFlow>
    </div>
  );
}