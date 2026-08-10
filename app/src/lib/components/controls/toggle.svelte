<script lang="ts">
  interface Props {
    /** Current on/off state. */
    on?: boolean;

    /** Accessible name describing what this switch controls, e.g. "Mute Ars Technica". */
    label: string;

    /** Called when the switch is toggled. */
    onchange?: () => void;
  }

  const { on = false, label, onchange }: Props = $props();
</script>

<button type="button" role="switch" aria-checked={on} aria-label={label} class:on onclick={onchange}>
  <span></span>
</button>

<style>
  button {
    flex-shrink: 0;
    width: 50px;
    height: 30px;
    border-radius: var(--radius-pill);
    border: none;
    cursor: pointer;
    position: relative;
    background: var(--color-toggle-off);
    transition: background 0.18s;
  }

  button.on {
    background: var(--color-brand);
  }

  button:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  span {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--color-card);
    box-shadow: var(--shadow-knob);
    transition: left 0.18s;
  }

  button.on span {
    left: 23px;
  }
</style>
