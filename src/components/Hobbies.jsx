import { useEffect, useRef, useState } from 'react'
import { japaneseWords } from '../data'
import { playNote } from '../audio'

function JapaneseCard() {
    const [i, setI] = useState(0)
    const [flipped, setFlipped] = useState(false)
    const word = japaneseWords[i]

    const next = () => {
        setFlipped(false)
        setI((n) => (n + 1) % japaneseWords.length)
    }

    return (
        <div className="hobby__play">
            <button
                className={`flashcard ${flipped ? 'is-flipped' : ''}`}
                onClick={() => setFlipped((f) => !f)}
                aria-label={flipped ? `${word.romaji}: ${word.en}` : `Japanese word ${word.jp}, click to reveal meaning`}
            >
                <span className="flashcard__face flashcard__front" lang="ja">
                    {word.jp}
                </span>
                <span className="flashcard__face flashcard__back">
                    <em>{word.romaji}</em>
                    <span>{word.en}</span>
                </span>
            </button>
            <button className="btn btn--small" onClick={next}>
                Next word →
            </button>
        </div>
    )
}

// Standard tuning, low E to high E.
const STRINGS = [
    { note: 'E', freq: 82.41 },
    { note: 'A', freq: 110.0 },
    { note: 'D', freq: 146.83 },
    { note: 'G', freq: 196.0 },
    { note: 'B', freq: 246.94 },
    { note: 'e', freq: 329.63 },
]

function Guitar() {
    const [ringing, setRinging] = useState({})

    const pluck = (idx, start = 0) => {
        playNote(STRINGS[idx].freq, { start, duration: 1.8, type: 'triangle', volume: 0.3 })
        setTimeout(() => {
            setRinging((r) => ({ ...r, [idx]: Date.now() }))
            setTimeout(() => setRinging((r) => ({ ...r, [idx]: 0 })), 600)
        }, start * 1000)
    }

    const strum = () => STRINGS.forEach((_, idx) => pluck(idx, idx * 0.05))

    return (
        <div className="hobby__play">
            <div className="guitar" role="group" aria-label="Guitar strings">
                {STRINGS.map((s, idx) => (
                    <button
                        key={s.note + idx}
                        className={`guitar__string ${ringing[idx] ? 'is-ringing' : ''}`}
                        style={{ '--thick': `${3.5 - idx * 0.45}px` }}
                        onMouseEnter={(e) => e.buttons === 1 && pluck(idx)}
                        onClick={() => pluck(idx)}
                        aria-label={`Pluck ${s.note} string`}
                    >
                        <span className="guitar__label">{s.note}</span>
                    </button>
                ))}
            </div>
            <button className="btn btn--small" onClick={strum}>
                Strum 🎶
            </button>
        </div>
    )
}

const SIZE = 5
const KNIGHT_MOVES = [
    [1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1],
]

function KnightTour() {
    const [path, setPath] = useState([[0, 0]])
    const [r, c] = path[path.length - 1]
    const visited = new Set(path.map(([a, b]) => `${a},${b}`))
    const isLegal = (row, col) =>
        !visited.has(`${row},${col}`) && KNIGHT_MOVES.some(([dr, dc]) => r + dr === row && c + dc === col)
    const hasMoves = KNIGHT_MOVES.some(([dr, dc]) => {
        const nr = r + dr
        const nc = c + dc
        return nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && !visited.has(`${nr},${nc}`)
    })
    const won = path.length === SIZE * SIZE

    return (
        <div className="hobby__play">
            <div className="board" style={{ '--size': SIZE }} role="grid" aria-label="Knight's tour board">
                {Array.from({ length: SIZE * SIZE }, (_, k) => {
                    const row = Math.floor(k / SIZE)
                    const col = k % SIZE
                    const here = row === r && col === c
                    const legal = isLegal(row, col)
                    const step = path.findIndex(([a, b]) => a === row && b === col)
                    return (
                        <button
                            key={k}
                            className={`board__sq ${(row + col) % 2 ? 'is-dark' : ''} ${legal ? 'is-legal' : ''} ${step >= 0 ? 'is-visited' : ''} ${here ? 'is-knight' : ''}`}
                            disabled={!legal}
                            onClick={() => setPath((p) => [...p, [row, col]])}
                            aria-label={here ? 'Knight' : legal ? `Move to row ${row + 1}, column ${col + 1}` : undefined}
                        >
                            {here ? '♞' : step >= 0 ? step + 1 : ''}
                        </button>
                    )
                })}
            </div>
            <p className="small muted" aria-live="polite">
                {won ? '🏆 Full tour! You visited every square.' : hasMoves ? `Knight's tour · ${path.length}/${SIZE * SIZE}` : `Stuck at ${path.length}/${SIZE * SIZE} — try again!`}
            </p>
            <button className="btn btn--small" onClick={() => setPath([[0, 0]])}>
                Reset
            </button>
        </div>
    )
}

const INKS = ['ink', '#7c5cff', '#ff6b9d', '#22c3a6', '#ffb020']

function Doodle() {
    const canvasRef = useRef(null)
    const drawing = useRef(false)
    const [ink, setInk] = useState(INKS[0])

    useEffect(() => {
        const canvas = canvasRef.current
        const dpr = window.devicePixelRatio || 1
        const { width, height } = canvas.getBoundingClientRect()
        canvas.width = width * dpr
        canvas.height = height * dpr
        const ctx = canvas.getContext('2d')
        ctx.scale(dpr, dpr)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.lineWidth = 3
    }, [])

    const point = (e) => {
        const r = canvasRef.current.getBoundingClientRect()
        return [e.clientX - r.left, e.clientY - r.top]
    }

    const start = (e) => {
        drawing.current = true
        canvasRef.current.setPointerCapture(e.pointerId)
        const ctx = canvasRef.current.getContext('2d')
        ctx.strokeStyle = ink === 'ink' ? getComputedStyle(document.documentElement).getPropertyValue('--text') : ink
        ctx.beginPath()
        ctx.moveTo(...point(e))
    }

    const move = (e) => {
        if (!drawing.current) return
        const ctx = canvasRef.current.getContext('2d')
        ctx.lineTo(...point(e))
        ctx.stroke()
    }

    const clear = () => {
        const canvas = canvasRef.current
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    }

    return (
        <div className="hobby__play">
            <canvas
                ref={canvasRef}
                className="doodle"
                onPointerDown={start}
                onPointerMove={move}
                onPointerUp={() => (drawing.current = false)}
                onPointerCancel={() => (drawing.current = false)}
                aria-label="Drawing canvas"
            />
            <div className="doodle__tools">
                {INKS.map((c) => (
                    <button
                        key={c}
                        className={`swatch ${ink === c ? 'is-active' : ''}`}
                        style={{ background: c === 'ink' ? 'var(--text)' : c }}
                        onClick={() => setInk(c)}
                        aria-label={`Use ${c === 'ink' ? 'default' : c} colour`}
                    />
                ))}
                <button className="btn btn--small" onClick={clear}>
                    Clear
                </button>
            </div>
        </div>
    )
}

// Sa Re Ga Ma Pa Dha Ni Sa (C major), up and back down.
const SARGAM = [
    ['Sa', 261.63], ['Re', 293.66], ['Ga', 329.63], ['Ma', 349.23],
    ['Pa', 392.0], ['Dha', 440.0], ['Ni', 493.88], ["Sa'", 523.25],
]

function Singing() {
    const [current, setCurrent] = useState(-1)
    const timers = useRef([])

    useEffect(() => () => timers.current.forEach(clearTimeout), [])

    const sing = () => {
        timers.current.forEach(clearTimeout)
        const seq = [...SARGAM, ...SARGAM.slice(0, -1).reverse()]
        const step = 0.32
        seq.forEach(([, f], k) => playNote(f, { start: k * step, duration: 0.45, type: 'sine', volume: 0.22 }))
        timers.current = seq.map((_, k) =>
            setTimeout(() => setCurrent(SARGAM.findIndex(([n]) => n === seq[k][0])), k * step * 1000),
        )
        timers.current.push(setTimeout(() => setCurrent(-1), seq.length * step * 1000))
    }

    return (
        <div className="hobby__play">
            <div className={`eq ${current >= 0 ? 'is-singing' : ''}`} aria-hidden="true">
                {SARGAM.map(([n], k) => (
                    <span key={n} className={`eq__bar ${current === k ? 'is-on' : ''}`} style={{ '--h': `${30 + k * 9}%` }}>
                        <em>{n}</em>
                    </span>
                ))}
            </div>
            <button className="btn btn--small" onClick={sing} disabled={current >= 0}>
                {current >= 0 ? '🎤 Singing…' : 'Sing a sargam 🎤'}
            </button>
        </div>
    )
}

const HOBBIES = [
    { icon: '🇯🇵', title: 'Learning Japanese', blurb: 'JLPT N5 certified and still going. Tap the card to reveal the meaning.', Play: JapaneseCard },
    { icon: '🎸', title: 'Playing Guitar', blurb: 'Pluck a string — or drag across them with your mouse held down.', Play: Guitar },
    { icon: '♟️', title: 'Chess', blurb: 'Can you move the knight onto every square exactly once?', Play: KnightTour },
    { icon: '🎨', title: 'Drawing', blurb: 'Sketching is how I unwind. Leave me a doodle!', Play: Doodle },
    { icon: '🎤', title: 'Singing', blurb: 'Warm up with the Indian solfège scale, Sa Re Ga Ma…', Play: Singing },
]

export default function Hobbies() {
    return (
        <section id="hobbies" className="section">
            <h2 className="section__title reveal">
                <span className="section__num">05.</span> Off the clock
            </h2>
            <p className="section__lead reveal">A few things I love outside of code — go ahead, they&apos;re interactive.</p>
            <div className="hobbies">
                {HOBBIES.map(({ icon, title, blurb, Play }, i) => (
                    <article key={title} className="hobby card reveal" style={{ '--delay': `${i * 80}ms` }}>
                        <h3>
                            <span aria-hidden="true">{icon}</span> {title}
                        </h3>
                        <p className="muted small">{blurb}</p>
                        <Play />
                    </article>
                ))}
            </div>
        </section>
    )
}
