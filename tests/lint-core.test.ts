import { lint, rules } from 'firestore-lint'
import { describe, expect, it } from 'vitest'
import { SAMPLE_RULES } from '@/lib/samples'

describe('firestore-lint integration', () => {
  it('exposes all nine rules', () => {
    expect(rules).toHaveLength(9)
  })

  it('reports a public read on the vulnerable sample', () => {
    const found = lint(SAMPLE_RULES.vulnerable, { rules })
    expect(found.some((d) => d.ruleId === 'no-public-read')).toBe(true)
  })

  it('reports an expired test-mode rule on the vulnerable sample', () => {
    const found = lint(SAMPLE_RULES.vulnerable, { rules })
    expect(found.some((d) => d.ruleId === 'no-expired-test-mode')).toBe(true)
  })

  it('returns no errors on the clean sample', () => {
    const found = lint(SAMPLE_RULES.clean, { rules })
    expect(found.filter((d) => d.severity === 'error')).toEqual([])
  })

  it('returns diagnostics sorted by line', () => {
    const found = lint(SAMPLE_RULES.vulnerable, { rules })
    const lines = found.map((d) => d.line)
    expect(lines).toEqual([...lines].sort((a, b) => a - b))
  })

  it('does not throw on malformed input', () => {
    expect(() => lint('service cloud.firestore { match /a/{b} {', { rules })).not.toThrow()
  })
})
