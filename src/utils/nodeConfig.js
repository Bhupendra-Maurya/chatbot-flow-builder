import CustomNode from '../components/CustomNode';

// List of available node types for the panel
export const NODE_TYPES = [
  { type: 'sendMessage', label: 'New Node', component: CustomNode },
  // We can add more node types later, e.g.:
  // { type: 'delay', label: 'Delay', component: DelayNode },
];

// Map type -> component for React Flow
export const nodeTypesMap = NODE_TYPES.reduce((map, node) => {
  map[node.type] = node.component;
  return map;
}, {});
