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
      disabled: { control: 'boolean' },
      children: { table: { disable: true } },
    },
    args: {
      onclick: fn(),
    },
  });
</script>

<!-- Quiet text link — Refresh, Sources -->
<Story
  name="Link"
  args={{ variant: 'link' }}
  play={async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: '↻ Refresh' });
    await fireEvent.click(button);
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
>
  ↻ Refresh
</Story>

<!-- Outline pill — Mark as read -->
<Story
  name="Outline"
  args={{ variant: 'outline' }}
  play={async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Mark as read' });
    await fireEvent.click(button);
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
>
  Mark as read
</Story>

<!-- Dashed full-width affordance — + Add a source -->
<Story
  name="Dashed"
  args={{ variant: 'dashed' }}
  play={async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: '+ Add a source' });
    await fireEvent.click(button);
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
>
  + Add a source
</Story>

<!-- Disabled outline pill — Mark as read -->
<Story
  name="Disabled"
  args={{ variant: 'outline', disabled: true }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Mark as read' })).toBeDisabled();
  }}
>
  Mark as read
</Story>
