from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import deque

app = FastAPI()

# Allow the React dev server (port 3000) to call the API (port 8000).
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # ── DAG check via Kahn's algorithm (topological sort) ──
    # Build adjacency list and in-degree map from the edge list.
    node_ids = {node['id'] for node in pipeline.nodes}
    in_degree = {nid: 0 for nid in node_ids}
    adj = {nid: [] for nid in node_ids}

    for edge in pipeline.edges:
        src = edge.get('source')
        tgt = edge.get('target')
        if src in node_ids and tgt in node_ids:
            adj[src].append(tgt)
            in_degree[tgt] += 1

    # Start with all nodes that have zero incoming edges.
    queue = deque(nid for nid, deg in in_degree.items() if deg == 0)
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If every node was visited, there are no cycles → it's a DAG.
    is_dag = visited == num_nodes

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
