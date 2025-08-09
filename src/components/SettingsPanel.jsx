const SettingsPanel = ({ selectedNode, onChangeLabel }) => {
  if (!selectedNode) return null;

  return (
    <aside
      style={{
        padding: 10,
        background: "#f9f9f9",
        borderLeft: "1px solid #ddd",
        transition: "all 0.3s ease",
        width: 300,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderBottom:"1px solid black",
          paddingBottom:"10px",
          marginBottom:"10px",
        }}
      >
        <img
          src="back.png"
          alt="back arrow"
          className="w-4 h-4"
          style={{ position: "absolute", left: 0, cursor: "pointer" }}
          onClick={() => (window.location.href = "/node-panel")} // your state setter to show node panel
        />{" "}
        <h4
          style={{
            marginBottom: 12,
            fontWeight: "normal",
            color: "#333",
            margin: 0,
          }}
        >
          Message
        </h4>
      </div>

      <label
        htmlFor="node-label"
        style={{
          display: "block",
          marginBottom: 6,
          fontSize: 14,
          color: "gray",
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
          borderRadius: 6,
          border: "1px solid #ccc",
          padding: "10px 12px",
          fontSize: 14,
          fontFamily: "inherit",
          color: "#333",
          boxSizing: "border-box",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#a7f3d0")}
        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
      />
    </aside>
  );
};

export default SettingsPanel;
