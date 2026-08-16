'use client'

import type { Diagnostic } from 'firestore-lint'

const DOCS_BASE = 'https://github.com/KoseiTanno/firestore-lint/blob/main/docs/rules'

/** Returns the source line a diagnostic points at, trimmed. */
export function lineAt(source: string, line: number): string {
  return source.split('\n')[line - 1]?.trim() ?? ''
}

interface Props {
  diagnostics: Diagnostic[]
  source: string
  onExplain: (diagnostic: Diagnostic) => void
}

export function DiagnosticList({ diagnostics, source, onExplain }: Props) {
  const errors = diagnostics.filter((d) => d.severity === 'error').length
  const warnings = diagnostics.filter((d) => d.severity === 'warn').length
  const infos = diagnostics.filter((d) => d.severity === 'info').length

  return (
    <section className="pane" aria-labelledby="results-heading">
      <div className="pane-head">
        <span id="results-heading">diagnostics</span>
      </div>

      <div className="tally">
        <span className="t-error">
          <b>{errors}</b> <span>{errors === 1 ? 'error' : 'errors'}</span>
        </span>
        <span className="t-warn">
          <b>{warnings}</b> <span>{warnings === 1 ? 'warning' : 'warnings'}</span>
        </span>
        <span className="t-info">
          <b>{infos}</b> <span>info</span>
        </span>
      </div>

      <div className="results">
        {diagnostics.length === 0 ? (
          <div className="foot">
            {source.trim() === '' ? 'Paste a rules file to begin.' : 'No problems found.'}
          </div>
        ) : (
          <>
            {diagnostics.map((d) => (
              <article
                className="finding"
                data-sev={d.severity}
                key={`${d.ruleId}-${d.line}-${d.column}`}
              >
                <div className="f-head">
                  <span className="sev">{d.severity}</span>
                  <span className="pos">
                    {d.line}:{d.column}
                  </span>
                  <a
                    className="rid"
                    href={`${DOCS_BASE}/${d.ruleId}.md`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {d.ruleId}
                  </a>
                </div>
                <p className="msg">{d.message}</p>
                <pre className="snip">
                  <code>{lineAt(source, d.line)}</code>
                </pre>
                <div className="f-actions">
                  <button type="button" className="tinybtn" onClick={() => onExplain(d)}>
                    explain
                  </button>
                </div>
              </article>
            ))}
            <div className="foot">
              {diagnostics.length} {diagnostics.length === 1 ? 'problem' : 'problems'} · nothing was
              uploaded
            </div>
          </>
        )}
      </div>
    </section>
  )
}
