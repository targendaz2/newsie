<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, fireEvent, type within } from 'storybook/test';

  import SearchBar from './search-bar.svelte';

  const { Story } = defineMeta({
    title: 'Design System/Controls/SearchBar',
    component: SearchBar,
    argTypes: {
      value: { control: 'text' },
      placeholder: { control: 'text' },
    },
  });

  type Canvas = ReturnType<typeof within>;

  /** Looks up the search input by its accessible name (the placeholder text doubles as aria-label). */
  function getInput(canvas: Canvas, { placeholder }: { placeholder: string }) {
    return canvas.getByRole('searchbox', { name: placeholder });
  }
</script>

<!-- Empty, showing the placeholder -->
<Story
  name="Empty"
  args={{ value: '' }}
  play={async ({ canvas }) => {
    const input = getInput(canvas, { placeholder: 'Search feed' });

    // Starts empty, placeholder doubles as the accessible name
    await expect(input).toHaveValue('');
    await expect(input).toHaveAttribute('placeholder', 'Search feed');
    await expect(input).toHaveAttribute('aria-label', 'Search feed');

    // Typing updates the bound value
    await fireEvent.input(input, { target: { value: 'macOS' } });
    await expect(input).toHaveValue('macOS');
  }}
/>

<!-- With a query already typed in -->
<Story
  name="With Query"
  args={{ value: 'macOS' }}
  play={async ({ canvas }) => {
    const input = getInput(canvas, { placeholder: 'Search feed' });

    // Starts pre-filled with the given query
    await expect(input).toHaveValue('macOS');

    // Clearing it empties the bound value
    await fireEvent.input(input, { target: { value: '' } });
    await expect(input).toHaveValue('');
  }}
/>

<!-- Custom placeholder text also becomes the input's accessible name -->
<Story
  name="Custom Placeholder"
  args={{ value: '', placeholder: 'Search sources' }}
  play={async ({ canvas }) => {
    const input = getInput(canvas, { placeholder: 'Search sources' });

    await expect(input).toHaveAttribute('placeholder', 'Search sources');
    await expect(input).toHaveAttribute('aria-label', 'Search sources');
  }}
/>
