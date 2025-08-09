import React, { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
} from 'reactflow';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';

const nodeTypes = { custom: CustomNode };

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) =>
    setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const nodeType = event.dataTransfer.getData('application/reactflow');
    if (!nodeType) return;

    const position = { x: event.clientX - 250, y: event.clientY - 50 };
    const newNode = {
      id: `${+new Date()}`,
      type: 'custom',
      position,
      data: { label: 'test message 2' },
    };

    setNodes((nds) => nds.concat(newNode));
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div style={{ flex: 1, height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}
