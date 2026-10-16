import { useEffect, useRef, useState } from 'react'
import { profile } from '../data'

// Web3Forms access keys are designed to be public; submissions are emailed to the address the key was created with.
const FORM_KEY = import.meta.env.VITE_WEB3FORMS_KEY

function openMailApp(data) {
    const lines = [data.get('message'), '', `— ${data.get('name')}`, data.get('email'), data.get('phone')].filter(Boolean)
    const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${encodeURIComponent(lines.join('\n'))}`
}

function ContactForm({ onDone }) {
    const [state, setState] = useState('idle')

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)

        if (!FORM_KEY) {
            openMailApp(data)
            onDone()
            return
        }

        data.append('access_key', FORM_KEY)
        data.append('subject', `Portfolio message from ${data.get('name')}`)
        data.append('from_name', 'Dhanvi Bhat Portfolio')

        setState('sending')
        try {
            const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
            const json = await res.json()
            if (!json.success) throw new Error(json.message)
            setState('sent')
        } catch {
            setState('error')
        }
    }

    if (state === 'sent') {
        return (
            <div className="contact-form contact-form__done" role="status">
                <span aria-hidden="true">🎉</span>
                <h3>Message sent!</h3>
                <p className="muted">Thanks for reaching out — I&apos;ll get back to you soon.</p>
                <button className="btn btn--primary" onClick={onDone}>
                    Close
                </button>
            </div>
        )
    }

    return (
        <form className="contact-form" onSubmit={onSubmit}>
            <label>
                Name
                <input name="name" type="text" required maxLength={100} autoComplete="name" autoFocus />
            </label>
            <div className="contact-form__row">
                <label>
                    Email
                    <input name="email" type="email" required maxLength={200} autoComplete="email" />
                </label>
                <label>
                    <span>
                        Phone <span className="muted">(optional)</span>
                    </span>
                    <input
                        name="phone"
                        type="tel"
                        maxLength={20}
                        pattern="[\d\s+\-\(\)]{7,20}"
                        title="Digits, spaces, +, - and brackets only"
                        autoComplete="tel"
                    />
                </label>
            </div>
            <label>
                Message
                <textarea name="message" required rows={5} maxLength={5000} />
            </label>
            <input type="checkbox" name="botcheck" className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button className="btn btn--primary" type="submit" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Send message ✉️'}
            </button>
            {state === 'error' && (
                <p className="contact-form__error" role="alert">
                    Something went wrong. Please email me directly at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                </p>
            )}
        </form>
    )
}

function ContactDialog({ open, onClose }) {
    const ref = useRef(null)

    useEffect(() => {
        const dialog = ref.current
        if (open && !dialog.open) dialog.showModal()
        else if (!open && dialog.open) dialog.close()
    }, [open])

    return (
        <dialog
            ref={ref}
            className="modal"
            aria-labelledby="contact-title"
            onClose={onClose}
            onClick={(e) => e.target === ref.current && onClose()}
        >
            <div className="modal__inner">
                <button className="modal__close" onClick={onClose} aria-label="Close">
                    ✕
                </button>
                <h3 id="contact-title" className="modal__title">
                    Say hello <span className="wave">👋</span>
                </h3>
                <p className="muted small">Leave a note and I&apos;ll get back to you.</p>
                {open && <ContactForm onDone={onClose} />}
            </div>
        </dialog>
    )
}

export default function Contact() {
    const [copied, setCopied] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(profile.email)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch {
            window.location.href = `mailto:${profile.email}`
        }
    }

    return (
        <section id="contact" className="section contact">
            <h2 className="section__title section__title--center reveal">
                <span className="section__num">07.</span> Let&apos;s build something
            </h2>
            <p className="section__lead reveal">
                I&apos;m always happy to talk about mobile, backend, spec-driven AI workflows — or chess openings. My inbox is
                open.
            </p>

            <div className="contact__actions reveal">
                <button className="btn btn--primary btn--big" onClick={() => setDialogOpen(true)}>
                    ✉️ Say hello
                </button>
                <button className="btn btn--ghost" onClick={copy}>
                    {copied ? '✅ Copied!' : `📋 ${profile.email}`}
                </button>
            </div>

            <ul className="socials reveal">
                <li>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                        GitHub ↗
                    </a>
                </li>
                <li>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn ↗
                    </a>
                </li>
                <li>
                    <a href={profile.resume} download="Dhanvi_Bhat_Resume.pdf" target="_blank" rel="noopener noreferrer">
                        Résumé ⬇
                    </a>
                </li>
            </ul>

            <p className="footer muted small">
                Designed &amp; built by {profile.name} · <span lang="ja">ありがとう</span> for visiting
            </p>

            <ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </section>
    )
}
