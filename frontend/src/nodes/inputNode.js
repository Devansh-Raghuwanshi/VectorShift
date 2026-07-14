// inputNode.js

import { BaseNode, NodeField } from './BaseNode';
import { useNodeField } from './useNodeField';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useNodeField(
    id,
    'inputName',
    data?.inputName || id.replace('customInput-', 'input_'),
  );
  const [type, setType] = useNodeField(
    id,
    'inputType',
    data?.inputType || 'Text',
  );

  return (
    <BaseNode id={id} title="Input" outputs={[{ id: 'value' }]}>
      <NodeField label="Name">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </NodeField>
      <NodeField label="Type">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
