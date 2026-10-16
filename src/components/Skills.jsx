import { useState } from 'react'
import { skills } from '../data'

const categories = ['All', ...Object.keys(skills)]

export default function Skills() {
    const [filter, setFilter] = useState('All')
    const visible =
        filter === 'All'
            ? Object.entries(skills).flatMap(([cat, list]) => list.map((s) => ({ s, cat })))
            : skills[filter].map((s) => ({ s, cat: filter }))

    return (
        <section id="skills" className="section">
            <h2 className="section__title reveal">
                <span className="section__num">04.</span> Skills
            </h2>
            <div className="filters reveal" role="group" aria-label="Filter skills">
                {categories.map((c) => (
                    <button key={c} className={`filter ${filter === c ? 'is-active' : ''}`} onClick={() => setFilter(c)}>
                        {c}
                    </button>
                ))}
            </div>
            <div className="reveal">
                <ul className="skills" key={filter}>
                    {visible.map(({ s, cat }, i) => (
                        <li key={`${cat}-${s}`} className="skill" style={{ '--i': i }} title={cat}>
                            {s}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
