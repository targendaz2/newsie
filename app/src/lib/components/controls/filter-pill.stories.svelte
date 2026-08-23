<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { expect, fireEvent, fn } from 'storybook/test';

  import FilterPill from './filter-pill.svelte';

  const { Story } = defineMeta({
    title: 'Design System/Controls/FilterPill',
    component: FilterPill,
    argTypes: {
      label: { control: 'text' },
      active: { control: 'boolean' },
    },
    args: {
      label: 'Unread',
      onclick: fn(),
    },
  });
</script>

<!-- Unselected pill -->
<Story
  name="Inactive"
  args={{ active: false }}
  play={async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Unread' });
    await expect(button).toHaveAttribute('aria-pressed', 'false');
    await fireEvent.click(button);
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
/>

<!-- Selected pill -->
<Story
  name="Active"
  args={{ active: true }}
  play={async ({ args, canvas }) => {
    const button = canvas.getByRole('button', { name: 'Unread' });
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await fireEvent.click(button);
    await expect(args.onclick).toHaveBeenCalledOnce();
  }}
/>
