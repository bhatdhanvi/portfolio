import { useEffect, useState } from 'react'

const links = ['about', 'experience', 'projects', 'skills', 'hobbies', 'education', 'contact']

export default function Navbar({ theme, onToggleTheme }) {
    const [progress, setProgress] = useState(0)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight
            setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className="nav">
            <div className="nav__progress" style={{ width: `${progress}%` }} />
            <a href="#top" className="nav__logo" aria-label="Back to top">
                DB<span>.</span>
            </a>

            <nav className={`nav__links ${open ? 'is-open' : ''}`}>
                {links.map((id) => (
                    <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                        {id}
                    </a>
                ))}
            </nav>

            <div className="nav__actions">
                <button
                    className="theme-toggle"
                    onClick={onToggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    title="Toggle theme"
                >
                    <span className="theme-toggle__icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
                </button>
                <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
                    <span />
                    <span />
                    <span />
                </button>
            </div>
        </header>
    )
}
