// BaseNode.js
import { useState } from "react";
import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  inputs = [],
  leftHandles = [],
  rightHandles = [],
  data = {},
  style = {},
  slotTop = null,
  slotBottom = null,
}) => {
  const [state, setState] = useState(data);

  const handleChange = (key) => (e) => {
    setState({
      ...state,
      [key]: e.target.value,
    });
  };

  return (
    <div
      style={{ width: 200, height: 80, border: "1px solid black", ...style }}
    >
      <div>
        <span>{title}</span>
      </div>
      {/* Slot for custom content above the inputs */}
      {slotTop && <div>{slotTop}</div>}
      <div>
        {inputs.map(({ label, key, type = "text", options }) => (
          <label key={key}>
            {label}:
            {type === "select" ? (
              <select value={state[key] || ""} onChange={handleChange(key)}>
                {options.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                value={state[key] || ""}
                onChange={handleChange(key)}
              />
            )}
          </label>
        ))}
      </div>
      {/* Slot for custom content below the inputs */}
      {slotBottom && <div>{slotBottom}</div>}
      {leftHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={handle.id}
          style={handle.style}
        />
      ))}
      {rightHandles.map((handle) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={handle.id}
          style={handle.style}
        />
      ))}
    </div>
  );
};
