import React from 'react';
import { NODE_TYPES } from '../utils/nodeConfig.js';

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ padding: 10, background: '#f4f4f4', borderRight: '1px solid #ddd' }}>
      <h4>Nodes Panel</h4>
      {NODE_TYPES.map((node) => (
        <div
          key={node.type}
          style={{
            padding: 8,
            marginBottom: 6,
            background: 'white',
            border: '1px solid #ccc',
            cursor: 'grab',
          }}
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
        >
          {node.label}
        </div>
      ))}
    </aside>
  );
};

export default NodesPanel;
