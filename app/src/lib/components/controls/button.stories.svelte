<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, fn, userEvent } from 'storybook/test';

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

{#snippet refresh()}
  ↻ Refresh
{/snippet}

{#snippet markAsRead()}
  Mark as read
{/snippet}

{#snippet addSource()}
  + Add a source
{/snippet}

<!-- Quiet text link — Refresh, Sources -->
<Story name="Link" args={{ variant: 'link', children: refresh }} />

<!-- Outline pill — Mark as read -->
<Story name="Outline" args={{ variant: 'outline', children: markAsRead }} />

<!-- Dashed full-width affordance — + Add a source -->
<Story name="Dashed" args={{ variant: 'dashed', children: addSource }} />

<!-- Disabled outline pill — Mark as read -->
<Story name="Disabled" args={{ variant: 'outline', children: markAsRead, disabled: true }} />

<!-- Clicking an enabled button fires onclick -->
<Story
  name="Click fires onclick"
  args={{ variant: 'outline', children: markAsRead }}
  play={async ({ args, canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Mark as read' }));
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
/>

<!-- A disabled button is unclickable, so it can never fire onclick -->
<Story
  name="Disabled ignores clicks"
  args={{ variant: 'outline', children: markAsRead, disabled: true }}
  play={async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Mark as read' })).toBeDisabled();
  }}
/>
