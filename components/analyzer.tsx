'use client'

import { type Diagnostic, lint, rules } from 'firestore-lint'
import { useMemo, useState } from 'react'
import { RulesEditor } from './rules-editor'

export function Analyzer() {
  const [source, setSource] = useState('')

  const diagnostics: Diagnostic[] = useMemo(() => {
    if (source.trim() === '') return []
    return lint(source, { rules })
  }, [source])

  return (
    <div className="split">
      <RulesEditor value={source} onChange={setSource} />
      <section className="pane">
        <div className="pane-head">
          <span>diagnostics</span>
        </div>
        <p style={{ padding: 'calc(var(--u) * 3) calc(var(--u) * 4)' }}>
          {diagnostics.length} diagnostics
        </p>
      </section>
    </div>
  )
}
