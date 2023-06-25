import { useState, useCallback, ChangeEvent } from "react";

export default (initialValue: any = null) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  return [value, handler];
};
