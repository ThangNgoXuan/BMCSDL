import { useReducer } from "react";

const useValues = (initValue) => {
  const [values, dispatch] = useReducer((oldValues, newValues) => {
    return { ...oldValues, ...newValues };
  }, initValue);

  const setValues = (newValues) => {
    dispatch(newValues);
  };
  return [values, setValues];
};

export default useValues;
