// outputNode.js

import { BaseNode, NodeField } from './BaseNode';
import { useNodeField } from './useNodeField';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useNodeField(
    id,
    'outputName',
    data?.outputName || id.replace('customOutput-', 'output_'),
  );
  const [type, setType] = useNodeField(
    id,
    'outputType',
    data?.outputType || 'Text',
  );

  return (
    <BaseNode id={id} title="Output" inputs={[{ id: 'value' }]}>
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
          <option value="File">Image</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
