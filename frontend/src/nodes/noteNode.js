// noteNode.js
// A non-functional sticky-note node with zero handles.
// Demonstrates that the abstraction works for pure-display nodes.

import { BaseNode, NodeField } from './BaseNode';
import { useNodeField } from './useNodeField';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useNodeField(
    id,
    'note',
    data?.note || '',
  );

  return (
    <BaseNode id={id} title="Note" icon="🗒️" accent="var(--node-note)">
      <NodeField label="Note">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note…"
          rows={3}
        />
      </NodeField>
    </BaseNode>
  );
};
