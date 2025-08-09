import { Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

const CustomNode = ({ data }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 6,
      background: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      minWidth: 200
    }}>
      {/* Top Bar */}
      <div style={{
        background: '#a7f3d0',
        padding: '5px 10px',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>📩 Send Message</span>
        <span>🟢</span>
      </div>

      {/* Message */}
      <div style={{ padding: 10 }}>
        {data.label}
      </div>

       {/* Incoming connection */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />
       {/* Outgoing connection */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
  );
};

export default CustomNode;

