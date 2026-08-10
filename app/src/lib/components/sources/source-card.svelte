<script lang="ts">
  import { Toggle } from '$components/controls';
  import { TypeBadge } from '$components/data';

  interface Props {
    /** Source type shown in the type label. */
    type?: string;

    /** Source display name, e.g. "Okta Release Notes". */
    name: string;

    /** Status line shown while the source is on, e.g. "3 unread · updated 2h ago". Ignored (shows "Muted") when off. */
    meta: string;

    /** Whether this source is currently enabled. */
    on?: boolean;

    /** Called when the mute/unmute toggle is switched. */
    onToggle?: () => void;
  }

  const { type = 'rss', name, meta, on = true, onToggle }: Props = $props();
</script>

<li>
  <TypeBadge {type} variant="column" />
  <div class="body">
    <div class="name" class:muted={!on}>{name}</div>
    <div class="meta">{on ? meta : 'Muted'}</div>
  </div>
  <Toggle {on} label={`${on ? 'Mute' : 'Unmute'} ${name}`} onchange={onToggle} />
</li>

<style>
  li {
    display: flex;
    gap: 12px;
    padding: 15px 22px;
    border-bottom: 1px solid var(--color-border-hairline);
    align-items: center;
  }

  .body {
    flex: 1;
    min-width: 0;
  }

  .name {
    font-size: 15px;
    font-weight: var(--font-weight-semibold);
    color: var(--color-text-body);
  }

  .name.muted {
    color: var(--color-text-faint);
  }

  .meta {
    font-size: var(--text-meta);
    color: var(--color-text-muted);
    margin-top: 2px;
  }
</style>
