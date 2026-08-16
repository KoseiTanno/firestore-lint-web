'use client'

import { SAMPLE_RULES, type SampleKey } from '@/lib/samples'

interface Props {
  value: string
  onChange: (value: string) => void
}

export function RulesEditor({ value, onChange }: Props) {
  function loadSample(key: SampleKey) {
    onChange(SAMPLE_RULES[key])
  }

  const lineCount = Math.max(value.split('\n').length, 1)

  return (
    <section className="pane" aria-labelledby="editor-heading">
      <div className="pane-head">
        <span id="editor-heading">firestore.rules</span>
        <span className="spacer" />
        <button type="button" className="tinybtn" onClick={() => loadSample('vulnerable')}>
          vulnerable
        </button>
        <button type="button" className="tinybtn" onClick={() => loadSample('clean')}>
          clean
        </button>
        <button type="button" className="tinybtn" onClick={() => onChange('')}>
          clear
        </button>
      </div>

      <div className="code">
        <div className="gutter" aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => i + 1).join('\n')}
        </div>
        <textarea
          className="src"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste your firestore.rules here…"
          spellCheck={false}
          aria-label="Firestore security rules"
        />
      </div>
    </section>
  )
}
