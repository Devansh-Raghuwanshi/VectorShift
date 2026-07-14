// nodeRegistry.js
// Single source of truth for all node types in the pipeline editor.
//
// To add a new node:
//   1. Create the component in src/nodes/
//   2. Import it here
//   3. Add one entry to the `registry` array
//
// ui.js and toolbar.js both consume this file — no further edits needed.

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { NoteNode } from './nodes/noteNode';
import { MathNode } from './nodes/mathNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { MergeNode } from './nodes/mergeNode';
import { ApiCallNode } from './nodes/apiCallNode';

const registry = [
  // ── Original nodes ──
  { type: 'customInput',  label: 'Input',       component: InputNode },
  { type: 'llm',          label: 'LLM',         component: LLMNode },
  { type: 'customOutput', label: 'Output',      component: OutputNode },
  { type: 'text',         label: 'Text',        component: TextNode },

  // ── New nodes (Part 1 demos) ──
  { type: 'note',         label: 'Note',        component: NoteNode },
  { type: 'math',         label: 'Math',        component: MathNode },
  { type: 'conditional',  label: 'Conditional', component: ConditionalNode },
  { type: 'merge',        label: 'Merge',       component: MergeNode },
  { type: 'apiCall',      label: 'API Call',    component: ApiCallNode },
];

/**
 * ReactFlow `nodeTypes` map — keyed by type string, valued by component.
 * Pass directly to <ReactFlow nodeTypes={nodeTypes} />.
 */
export const nodeTypes = Object.fromEntries(
  registry.map((entry) => [entry.type, entry.component]),
);

/**
 * Toolbar items — used by PipelineToolbar to render DraggableNode buttons.
 * Each item has { type, label }.
 */
export const nodeList = registry.map(({ type, label }) => ({ type, label }));
