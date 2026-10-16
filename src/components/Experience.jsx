import { useState } from 'react'
import { experience } from '../data'

export default function Experience() {
    const [active, setActive] = useState(0)

    return (
        <section id="experience" className="section">
            <h2 className="section__title reveal">
                <span className="section__num">02.</span> Experience
            </h2>

            {experience.map((job) => (
                <article key={job.company} className="job card reveal">
                    <header className="job__header">
                        <div>
                            <h3>
                                {job.role} <span className="accent">@ {job.company}</span>
                            </h3>
                            <p className="muted">{job.period}</p>
                        </div>
                        <span className="pill pill--live">● Current</span>
                    </header>

                    <div className="job__body">
                        <ul className="job__tabs" role="tablist">
                            {job.highlights.map((h, i) => (
                                <li key={h.title}>
                                    <button
                                        role="tab"
                                        aria-selected={active === i}
                                        className={active === i ? 'is-active' : ''}
                                        onClick={() => setActive(i)}
                                    >
                                        {h.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="job__panel" role="tabpanel" key={active}>
                            <h4>{job.highlights[active].title}</h4>
                            <p>{job.highlights[active].text}</p>
                        </div>
                    </div>

                    <ul className="tags">
                        {job.tags.map((t) => (
                            <li key={t} className="tag">
                                {t}
                            </li>
                        ))}
                    </ul>
                </article>
            ))}
        </section>
    )
}
