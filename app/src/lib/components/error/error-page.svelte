<script lang="ts">
  type ErrorStatus = '404' | '503' | '500' | 'offline';

  interface Props {
    /** Which error state to show. */
    status?: ErrorStatus;

    /** Called when the primary action is tapped. */
    onPrimary?: () => void;

    /** Called when the secondary action is tapped. */
    onSecondary?: () => void;
  }

  const { status = '404', onPrimary, onSecondary }: Props = $props();

  const COPY: Record<ErrorStatus, { code: string; glyph: string; headline: string; message: string; primary: string; secondary: string }> =
    {
      '404': {
        code: '404 · NOT FOUND',
        glyph: '¶',
        headline: 'This story got away.',
        message: "The page you were after isn't here — it may have been unsubscribed, moved, or never made the edition.",
        primary: 'Back to the news',
        secondary: 'Search the feed',
      },
      '503': {
        code: '503 · UNAVAILABLE',
        glyph: '‡',
        headline: 'The presses are down.',
        message: 'Newsie is briefly offline for maintenance. Your saved stories are still readable — try again in a moment.',
        primary: 'Try again',
        secondary: 'Read saved stories',
      },
      '500': {
        code: '500 · SERVER ERROR',
        glyph: '§',
        headline: 'Something jammed.',
        message: 'An unexpected error stopped this page from loading. A refresh usually clears it.',
        primary: 'Reload page',
        secondary: 'Back to Today',
      },
      offline: {
        code: 'OFFLINE · NO SIGNAL',
        glyph: '◍',
        headline: "You're off the wire.",
        message: "No connection right now. Cached stories are available offline — the feed will refresh once you're back online.",
        primary: 'Retry connection',
        secondary: 'Read cached stories',
      },
    };

  const copy = $derived(COPY[status]);
</script>

<main>
  <span class="code">{copy.code}</span>
  <div class="glyph" aria-hidden="true">{copy.glyph}</div>
  <h1>{copy.headline}</h1>
  <p>{copy.message}</p>
  <div class="actions">
    <button type="button" class="primary" onclick={onPrimary}>{copy.primary}</button>
    <button type="button" class="secondary" onclick={onSecondary}>{copy.secondary}</button>
  </div>
</main>

<footer>
  <div class="divider"></div>
  <div class="wordmark">Newsie</div>
  <div class="ref">newsie.site · ref {status.toUpperCase()}</div>
</footer>

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 32px 40px;
    min-height: 0;
  }

  .code {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: var(--font-weight-semibold);
    letter-spacing: 0.16em;
    color: var(--color-brand);
    background: var(--color-chip-bg);
    padding: 5px 12px;
    border-radius: var(--radius-badge);
  }

  .glyph {
    font-family: var(--font-serif);
    font-weight: var(--font-weight-bold);
    font-size: 104px;
    line-height: 1;
    color: var(--color-text-body);
    letter-spacing: -0.02em;
    margin: 26px 0 4px;
  }

  h1 {
    margin: 14px 0 0;
    font-family: var(--font-serif);
    font-size: 27px;
    font-weight: var(--font-weight-bold);
    line-height: 1.18;
    letter-spacing: var(--tracking-tight);
    color: var(--color-text-body);
  }

  p {
    margin: 12px 0 0;
    max-width: 280px;
    font-size: 15px;
    line-height: 1.55;
    color: var(--color-text-muted);
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 260px;
    margin-top: 30px;
  }

  .primary {
    min-height: 50px;
    border: none;
    border-radius: var(--radius-pill);
    background: var(--color-brand);
    color: var(--color-text-onaccent);
    font-family: var(--font-sans);
    font-size: 15px;
    font-weight: var(--font-weight-semibold);
    padding: 13px 20px;
    cursor: pointer;
  }

  .secondary {
    border: none;
    background: none;
    color: var(--color-brand);
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: var(--font-weight-semibold);
    padding: 8px;
    cursor: pointer;
  }

  .secondary:hover {
    color: var(--color-brand-hover);
  }

  .primary:focus-visible,
  .secondary:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }

  footer {
    flex-shrink: 0;
    padding: 0 40px 30px;
    text-align: center;
  }

  .divider {
    height: 1px;
    margin-bottom: 16px;
    background: var(--color-border-hairline);
  }

  .wordmark {
    font-family: var(--font-serif);
    font-size: 17px;
    font-weight: var(--font-weight-bold);
    color: var(--color-text-body);
  }

  .ref {
    margin-top: 3px;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--color-text-faint);
  }
</style>
