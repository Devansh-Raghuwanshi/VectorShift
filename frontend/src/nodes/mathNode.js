// mathNode.js
// Arithmetic node with two inputs, an operation selector, and one output.
// Demonstrates multiple input handles + a select field.

import { BaseNode, NodeField } from './BaseNode';
import { useNodeField } from './useNodeField';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useNodeField(
    id,
    'operation',
    data?.operation || 'add',
  );

  return (
    <BaseNode
      id={id}
      title="Math"
      icon="🔢"
      inputs={[{ id: 'a' }, { id: 'b' }]}
      outputs={[{ id: 'result' }]}
    >
      <NodeField label="Operation">
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (−)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
