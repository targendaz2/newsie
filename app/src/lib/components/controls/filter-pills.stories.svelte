<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, fireEvent, type within } from 'storybook/test';

  import FilterPills from './filter-pills.svelte';

  const { Story } = defineMeta({
    title: 'Design System/Controls/FilterPills',
    component: FilterPills,
  });

  type Canvas = ReturnType<typeof within>;

  interface PillOptions {
    /** The pill's label text. */
    label: string;
  }

  interface ExpectPressedOptions {
    /** Label of the pill that should be pressed. */
    pressedLabel: string;

    /** Labels of the pills that should not be pressed. */
    otherLabels: string[];
  }

  /** Looks up a pill by its label text. */
  function getPill(canvas: Canvas, { label }: PillOptions) {
    return canvas.getByRole('button', { name: label });
  }

  /** Asserts `pressedLabel`'s pill is pressed and every pill in `otherLabels` isn't. */
  async function expectPressed(canvas: Canvas, { pressedLabel, otherLabels }: ExpectPressedOptions) {
    await expect(getPill(canvas, { label: pressedLabel })).toHaveAttribute('aria-pressed', 'true');
    for (const label of otherLabels) {
      await expect(getPill(canvas, { label })).toHaveAttribute('aria-pressed', 'false');
    }
  }

  /** Clicks the pill labeled `label`. */
  async function clickPill(canvas: Canvas, { label }: PillOptions) {
    await fireEvent.click(getPill(canvas, { label }));
  }
</script>

<!-- "All" selected -->
<Story
  name="All"
  args={{ active: 'all' }}
  play={async ({ canvas }) => {
    // Starts on "All"
    await expectPressed(canvas, { pressedLabel: 'All', otherLabels: ['Unread', 'Saved'] });

    // Clicking a different pill moves the pressed state onto it
    await clickPill(canvas, { label: 'Unread' });
    await expectPressed(canvas, { pressedLabel: 'Unread', otherLabels: ['All'] });

    // Clicking back returns the pressed state to "All", matching this story's name
    await clickPill(canvas, { label: 'All' });
    await expectPressed(canvas, { pressedLabel: 'All', otherLabels: ['Unread'] });
  }}
/>

<!-- "Unread" selected -->
<Story
  name="Unread"
  args={{ active: 'unread' }}
  play={async ({ canvas }) => {
    // Starts on "Unread"
    await expectPressed(canvas, { pressedLabel: 'Unread', otherLabels: ['All', 'Saved'] });

    // Clicking a different pill moves the pressed state onto it
    await clickPill(canvas, { label: 'Saved' });
    await expectPressed(canvas, { pressedLabel: 'Saved', otherLabels: ['Unread'] });

    // Clicking back returns the pressed state to "Unread", matching this story's name
    await clickPill(canvas, { label: 'Unread' });
    await expectPressed(canvas, { pressedLabel: 'Unread', otherLabels: ['Saved'] });
  }}
/>

<!-- "Saved" selected -->
<Story
  name="Saved"
  args={{ active: 'saved' }}
  play={async ({ canvas }) => {
    // Starts on "Saved"
    await expectPressed(canvas, { pressedLabel: 'Saved', otherLabels: ['All', 'Unread'] });

    // Clicking a different pill moves the pressed state onto it
    await clickPill(canvas, { label: 'All' });
    await expectPressed(canvas, { pressedLabel: 'All', otherLabels: ['Saved'] });

    // Clicking back returns the pressed state to "Saved", matching this story's name
    await clickPill(canvas, { label: 'Saved' });
    await expectPressed(canvas, { pressedLabel: 'Saved', otherLabels: ['All'] });
  }}
/>
