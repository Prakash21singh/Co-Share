import { useState } from "react";
import { LoaderContext } from "./loaderContext";

const LoaderContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  function startLoading() {
    setIsLoading(true);
  }
  function stopLoading() {
    setIsLoading(false);
  }
  return (
    <LoaderContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContextProvider;
