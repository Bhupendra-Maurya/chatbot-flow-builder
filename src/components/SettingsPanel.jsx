const SettingsPanel = ({ selectedNode, onChangeLabel, onBack }) => {
  if (!selectedNode) return null;

  return (
    <aside
      style={{
        padding: 20,
        background: "#fafafa",
        borderLeft: "1px solid #e0e0e0",
        transition: "all 0.3s ease",
        width: 300,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxSizing: "border-box",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom: "1px solid #ccc",
          paddingBottom: 12,
          marginBottom: 16,
        }}
      >
        <img
          src="back.png"
          alt="back arrow"
          style={{
            position: "absolute",
            left: 0,
            cursor: "pointer",
            width: 20,
            height: 20,
            userSelect: "none",
          }}
          onClick={onBack}
          draggable={false}
          title="Go back"
        />
        <h4
          style={{
            margin: 0,
            fontWeight: "600",
            fontSize: 20,
            color: "#222",
          }}
        >
          Message
        </h4>
      </div>

      <label
        htmlFor="node-label"
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 14,
          fontWeight: "600",
          color: "#666",
          userSelect: "none",
        }}
      >
        Text
      </label>
      <textarea
        id="node-label"
        value={selectedNode.data.label}
        onChange={(e) => onChangeLabel(e.target.value)}
        rows={4}
        style={{
          width: "100%",
          resize: "vertical",
          borderRadius: 8,
          border: "1px solid #ccc",
          padding: "12px 14px",
          fontSize: 15,
          fontFamily: "inherit",
          color: "#333",
          boxSizing: "border-box",
          outline: "none",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#4ade80"; // A nice green highlight
          e.target.style.boxShadow = "0 0 6px #4ade80aa";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#ccc";
          e.target.style.boxShadow = "none";
        }}
        spellCheck={false}
      />
    </aside>
  );
};

export default SettingsPanel;
