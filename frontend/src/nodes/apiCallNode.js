// apiCallNode.js
// HTTP request configuration node.
// Demonstrates multiple field types: text input, select, and textarea.

import { BaseNode, NodeField } from './BaseNode';
import { useNodeField } from './useNodeField';

export const ApiCallNode = ({ id, data }) => {
  const [url, setUrl] = useNodeField(
    id,
    'url',
    data?.url || '',
  );
  const [method, setMethod] = useNodeField(
    id,
    'method',
    data?.method || 'GET',
  );
  const [headers, setHeaders] = useNodeField(
    id,
    'headers',
    data?.headers || '{}',
  );

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      accent="var(--node-api)"
      inputs={[{ id: 'body' }]}
      outputs={[{ id: 'response' }]}
    >
      <NodeField label="URL">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
        />
      </NodeField>
      <NodeField label="Method">
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </NodeField>
      <NodeField label="Headers (JSON)">
        <textarea
          value={headers}
          onChange={(e) => setHeaders(e.target.value)}
          rows={2}
          placeholder='{"Authorization": "Bearer ..."}'
        />
      </NodeField>
    </BaseNode>
  );
};
