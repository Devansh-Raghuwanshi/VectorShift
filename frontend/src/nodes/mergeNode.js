// mergeNode.js
// Combines multiple data streams into one.
// Three named inputs → one output.
// Demonstrates many-to-one handle topology.

import { BaseNode, NodeField } from './BaseNode';
import { useNodeField } from './useNodeField';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useNodeField(
    id,
    'strategy',
    data?.strategy || 'concat',
  );

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔗"
      accent="var(--node-merge)"
      inputs={[{ id: 'input_1' }, { id: 'input_2' }, { id: 'input_3' }]}
      outputs={[{ id: 'merged' }]}
    >
      <NodeField label="Strategy">
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        >
          <option value="concat">Concatenate</option>
          <option value="zip">Zip</option>
          <option value="first">First Non-Empty</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
