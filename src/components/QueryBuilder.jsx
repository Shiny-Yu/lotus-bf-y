import { useState } from 'react'

const EXAMPLES = [
  '[-2,50,-6] NOT "ventromedial prefrontal"',
  '[0,-52,26] AND default mode',
  '([30,-60,50] OR [40,-50,45]) AND attention',
  'reward NOT emotion'
]

export function QueryBuilder ({ draft, setDraft, onSearch, query }) {
  const [showHelp, setShowHelp] = useState(false)
  const append = (token) => setDraft((q) => (q ? `${q} ${token}` : token))
  const dirty = draft.trim() !== (query || '').trim()

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSearch(draft)
    }
  }

  return (
    <div className="flex flex-col gap-3 qb">
      <div className="flex items-center">
        <div className="card__title">Query Builder</div>
      </div>

      <div className="qb__row">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Create a query here, e.g.: [-22,-4,18] NOT emotion"
          aria-label="Query"
          className="qb__input w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring"
        />
        <button onClick={() => onSearch(draft)} disabled={!draft.trim()}>
          {dirty ? 'Search ⏎' : 'Search'}
        </button>
      </div>

      <div className="qb__ops">
        {['AND', 'OR', 'NOT', '(', ')'].map((t) => (
          <button key={t} onClick={() => append(t)}>{t}</button>
        ))}
        <button onClick={() => { setDraft(''); onSearch('') }}>Reset</button>
        <button onClick={() => setShowHelp((v) => !v)} aria-expanded={showHelp}>
          {showHelp ? 'Hide help' : 'Syntax help'}
        </button>
      </div>

      <div className="qb__examples">
        <span className="hint">Try:</span>
        {EXAMPLES.map((ex) => (
          <button key={ex} className="chip" onClick={() => { setDraft(ex); onSearch(ex) }}>
            {ex}
          </button>
        ))}
      </div>

      {showHelp && (
        <ul className="qb__help">
          <li><code>[x,y,z]</code> — studies reporting activation within 6 mm of an MNI coordinate</li>
          <li><code>AND</code> / <code>OR</code> / <code>NOT</code> and parentheses combine terms and locations</li>
          <li>Words next to each other are searched as a phrase; use quotes for an exact phrase</li>
          <li>Click a term in the left list to add it to the query, then press Search or Enter</li>
        </ul>
      )}
    </div>
  )
}
