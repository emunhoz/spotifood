import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: { name: '@storybook/react-vite', options: {} },
  docs: { autodocs: 'tag' },
  // design-tokens ships CommonJS and is symlinked by the workspace, so Vite must be told to convert it
  viteFinal: async (viteConfig) => ({
    ...viteConfig,
    optimizeDeps: {
      ...viteConfig.optimizeDeps,
      include: [...(viteConfig.optimizeDeps?.include ?? []), '@monorepo/design-tokens']
    },
    build: {
      ...viteConfig.build,
      commonjsOptions: {
        ...viteConfig.build?.commonjsOptions,
        include: [/design-tokens/, /node_modules/]
      }
    }
  })
}

export default config
