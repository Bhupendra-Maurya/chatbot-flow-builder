// import CustomNode from '../components/CustomNode';

// // List of available node types for the panel
// export const NODE_TYPES = [
//   { type: 'sendMessage', label: 'New Node', component: CustomNode },
//   // We can add more node types later, e.g.:
//   // { type: 'delay', label: 'Delay', component: DelayNode },
// ];

// // Map type -> component for React Flow
// export const nodeTypesMap = NODE_TYPES.reduce((map, node) => {
//   map[node.type] = node.component;
//   return map;
// }, {});




/**
 * Node Configuration Module
 * 
 * Centralized configuration for all node types available in the flow builder.
 * This module serves as the single source of truth for node definitions,
 * making it easy to add new node types or modify existing ones.
 * 
 * The configuration drives both the nodes panel display and React Flow's
 * component mapping system, ensuring consistency across the application.
 */

import CustomNode from '../components/CustomNode';

/**
 * Array of available node types for the flow builder
 * Each node type defines its basic properties and associated React component
 * 
 * @typedef {Object} NodeType
 * @property {string} type - Unique identifier for the node type (used in React Flow)
 * @property {string} label - Human-readable display name for the nodes panel
 * @property {React.Component} component - React component to render this node type
 */
export const NODE_TYPES = [
  {
    type: 'sendMessage',        // Internal identifier
    label: 'New Node',          // Display name in nodes panel
    component: CustomNode       // React component to render
  },
  
  // Future node types can be added here following the same pattern:
  // {
  //   type: 'delay',
  //   label: 'Delay Node', 
  //   component: DelayNode
  // },
  // {
  //   type: 'condition',
  //   label: 'Condition Node',
  //   component: ConditionNode
  // },
  // {
  //   type: 'webhook',
  //   label: 'Webhook Node',
  //   component: WebhookNode
  // }
];

/**
 * React Flow node types mapping
 * 
 * Converts the NODE_TYPES array into the format expected by React Flow's
 * nodeTypes prop. This mapping tells React Flow which component to use
 * for each node type when rendering the flow diagram.
 * 
 * The reduce function transforms:
 * [{ type: 'sendMessage', component: CustomNode }]
 * 
 * Into:
 * { sendMessage: CustomNode }
 * 
 * @type {Object<string, React.Component>}
 */
export const nodeTypesMap = NODE_TYPES.reduce((map, node) => {
  map[node.type] = node.component;
  return map;
}, {});

