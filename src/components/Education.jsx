import { achievements, certifications, education } from '../data'

export default function Education() {
    return (
        <section id="education" className="section">
            <h2 className="section__title reveal">
                <span className="section__num">06.</span> Education &amp; recognition
            </h2>

            <div className="edu">
                <div className="timeline">
                    {education.map((e) => (
                        <article key={e.school} className="timeline__item reveal">
                            <span className="timeline__dot" aria-hidden="true" />
                            <p className="muted small">{e.period}</p>
                            <h3>{e.school}</h3>
                            <p>{e.degree}</p>
                            <span className="pill">{e.score}</span>
                        </article>
                    ))}
                </div>

                <div className="card reveal">
                    <h3>🏅 Achievements</h3>
                    <ul className="achievements">
                        {achievements.map((a) => (
                            <li key={a}>{a}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <h3 className="subhead reveal">📜 Certifications</h3>
            <ul className="certs">
                {certifications.map((c, i) => (
                    <li key={c.name} className="cert card reveal" style={{ '--delay': `${i * 60}ms` }}>
                        <strong>{c.name}</strong>
                        <span className="muted small">{c.issuer}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}
