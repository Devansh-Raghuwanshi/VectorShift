// textNode.js

import { useMemo, useEffect, useRef } from 'react';
import { BaseNode, NodeField } from './BaseNode';
import { useNodeField } from './useNodeField';

// ─── Variable Parsing ──────────────────────────────────────────
//
// Pattern: {{ variableName }}
//
// A valid JavaScript identifier starts with a letter, underscore, or
// dollar sign, followed by zero or more letters, digits, underscores,
// or dollar signs. Whitespace inside the braces is allowed and trimmed.
//
// Examples that match:   {{ input }}, {{myVar}}, {{ _private }}, {{ $ref }}
// Examples that DON'T:   {{ 3abc }}, {{ my-var }}, {{ }}, {{  }}

const VARIABLE_PATTERN = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

/**
 * Extracts unique variable names from text.
 * Returns a stable array of strings (insertion-ordered, no duplicates).
 */
function parseVariables(text) {
  const seen = new Set();
  for (const match of text.matchAll(VARIABLE_PATTERN)) {
    seen.add(match[1]);
  }
  return [...seen];
}


// ─── TextNode Component ────────────────────────────────────────

export const TextNode = ({ id, data }) => {
  const [text, setText] = useNodeField(id, 'text', data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // ── Variable parsing ──
  // useMemo ensures we only re-parse when the text actually changes,
  // avoiding unnecessary Handle re-renders.
  const variables = useMemo(() => parseVariables(text), [text]);

  // Convert variable names into BaseNode handle descriptors.
  const dynamicInputs = useMemo(
    () => variables.map((name) => ({ id: name })),
    [variables],
  );

  // ── Auto-resize height ──
  // On every text change, reset the textarea height to 'auto' (collapses
  // it to its min-height), then immediately set it to its scrollHeight
  // so it grows/shrinks to exactly fit the content.
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, [text]);

  // ── Auto-resize width ──
  // Compute a node width based on the longest line in the text.
  // Uses ~7.2px per character (approximate for 12px Inter), plus
  // padding from the field control and node body (≈56px total).
  // Clamped between 220px (BaseNode min) and 500px.
  const nodeStyle = useMemo(() => {
    const lines = text.split('\n');
    const maxLen = Math.max(...lines.map((line) => line.length), 0);
    const width = Math.max(220, Math.min(maxLen * 7.2 + 56, 500));
    return { maxWidth: 'none', width: `${width}px` };
  }, [text]);

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      accent="var(--node-text)"
      style={nodeStyle}
      inputs={dynamicInputs}
      outputs={[{ id: 'output' }]}
    >
      <NodeField label="Text">
        <textarea
          ref={textareaRef}
          className="text-node__textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={1}
        />
      </NodeField>
    </BaseNode>
  );
};
