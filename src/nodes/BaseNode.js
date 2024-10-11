import React, { useState } from "react";
import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  inputs = [],
  leftHandles = [],
  rightHandles = [],
  data = {},
  className = "",
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

  const handleStyle = {
    width: '12px',
    height: '12px',
    border: '2px solid white',
  };

  return (
    <div className={`relative w-64 bg-white rounded-lg shadow-md ${className}`}>
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {slotTop && <div className="px-4 py-2">{slotTop}</div>}
      <div className="px-4 py-2 space-y-2">
        {inputs.map(({ label, key, type = "text", options }) => (
          <label key={key} className="block">
            <span className="text-sm font-medium text-gray-700">{label}:</span>
            {type === "select" ? (
              <select
                value={state[key] || ""}
                onChange={handleChange(key)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            )}
          </label>
        ))}
      </div>
      {slotBottom && <div className="px-4 py-2">{slotBottom}</div>}
      {leftHandles.map((handle, index) => (
        <div
          key={handle.id}
          className="absolute left-0 transform -translate-x-1/2"
          style={{ top: `${(index + 1) * 25}%` }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={handle.id}
            style={{...handleStyle, ...handle.style, backgroundColor: '#3B82F6'}}
          />
        </div>
      ))}
      {rightHandles.map((handle, index) => (
        <div
          key={handle.id}
          className="absolute right-0 transform translate-x-1/2"
          style={{ top: `${(index + 1) * 25}%` }}
        >
          <Handle
            type="source"
            position={Position.Right}
            id={handle.id}
            style={{...handleStyle, ...handle.style, backgroundColor: '#10B981'}}
          />
        </div>
      ))}
    </div>
  );
};