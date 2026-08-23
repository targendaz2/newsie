<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, fireEvent, fn } from 'storybook/test';

  import Button from './button.svelte';

  const { Story } = defineMeta({
    title: 'Design System/Controls/Button',
    component: Button,
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['link', 'outline', 'dashed'],
      },
      label: { control: 'text' },
      disabled: { control: 'boolean' },
    },
    args: {
      onclick: fn(),
    },
  });
</script>

<!-- Quiet text link — Refresh, Sources -->
<Story
  name="Link"
  args={{ variant: 'link', label: '↻ Refresh' }}
  play={async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: '↻ Refresh' });
    await fireEvent.click(button);
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
/>

<!-- Outline pill — Mark as read -->
<Story
  name="Outline"
  args={{ variant: 'outline', label: 'Mark as read' }}
  play={async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Mark as read' });
    await fireEvent.click(button);
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
/>

<!-- Dashed full-width affordance — + Add a source -->
<Story
  name="Dashed"
  args={{ variant: 'dashed', label: '+ Add a source' }}
  play={async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: '+ Add a source' });
    await fireEvent.click(button);
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
/>

<!-- Disabled outline pill — Mark as read -->
<Story
  name="Disabled"
  args={{ variant: 'outline', label: 'Mark as read', disabled: true }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Mark as read' })).toBeDisabled();
  }}
/>
