// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeList } from './nodeRegistry';

export const PipelineToolbar = () => {

    return (
        <div className="pipeline-toolbar">
            <div className="pipeline-toolbar__nodes">
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
