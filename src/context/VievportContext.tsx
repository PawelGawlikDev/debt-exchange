import { createContext, useContext } from "react";
import { useViewport } from "../hooks/useViewport";

const ViewportContext = createContext<{ width: number }>({ width: 1200 });

export const ViewportProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { width } = useViewport();
  return (
    <ViewportContext.Provider value={{ width }}>
      {children}
    </ViewportContext.Provider>
  );
};

export const useViewportContext = () => useContext(ViewportContext);
