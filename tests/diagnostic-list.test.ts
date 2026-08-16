import { describe, expect, it } from 'vitest'
import { lineAt } from '@/components/diagnostic-list'

describe('lineAt', () => {
  it('returns the trimmed source line for a 1-based line number', () => {
    expect(lineAt('first\n  second  \nthird', 2)).toBe('second')
  })

  it('returns an empty string when the line is out of range', () => {
    expect(lineAt('only one line', 5)).toBe('')
  })

  it('returns an empty string for an empty source', () => {
    expect(lineAt('', 1)).toBe('')
  })

  it('handles the first and last line', () => {
    expect(lineAt('alpha\nbeta', 1)).toBe('alpha')
    expect(lineAt('alpha\nbeta', 2)).toBe('beta')
  })
})
