import { useState } from "react";

/**
 * Custom hook for managing input state.
 *
 * @param {*} initialValue - The initial value for the input state.
 * @returns {Array} - An array containing the input value and a function to update the input value.
 */
export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  return [
    { value, onChange: e => setValue(e.target.value) },
    () => setValue(initialValue)
  ];
};
