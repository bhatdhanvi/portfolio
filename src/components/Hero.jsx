import { useEffect, useState } from 'react'
import { profile } from '../data'

function useTypewriter(words, { typeMs = 80, deleteMs = 40, holdMs = 1600 } = {}) {
    const [index, setIndex] = useState(0)
    const [text, setText] = useState('')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const word = words[index % words.length]
        let timeout
        if (!deleting && text === word) {
            timeout = setTimeout(() => setDeleting(true), holdMs)
        } else if (deleting && text === '') {
            timeout = setTimeout(() => {
                setDeleting(false)
                setIndex((i) => i + 1)
            }, 300)
        } else {
            timeout = setTimeout(
                () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
                deleting ? deleteMs : typeMs,
            )
        }
        return () => clearTimeout(timeout)
    }, [text, deleting, index, words, typeMs, deleteMs, holdMs])

    return text
}

export default function Hero() {
    const role = useTypewriter(profile.roles)
    const [photoFailed, setPhotoFailed] = useState(false)

    return (
        <section id="top" className="hero">
            <div className="hero__text">
                <p className="hero__hello">
                    <span className="wave">👋</span> Hi, I&apos;m
                </p>
                <h1 className="hero__name">
                    <span className="gradient-text">{profile.name}</span>
                </h1>
                <p className="hero__role">
                    {role}
                    <span className="caret" aria-hidden="true" />
                </p>
                <p className="hero__tagline">{profile.tagline}</p>

                <div className="hero__cta">
                    <a href="#projects" className="btn btn--primary">
                        See my work
                    </a>
                    <a
                        href={profile.resume}
                        className="btn btn--ghost"
                        download="Dhanvi_Bhat_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ⬇ Download résumé
                    </a>
                </div>

                <ul className="hero__meta">
                    <li>📍 {profile.location}</li>
                    <li>💼 Bottomline Technologies</li>
                    <li>🇯🇵 JLPT N5</li>
                </ul>
            </div>

            <div className="hero__photo-wrap">
                <div className="hero__blob" aria-hidden="true" />
                {photoFailed ? (
                    <div className="hero__photo hero__photo--fallback" aria-label={profile.name}>
                        DB
                    </div>
                ) : (
                    <img
                        className="hero__photo"
                        src={profile.photo}
                        alt={`Portrait of ${profile.name}`}
                        onError={() => setPhotoFailed(true)}
                    />
                )}
                <span className="float-badge float-badge--1" title="Guitar">🎸</span>
                <span className="float-badge float-badge--2" title="Chess">♞</span>
                <span className="float-badge float-badge--3" title="Japanese">あ</span>
                <span className="float-badge float-badge--4" title="Drawing">🎨</span>
            </div>

            <a href="#about" className="scroll-hint" aria-label="Scroll to about">
                <span />
            </a>
        </section>
    )
}
