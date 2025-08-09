import React, { useState } from "react";
import FlowCanvas from "./components/FlowCanvas";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onChangeLabel = (newLabel) => {
    if (selectedNode) {
      setSelectedNode({
        ...selectedNode,
        data: { ...selectedNode.data, label: newLabel },
      });
    }
  };

  const handleBack = () => {
    setSelectedNode(null);
  };

  const handleNodesChange = (updatedNodes) => setNodes(updatedNodes);
  const handleEdgesChange = (updatedEdges) => setEdges(updatedEdges);

  const handleSave = () => {
    if (nodes.length <= 1) {
      alert("Flow saved successfully!");
      return;
    }

    const nodesWithNoIncoming = nodes.filter((node) => {
      const incomingEdges = edges.filter((edge) => edge.target === node.id);
      return incomingEdges.length === 0;
    });

    if (nodesWithNoIncoming.length > 1) {
      alert(
        "Error: More than one node has empty target handles (no incoming connections). Please fix before saving."
      );
      return;
    }

    alert("Flow saved successfully!");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#f8fafc",
      }}
    >
      {/* Save Button Container */}
      <header
        style={{
          padding: "14px 24px",
          borderBottom: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgb(0 0 0 / 0.1)",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleSave}
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            fontWeight: "600",
            padding: "10px 20px",
            fontSize: 16,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(37, 99, 235, 0.4)",
            transition: "background-color 0.3s ease",
            userSelect: "none",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1d4ed8")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
          aria-label="Save Flow"
          title="Save the current flow"
        >
          Save Flow
        </button>
      </header>

      {/* Main Content Area */}
      <main style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ flex: 1, minHeight: 0 }}>
          <FlowCanvas
            onSelectNode={setSelectedNode}
            selectedNode={selectedNode}
            onNodesChange={handleNodesChange}
            onEdgesChange={handleEdgesChange}
          />
        </div>

        {selectedNode ? (
          <SettingsPanel
            selectedNode={selectedNode}
            onChangeLabel={onChangeLabel}
            onBack={handleBack}
          />
        ) : (
          <NodesPanel visible={!selectedNode} />
        )}
      </main>
    </div>
  );
}

