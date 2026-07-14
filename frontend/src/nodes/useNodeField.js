// useNodeField.js
// Custom hook that manages a single node field's state
// and keeps it in sync with the Zustand store.

import { useState, useCallback, useEffect } from 'react';
import { useStore } from '../store';

/**
 * Manages local state for a single field inside a node component,
 * while automatically syncing every change to the global Zustand store.
 *
 * @param {string} nodeId       - The ReactFlow node ID (e.g. "customInput-1")
 * @param {string} fieldName    - The key under node.data (e.g. "inputName")
 * @param {*}      defaultValue - Fallback value when node.data has nothing
 * @returns {[*, function]}     - [currentValue, setValue]
 */
export function useNodeField(nodeId, fieldName, defaultValue) {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [value, setValueLocal] = useState(defaultValue);

  // Sync the initial/default value to the store on mount so that
  // pipeline submission always has the latest data — even if the
  // user never touches the field.
  useEffect(() => {
    updateNodeField(nodeId, fieldName, defaultValue);
    // Only run on mount — default is captured once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue = useCallback(
    (newValue) => {
      setValueLocal(newValue);
      updateNodeField(nodeId, fieldName, newValue);
    },
    [nodeId, fieldName, updateNodeField],
  );

  return [value, setValue];
}
