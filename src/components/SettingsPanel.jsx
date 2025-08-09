/**
 * SettingsPanel Component
 * 
 * A sidebar panel that allows editing properties of the currently selected node.
 * Provides a clean interface for modifying node data with real-time updates.
 * 
 * Features:
 * - Conditional rendering (only shows when a node is selected)
 * - Real-time text editing with immediate feedback
 * - Back navigation to return to nodes panel
 * - Professional styling with focus states
 * - Accessible form controls with proper labeling
 * 
 * @param {Object} props - Component props
 * @param {Object|null} props.selectedNode - The currently selected node object, null if none
 * @param {Function} props.onChangeLabel - Callback function when text content changes
 * @param {Function} props.onBack - Callback function for back button navigation
 */

const SettingsPanel = ({ selectedNode, onChangeLabel, onBack }) => {
  // Early return if no node is selected - component doesn't render
  if (!selectedNode) return null;

  return (
    <aside
      style={{
        padding: 20,
        background: "#fafafa", // Light background to match nodes panel
        borderLeft: "1px solid #e0e0e0", // Left border for separation
        transition: "all 0.3s ease", // Smooth transitions for animations
        width: 300, // Fixed width for consistent layout
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", // Modern font stack
        boxSizing: "border-box", // Include padding in width calculation
        userSelect: "none", // Prevent accidental text selection in UI elements
      }}
    >
      {/* 
        Header Section
        Contains back button and panel title with centered layout
      */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center the title
          position: "relative", // Allow absolute positioning of back button
          borderBottom: "1px solid #ccc", // Visual separator
          paddingBottom: 12,
          marginBottom: 16,
        }}
      >
        {/* Back Navigation Button */}
        <img
          src="back.png" // External image asset for back arrow
          alt="back arrow"
          style={{
            position: "absolute", // Position on the left
            left: 0,
            cursor: "pointer", // Indicate clickable nature
            width: 20,
            height: 20,
            userSelect: "none", // Prevent selection
          }}
          onClick={onBack} // Navigate back to nodes panel
          draggable={false} // Prevent accidental dragging
          title="Go back" // Tooltip for accessibility
        />
        
        {/* Panel Title */}
        <h4
          style={{
            margin: 0, // Remove default margins
            fontWeight: "600", // Semi-bold text
            fontSize: 20,
            color: "#222", // Dark color for readability
          }}
        >
          Message
        </h4>
      </div>

      {/* 
        Form Section
        Contains the editable text area for node content
      */}
      
      {/* Form Label */}
      <label
        htmlFor="node-label" // Associate with textarea for accessibility
        style={{
          display: "block",
          marginBottom: 8,
          fontSize: 14,
          fontWeight: "600",
          color: "#666", // Muted color for secondary text
          userSelect: "none", // Prevent selection of label text
        }}
      >
        Text
      </label>
      
      {/* Text Input Area */}
      <textarea
        id="node-label" // Matches label's htmlFor attribute
        value={selectedNode.data.label} // Controlled component
        onChange={(e) => onChangeLabel(e.target.value)} // Real-time updates
        rows={4} // Default height
        style={{
          width: "100%", // Full width of container
          resize: "vertical", // Allow vertical resizing only
          borderRadius: 8, // Rounded corners for modern look
          border: "1px solid #ccc", // Light border
          padding: "12px 14px", // Comfortable padding
          fontSize: 15,
          fontFamily: "inherit", // Use parent font
          color: "#333", // Dark text for readability
          boxSizing: "border-box", // Include padding in width
          outline: "none", // Remove default browser outline
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)", // Subtle shadow
          transition: "border-color 0.25s ease, box-shadow 0.25s ease", // Smooth focus transitions
        }}
        
        // Focus state styling - applied via JavaScript for cross-browser compatibility
        onFocus={(e) => {
          e.target.style.borderColor = "#4ade80"; // Green highlight border
          e.target.style.boxShadow = "0 0 6px #4ade80aa"; // Glowing shadow effect
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#ccc"; // Return to default border
          e.target.style.boxShadow = "none"; // Remove glow effect
        }}
        
        spellCheck={false} // Disable spellcheck for cleaner UI
        placeholder="Enter your message text..." // Helpful placeholder
        aria-describedby="text-help" // Connect to help text for screen readers
      />
      
      {/* Optional: Help text for users */}
      <div
        id="text-help"
        style={{
          fontSize: 12,
          color: "#888",
          marginTop: 6,
          fontStyle: "italic",
        }}
      >
        This text will be displayed in the message node
      </div>
    </aside>
  );
};

export default SettingsPanel;