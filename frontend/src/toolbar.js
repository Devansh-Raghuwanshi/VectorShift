// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeList } from './nodeRegistry';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {nodeList.map((node) => (
                    <DraggableNode
                        key={node.type}
                        type={node.type}
                        label={node.label}
                    />
                ))}
            </div>
        </div>
    );
};
