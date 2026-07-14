// BaseNode.js
// Shared wrapper component for all pipeline nodes.
// Handles: container chrome, title bar, Handle rendering
// with automatic vertical positioning.

import { Handle, Position } from 'reactflow';
import './BaseNode.css';

// ─── Handle position helpers ───────────────────────────────────

/**
 * Given the total count of handles on one side and the current index,
 * return the `top` percentage so handles are evenly distributed.
 *
 * For 1 handle  → 50%
 * For 2 handles → 33%, 66%
 * For 3 handles → 25%, 50%, 75%
 */
const getHandleTop = (index, total) => `${((index + 1) * 100) / (total + 1)}%`;

/**
 * Renders a list of Handle elements on a given side.
 *
 * Each handle descriptor:
 *   { id: string, label?: string, style?: object }
 *
 * - `id`    → combined with the node id to form `${nodeId}-${handle.id}`
 * - `style` → optional override; when provided, automatic positioning
 *             is skipped for that handle (future escape-hatch).
 */
const renderHandles = (handles, nodeId, type, position) =>
  handles.map((handle, idx) => (
    <Handle
      key={handle.id}
      type={type}
      position={position}
      id={`${nodeId}-${handle.id}`}
      style={handle.style ?? { top: getHandleTop(idx, handles.length) }}
    />
  ));

// ─── NodeField ─────────────────────────────────────────────────

/**
 * Tiny presentational wrapper for a single field row inside a node.
 * Provides consistent label + control layout across all nodes.
 *
 * Usage:
 *   <NodeField label="Name">
 *     <input ... />
 *   </NodeField>
 */
export const NodeField = ({ label, children }) => (
  <div className="base-node__field">
    <label className="base-node__field-label">
      {label}
      <div className="base-node__field-control">{children}</div>
    </label>
  </div>
);

// ─── BaseNode ──────────────────────────────────────────────────

/**
 * Base wrapper component for every node in the pipeline editor.
 *
 * Props:
 *   id       - ReactFlow node id
 *   title    - Display name shown in the title bar
 *   icon     - Optional emoji / icon string
 *   inputs   - Array of input handle descriptors (left side)
 *   outputs  - Array of output handle descriptors (right side)
 *   children - Node-specific body content
 */
export const BaseNode = ({
  id,
  title,
  icon,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <div className="base-node">
      {/* ── Title bar ── */}
      <div className="base-node__header">
        {icon && <span className="base-node__icon">{icon}</span>}
        <span className="base-node__title">{title}</span>
      </div>

      {/* ── Body ── */}
      <div className="base-node__body">{children}</div>

      {/* ── Handles ── */}
      {renderHandles(inputs, id, 'target', Position.Left)}
      {renderHandles(outputs, id, 'source', Position.Right)}
    </div>
  );
};
