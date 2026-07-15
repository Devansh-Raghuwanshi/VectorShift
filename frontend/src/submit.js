// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [result, setResult] = useState(null);
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });
            if (!response.ok) throw new Error(`Server error: ${response.status}`);
            const data = await response.json();
            setResult(data);
        } catch (error) {
            window.alert('Failed to connect to the backend.\nMake sure the server is running:\n  uvicorn main:app --reload');
        }
    };

    return (
        <>
            <div className="submit-bar">
                <button
                    type="button"
                    className="submit-btn"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>

            {/* ── Result alert modal ── */}
            {result && (
                <div className="alert-overlay" onClick={() => setResult(null)}>
                    <div className="alert-modal" onClick={(e) => e.stopPropagation()}>
                        <h3 className="alert-modal__title">Pipeline Analysis</h3>

                        <div className="alert-modal__stats">
                            <div className="alert-modal__stat">
                                <span className="alert-modal__stat-value">{result.num_nodes}</span>
                                <span className="alert-modal__stat-label">Nodes</span>
                            </div>
                            <div className="alert-modal__stat">
                                <span className="alert-modal__stat-value">{result.num_edges}</span>
                                <span className="alert-modal__stat-label">Edges</span>
                            </div>
                        </div>

                        <div className={`alert-modal__badge ${result.is_dag ? 'alert-modal__badge--success' : 'alert-modal__badge--error'}`}>
                            {result.is_dag ? '✓ Valid DAG' : '✗ Not a DAG'}
                        </div>

                        <button
                            className="alert-modal__close"
                            onClick={() => setResult(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
