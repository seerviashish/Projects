module.exports = {
  stories: ["../src/stories/**/*.stories.(ts|tsx)"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-knobs",
    "@storybook/addon-viewport",
    "@storybook/addon-storysource",
    "@storybook/addon-notes",
    "@storybook/addon-a11y",
  ],
};
