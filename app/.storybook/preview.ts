/// <reference types="vite/client" />
import type { Preview } from '@storybook/sveltekit';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import '../src/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      // SvelteKit augments every element's HTMLAttributes with these link-preloading/navigation
      // attributes (see .svelte-kit/non-ambient.d.ts), so they type-check on any component whose
      // Props extends an HTMLAttributes-derived type — not just <a>. They're inert noise here.
      exclude: /^data-sveltekit-/,
    },
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  // initialGlobals: {
  //   viewport: { value: 'iphone14pro', isRotated: false },
  // },
  tags: ['autodocs'],
};

export default preview;
