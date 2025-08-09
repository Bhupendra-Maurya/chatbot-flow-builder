const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div style={{ width: 200, borderLeft: '1px solid #ccc', background: '#fafafa', padding: 10 }}>
      <strong>Nodes Panel</strong>
      <div
        style={{ border: '1px solid #999', padding: '5px', marginTop: '10px', cursor: 'grab', background: '#eee' }}
        onDragStart={(event) => onDragStart(event, 'sendMessage')}
        draggable
      >
        Send Message Node
      </div>
    </div>
  );
};

export default NodesPanel;
