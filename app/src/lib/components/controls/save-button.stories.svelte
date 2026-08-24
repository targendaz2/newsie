<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, fireEvent, fn } from 'storybook/test';

  import SaveButton from './save-button.svelte';

  const { Story } = defineMeta({
    title: 'Design System/Controls/SaveButton',
    component: SaveButton,
    argTypes: {
      saved: { control: 'boolean' },
    },
    args: {
      onclick: fn(),
    },
  });
</script>

<!-- Unsaved, outline star -->
<Story
  name="Unsaved"
  args={{ saved: false }}
  play={async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Save story' });
    await expect(button).toHaveAttribute('aria-pressed', 'false');
    await fireEvent.click(button);
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
/>

<!-- Saved, filled star -->
<Story
  name="Saved"
  args={{ saved: true }}
  play={async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Remove from saved' });
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await fireEvent.click(button);
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
/>
