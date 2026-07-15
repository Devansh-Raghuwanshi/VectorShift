// conditionalNode.js
// Routes data based on a condition.
// One input → two named outputs (True / False).
// Demonstrates multiple output handles.

import { BaseNode, NodeField } from './BaseNode';
import { useNodeField } from './useNodeField';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useNodeField(
    id,
    'condition',
    data?.condition || '',
  );

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon="🔀"
      accent="var(--node-conditional)"
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'true' }, { id: 'false' }]}
    >
      <NodeField label="Condition">
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g. value > 10"
        />
      </NodeField>
    </BaseNode>
  );
};
