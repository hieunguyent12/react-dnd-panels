export type PanelsManager = {
  getPanelStore(): PanelStore;
  getPanelContentStore(): PanelContentStore;

  getPanelStoreItem(id: string): PanelStoreItem;

  getPanelContent(id: string): JSX.Element | undefined;

  addPanel(
    newPanel: {
      id: string;
      droppable: boolean;
      draggable: boolean;
    },
    getContent: () => JSX.Element
  ): void;

  removePanel(id: string): void;

  splitPanel(): void;
};

export enum PanelStoreItemType {
  PANEL_CONTAINER = "container",
  PANEL = "panel",
}
export type SplitState = "horizontal" | "vertical";

export type PanelContainer = {
  type: PanelStoreItemType.PANEL_CONTAINER;
  id: string;
  splitState: SplitState;
  children: (PanelContainer | Panel)[];
};

export type Panel = {
  type: PanelStoreItemType.PANEL;
  id: string;
  containerId: string | null;
  draggable: boolean;
  droppable: boolean;
};

export type PanelStoreItem = PanelContainer | Panel;

export type PanelStore = {
  [id: string]: PanelStoreItem;
};

export type PanelContentStore = {
  [id: string]: JSX.Element;
};
