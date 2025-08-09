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

const proOptions = { hideAttribution: true };
export default function FlowCanvas({ onSelectNode, selectedNode, onNodesChange, onEdgesChange }) {
  const [nodes, setNodes, rfOnNodesChange] = useNodesState([]);
  const [edges, setEdges, rfOnEdgesChange] = useEdgesState([]);
  const nodeIdCounter = useRef(1);

  // Remove node and connected edges
  const removeNode = useCallback(
    (id) => {
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    },
    [setNodes, setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      const hasOutgoing = edges.some(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      if (hasOutgoing) {
        alert("Only one outgoing connection is allowed from this handle.");
        return;
      }

      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [edges]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = { x: event.clientX - 250, y: event.clientY - 40 };
      const id = `${type}-${+new Date()}`;

      const newNode = {
        id,
        type,
        position,
        data: {
          label: `text message ${nodeIdCounter.current}`,
          onRemove: () => removeNode(id),
        },
      };
      nodeIdCounter.current += 1;
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, removeNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle edge deletion on click
  const onEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    if (window.confirm("Delete this connection?")) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
  }, []);

  // Handle node click to select
  const onNodeClick = useCallback(
    (event, node) => {
      event.stopPropagation();
      onSelectNode(node);
    },
    [onSelectNode]
  );

  // Clear selection when clicking on blank space
  const onPaneClick = useCallback(() => {
    onSelectNode(null);
  }, [onSelectNode]);

  // Keep parent updated about nodes and edges changes
  useEffect(() => {
    onNodesChange && onNodesChange(nodes);
  }, [nodes, onNodesChange]);

  useEffect(() => {
    onEdgesChange && onEdgesChange(edges);
  }, [edges, onEdgesChange]);

  // Allow editing the label from parent
  useEffect(() => {
    if (selectedNode) {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNode.id ? { ...node, data: selectedNode.data } : node
        )
      );
    }
  }, [selectedNode, setNodes]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypesMap}
        onNodesChange={rfOnNodesChange}
        onEdgesChange={rfOnEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onEdgeClick={onEdgeClick}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
         proOptions={proOptions}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
