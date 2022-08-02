import { DndProvider as ReactDndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createContext, useContext } from "react";
import { PanelsManager, createPanelsManager } from "dnd-panels-core";

type Props = {
  children: JSX.Element;
};

export const DndPanelContext = createContext<PanelsManager | null>(null);

const panelsManager = createPanelsManager();

function _DndPanelProvider({ children }: Props) {
  return (
    <DndPanelContext.Provider value={panelsManager}>
      {children}
    </DndPanelContext.Provider>
  );
}

export function DndPanelProvider({ children }: Props) {
  return (
    <ReactDndProvider backend={HTML5Backend}>
      <_DndPanelProvider>{children}</_DndPanelProvider>
    </ReactDndProvider>
  );
}

export function useDndPanelManager() {
  const manager = useContext(DndPanelContext);

  if (!manager) {
    throw new Error(
      "useDndPanelManager must be used within a DndPanelProvider"
    );
  }

  return manager;
}
