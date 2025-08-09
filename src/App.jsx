import FlowCanvas from "./components/FlowCanvas";
import NodesPanel from "./components/NodesPanel";
import { ReactFlowProvider } from "@xyflow/react";

export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ReactFlowProvider>
        <FlowCanvas />
        <NodesPanel />
      </ReactFlowProvider>
    </div>
  );
}
