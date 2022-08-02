import {
  PanelContentStore,
  PanelsManager,
  PanelStore,
  PanelStoreItem,
  PanelStoreItemType,
} from "../types";

export default class PanelsManagerImpl implements PanelsManager {
  private panelStore: PanelStore;
  private panelContentStore: PanelContentStore;

  /*
    In the future, users should be able to pass in their own store that they have saved
  */
  constructor(panelStore: PanelStore = {}) {
    this.panelStore = panelStore;
    this.panelContentStore = {};
  }

  public getPanelStore(): PanelStore {
    return this.panelStore;
  }

  public getPanelContentStore(): PanelContentStore {
    return this.panelContentStore;
  }

  public getPanelStoreItem(id: string): PanelStoreItem {
    return this.panelStore[id];
  }

  public getPanelContent(id: string) {
    return this.panelContentStore[id];
  }

  public addPanel(
    newPanel: {
      id: string;
      droppable: boolean;
      draggable: boolean;
    },
    getContent: () => JSX.Element
  ): void {
    // if the panel is not already in the store, add it
    if (!this.panelStore[newPanel.id]) {
      this.panelStore[newPanel.id] = {
        type: PanelStoreItemType.PANEL,
        containerId: null,
        ...newPanel,
      };

      this.panelContentStore[newPanel.id] = getContent();
    }
  }

  public removePanel(id: string): void {
    const panel = this.panelStore[id];

    // Only PANEL has content, a PANEL_CONTAINER does not
    if (panel.type === PanelStoreItemType.PANEL) {
      delete this.panelStore[id];
      delete this.panelContentStore[id];
    } else {
      delete this.panelStore[id];
    }
  }

  public splitPanel(): void {}
}
