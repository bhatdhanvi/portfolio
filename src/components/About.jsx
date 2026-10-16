import { profile } from '../data'

export default function About() {
    return (
        <section id="about" className="section">
            <h2 className="section__title reveal">
                <span className="section__num">01.</span> About me
            </h2>
            <div className="about">
                <div className="about__text reveal">
                    {profile.about.map((p) => (
                        <p key={p}>{p}</p>
                    ))}
                    <p>
                        When I&apos;m away from the keyboard you&apos;ll find me practising Japanese, playing guitar, plotting my
                        next chess move, sketching, or singing — <a href="#hobbies">come play with them below ↓</a>
                    </p>
                </div>
                <ul className="stats">
                    {profile.stats.map((s, i) => (
                        <li key={s.label} className="stat card reveal" style={{ '--delay': `${i * 80}ms` }}>
                            <strong className="gradient-text">{s.value}</strong>
                            <span>{s.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
