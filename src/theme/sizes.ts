export const BASE_SPACING = 8;
export const BASE_RADIUS = 12;
export const TITLEBAR_HEIGHT = 50;
export const PAGE_PADDING = 8;
export const SIDEBAR_WIDTH = 300;
export const DETAILS_PANEL_WIDTH = 400;

export default {
  spacing: {
    getSpacing: (multiplier: number) => BASE_SPACING * multiplier,
    base: BASE_SPACING,
  },
  radius: {
    getRadius: (multiplier: number) => BASE_RADIUS * multiplier,
    base: BASE_RADIUS,
  },
  layout: {
    titlebar: {
      height: TITLEBAR_HEIGHT,
    },
    page: {
      padding: PAGE_PADDING,
    },
    sidebar: {
      width: SIDEBAR_WIDTH,
    },
    detailsPanel: {
      width: DETAILS_PANEL_WIDTH,
    },
    chat: {
      maxWidth: 768,
    },
  },
};
