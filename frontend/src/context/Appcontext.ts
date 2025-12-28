import { createContext, useContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

// 1️⃣ Define the shape
type AppContextValue = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

// 2️⃣ Create context (erasable-safe)
const AppContext = createContext(null as AppContextValue | null);

// 3️⃣ Provider
export function ContextProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <AppContext.Provider value={{ open, setOpen }}>
      {children}
    </AppContext.Provider>
  );
}

// 4️⃣ Hook
export function useAppContext() {
  const ctx = useContext(AppContext);

  if (ctx === null) {
    throw new Error("useAppContext must be used within ContextProvider");
  }

  return ctx;
}
