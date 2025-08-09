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
      {/* Top Bar */}
      <div
        style={{
          background: "#a7f3d0",
          padding: "5px 10px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>📩 Send Message</span>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: 8 }}></span>
          <button
            onClick={data.onRemove}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: 16,
              lineHeight: 1,
              color: "#900",
              padding: 0,
              userSelect: "none",
            }}
            aria-label="Remove node"
          >
            ×
          </button>
        </div>
      </div>

      {/* Message */}
      <div
        style={{
          padding: 10,
          whiteSpace: "pre-wrap",
          fontFamily: "inherit",
        }}
      >
        {data.label}
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </div>
  );
};

export default CustomNode;
