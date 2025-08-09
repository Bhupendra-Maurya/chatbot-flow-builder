import { NODE_TYPES } from "../utils/nodeConfig.js";

const NodesPanel = ({ visible }) => {
  return (
    <aside
      style={{
        padding: 16,
        background: "#fafafa",
        borderRight: "1px solid #e0e0e0",
        width: 280,
        transition: "opacity 0.3s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        boxSizing: "border-box",
        userSelect: "none",
      }}
    >
      <h4
        style={{
          marginBottom: 16,
          marginTop: 12,
          fontWeight: "600",
          color: "#333",
          fontSize: 18,
          borderBottom: "1px solid #ddd",
          paddingBottom: 8,
        }}
      >
        Nodes Panel
      </h4>

      {NODE_TYPES.map((node) => (
        <div
          key={node.type}
          style={{
            padding: "10px 12px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 6,
            cursor: "grab",
            marginBottom: 12,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            fontWeight: "500",
            color: "#222",
            userSelect: "none",
            transition: "box-shadow 0.2s ease",
          }}
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData("application/reactflow", node.type);
            event.dataTransfer.effectAllowed = "move";
          }}
          onMouseDown={(e) => e.currentTarget.style.cursor = "grabbing"}
          onMouseUp={(e) => e.currentTarget.style.cursor = "grab"}
          onMouseLeave={(e) => e.currentTarget.style.cursor = "grab"}
          title={`Drag to add a ${node.label} node`}
        >
          {node.label}
        </div>
      ))}
    </aside>
  );
};

export default NodesPanel;
