import { Panel, PanelStoreItemType } from "../../types";
import PanelsManagerImpl from "../PanelsManagerImpl";
import { vi } from "vitest";

describe("panels manager", () => {
  const manager = new PanelsManagerImpl();
  const newPanel = {
    id: "id",
    draggable: true,
    droppable: true,
  };

  const getContentMock = vi.fn((arg) => arg);

  it("add a panel its content to the panels store and panels content store respectively", () => {
    manager.addPanel(newPanel, () => getContentMock({}));

    expect(manager.getPanelStore()[newPanel.id]).toMatchObject({
      type: PanelStoreItemType.PANEL,
      containerId: null,
      ...newPanel,
    });

    expect(getContentMock).toHaveBeenCalled();
  });

  it("retrieves a panel and its content from both stores", () => {
    const panel = manager.getPanelStoreItem(newPanel.id);
    const content = manager.getPanelContent(newPanel.id);

    expect(panel).toMatchObject({
      ...newPanel,
      type: PanelStoreItemType.PANEL,
      containerId: null,
    });

    expect(content).toBeTruthy();
  });

  it("remove a panel from the panels store", () => {
    manager.removePanel(newPanel.id);

    expect(manager.getPanelStore()).toMatchObject({});
    expect(manager.getPanelContentStore()).toMatchObject({});
  });
});
