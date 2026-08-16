import { Analyzer } from '@/components/analyzer'

export default function Home() {
  return (
    <>
      <div className="chrome">
        <div className="brand">
          <b>firestore-lint</b>
          <span>v0.1.1</span>
        </div>
        <div className="chrome-meta">
          <span className="local-badge">analysis runs locally</span>
          <a href="https://www.npmjs.com/package/firestore-lint">npm</a>
          <a href="https://github.com/KoseiTanno/firestore-lint">github</a>
        </div>
      </div>
      <Analyzer />
    </>
  )
}
