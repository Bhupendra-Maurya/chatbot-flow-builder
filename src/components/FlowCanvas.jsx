import React, { useCallback, useRef } from "react";
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

export default function FlowCanvas({ onSelectNode, selectedNode }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const nodeIdCounter = useRef(1);

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
      const newNode = {
        id: `${type}-${+new Date()}`,
        type,
        position,
        data: { label: `text message ${nodeIdCounter.current}` },
      };
      nodeIdCounter.current += 1;
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
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

  // Allow editing the label from parent
  React.useEffect(() => {
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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onEdgeClick={onEdgeClick}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}

