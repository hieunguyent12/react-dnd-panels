import PanelsManagerImpl from "./classes/PanelsManagerImpl";
import { PanelsManager } from "./types";

export function createPanelsManager(): PanelsManager {
  const mananger = new PanelsManagerImpl();

  return mananger;
}
