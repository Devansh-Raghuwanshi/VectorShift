// textNode.js

import { BaseNode, NodeField } from './BaseNode';
import { useNodeField } from './useNodeField';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useNodeField(
    id,
    'text',
    data?.text || '{{input}}',
  );

  return (
    <BaseNode id={id} title="Text" outputs={[{ id: 'output' }]}>
      <NodeField label="Text">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </NodeField>
    </BaseNode>
  );
};
