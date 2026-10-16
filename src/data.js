// TODO: replace the GitHub / LinkedIn URLs with your real profile links.
export const profile = {
    name: 'Dhanvi Bhat',
    firstName: 'Dhanvi',
    location: 'Bangalore, India',
    email: 'dhanvigbhat@gmail.com',
    github: 'https://github.com/bhatdhanvi',
    linkedin: 'https://www.linkedin.com/in/bhatdhanvi',
    photo: '/profile.jpeg',
    resume: '/Dhanvi_Bhat_Resume.pdf',
    roles: [
        'Software Developer',
        'Flutter Developer',
        'Backend Developer',
        'Spec-Driven AI Enthusiast',
    ],
    tagline:
        'I build reliable mobile and backend systems — from payments and authentication to the platforms that ship them.',
    about: [
        "I'm a Software Developer at Bottomline Technologies, where I build production-grade payment experiences in Flutter and backend services with Java Spring Boot and PostgreSQL and Flutter.",
        'I care about architecture that ages well — Clean Architecture, SOLID principles and predictable state management with Cubit/BLoC — so features stay easy to test, extend and hand over.',
        "I'm also an early adopter of AI-assisted, spec-driven development (BMAD, GSD, SpecKit) and am steadily growing into full-stack engineering with Spring Boot microservices.",
    ],
    stats: [
        { value: '1+', label: 'Year in production' },
        { value: '500+', label: 'Automated test cases' },
        { value: '75%', label: 'Faster regression cycles' },
    ],
}

export const experience = [
    {
        role: 'Software Developer',
        company: 'Bottomline Technologies',
        period: 'Jul 2025 – Present',
        highlights: [
            {
                title: 'Real-time & ACH payments',
                text: 'Shipped RTP and ACH payment features in Digital Banking Enterprise, built on Clean Architecture, Solid Principles and Cubit/BLoC so every module stays testable, scalable and maintainable.',
            },
            {
                title: 'MFA re-architecture',
                text: 'Redesigned the multi-factor authentication module, consolidating ~10 separate MFA implementations behind one modular, extensible structure — new auth methods now plug in instead of being bolted on.',
            },
            {
                title: 'Test automation',
                text: 'Automated 7 core features (500+ test cases) with Appium Flutter Driver and WebdriverIO, pushing automation coverage past 50% and cutting regression time by 75%.',
            },
            {
                title: 'In-house app distribution platform',
                text: 'Helped build an internal app store using the BMAD spec-driven approach — a React Native client for secure installs of internal builds, backed by Spring Boot microservices for auth, catalog, release management and artifact storage.',
            },
            {
                title: 'Workflow automation & reliability',
                text: 'Automated repetitive manual workflows to cut team turnaround time, and resolved production and pre-release bugs across the mobile codebase.',
            },
        ],
        tags: ['Flutter', 'Dart', 'Cubit/BLoC', 'Spring Boot', 'Appium', 'WebdriverIO', 'BMAD'],
    },
]

export const projects = [
    {
        emoji: '🌿',
        title: 'Virtual Herbal Garden using Virtual Reality',
        period: 'Jan 2025 – Jun 2025',
        description:
            'Developed a digital platform where users can interact with 3D models of medicinal plants and experience virtual reality tours. Through this users can immerse themselves in the world of medicinal plants, learning and engaging with them in a much more interactive way',
        stack: ['HTML', 'CSS', 'JavaScript', 'React'],
    },
    {
        emoji: '✍️',
        title: 'Signature Classification',
        period: 'Mar 2023 – Jun 2023',
        description:
            'A deep-learning model that identifies the writer of a signature using transfer learning — reaching 99% accuracy with Xception and 97% with VGG16.',
        stack: ['Python', 'Transfer Learning', 'Xception', 'VGG16'],
        metric: '99% accuracy',
    },
    {
        emoji: '💧',
        title: 'IoT Water Quality Monitor',
        period: 'Sep 2023 – Dec 2023',
        description:
            'A real-time monitoring kit that combines temperature, humidity, turbidity and TDS sensors on an ESP32 and streams live readings to ThingSpeak for remote analysis.',
        stack: ['ESP32', 'C', 'Arduino IDE', 'ThingSpeak'],
        metric: '4 live sensors',
    },
    {
        emoji: '🎬',
        title: 'Movie Ticket Booking',
        period: 'Nov 2023 – Dec 2023',
        description:
            'An online booking platform with real-time seat availability, plus database-backed bookings and account management.',
        stack: ['SQL', 'HTML', 'CSS', 'JavaScript'],
    },
]

export const skills = {
    Languages: ['Java', 'TypeScript', 'Dart', 'SQL', 'HTML/CSS'],
    Mobile: ['Flutter', 'Responsive UI', 'Cubit/BLoC', 'REST/JSON'],
    Backend: [
        'Spring Boot 3',
        'Spring Security',
        'Spring Data JPA',
        'Microservices',
        'REST APIs',
        'JWT',
        'PostgreSQL',
        'Hibernate',
        'Liquibase',
        'Keycloak',
        'Junit'
    ],
    'AI & Spec-Driven': ['BMAD', 'GSD', 'SpecKit', 'GitHub Copilot', 'Prompt Engineering', 'Agentic Workflows'],
    'Tools & Practices': ['Git', 'GitHub', 'Docker', 'Maven', 'Postman', 'Appium', 'CI/CD', 'Clean Architecture', 'Agile/Scrum'],
}

export const education = [
    {
        school: 'Dayananda Sagar University',
        degree: 'B.Tech, Computer Science & Engineering',
        period: '2021 – 2025',
        score: 'GPA 8.57',
    },
    {
        school: "Alva's Pre-University College",
        degree: 'Pre-University (Science), Class 12',
        period: '2020 – 2021',
        score: '91.5%',
    },
]

export const achievements = [
    'Published a research paper on Virtual Herbal Garden Using Virtual Reality Methodology on SSRN documenting the system design, reaching 1.3k+ views and 180+ downloads',
    'Letter of Appreciation for demonstrating IoT projects at the "From Concepts to Reality: Connecting the Dots" workshop, Malnad College of Engineering, Hassan.',
    'Selected at college level for the Smart India Hackathon (SIH).',
    'Selected to attend the Q-Karyashala Workshop at IISc, Bangalore.',
]

export const certifications = [
    { name: 'JLPT N5', issuer: 'Japanese Language Proficiency Test' },
    { name: 'Introduction to Generative AI', issuer: 'Coursera' },
    { name: 'Crash Course on Python', issuer: 'Coursera' },
    { name: 'Java Programming', issuer: 'Great Learning' },
    { name: 'Face Recognition in OpenCV', issuer: 'Great Learning' },
    { name: 'Python (Basic)', issuer: 'HackerRank' },
]

export const japaneseWords = [
    { jp: 'こんにちは', romaji: 'konnichiwa', en: 'hello' },
    { jp: 'ありがとう', romaji: 'arigatou', en: 'thank you' },
    { jp: '夢', romaji: 'yume', en: 'dream' },
    { jp: '音楽', romaji: 'ongaku', en: 'music' },
    { jp: '頑張って', romaji: 'ganbatte', en: 'you can do it!' },
    { jp: '猫', romaji: 'neko', en: 'cat' },
]
