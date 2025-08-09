import FlowCanvas from './components/FlowCanvas'
import NodesPanel from './components/NodesPanel'
export default function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <FlowCanvas />
      </div>
      <NodesPanel />
    </div>
  );
}
