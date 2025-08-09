// import FlowCanvas from './components/FlowCanvas'
// import NodesPanel from './components/NodesPanel'
// export default function App() {
//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//       <div style={{ flex: 1 }}>
//         <FlowCanvas />
//       </div>
//       <NodesPanel />
//     </div>
//   );
// }


import React, { useState } from "react";
import FlowCanvas from "./components/FlowCanvas";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);

  // Update selected node label from SettingsPanel input
  const onChangeLabel = (newLabel) => {
    if (selectedNode) {
      setSelectedNode({
        ...selectedNode,
        data: { ...selectedNode.data, label: newLabel },
      });
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        <FlowCanvas onSelectNode={setSelectedNode} selectedNode={selectedNode} />
      </div>
      {selectedNode ? (
        <SettingsPanel selectedNode={selectedNode} onChangeLabel={onChangeLabel} />
      ) : (
        <NodesPanel visible={!selectedNode} />
      )}
    </div>
  );
}

