// ─── Types ────────────────────────────────────────────────────────────────────

export interface Language {
  id: string
  name: string
  flag: string
  level: string
  students: number
  description: string
  color: string
  image?: string | null
}

export interface ServiceLevel {
  name: string
  group: string
  duration: string
  hours: number
  description: string
  free?: boolean
  highlight?: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  price: string
  icon: string
  popular?: boolean
  levels?: ServiceLevel[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  country: string
  avatar: string
  rating: number
  text: string
  course: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  date: string
  readTime: string
  category: string
  image: string
  tags: string[]
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  answerHtml?: string
  category: string
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  languages: string[]
  experience: string
  avatar: string
}

export interface StudyAbroadProgram {
  id: string
  country: string
  city: string
  flag: string
  duration: string
  price: string
  language: string
  highlights: string[]
  description: string
  image: string
}

// ─── Languages ────────────────────────────────────────────────────────────────

export const languages: Language[] = [
  {
    id: 'english',
    name: 'English',
    flag: '🇬🇧',
    level: 'All Levels',
    students: 2400,
    description: 'Master British English from General to Business and IELTS/Cambridge exam preparation.',
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 'french',
    name: 'French',
    flag: '🇫🇷',
    level: 'A1 – C2',
    students: 290,
    description: 'Discover the beauty of French language and culture from beginner to advanced.',
    color: 'from-indigo-500 to-indigo-700',
  },
  {
    id: 'spanish',
    name: 'Spanish',
    flag: '🇪🇸',
    level: 'A1 – C2',
    students: 310,
    description: 'Learn Spanish and unlock access to 20+ countries and their vibrant cultures.',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'german',
    name: 'German',
    flag: '🇩🇪',
    level: 'A1 – C1',
    students: 340,
    description: 'Open doors to career opportunities in Europe with professional German skills.',
    color: 'from-gray-700 to-gray-900',
  },
  {
    id: 'italian',
    name: 'Italian',
    flag: '🇮🇹',
    level: 'A1 – B2',
    students: 280,
    description: 'Immerse yourself in Italian art, cuisine, and culture through language learning.',
    color: 'from-green-500 to-emerald-700',
  },
  {
    id: 'arabic',
    name: 'Arabic',
    flag: '🇸🇦',
    level: 'A1 – B1',
    students: 190,
    description: 'Explore the rich Arabic language, from Modern Standard to regional dialects.',
    color: 'from-emerald-600 to-teal-800',
  },
  {
    id: 'russian',
    name: 'Russian',
    flag: '🇷🇺',
    level: 'A1 – B2',
    students: 170,
    description: 'Learn Russian and unlock access to one of the world\'s most expressive and widely spoken languages.',
    color: 'from-blue-700 to-blue-900',
  },
]

// ─── Services ─────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id: 'general-english',
    title: 'General English',
    description: 'A structured 6-level programme taking students from absolute beginner to near-native proficiency. Each level builds directly on the last, with small classes, expert teachers, and a proven curriculum.',
    features: ['Small groups (max 12)', 'Native-speaker teachers', 'Weekly progress reports', 'Free study materials', 'Level certificate on completion'],
    price: 'From £180/month',
    icon: 'BookOpen',
    popular: true,
    levels: [
      {
        name: 'Newcomer',
        group: 'Beginner',
        duration: '—',
        hours: 16,
        description: 'This level is designed for those who have never encountered English before. The aim is to establish the foundations of English before moving on to the next level.',
        free: true,
      },
      {
        name: 'Freshman',
        group: 'Elementary',
        duration: '3 months',
        hours: 144,
        description: 'This is where your real English education begins. Focus is on listening, speaking, reading and writing. Education is conducted 100% in English.',
      },
      {
        name: 'Climber',
        group: 'Pre-Intermediate',
        duration: '3 months',
        hours: 144,
        description: 'You will begin participating in English conversations with ease. Reading skills are emphasised to develop vocabulary. You will have two teachers — one native speaker and one foreign teacher.',
      },
      {
        name: 'Transitional',
        group: 'Intermediate',
        duration: '3 months',
        hours: 144,
        description: 'You can now call yourself an English speaker. You can express yourself easily and understand almost everything. You can start preparing for IELTS and TOEFL.',
      },
      {
        name: 'Superb',
        group: 'Upper Intermediate',
        duration: '3 months',
        hours: 144,
        description: 'You are now officially an English speaker. You can watch films without subtitles and speak idiomatically. If you are not aiming for an academic career, your general English education ends here.',
        highlight: true,
      },
      {
        name: 'Proficient',
        group: 'Advanced',
        duration: '2.5 months',
        hours: 136,
        description: 'If you are planning an academic career or want to prepare for IELTS or TOEFL, this level is for you. Significantly expand your vocabulary and gain a major advantage in your professional life.',
      },
    ],
  },
  {
    id: 'exam-preparation',
    title: 'Exam English',
    description: 'Targeted exam preparation for students at B1 level or above. Our professional tutors guide you through every aspect of your chosen exam — from strategy and structure to timed practice and feedback — so you walk in on exam day fully prepared.',
    features: ['Prerequisite: B1 level or equivalent', 'PTE, IELTS & TOEFL preparation', 'YDS & YÖK DİL preparation', 'Professional exam tutors', 'Mock exams with detailed feedback', '4 months · 120 hours'],
    price: 'From £240/month',
    icon: 'Award',
    popular: true,
  },
  {
    id: 'other-languages',
    title: 'Other Languages',
    description: 'Learn German, French, Spanish, or Russian with our expert tutors. Each language is taught across 4 levels — A1 through B2 — giving you a structured, clear path from complete beginner to upper-intermediate. Every level is 3 months and 96 hours of education.',
    features: ['German, French, Spanish, Russian', 'Levels A1 · A2 · B1 · B2', '3 months per level · 96 hours', 'Small groups (max 12)', 'Native & qualified tutors', 'Level certificate on completion'],
    price: 'From £180/month',
    icon: 'Globe',
    popular: false,
  },
  {
    id: 'one-to-one',
    title: 'One-to-One Tuition',
    description: 'Fully personalised private lessons tailored to your goals, schedule, and learning style. Fastest route to fluency.',
    features: ['Flexible scheduling', 'Custom curriculum', 'Your pace', 'Any language offered', 'In-person or online'],
    price: 'From £55/hour',
    icon: 'User',
    popular: false,
  },
  {
    id: 'online-courses',
    title: 'Online Courses',
    description: 'High-quality live online language classes with the same expert teachers and interactive format as in-person sessions.',
    features: ['Live interactive sessions', 'Recorded for replay', 'Global class community', 'Digital workbooks', 'Tech support included'],
    price: 'From £120/month',
    icon: 'Monitor',
    popular: false,
  },
  {
    id: 'intensive',
    title: 'Intensive Courses',
    description: 'Complete a full level in just 1.5 months. Our intensive programme condenses 96 hours of education into an accelerated schedule — perfect for students who want fast results without compromising on quality.',
    features: ['1.5 months per level', '96 hours of education', 'Complete one full level fast', 'Small groups (max 12)', 'Expert teachers throughout', 'Certificate on completion'],
    price: 'From £580/month',
    icon: 'Zap',
    popular: false,
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Mehmet Yılmaz',
    role: 'Software Engineer',
    country: 'Istanbul — Başakşehir',
    avatar: 'MY',
    rating: 5,
    text: 'London Language Academy kariyerimi tamamen değiştirdi. Business English programından sonra uluslararası bir yazılım firmasında iş buldum. Öğretmenler inanılmaz destekleyici ve müfredat gerçekten dünya standartlarında.',
    course: 'Business English',
  },
  {
    id: '2',
    name: 'Ayşe Kaya',
    role: 'MBA Öğrencisi',
    country: 'Istanbul — Avcılar',
    avatar: 'AK',
    rating: 5,
    text: 'Üniversite başvurum için IELTS 7.5\'e ihtiyacım vardı ve 6.5\'te takılıp kalmıştım. LLA\'nın sınav hazırlık kursuyla sadece sekiz haftada 7.5\'e ulaştım. Deneme sınavları ve kişiselleştirilmiş geri bildirimler çok etkili oldu.',
    course: 'IELTS Hazırlık',
  },
  {
    id: '3',
    name: 'Emre Demir',
    role: 'Pazarlama Müdürü',
    country: 'Bursa — Nilüfer',
    avatar: 'ED',
    rating: 5,
    text: 'Birebir dersler kesinlikle her kuruşa değdi. Öğretmenim her dersi benim özel ihtiyaçlarıma göre uyarladı. Müşteri sunumlarındaki özgüvenim artık çok yüksek. Kesinlikle tavsiye ederim.',
    course: 'Birebir İş İngilizcesi',
  },
  {
    id: '4',
    name: 'Zeynep Arslan',
    role: 'Doktor',
    country: 'Istanbul — Başakşehir',
    avatar: 'ZA',
    rating: 5,
    text: 'London Language Academy ile İngilizce öğrenmek harika bir deneyimdi. Öğretmenler son derece sabırlı ve ilgili. Tıp İngilizcesi kursunda ilk denemede başarılı oldum, harika bir kadro.',
    course: 'Tıp İngilizcesi',
  },
  {
    id: '5',
    name: 'Can Öztürk',
    role: 'Restoran Sahibi',
    country: 'Bursa — Nilüfer',
    avatar: 'CO',
    rating: 5,
    text: 'Akşam Almanca derslerini seçtim ve çok memnun kaldım. Küçük sınıf mevcudu sayesinde gerçekten konuşma ve pratik yapma imkânı buluyorsunuz. Almancam üç ayda başka hiçbir yerde iki yılda ilerlediğimden daha fazla gelişti.',
    course: 'Genel Almanca',
  },
  {
    id: '6',
    name: 'Selin Çelik',
    role: 'Muhasebeci',
    country: 'Istanbul — Avcılar',
    avatar: 'SC',
    rating: 5,
    text: 'Online kurslar mükemmel — yüz yüze kurslarla aynı kalitede ama evimin rahatlığında. Canlı dersler çok ilgi çekici ve öğretmenler grameri gerçekten eğlenceli hale getiriyor. Şimdi İspanyolca\'ya da kaydoldum!',
    course: 'Online Genel İngilizce',
  },
]

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'how-to-prepare-for-ielts-in-60-days',
    title: 'How to Prepare for IELTS in 60 Days: A Complete Strategy',
    excerpt: 'A proven, step-by-step approach to achieving your target IELTS band score in just two months — from vocabulary building to exam-day tactics.',
    content: `## Introduction

Preparing for IELTS can feel overwhelming, but with the right strategy you can reach your target band score in just 60 days. This guide breaks down exactly how to approach each component of the exam.

## Week 1–2: Baseline Assessment

Start by taking a full practice test under timed conditions. This gives you an honest picture of where you stand across all four skills: Listening, Reading, Writing, and Speaking.

## Week 3–4: Targeted Skill Building

Focus on your weakest areas first. If Writing Task 2 is your Achilles heel, dedicate 45 minutes every day to essay planning and writing. If Reading takes too long, practise skimming and scanning techniques.

## Week 5–6: Vocabulary and Grammar

IELTS rewards precise, varied vocabulary. Learn 10 new topic-specific words every day and practise using them in sentences. Review common grammar mistakes — articles, tense consistency, and subject-verb agreement are frequent problem areas.

## Week 7–8: Mock Exams and Refinement

Take two full mock exams each week. Review every mistake in detail. In speaking, record yourself and listen critically. In writing, ask a teacher or tutor to score your essays using the official IELTS marking criteria.

## Key Tips

- Practise daily — even 30 minutes consistently beats three-hour occasional sessions
- Use official Cambridge practice materials
- Get professional feedback on your writing and speaking
- Sleep well and eat well in the week before the exam

Good luck — you've got this!`,
    author: 'Dr. Sarah Mitchell',
    authorRole: 'IELTS Lead Trainer',
    date: '2026-03-10',
    readTime: '8 min read',
    category: 'Exam Tips',
    image: 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/ielts-60-days.jpg',
    tags: ['IELTS', 'Exam Preparation', 'English', 'Study Tips'],
  },
  {
    id: '2',
    slug: 'top-5-languages-for-your-career-in-2026',
    title: 'Top 5 Languages to Learn for Your Career in 2026',
    excerpt: 'Discover which languages offer the greatest professional advantages in today\'s global job market — and how to get started learning them.',
    content: `## Why Language Skills Matter More Than Ever

In an increasingly connected world, multilingualism is no longer just a nice-to-have — it is a genuine competitive advantage. Employers pay an average 10–15% premium for staff with a second or third language.

## 1. Mandarin Chinese

With China being the world's second-largest economy, Mandarin speakers are in enormous demand across finance, tech, and manufacturing. The HSK certification is internationally recognised.

## 2. Spanish

Spanish is the second most-spoken language in the world by native speakers. Its reach across 20+ countries makes it indispensable in sectors from healthcare and education to tourism and international trade.

## 3. German

Germany is Europe's economic powerhouse. German is essential for careers in engineering, automotive, finance, and the broader EU institutional sector.

## 4. Arabic

Arabic opens doors across the Middle East and North Africa — regions with some of the fastest-growing economies and significant investment in infrastructure, tech, and energy.

## 5. French

French is an official language of 29 countries and the working language of many international organisations including the EU, UN, and UNESCO. It remains highly valued in diplomacy and luxury sectors.

## Getting Started

The best language is the one you'll actually stick with — so choose one that genuinely excites you and ties to your professional goals. Then commit to consistent daily practice and find a good teacher.`,
    author: 'James Okafor',
    authorRole: 'Head of Curriculum',
    date: '2026-02-28',
    readTime: '6 min read',
    category: 'Career',
    image: 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/top5-languages.jpg',
    tags: ['Career', 'Languages', 'Business', 'Professional Development'],
  },
  {
    id: '3',
    slug: 'the-science-of-language-learning',
    title: 'The Science of Language Learning: What Really Works',
    excerpt: 'Cognitive science research reveals the most effective techniques for acquiring a second language — and dispels some popular myths.',
    content: `## Myth-Busting Language Learning

Popular language apps and methods often promise fast results, but what does the science actually say about learning a second language effectively?

## Spaced Repetition: The Memory Game-Changer

Spaced repetition systems (SRS) exploit the psychological "forgetting curve". By reviewing vocabulary at precisely calculated intervals, you dramatically improve retention while spending less time studying. Anki is the leading free tool.

## Comprehensible Input

Linguist Stephen Krashen's Input Hypothesis argues that language acquisition happens when learners encounter material that is slightly above their current level ("i+1"). This means reading and listening to content you almost — but not quite — fully understand.

## The Power of Output

Producing language (speaking and writing) forces your brain to retrieve vocabulary and grammar, which strengthens memory traces far more than passive exposure. Aim for a 70/30 input-to-output ratio.

## Sleep and Memory Consolidation

Research shows that sleep plays a critical role in consolidating language memories. Studying before bed and getting 7–9 hours of quality sleep significantly improves retention.

## Social Learning

Humans evolved to communicate. Using your target language in real conversations with real people activates emotion and context in ways that drills simply cannot replicate.

## Practical Recommendations

1. Use spaced repetition for vocabulary (30 min/day)
2. Consume content slightly above your level daily
3. Speak from day one — imperfection is part of the process
4. Find a language exchange partner
5. Take structured lessons to build a grammar framework`,
    author: 'Dr. Priya Nair',
    authorRole: 'Applied Linguistics Researcher',
    date: '2026-02-14',
    readTime: '10 min read',
    category: 'Learning Science',
    image: 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/science-learning.jpg',
    tags: ['Learning Science', 'Study Tips', 'Linguistics', 'Methodology'],
  },
  {
    id: '4',
    slug: 'student-life-in-london',
    title: 'Student Life in London: Everything You Need to Know',
    excerpt: 'From affordable neighbourhoods to hidden cultural gems, here is your insider guide to making the most of studying in one of the world\'s greatest cities.',
    content: `## Welcome to London

London is one of the most exciting, diverse, and dynamic cities in the world — and studying here is an incredible privilege. But it can also be expensive and overwhelming if you don't know where to look.

## Affordable Neighbourhoods

- **Stratford (E15):** Great transport links, significantly cheaper than central London
- **Brixton (SW9):** Vibrant cultural scene, excellent food, well-connected
- **Peckham (SE15):** Up-and-coming, artsy, affordable
- **Walthamstow (E17):** Leafy, community feel, cheap rents

## Free and Low-Cost Culture

London's museums are mostly free. The British Museum, National Gallery, Tate Modern, Victoria & Albert Museum, and Natural History Museum all charge nothing for general admission. Exploit this.

## Transport Tips

Get an 18+ Student Oyster Card for 30% off Tube and bus fares. Walk whenever you can — London is more walkable than most tourists realise, and you'll discover brilliant things en route.

## Food on a Budget

- Borough Market (Fri–Sat) for amazing affordable street food
- Tooting Market for incredible international cuisine
- Any Wetherspoon for a solid cheap meal
- Aldi and Lidl for grocery shopping

## Language Practice Opportunities

London's diversity is your language learning superpower. You'll find Spanish speakers in Elephant & Castle, French in South Kensington, Arabic in Edgware Road, and Mandarin in Chinatown.`,
    author: 'Emma Clarke',
    authorRole: 'Student Experience Manager',
    date: '2026-01-30',
    readTime: '7 min read',
    category: 'Student Life',
    image: 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/student-life-london.jpg',
    tags: ['London', 'Student Life', 'Tips', 'Culture'],
  },
  {
    id: '5',
    slug: 'cambridge-b2-first-complete-guide',
    title: 'Cambridge B2 First: Your Complete Preparation Guide',
    excerpt: 'Everything you need to know about the Cambridge B2 First examination — structure, marking criteria, common pitfalls, and top tips for success.',
    content: `## What is Cambridge B2 First?

The Cambridge B2 First (formerly known as FCE — First Certificate in English) is one of the world's most recognised English qualifications. It proves you can communicate effectively in English at an upper-intermediate level.

## Exam Structure

**Reading and Use of English** (1 hour 15 min)
Seven parts testing grammar, vocabulary, and reading comprehension.

**Writing** (1 hour 20 min)
Two tasks: a compulsory essay plus one from a choice of formats (article, letter/email, report, review).

**Listening** (approximately 40 min)
Four parts with a range of text types and question formats.

**Speaking** (approximately 14 min)
Four parts conducted in pairs with two examiners.

## Common Pitfalls

- Spending too long on Part 1 Reading and running out of time
- Writing task 2 without planning — always spend 5 minutes planning
- Not practising collaborative Speaking tasks with a partner
- Neglecting the Cambridge Word List for Vocabulary

## Top Tips for Success

1. Read the exam specifications thoroughly — know exactly what each part tests
2. Practise under timed conditions every week
3. Build a bank of B2-level vocabulary with example sentences
4. Get your writing marked professionally at least once per month
5. Watch English TV and films without subtitles regularly`,
    author: 'Dr. Sarah Mitchell',
    authorRole: 'Cambridge Exam Specialist',
    date: '2026-01-15',
    readTime: '9 min read',
    category: 'Exam Tips',
    image: 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/cambridge-b2.jpg',
    tags: ['Cambridge', 'B2 First', 'FCE', 'Exam Preparation', 'English'],
  },
  {
    id: '6',
    slug: 'immersion-programmes-spain-2026',
    title: 'Our Best Study Abroad Immersion Programmes in Spain for 2026',
    excerpt: 'From Barcelona to Seville, discover our handpicked Spanish immersion programmes that combine expert language tuition with unforgettable cultural experiences.',
    content: `## Why Study Spanish in Spain?

There is simply no substitute for learning a language where it is spoken every day. Our Spain immersion programmes combine intensive classroom instruction with real-world language use — every shop, restaurant, and conversation becomes a learning opportunity.

## Barcelona Programme

Our Barcelona programme is based at a prestigious language school in the Eixample district, minutes from Las Ramblas. Students take 20 hours of Spanish classes per week in groups of maximum 10, plus optional cooking classes, flamenco lessons, and weekend excursions to Montserrat and Sitges.

## Seville Programme

Seville is arguably the most classically Spanish city — perfect for students who want total cultural immersion. The slower pace of life, the warm locals, and the flawless Castilian Spanish make it an outstanding learning environment. Our partner school here has an exceptional track record with DELE exam preparation.

## Madrid Programme

The Spanish capital offers the ultimate urban immersion experience. Our Madrid programme is tailored for professionals and includes a business Spanish module alongside general language training.

## What's Included

- 20 hours of tuition per week
- Host family or student residence accommodation
- Airport transfers
- Welcome and farewell dinners
- Cultural activities programme
- London Language Academy certificate on completion

## How to Apply

Contact our Study Abroad team for programme dates, pricing, and availability. Early booking is strongly recommended as places fill quickly.`,
    author: 'Sofia Reyes',
    authorRole: 'Study Abroad Coordinator',
    date: '2025-12-20',
    readTime: '6 min read',
    category: 'Study Abroad',
    image: 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/study-abroad-spain.jpg',
    tags: ['Study Abroad', 'Spanish', 'Spain', 'Immersion', 'Barcelona'],
  },
  {
    id: '7',
    slug: 'why-travel-to-different-countries',
    title: 'Why We Should Travel to Different Countries',
    excerpt: 'International travel goes beyond leisure — it offers personal development, cultural understanding, and life-changing experiences that transform the way we see the world.',
    content: `## The Transformative Power of Discovery

Travelling to different countries is one of the most enriching experiences a person can have. Beyond the photos and souvenirs, travel has the power to fundamentally change the way we think, communicate, and understand the world.

## 10 Reasons to Travel

**1. Expanded Perspectives** — Exposure to different cultures and traditions broadens your understanding of the world and challenges assumptions you never knew you had.

**2. Language Acquisition** — Being surrounded by a foreign language accelerates learning in ways no classroom can fully replicate. Every sign, conversation, and menu becomes a lesson.

**3. Appreciation for Home** — Experiencing life elsewhere gives you a fresh appreciation for your own culture, people, and the things you may have taken for granted.

**4. Personal Growth** — Navigating unfamiliar environments pushes you outside your comfort zone and builds resilience, confidence, and independence.

**5. Self-Discovery** — Travel creates the space for reflection. Many people return home with a clearer sense of who they are and what they want.

**6. Meaningful Connections** — Meeting people from diverse backgrounds builds empathy and often results in friendships that last a lifetime.

**7. Cultural Immersion** — Participating in local festivals, traditions, and daily life gives you an authentic understanding of a culture that no documentary can match.

**8. Creative Thinking** — Exposure to different ways of solving problems and organising society sparks creativity and innovation.

**9. Mental Health Benefits** — Travel reduces stress, provides perspective on everyday problems, and creates lasting positive memories.

**10. Lasting Memories** — The experiences you collect travelling enrich your life narrative in ways that material possessions simply cannot.

## Travel and Language Learning

At London Language Academy, we see travel as one of the most powerful tools for language development. That is why our Study Abroad programmes are designed to combine expert classroom tuition with genuine cultural immersion — because the two together produce results that neither can achieve alone.`,
    author: 'London Language Academy',
    authorRole: 'LLA Team',
    date: '2023-01-13',
    readTime: '5 min read',
    category: 'Study Abroad',
    image: 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/travel-countries.jpg',
    tags: ['Travel', 'Culture', 'Language Learning', 'Personal Growth'],
  },
  {
    id: '8',
    slug: 'never-stop-learning',
    title: 'Never Stop Learning: The Key to Infinite Growth',
    excerpt: 'Lifelong learning is essential for personal and professional development. Continuous learning extends beyond classrooms and encourages us to embrace growth through daily challenges.',
    content: `## Learning Never Ends

The world is changing faster than ever. New technologies, new industries, and new ways of working emerge every year. In this environment, the people who thrive are not necessarily the most talented — they are the most adaptable. And adaptability starts with a commitment to lifelong learning.

## Beyond the Classroom

Learning is not limited to textbooks, lectures, or formal qualifications. Every conversation, every challenge, every mistake is an opportunity to grow. The best learners are those who approach daily life with curiosity and openness.

## The Power of Small Steps

You do not need to transform overnight. Small, consistent steps compound into remarkable progress over time. Reading one article a day, practising a language for 20 minutes, or asking one genuine question in a meeting — these habits, sustained over months and years, produce extraordinary results.

## Curiosity as a Superpower

Curious people ask better questions, make better decisions, and find more creative solutions. Cultivating curiosity — refusing to accept "that's just how it is" — is perhaps the most valuable intellectual habit you can develop.

## Language Learning as a Model

Learning a language is one of the clearest illustrations of the lifelong learning mindset. It requires patience, consistency, and a tolerance for mistakes. The willingness to speak imperfectly — to be a beginner in public — is exactly the attitude that leads to mastery.

At London Language Academy, we believe that learning a language is not just about acquiring a skill. It is about adopting a growth mindset that will serve you in every area of life.

## Your Next Step

With each lesson learned, you move closer to your best version. The only question is: what will you learn next?`,
    author: 'London Language Academy',
    authorRole: 'LLA Team',
    date: '2023-02-22',
    readTime: '4 min read',
    category: 'Learning Science',
    image: 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/never-stop-learning.jpg',
    tags: ['Learning', 'Growth', 'Mindset', 'Personal Development'],
  },
  {
    id: '9',
    slug: 'advantages-of-learning-in-a-language-course',
    title: 'Advantages of Learning a Language in a Language Course',
    excerpt: 'Why is enrolling in a structured language course more effective than self-study? Here are 10 key advantages that make the difference.',
    content: `## Structure Makes the Difference

Self-study has its place, but for most learners a structured language course produces faster, more sustainable results. Here is why.

## 10 Advantages of a Language Course

**1. Structured Learning Environment** — Courses are designed with a logical progression through levels, ensuring no gaps in your knowledge and a clear path forward.

**2. Professional Guidance** — Qualified instructors correct your pronunciation, explain grammar rules, and provide the nuanced guidance that apps and textbooks cannot offer.

**3. Interactive Learning** — Group discussions, role-plays, and collaborative activities make learning engaging and help you practise in realistic contexts.

**4. Peer Learning and Motivation** — Learning alongside others creates a community of accountability. Sharing tips, celebrating progress, and supporting each other accelerates growth.

**5. Access to Resources** — Courses provide textbooks, audio files, online portals, and supplementary materials that would cost significantly more to source independently.

**6. Clear Goals and Progress Tracking** — Regular assessments give you an honest picture of your progress and keep you on track toward your goals.

**7. Cultural Awareness** — Good language courses integrate culture — literature, films, traditions, and social norms — giving your language skills real-world context.

**8. Exam Preparation** — Whether you are targeting IELTS, TOEFL, YDS, YÖKDİL, or another qualification, a course prepares you systematically for the specific demands of the exam.

**9. Flexible Formats** — Modern language schools offer in-person, online, group, and one-to-one options, making it easier than ever to find a format that fits your life.

**10. Increased Real-World Confidence** — Regular practice in a supportive environment builds the confidence to use your language in real situations — at work, while travelling, and in daily life.

## Start Your Journey

London Language Academy offers all of the above across our General English, Exam English, and Other Languages programmes. Speak to our team today to find the right course for you.`,
    author: 'London Language Academy',
    authorRole: 'LLA Team',
    date: '2023-02-22',
    readTime: '6 min read',
    category: 'Learning Science',
    image: 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/language-course.jpg',
    tags: ['Language Course', 'Study Tips', 'Education', 'Learning'],
  },
  {
    id: '10',
    slug: 'ielts-toefl-training-bursa',
    title: 'IELTS and TOEFL Training in Bursa',
    excerpt: 'London Language Academy offers specialised IELTS and TOEFL preparation courses in Bursa — Nilüfer to help students achieve their target scores for international education and professional opportunities.',
    content: `## Two Exams, One Goal

IELTS and TOEFL are the world's two most widely accepted English proficiency examinations. Together they are recognised by thousands of universities, employers, and official institutions in over 140 countries.

## IELTS vs TOEFL: Key Differences

**IELTS** tests both academic and everyday English. The Speaking component is conducted face-to-face with a real examiner — a format many students find more natural and less stressful than computer-based alternatives.

**TOEFL** is more academically focused and is entirely computer-based. The Speaking section requires responses recorded into a microphone, and the test is particularly well recognised by North American universities.

## Our Bursa Preparation Programme

At our Nilüfer, Bursa branch, we offer a comprehensive preparation programme for both exams. The programme includes:

- **Initial level assessment** to establish your starting point and target score gap
- **Customised curriculum** covering all four skills with exam-specific techniques and time management strategies
- **Qualified instructors** with proven track records of helping students exceed their target scores
- **Regular practice exams** under timed, realistic conditions
- **Speaking clubs and writing workshops** for additional targeted practice
- **Individual feedback sessions** so you understand exactly where to improve

## Who Is This Programme For?

Our IELTS and TOEFL preparation course is suitable for students who have completed at least a B1 level of English (equivalent to our Transitional level) and are working toward a specific score for university admission, immigration, or professional certification.

## Get Started

Contact our Bursa — Nilüfer branch to arrange a free level assessment and discuss which exam and programme is right for you.`,
    author: 'London Language Academy',
    authorRole: 'LLA Team',
    date: '2025-09-02',
    readTime: '5 min read',
    category: 'Exam Tips',
    image: 'https://rjnbglsmjcuvlbxozbdq.supabase.co/storage/v1/object/public/images/blog/ielts-toefl-bursa.jpg',
    tags: ['IELTS', 'TOEFL', 'Bursa', 'Exam Preparation', 'English'],
  },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export const faqItems: FAQItem[] = [
  // ── General ──────────────────────────────────────────────────────────────────
  {
    id: '1',
    question: 'Where is London Language Academy located?',
    answer: 'Our main school has been based in central London for nearly 100 years. We also have branches in Bursa and Istanbul, Turkey, founded in 2021. All three locations offer the same high-quality language education.',
    answerHtml: 'Our main school has been based in <strong class="faq-highlight">central London</strong> for nearly 100 years. We also have branches in <strong class="faq-highlight">Bursa and Istanbul, Turkey</strong>, founded in 2021. All three locations offer the same high-quality language education.',
    category: 'General',
  },
  {
    id: '2',
    question: 'What age groups do you teach?',
    answer: 'Our courses are open to learners of all ages. We offer dedicated programmes for adults, young learners, and also Kids courses for younger students.',
    answerHtml: 'Our courses are open to <strong class="faq-highlight">learners of all ages</strong>. We offer dedicated programmes for adults, young learners, and also <strong class="faq-highlight">Kids courses</strong> for younger students.',
    category: 'General',
  },
  {
    id: '3',
    question: 'What other languages can I learn at London Language Academy?',
    answer: 'At London Language Academy we do not focus only on English — we give equal importance to German, French, Russian, Spanish, Italian and many more languages. We offer group and private lesson options for these languages to cater to various learning needs.',
    answerHtml: 'At <strong class="faq-highlight">London Language Academy</strong> we do not focus only on English — we give equal importance to <strong class="faq-highlight">German, French, Russian, Spanish, Italian</strong> and many more languages. We offer group and private lesson options for these languages to cater to various learning needs.',
    category: 'General',
  },
  {
    id: '2',
    question: 'What types of activities are there?',
    answer: 'At London Language Academy we go beyond traditional teaching methods. Every day we offer a variety of engaging activities such as speaking, listening, games, makeup and café lessons. We also organise fun outdoor activities every week including volleyball matches, picnics, table tennis, bowling, meet-and-greet parties and more, creating a dynamic learning environment.',
    answerHtml: 'At <strong class="faq-highlight">London Language Academy</strong> we go beyond traditional teaching methods. Every day we offer a variety of engaging activities such as <strong class="faq-highlight">speaking, listening, games, makeup and café lessons</strong>. We also organise fun outdoor activities every week including volleyball matches, picnics, table tennis, bowling, meet-and-greet parties and more, creating a dynamic learning environment.',
    category: 'General',
  },
  {
    id: '3',
    question: 'How long does it take to learn a language?',
    answer: 'There is no fixed timeframe for learning a language, as we continuously acquire new knowledge throughout our lives. However, if you dedicate yourself intensively to a language, you can generally gain conversational ability within 3 to 6 months. As London Language Academy, we aim to accelerate this process and offer various engaging activities to help our students reach their goals faster.',
    answerHtml: 'There is no fixed timeframe for learning a language, as we continuously acquire new knowledge throughout our lives. However, if you dedicate yourself intensively to a language, you can generally gain conversational ability within <strong class="faq-highlight">3 to 6 months</strong>. As <strong class="faq-highlight">London Language Academy</strong>, we aim to accelerate this process and offer various engaging activities to help our students reach their goals faster.',
    category: 'General',
  },
  {
    id: '4',
    question: 'How many students are in each class?',
    answer: 'Our classes have between 7 and 14 students.',
    answerHtml: 'Our classes have between <strong class="faq-highlight">7 and 14 students</strong>.',
    category: 'General',
  },
  {
    id: '5',
    question: 'Is Turkish spoken during lessons?',
    answer: 'Our lessons are conducted entirely 100% in English.',
    answerHtml: 'Our lessons are conducted entirely <strong class="faq-highlight">100% in English</strong>.',
    category: 'General',
  },
  {
    id: '6',
    question: 'Do you send students abroad for education?',
    answer: 'We send students abroad through our language education programme, summer school, academic placement programme, internship programme and Work & Travel.',
    answerHtml: 'We send students abroad through our <em><strong class="faq-highlight">language education programme, summer school, academic placement programme, internship programme and Work & Travel</strong></em>.',
    category: 'General',
  },
  // ── Courses ──────────────────────────────────────────────────────────────────
  {
    id: '7',
    question: 'What days and times are classes held?',
    answer: 'Classes run Monday–Wednesday, Tuesday–Thursday, and Saturday–Sunday. Sessions start at 09:00, 13:00 and 19:00.',
    answerHtml: 'Classes run <strong class="faq-highlight">Monday–Wednesday, Tuesday–Thursday, and Saturday–Sunday</strong>. Sessions start at <strong class="faq-highlight">09:00, 13:00 and 19:00</strong>.',
    category: 'Courses',
  },
  {
    id: '8',
    question: 'Are makeup / catch-up lessons available?',
    answer: 'Yes — makeup lessons are available in both general and private formats.',
    category: 'Courses',
  },
  {
    id: '9',
    question: 'Do activities happen every day?',
    answer: 'We have speaking activities every single day of the week.',
    answerHtml: 'We have <strong class="faq-highlight">speaking activities</strong> every single day of the week.',
    category: 'Courses',
  },
  {
    id: '10',
    question: 'Can I attend activities as much as I want?',
    answer: 'You can join our speaking clubs free of charge for life.',
    answerHtml: 'You can join our <em><strong class="faq-highlight">speaking clubs free of charge for life</strong></em>.',
    category: 'Courses',
  },
  {
    id: '11',
    question: 'How do you determine my level?',
    answer: 'A placement test is conducted verbally or in writing. The written test contains 72 questions covering all course levels. The oral test consists of 5–10 minutes of everyday conversation.',
    answerHtml: 'A placement test is conducted <strong class="faq-highlight">verbally or in writing</strong>.<br/>• Written test: <strong class="faq-highlight">72 questions</strong> covering all course levels<br/>• Oral test: <strong class="faq-highlight">5–10 minutes</strong> of everyday conversation',
    category: 'Courses',
  },
  {
    id: '12',
    question: 'How are classes formed?',
    answer: 'Students are placed at the appropriate level based on their placement test results and begin their education from there.',
    category: 'Courses',
  },
  {
    id: '13',
    question: 'Do you provide course materials?',
    answer: "We use Oxford's Headway resources. The books are free and completely original.",
    answerHtml: 'We use <strong class="faq-highlight">Oxford\'s Headway</strong> resources. The books are <strong class="faq-highlight">free and completely original</strong>.',
    category: 'Courses',
  },
  {
    id: '15',
    question: 'How do I register for a course?',
    answer: 'Registering is simple. Take our free online level test on this website to find your level, then contact us via the enquiry form or call us directly. Our team will guide you through the enrolment process, confirm your session times, and get you started.',
    answerHtml: 'Registering is simple. Take our <strong class="faq-highlight">free online level test</strong> on this website to find your level, then contact us via the enquiry form or call us directly. Our team will guide you through the <strong class="faq-highlight">enrolment process</strong>, confirm your session times, and get you started.',
    category: 'Courses',
  },
  {
    id: '16',
    question: 'Do you offer online courses?',
    answer: 'Yes. All of our courses are available online via live video sessions. Our online courses use the same curriculum, teachers, and materials as our in-person classes, so you get the same quality education from anywhere in the world.',
    answerHtml: 'Yes. All of our courses are available <strong class="faq-highlight">online via live video sessions</strong>. Our online courses use the same curriculum, teachers, and materials as our in-person classes, so you get the <strong class="faq-highlight">same quality education from anywhere in the world</strong>.',
    category: 'Courses',
  },
  {
    id: '17',
    question: 'Do you prepare students for official exams?',
    answer: 'Yes. We offer dedicated preparation courses for IELTS, Cambridge B2 First, C1 Advanced and C2 Proficiency, as well as other internationally recognised qualifications.',
    answerHtml: 'Yes. We offer dedicated preparation courses for <strong class="faq-highlight">IELTS, Cambridge B2 First, C1 Advanced</strong> and <strong class="faq-highlight">C2 Proficiency</strong>, as well as other internationally recognised qualifications.',
    category: 'Courses',
  },
  // ── Teachers ─────────────────────────────────────────────────────────────────
  {
    id: '14',
    question: 'Are your teachers native speakers?',
    answer: 'Freshman (A1–A2) → Turkish teacher (to avoid communication difficulties). Climber (A2–B1) → Turkish and foreign teachers. Transactional (B1+) → Foreign teacher. All higher levels are taught exclusively by our foreign teachers.',
    answerHtml: '<strong class="faq-highlight">Freshman (A1–A2)</strong> → Turkish teacher (to avoid communication difficulties)<br/><strong class="faq-highlight">Climber (A2–B1)</strong> → Turkish and foreign teachers<br/><strong class="faq-highlight">Transactional (B1+) and all higher levels</strong> → Taught exclusively by our foreign teachers.',
    category: 'Teachers',
  },
  {
    id: '18',
    question: 'What qualifications do your teachers hold?',
    answer: 'All of our teachers are experienced, qualified language educators. Native and non-native teachers are selected through a rigorous process to ensure they meet our high teaching standards. Every teacher undergoes ongoing professional development.',
    answerHtml: 'All of our teachers are <strong class="faq-highlight">experienced, qualified language educators</strong>. Native and non-native teachers are selected through a <strong class="faq-highlight">rigorous process</strong> to ensure they meet our high teaching standards. Every teacher undergoes <strong class="faq-highlight">ongoing professional development</strong>.',
    category: 'Teachers',
  },
  // ── Study Abroad ─────────────────────────────────────────────────────────────
  {
    id: '19',
    question: 'What study abroad programmes do you offer?',
    answer: 'We offer five programmes: Language Education Abroad, Summer School, Academic Placement, Work & Travel, and Internship. Each programme is tailored to different goals, durations, and age groups.',
    answerHtml: 'We offer five programmes: <strong class="faq-highlight">Language Education Abroad, Summer School, Academic Placement, Work & Travel,</strong> and <strong class="faq-highlight">Internship</strong>. Each programme is tailored to different goals, durations, and age groups.',
    category: 'Study Abroad',
  },
  {
    id: '20',
    question: 'Who can apply for a study abroad programme?',
    answer: 'Our study abroad programmes are open to students of all levels. Whether you are a beginner or advanced learner, we have a suitable programme for you. Some programmes such as internships and academic placements may require a minimum level.',
    answerHtml: 'Our study abroad programmes are open to <strong class="faq-highlight">students of all levels</strong>. Whether you are a beginner or advanced learner, we have a suitable programme for you. Some programmes such as <strong class="faq-highlight">internships and academic placements</strong> may require a minimum level.',
    category: 'Study Abroad',
  },
  {
    id: '21',
    question: 'How do I apply for a study abroad programme?',
    answer: 'Simply contact us through the enquiry form on the Study Abroad page or send us a message directly. Our team will explain the available options, help you choose the right programme for your goals, and guide you through every step of the application process.',
    answerHtml: 'Simply contact us through the <strong class="faq-highlight">enquiry form on the Study Abroad page</strong> or send us a message directly. Our team will explain the available options, help you choose the right programme for your goals, and guide you through <strong class="faq-highlight">every step of the application process</strong>.',
    category: 'Study Abroad',
  },
  {
    id: '22',
    question: 'Do study abroad programmes include accommodation?',
    answer: 'Yes. Accommodation arrangements are included or coordinated as part of each programme. Depending on the destination and programme type, options may include host families, student dormitories, or shared apartments.',
    answerHtml: 'Yes. <strong class="faq-highlight">Accommodation arrangements are included or coordinated</strong> as part of each programme. Depending on the destination and programme type, options may include <strong class="faq-highlight">host families, student dormitories, or shared apartments</strong>.',
    category: 'Study Abroad',
  },
  {
    id: '23',
    question: 'What countries are available for study abroad?',
    answer: 'We send students to destinations across Europe and beyond, including the UK, Ireland, Malta, USA, Canada, Australia and more. Available destinations depend on the programme type. Contact us to see which destinations are currently open.',
    answerHtml: 'We send students to destinations across the world, including <strong class="faq-highlight">the UK, Ireland, Malta, USA, Canada, Australia</strong> and more. Available destinations depend on the programme type. Contact us to see which destinations are currently open.',
    category: 'Study Abroad',
  },
]

// ─── Quiz Questions ───────────────────────────────────────────────────────────

export const questionPool: QuizQuestion[] = [
  // ── A1 ──────────────────────────────────────────────────────────────────────
  {
    id: 1,
    question: 'Choose the correct sentence:',
    options: ["She don't like coffee.", "She doesn't likes coffee.", "She doesn't like coffee.", "She not like coffee."],
    correct: 2,
    explanation: '"Doesn\'t" is the correct third-person singular negative. The main verb "like" does not take "-s" after "doesn\'t".',
    level: 'A1',
  },
  {
    id: 2,
    question: 'What is the past tense of "go"?',
    options: ['Goed', 'Gone', 'Went', 'Was going'],
    correct: 2,
    explanation: '"Go" is an irregular verb. Its simple past tense is "went". "Gone" is the past participle.',
    level: 'A1',
  },
  {
    id: 3,
    question: 'Complete the sentence: "My name ___ Sarah."',
    options: ['am', 'is', 'are', 'be'],
    correct: 1,
    explanation: '"Is" is used with third-person singular subjects (he, she, it, and names like Sarah).',
    level: 'A1',
  },
  {
    id: 4,
    question: '___ you like tea or coffee?',
    options: ['Does', 'Is', 'Do', 'Are'],
    correct: 2,
    explanation: '"Do" forms questions with I/you/we/they. "Does" is used with he/she/it.',
    level: 'A1',
  },
  {
    id: 5,
    question: 'There ___ two cats on the sofa.',
    options: ['am', 'is', 'are', 'be'],
    correct: 2,
    explanation: '"Are" is used with plural nouns: "There are + plural noun."',
    level: 'A1',
  },
  {
    id: 6,
    question: 'She ___ to school every day.',
    options: ['go', 'going', 'gone', 'goes'],
    correct: 3,
    explanation: 'With third-person singular subjects (she), we add "-s" in the present simple: "goes".',
    level: 'A1',
  },
  {
    id: 7,
    question: 'How ___ you today?',
    options: ['is', 'does', 'are', 'am'],
    correct: 2,
    explanation: '"How are you?" is the standard greeting. "Are" is used with "you" as the subject.',
    level: 'A1',
  },
  {
    id: 8,
    question: 'I ___ a student at this school.',
    options: ['is', 'are', 'am', 'be'],
    correct: 2,
    explanation: '"Am" is used only with the first person singular "I".',
    level: 'A1',
  },
  {
    id: 9,
    question: 'What time ___ the train leave?',
    options: ['are', 'do', 'is', 'does'],
    correct: 3,
    explanation: '"Does" is used in present simple questions with third-person singular subjects like "the train".',
    level: 'A1',
  },
  {
    id: 10,
    question: 'Choose the correct question:',
    options: ['Where are you from?', 'Where you are from?', 'Where from are you?', 'From where you are?'],
    correct: 0,
    explanation: 'In English questions the auxiliary verb ("are") comes before the subject ("you"): "Where are you from?"',
    level: 'A1',
  },
  // ── A2 ──────────────────────────────────────────────────────────────────────
  {
    id: 11,
    question: 'Complete the sentence: "I have been waiting here _____ two hours."',
    options: ['since', 'for', 'during', 'while'],
    correct: 1,
    explanation: '"For" is used with a period of time. "Since" is used with a specific point in time (since 3pm, since Monday).',
    level: 'A2',
  },
  {
    id: 12,
    question: 'Which sentence uses the Present Perfect correctly?',
    options: ['I have seen that film yesterday.', 'I have seen that film last year.', 'I have never seen that film.', 'I have seen that film in 2019.'],
    correct: 2,
    explanation: 'The Present Perfect cannot be used with specific past time expressions. "Never" is a non-specific adverb and correctly pairs with Present Perfect.',
    level: 'A2',
  },
  {
    id: 13,
    question: 'I ___ watching TV when you called me.',
    options: ['am', 'have been', 'was', 'had'],
    correct: 2,
    explanation: 'Past continuous ("was watching") is used for an action in progress when another action interrupted it.',
    level: 'A2',
  },
  {
    id: 14,
    question: 'She had already left when I ___ at the party.',
    options: ['arrive', 'arrives', 'was arriving', 'arrived'],
    correct: 3,
    explanation: 'Past simple ("arrived") is used for the action that happened after the past perfect ("had left").',
    level: 'A2',
  },
  {
    id: 15,
    question: 'This is the ___ restaurant I have ever been to.',
    options: ['more expensive', 'expensiver', 'most expensive', 'expensivest'],
    correct: 2,
    explanation: 'Superlatives use "most" for longer adjectives. "Expensiver" and "expensivest" are not real words.',
    level: 'A2',
  },
  {
    id: 16,
    question: 'I am looking ___ a new flat to rent.',
    options: ['at', 'after', 'to', 'for'],
    correct: 3,
    explanation: '"Look for" means to search for something. "Look at" means to direct your eyes at. "Look after" means to take care of.',
    level: 'A2',
  },
  {
    id: 17,
    question: 'He is ___ than his older brother.',
    options: ['more tall', 'tallest', 'most tall', 'taller'],
    correct: 3,
    explanation: 'One-syllable adjectives form the comparative by adding "-er": "taller".',
    level: 'A2',
  },
  {
    id: 18,
    question: '___ you ever tried sushi?',
    options: ['Did', 'Do', 'Are', 'Have'],
    correct: 3,
    explanation: '"Have you ever...?" uses the Present Perfect for life experiences. "Did you...?" would require a specific time reference.',
    level: 'A2',
  },
  {
    id: 19,
    question: 'I used to ___ football every weekend when I was at school.',
    options: ['playing', 'played', 'plays', 'play'],
    correct: 3,
    explanation: '"Used to" is always followed by the base infinitive: "used to play".',
    level: 'A2',
  },
  {
    id: 20,
    question: 'We ___ in this city since 2015.',
    options: ['live', 'lived', 'are living', 'have lived'],
    correct: 3,
    explanation: 'Present Perfect ("have lived") is used with "since" to describe a situation that started in the past and continues now.',
    level: 'A2',
  },
  // ── B1 ──────────────────────────────────────────────────────────────────────
  {
    id: 21,
    question: 'Choose the sentence with the correct conditional form:',
    options: ['If I would have more time, I would learn Japanese.', 'If I had more time, I would learn Japanese.', 'If I have more time, I would learn Japanese.', 'If I had more time, I will learn Japanese.'],
    correct: 1,
    explanation: 'Second conditional (hypothetical): "If + past simple, would + infinitive". Never use "would" in the if-clause.',
    level: 'B1',
  },
  {
    id: 22,
    question: 'The report was _____ received by the board of directors.',
    options: ['enthusiastically', 'enthusiastic', 'enthusiasm', 'enthusiast'],
    correct: 0,
    explanation: 'An adverb is needed to modify the verb "received". "Enthusiastically" is the adverb form of "enthusiastic".',
    level: 'B1',
  },
  {
    id: 23,
    question: 'She told me that she ___ tired and wanted to go home.',
    options: ['is', 'has been', 'was', 'will be'],
    correct: 2,
    explanation: 'In reported speech, present simple ("is") shifts back to past simple ("was") — this is called backshift.',
    level: 'B1',
  },
  {
    id: 24,
    question: 'The new community centre ___ by the Mayor last Friday.',
    options: ['opened', 'was opened', 'has opened', 'is opening'],
    correct: 1,
    explanation: 'The passive uses "to be + past participle". Since it happened at a specific past time, we use "was opened".',
    level: 'B1',
  },
  {
    id: 25,
    question: 'You ___ see a doctor — that cough sounds really serious.',
    options: ['could', 'shall', 'should', 'might'],
    correct: 2,
    explanation: '"Should" expresses advice or recommendation. "Could" and "might" express possibility, not advice.',
    level: 'B1',
  },
  {
    id: 26,
    question: 'I really enjoy ___ to live music at weekends.',
    options: ['to listen', 'listen', 'listened', 'listening'],
    correct: 3,
    explanation: 'After "enjoy" we always use the gerund (-ing form): "I enjoy listening to..."',
    level: 'B1',
  },
  {
    id: 27,
    question: 'She decided to give ___ chocolate for the whole of January.',
    options: ['in', 'away', 'off', 'up'],
    correct: 3,
    explanation: '"Give up" means to stop doing something. "Give away" means to donate. "Give in" means to surrender. "Give off" means to emit.',
    level: 'B1',
  },
  {
    id: 28,
    question: 'I will send you the report ___ I finish writing it.',
    options: ['while', 'during', 'since', 'as soon as'],
    correct: 3,
    explanation: '"As soon as" means immediately after. After time conjunctions, we use the present simple — not "will".',
    level: 'B1',
  },
  {
    id: 29,
    question: "You're coming to dinner tonight, ___?",
    options: ["isn't it", "don't you", "won't you", "aren't you"],
    correct: 3,
    explanation: 'Question tags match the auxiliary in the main clause. "You\'re" uses "are", so the tag is "aren\'t you?"',
    level: 'B1',
  },
  {
    id: 30,
    question: 'I wish I ___ speak Mandarin — it would open so many doors.',
    options: ['can', 'will', 'would', 'could'],
    correct: 3,
    explanation: '"Wish + could" expresses a desire for an ability we do not currently have.',
    level: 'B1',
  },
  // ── B2 ──────────────────────────────────────────────────────────────────────
  {
    id: 31,
    question: 'Which word best completes the sentence? "Despite _____ hard, she failed the exam."',
    options: ['studied', 'to study', 'having studied', 'she studied'],
    correct: 2,
    explanation: 'After "despite" we use a noun or gerund phrase. "Having studied" is the perfect gerund, showing the studying happened before the failing.',
    level: 'B2',
  },
  {
    id: 32,
    question: 'The new legislation will _____ significant changes to employment law.',
    options: ['bring about', 'bring off', 'bring round', 'bring forward'],
    correct: 0,
    explanation: '"Bring about" means to cause something to happen. "Bring off" = succeed at something difficult. "Bring round" = persuade or revive. "Bring forward" = move to an earlier date.',
    level: 'B2',
  },
  {
    id: 33,
    question: 'If he had revised more thoroughly, he ___ his driving test first time.',
    options: ['would pass', 'will have passed', 'had passed', 'would have passed'],
    correct: 3,
    explanation: 'Third conditional: "If + past perfect, would have + past participle." This refers to a hypothetical past situation.',
    level: 'B2',
  },
  {
    id: 34,
    question: 'Not only ___ late, but he also forgot to bring the presentation.',
    options: ['he arrived', 'he did arrive', 'arrived he', 'did he arrive'],
    correct: 3,
    explanation: 'After negative adverbials like "not only", subject-auxiliary inversion is required: "Not only did he arrive..."',
    level: 'B2',
  },
  {
    id: 35,
    question: "The charity's new campaign aims at ___ awareness of food poverty among school children.",
    options: ['making', 'doing', 'raising', 'growing'],
    correct: 2,
    explanation: '"Raise awareness" is the standard collocation. We raise awareness, funds, and concerns — not "make" or "do" them.',
    level: 'B2',
  },
  {
    id: 36,
    question: 'Despite being highly qualified, she is not very confident ___ public speaking.',
    options: ['in', 'for', 'with', 'at'],
    correct: 3,
    explanation: '"Confident at" is used for skills and abilities. "Confident in" is used for people (e.g., "confident in her team").',
    level: 'B2',
  },
  {
    id: 37,
    question: "The government's decision to cut funding had far-___ consequences for the arts sector.",
    options: ['reaching', 'fetched', 'sighted', 'flung'],
    correct: 0,
    explanation: '"Far-reaching" means having a wide range of effects. "Far-fetched" = unlikely. "Far-sighted" = able to plan ahead. "Far-flung" = distant.',
    level: 'B2',
  },
  {
    id: 38,
    question: '___ his vast experience in the field, he struggled to adapt to the new software.',
    options: ['Although', 'However', 'Despite', 'Even though'],
    correct: 2,
    explanation: '"Despite" is a preposition followed by a noun phrase. "Although" and "even though" are conjunctions requiring a full clause.',
    level: 'B2',
  },
  {
    id: 39,
    question: 'The proposal was met with ___ opposition from residents near the proposed development.',
    options: ['big', 'large', 'considerable', 'great amount of'],
    correct: 2,
    explanation: '"Considerable" is the natural collocation with "opposition" in formal or journalistic writing. "Big" and "large" are too informal.',
    level: 'B2',
  },
  {
    id: 40,
    question: 'The documentary shed ___ on the working conditions inside the factory.',
    options: ['sight', 'view', 'light', 'perspective'],
    correct: 2,
    explanation: '"Shed light on" is a fixed idiom meaning to clarify or reveal information about something.',
    level: 'B2',
  },
  // ── C1 ──────────────────────────────────────────────────────────────────────
  {
    id: 41,
    question: 'Identify the correct use of the subjunctive:',
    options: ['The committee insisted that the report was submitted immediately.', 'The committee insisted that the report be submitted immediately.', 'The committee insisted that the report is submitted immediately.', 'The committee insisted that the report would be submitted immediately.'],
    correct: 1,
    explanation: 'After "insist that" in formal English, the subjunctive is used: the base form of the verb (be, not is/was/would be).',
    level: 'C1',
  },
  {
    id: 42,
    question: 'Rarely ___ such extraordinary commitment in an athlete so young.',
    options: ['I have witnessed', 'have I witnessed', 'I witnessed', 'did I witnessed'],
    correct: 1,
    explanation: 'After negative adverbs (rarely, seldom, never), subject-auxiliary inversion is mandatory in formal English: "Rarely have I witnessed..."',
    level: 'C1',
  },
  {
    id: 43,
    question: '___ the door behind her, she stepped out into the pouring rain.',
    options: ['Closing', 'She closed', 'Closed', 'Having closed'],
    correct: 3,
    explanation: '"Having closed" (perfect participle) shows that one action was completed before another began. The participle subject must match the main clause subject.',
    level: 'C1',
  },
  {
    id: 44,
    question: 'Which sentence is written in the most formal register?',
    options: ['Can you give me more info about the job?', "I'd love to find out more about the position.", 'I am writing to enquire about the vacancy advertised.', 'Just wanted to ask about the job you posted.'],
    correct: 2,
    explanation: 'Formal written English uses full forms, formal vocabulary ("enquire", "vacancy"), and a distanced tone appropriate for professional correspondence.',
    level: 'C1',
  },
  {
    id: 45,
    question: "It is high time the authorities ___ decisive action on the city's housing crisis.",
    options: ['take', 'have taken', 'would take', 'took'],
    correct: 3,
    explanation: '"It\'s high time" is followed by a past subjunctive (past simple form) to express urgency about something overdue: "It\'s high time they took action."',
    level: 'C1',
  },
  {
    id: 46,
    question: 'By the time the summit concludes, the delegates ___ for over seventy-two hours.',
    options: ['will negotiate', 'will have been negotiating', 'would be negotiating', 'have been negotiating'],
    correct: 1,
    explanation: 'The future perfect continuous ("will have been + -ing") emphasises the ongoing nature of an activity up to a specific future point.',
    level: 'C1',
  },
  {
    id: 47,
    question: 'Her presentation was remarkably ___: she communicated a decade of research in under ten minutes without losing any essential nuance.',
    options: ['verbose', 'succinct', 'equivocal', 'discursive'],
    correct: 1,
    explanation: '"Succinct" means briefly and clearly expressed. "Verbose" = too many words. "Equivocal" = ambiguous. "Discursive" = wide-ranging without focus.',
    level: 'C1',
  },
  {
    id: 48,
    question: 'Which sentence contains a dangling participle (an error)?',
    options: ['Having reviewed the data, the team revised their conclusions.', 'Walking through the park, the flowers were in full bloom.', 'Exhausted by the journey, she went straight to bed.', 'Not knowing the answer, he remained silent.'],
    correct: 1,
    explanation: 'In "Walking through the park, the flowers were in full bloom," the participle "walking" has no logical subject — flowers cannot walk. This is a dangling participle.',
    level: 'C1',
  },
  {
    id: 49,
    question: 'The policy has reduced emissions significantly. ___, critics argue it has placed an unfair burden on low-income households.',
    options: ['Moreover', 'Therefore', 'Nevertheless', 'Similarly'],
    correct: 2,
    explanation: '"Nevertheless" signals a concession — it acknowledges one point while introducing a contrast. "Moreover" adds information; "therefore" shows result; "similarly" shows comparison.',
    level: 'C1',
  },
  {
    id: 50,
    question: 'The findings would ___ to indicate a significant shift in consumer behaviour.',
    options: ['be appeared', 'be seemed', 'appear', 'seem being'],
    correct: 2,
    explanation: '"Would appear to" is a hedging expression used in formal academic writing to make cautious claims. "Would be appeared to" is grammatically incorrect.',
    level: 'C1',
  },
  // ── C2 ──────────────────────────────────────────────────────────────────────
  {
    id: 51,
    question: "The author's prose is characterised by a _____ quality that makes simple observations seem profound.",
    options: ['liminal', 'lapidary', 'lachrymose', 'laconic'],
    correct: 1,
    explanation: '"Lapidary" means elegantly concise and polished, like a carved inscription. "Liminal" = transitional threshold. "Lachrymose" = tearful. "Laconic" = very brief.',
    level: 'C2',
  },
  {
    id: 52,
    question: "The politician's speech was widely condemned as ___: a masterclass in using elaborate language to obscure rather than illuminate the truth.",
    options: ['sophistry', 'soliloquy', 'solipsism', 'sycophancy'],
    correct: 0,
    explanation: '"Sophistry" refers to clever but fallacious reasoning intended to deceive. "Soliloquy" = dramatic monologue. "Solipsism" = philosophical self-only view. "Sycophancy" = excessive flattery.',
    level: 'C2',
  },
  {
    id: 53,
    question: 'Which sentence uses the word "enervate" correctly?',
    options: ['The cold shower enervated her and she felt ready to face the day.', 'The long illness had enervated him, leaving him without the will to rise.', 'His enervating speech left the audience fired up and ready to act.', 'She enervated her argument with precise statistical evidence.'],
    correct: 1,
    explanation: '"Enervate" means to weaken or drain of vitality — the opposite of energise. It is frequently and incorrectly used as a synonym for "invigorate".',
    level: 'C2',
  },
  {
    id: 54,
    question: '"Ask not what your country can do for you — ask what you can do for your country." This sentence is an example of:',
    options: ['anaphora', 'chiasmus', 'litotes', 'synecdoche'],
    correct: 1,
    explanation: '"Chiasmus" reverses the grammatical structures of successive clauses. "Anaphora" = repetition at the start of clauses. "Litotes" = understatement. "Synecdoche" = a part representing the whole.',
    level: 'C2',
  },
  {
    id: 55,
    question: 'Which sentence is grammatically correct in formal written English?',
    options: ['Were she to resign, the board would face a significant challenge.', 'Was she to resign, the board would face a significant challenge.', 'If she would resign, the board would face a significant challenge.', 'Should she would resign, the board would face a significant challenge.'],
    correct: 0,
    explanation: 'Formal conditional inversion uses "were" (not "was") even with singular subjects. "If + would" in the condition clause is a grammatical error. "Should she would" is not a valid construction.',
    level: 'C2',
  },
  {
    id: 56,
    question: 'The word "jejune" most precisely describes writing that is:',
    options: ['emotionally overwrought and excessive', 'naively simplistic and lacking substance', 'deliberately obscure and pedantic', 'elegantly understated and precise'],
    correct: 1,
    explanation: '"Jejune" (from Latin "jejunus", meaning empty) describes writing that is naive, simplistic, and unsatisfying — lacking intellectual nourishment.',
    level: 'C2',
  },
  {
    id: 57,
    question: 'Which of the following best illustrates the use of "bathos"?',
    options: ['A war poem ending with an image of a soldier\'s muddy boots beside a letter home.', 'A eulogy describing a life of heroism, then noting the deceased\'s fondness for reality television.', 'A love poem using increasingly elevated language to describe the beloved.', 'A political speech opening with a personal anecdote before moving to policy.'],
    correct: 1,
    explanation: '"Bathos" is an abrupt, jarring transition from the elevated to the trivial, creating a deflating or comic effect.',
    level: 'C2',
  },
  {
    id: 58,
    question: 'Which sentence best exemplifies the use of "litotes"?',
    options: ['"It was the best of times, it was the worst of times."', '"She is not entirely without talent."', '"The speech moved everyone to tears."', '"He ran the fastest race of his career."'],
    correct: 1,
    explanation: '"Litotes" is understatement using a double negative to affirm the positive: "not entirely without talent" means "quite talented."',
    level: 'C2',
  },
  {
    id: 59,
    question: 'A critic describes a novel as "palimpsestic". What does this most likely mean?',
    options: ['Its plot is circular, ending where it began.', 'Earlier layers of meaning show through later writing, like text on a reused parchment.', 'Its prose style is deliberately archaic and difficult.', 'It draws heavily on classical mythology.'],
    correct: 1,
    explanation: 'A palimpsest is a manuscript where earlier writing shows through later additions. Applied to fiction, "palimpsestic" describes texts where earlier layers — historical, intertextual, or thematic — are visible beneath the surface narrative.',
    level: 'C2',
  },
  {
    id: 60,
    question: 'The phrase "come what may" contains a grammatical feature rarely found in modern English. What is it?',
    options: ['A split infinitive', 'A present subjunctive', 'A past perfect subjunctive', 'An absolute nominative'],
    correct: 1,
    explanation: '"Come what may" contains the present subjunctive ("come" rather than the expected "comes"). This is a fossil form — a remnant of the subjunctive mood preserved in fixed idioms alongside "so be it" and "suffice it to say".',
    level: 'C2',
  },
]

/** @deprecated Use questionPool instead */
export const quizQuestions = questionPool

// ─── Team Members ─────────────────────────────────────────────────────────────

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    role: 'Academic Director',
    bio: 'Sarah holds a PhD in Applied Linguistics from UCL and has over 18 years of experience in language education. She is a former Cambridge ESOL chief examiner and the architect of our acclaimed exam preparation programmes.',
    languages: ['English', 'French', 'German'],
    experience: '18 years',
    avatar: 'SM',
  },
  {
    id: '2',
    name: 'James Okafor',
    role: 'Head of Curriculum',
    bio: 'James is a DELTA-qualified ELT professional with a Masters in TESOL from King\'s College London. He previously headed the English department at the British Council Tokyo and brings a truly international perspective to our courses.',
    languages: ['English', 'Yoruba', 'French'],
    experience: '14 years',
    avatar: 'JO',
  },
  {
    id: '3',
    name: 'Sofia Reyes',
    role: 'Head of Modern Languages',
    bio: 'A native Madrileña with a degree in Hispanic Studies from the University of Salamanca, Sofia oversees our Spanish, French, Italian and Portuguese programmes. She is a certified Instituto Cervantes DELE examiner.',
    languages: ['Spanish', 'English', 'French', 'Italian'],
    experience: '12 years',
    avatar: 'SR',
  },
  {
    id: '4',
    name: 'Dr. Priya Nair',
    role: 'Research & Methodology Lead',
    bio: 'Priya completed her doctorate in second language acquisition at Oxford. She ensures our teaching methodology is grounded in the latest cognitive science research, and leads our teacher training programme.',
    languages: ['English', 'Hindi', 'Tamil', 'Mandarin'],
    experience: '10 years',
    avatar: 'PN',
  },
  {
    id: '5',
    name: 'Marcus Weber',
    role: 'Business Language Director',
    bio: 'A former Lufthansa executive and native German speaker, Marcus designed our Business Language suite. He understands precisely what language skills professionals need in today\'s global workplace.',
    languages: ['German', 'English', 'French'],
    experience: '15 years',
    avatar: 'MW',
  },
  {
    id: '6',
    name: 'Emma Clarke',
    role: 'Student Experience Manager',
    bio: 'Emma ensures every student at LLA has an outstanding experience from first enquiry to graduation. She manages our pastoral support, accommodation service, and student social programme.',
    languages: ['English', 'Spanish'],
    experience: '8 years',
    avatar: 'EC',
  },
]

// ─── Study Abroad Programmes ──────────────────────────────────────────────────

export const studyAbroadPrograms: StudyAbroadProgram[] = [
  {
    id: 'barcelona',
    country: 'Spain',
    city: 'Barcelona',
    flag: '🇪🇸',
    duration: '2–12 weeks',
    price: 'From £890/2 weeks',
    language: 'Spanish',
    highlights: ['20hrs tuition/week', 'Homestay or residence', 'Cultural activities', 'DELE exam prep option', 'Weekend excursions'],
    description: 'Combine world-class Spanish tuition with the vibrant culture of Catalonia. Our Barcelona programme is based in the beautiful Eixample district, minutes from iconic landmarks and the city\'s incredible food scene.',
    image: '/study-abroad/barcelona.jpg',
  },
  {
    id: 'paris',
    country: 'France',
    city: 'Paris',
    flag: '🇫🇷',
    duration: '2–8 weeks',
    price: 'From £980/2 weeks',
    language: 'French',
    highlights: ['20hrs tuition/week', 'Host family option', 'Museum & gallery visits', 'DELF exam prep', 'Cooking classes'],
    description: 'There is no better place to learn French than the City of Light. Our Paris programme immerses you in the language, the culture, and the extraordinary art and culinary heritage of France\'s capital.',
    image: '/study-abroad/paris.jpg',
  },
  {
    id: 'berlin',
    country: 'Germany',
    city: 'Berlin',
    flag: '🇩🇪',
    duration: '2–12 weeks',
    price: 'From £850/2 weeks',
    language: 'German',
    highlights: ['20hrs tuition/week', 'Student residence', 'History & culture tours', 'Goethe-Institut prep', 'Tech industry visits'],
    description: 'Berlin is Europe\'s most dynamic capital — an ideal setting for learning German in a city where history, creativity, and modern innovation converge. Perfect for professionals and students alike.',
    image: '/study-abroad/berlin.jpg',
  },
  {
    id: 'rome',
    country: 'Italy',
    city: 'Rome',
    flag: '🇮🇹',
    duration: '2–8 weeks',
    price: 'From £920/2 weeks',
    language: 'Italian',
    highlights: ['20hrs tuition/week', 'Homestay included', 'Cooking & wine classes', 'CILS exam option', 'Vatican & Colosseum tours'],
    description: 'Learn Italian surrounded by 2,000 years of art, architecture, and history. Our Rome programme integrates language learning with cultural immersion in one of the world\'s most beautiful cities.',
    image: '/study-abroad/rome.jpg',
  },
  {
    id: 'lisbon',
    country: 'Portugal',
    city: 'Lisbon',
    flag: '🇵🇹',
    duration: '2–8 weeks',
    price: 'From £780/2 weeks',
    language: 'Portuguese',
    highlights: ['20hrs tuition/week', 'Student flat option', 'Fado & culture nights', 'CAPLE exam prep', 'Sintra day trips'],
    description: 'Lisbon is Europe\'s sunniest capital and one of its most affordable. Learn European Portuguese in a city of extraordinary beauty, remarkable food, and genuine warmth.',
    image: '/study-abroad/lisbon.jpg',
  },
  {
    id: 'madrid',
    country: 'Spain',
    city: 'Madrid',
    flag: '🇪🇸',
    duration: '2–12 weeks',
    price: 'From £870/2 weeks',
    language: 'Spanish',
    highlights: ['25hrs tuition/week', 'Business Spanish module', 'Prado Museum access', 'DELE preparation', 'Professional networking'],
    description: 'Our Madrid programme is designed for professionals seeking advanced Spanish skills in a world-class urban setting. The business Spanish module is especially popular with corporate clients.',
    image: '/study-abroad/madrid.jpg',
  },
]

// ─── Navigation Links ─────────────────────────────────────────────────────────

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Courses' },
  { href: '/languages', label: 'Languages' },
  { href: '/study-abroad', label: 'Study Abroad' },
  { href: '/level-test', label: 'Level Test' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

// ─── Stats ────────────────────────────────────────────────────────────────────

export const stats = [
  { value: '1000+', label: 'Active Students', icon: 'Users' },
  { value: '15+', label: 'Languages Taught', icon: 'Globe' },
  { value: '98%', label: 'Satisfaction Rate', icon: 'Star' },
  { value: '10+', label: 'Years of Excellence', icon: 'Award' },
]
