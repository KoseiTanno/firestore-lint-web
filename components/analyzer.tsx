'use client'

import { type Diagnostic, lint, rules } from 'firestore-lint'
import { useMemo, useState } from 'react'
import { DiagnosticList } from './diagnostic-list'
import { RulesEditor } from './rules-editor'

export function Analyzer() {
  const [source, setSource] = useState('')
  const [selected, setSelected] = useState<Diagnostic | null>(null)

  const diagnostics: Diagnostic[] = useMemo(() => {
    if (source.trim() === '') return []
    return lint(source, { rules })
  }, [source])

  return (
    <div className="split">
      <RulesEditor value={source} onChange={setSource} />
      <DiagnosticList diagnostics={diagnostics} source={source} onExplain={setSelected} />
      {selected ? <p hidden>Selected: {selected.ruleId}</p> : null}
    </div>
  )
}
