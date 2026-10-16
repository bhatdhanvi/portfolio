import { projects } from '../data'

function tilt(e) {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    card.style.setProperty('--rx', `${-y * 10}deg`)
    card.style.setProperty('--ry', `${x * 10}deg`)
    card.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    card.style.setProperty('--my', `${(y + 0.5) * 100}%`)
}

function resetTilt(e) {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
}

export default function Projects() {
    return (
        <section id="projects" className="section">
            <h2 className="section__title reveal">
                <span className="section__num">03.</span> Projects
            </h2>
            <div className="projects">
                {projects.map((p, i) => (
                    <article
                        key={p.title}
                        className="project card reveal"
                        style={{ '--delay': `${i * 100}ms` }}
                        onMouseMove={tilt}
                        onMouseLeave={resetTilt}
                    >
                        <div className="project__top">
                            <span className="project__emoji" aria-hidden="true">
                                {p.emoji}
                            </span>
                            {p.metric && <span className="pill">{p.metric}</span>}
                        </div>
                        <h3>{p.title}</h3>
                        <p className="muted small">{p.period}</p>
                        <p>{p.description}</p>
                        <ul className="tags">
                            {p.stack.map((s) => (
                                <li key={s} className="tag">
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    )
}
