import React from 'react';
import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

export default function CustomNode({ data }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 8,
      width: 200,
      background: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    }}>
      {/* Header */}
      <div style={{
        background: '#a7f3d0',
        padding: '5px 10px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>Send Message</span>
        <span>💬</span>
      </div>

      {/* Message Body */}
      <div style={{ padding: 10 }}>
        {data.label || 'Default message'}
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
