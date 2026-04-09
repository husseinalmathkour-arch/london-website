-- ─── Seed: Languages Offered ─────────────────────────────────────────────────
INSERT INTO public.languages_offered (name_en, name_tr, flag, level_en, level_tr, description_en, description_tr, students, color, published, sort_order) VALUES
('English', 'Ingilizce', '🇬🇧', 'All Levels', 'Tum Seviyeler', 'Master British English from General to Business and IELTS/Cambridge exam preparation.', 'Genel Ingilizceden Is Ingilizcesine ve IELTS/Cambridge sinav hazirligina kadar Ingilizceye hakim olun.', 2400, 'blue', true, 1),
('French', 'Fransizca', '🇫🇷', 'A1 - C2', 'A1 - C2', 'Discover the beauty of French language and culture from beginner to advanced.', 'Baslangictan ileri seviyeye Fransiz dili ve kulturunun guzelligini kesfedin.', 290, 'indigo', true, 2),
('Spanish', 'Ispanyolca', '🇪🇸', 'A1 - C2', 'A1 - C2', 'Learn Spanish and unlock access to 20+ countries and their vibrant cultures.', 'Ispanyolca ogreyin ve 20den fazla ulkenin canli kulturlerine kapilarinizi acin.', 310, 'orange', true, 3),
('German', 'Almanca', '🇩🇪', 'A1 - C1', 'A1 - C1', 'Open doors to career opportunities in Europe with professional German skills.', 'Profesyonel Almanca becerilerinizle Avrupa''da kariyer firsatlarina kapi acin.', 340, 'gray', true, 4),
('Italian', 'Italyanca', '🇮🇹', 'A1 - B2', 'A1 - B2', 'Immerse yourself in Italian art, cuisine, and culture through language learning.', 'Dil ogrenimiyle Italyan sanati, mutfagi ve kulturune dalin.', 280, 'green', true, 5),
('Arabic', 'Arapca', '🇸🇦', 'A1 - B1', 'A1 - B1', 'Explore the rich Arabic language, from Modern Standard to regional dialects.', 'Modern Standart Arapcadan bolgesel lehcelere zengin Arapca dilini kesfedin.', 190, 'emerald', true, 6),
('Russian', 'Rusca', '🇷🇺', 'A1 - B2', 'A1 - B2', 'Learn Russian and unlock one of the world''s most expressive and widely spoken languages.', 'Rusca ogreyin ve dunyanin en etkileyici ve yaygin konusulan dillerinden birine ulasin.', 170, 'blue', true, 7);

-- ─── Seed: Courses ───────────────────────────────────────────────────────────
INSERT INTO public.courses (title_en, title_tr, description_en, description_tr, category, price, duration, level, features_en, features_tr, popular, published, sort_order) VALUES
(
  'General English',
  'Genel Ingilizce',
  'A structured 6-level programme taking students from absolute beginner to near-native proficiency. Small classes, expert teachers, and a proven curriculum.',
  '6 seviyeli yapilandirilmis bir program ile ogrencileri mutlak baslangictan ana dil yakinligina tasir. Kucuk siniflar, uzman ogretmenler ve kanitlanmis mufredat.',
  'English',
  'From £180/month',
  '3 months per level',
  'A1 to C2',
  '["Small groups (max 12)", "Native-speaker teachers", "Weekly progress reports", "Free study materials", "Level certificate on completion"]',
  '["Kucuk gruplar (maks. 12)", "Ana dil konusani ogretmenler", "Haftalik ilerleme raporlari", "Ucretsiz calisma materyalleri", "Tamamlama sertifikasi"]',
  true, true, 1
),
(
  'Exam English',
  'Sinav Ingilizcesi',
  'Targeted exam preparation for students at B1 level or above. Our tutors guide you through IELTS, TOEFL, PTE, and Cambridge exams with mock tests and detailed feedback.',
  'B1 seviyesi ve uzerindeki ogrenciler icin hedefli sinav hazirliği. IELTS, TOEFL, PTE ve Cambridge sinavlari icin deneme testleri ve detayli geri bildirimle rehberlik.',
  'English',
  'From £240/month',
  '4 months - 120 hours',
  'B1+',
  '["Prerequisite: B1 level or equivalent", "IELTS, TOEFL & PTE preparation", "Cambridge exam preparation", "Mock exams with detailed feedback", "Professional exam tutors"]',
  '["On kosul: B1 seviyesi veya esdegeri", "IELTS, TOEFL ve PTE hazirliği", "Cambridge sinav hazirliği", "Detayli geri bildirimli deneme sinavlari", "Profesyonel sinav egitmenleri"]',
  true, true, 2
),
(
  'Other Languages',
  'Diger Diller',
  'Learn German, French, Spanish, or Russian with expert tutors. Structured across 4 levels — A1 through B2.',
  'Uzman egitmenlerle Almanca, Fransizca, Ispanyolca veya Rusca ogreyin. A1 ile B2 arasinda 4 seviyede yapilandirilmis.',
  'Other Languages',
  'From £180/month',
  '3 months per level - 96 hours',
  'A1 to B2',
  '["German, French, Spanish, Russian", "Levels A1, A2, B1, B2", "3 months per level - 96 hours", "Small groups (max 12)", "Level certificate on completion"]',
  '["Almanca, Fransizca, Ispanyolca, Rusca", "A1, A2, B1, B2 seviyeleri", "Seviye basina 3 ay - 96 saat", "Kucuk gruplar (maks. 12)", "Seviye tamamlama sertifikasi"]',
  false, true, 3
),
(
  'One-to-One Tuition',
  'Bire Bir Ders',
  'Fully personalised private lessons tailored to your goals, schedule, and learning style. The fastest route to fluency.',
  'Hedeflerinize, programiniza ve ogrenme tarziniza gore tamamen kisisellestirilmis ozel dersler. Akiciliğa en hizli yol.',
  'English',
  'From £55/hour',
  'Flexible',
  'All levels',
  '["Flexible scheduling", "Custom curriculum", "Your own pace", "Any language offered", "In-person or online"]',
  '["Esnek program", "Ozel mufredat", "Kendi hizinizda", "Sunulan tum diller", "Yuz yuze veya cevrimici"]',
  false, true, 4
),
(
  'Online Courses',
  'Cevrimici Kurslar',
  'High-quality live online language classes with the same expert teachers and interactive format as our in-person sessions.',
  'Yuz yuze derslerimizle ayni uzman ogretmenler ve interaktif format ile yuksek kaliteli canli cevrimici dil dersleri.',
  'Online',
  'From £120/month',
  'Same as in-person',
  'All levels',
  '["Live interactive sessions", "Recorded for replay", "Global class community", "Digital workbooks", "Tech support included"]',
  '["Canli interaktif oturumlar", "Tekrar izleme icin kayit", "Global sinif toplulugu", "Dijital calisma kitaplari", "Teknik destek dahil"]',
  false, true, 5
),
(
  'Intensive Courses',
  'Yogun Kurslar',
  'Complete a full level in just 1.5 months. Our intensive programme condenses 96 hours into an accelerated schedule — perfect for fast results without compromising quality.',
  'Yalnizca 1.5 ayda tam bir seviyeyi tamamlayin. Yogun programimiz 96 saati hizlandirilmis bir takvime sikistirir.',
  'English',
  'From £580/month',
  '1.5 months per level - 96 hours',
  'All levels',
  '["1.5 months per level", "96 hours of education", "Complete one full level fast", "Small groups (max 12)", "Certificate on completion"]',
  '["Seviye basina 1.5 ay", "96 saat egitim", "Bir tam seviyeyi hizla tamamlayin", "Kucuk gruplar (maks. 12)", "Tamamlama sertifikasi"]',
  false, true, 6
);

-- ─── Seed: Testimonials ───────────────────────────────────────────────────────
INSERT INTO public.testimonials (name, role_en, role_tr, content_en, content_tr, rating, published, sort_order) VALUES
(
  'Mehmet Yilmaz',
  'Software Engineer, Istanbul',
  'Yazilim Muhendisi, Istanbul',
  'London Language Academy completely transformed my career. After the Business English programme I found a job at an international software firm. The teachers are incredibly supportive and the curriculum is truly world-class.',
  'London Language Academy kariyerimi tamamen degistirdi. Business English programindan sonra uluslararasi bir yazilim firmasinda is buldum. Ogretmenler inanilmaz destekleyici ve mufredat gercekten dunya standartlarinda.',
  5, true, 1
),
(
  'Ayse Kaya',
  'MBA Student, Istanbul',
  'MBA Ogrencisi, Istanbul',
  'I needed IELTS 7.5 for my university application and had been stuck at 6.5. With LLA exam preparation course I reached 7.5 in just eight weeks. The mock exams and personalised feedback were incredibly effective.',
  'Universite basvurum icin IELTS 7.5 e ihtiyacim vardi ve 6.5 te takilip kalmistim. LLA sinav hazirlik kursuyla sadece sekiz haftada 7.5 e ulastim. Deneme sinavlari ve kisisellestirilmis geri bildirimler cok etkiliydi.',
  5, true, 2
),
(
  'Emre Demir',
  'Marketing Manager, Bursa',
  'Pazarlama Muduru, Bursa',
  'One-to-one lessons were absolutely worth every penny. My teacher tailored each session to my specific needs. My confidence in client presentations is now so much higher. I recommend it without hesitation.',
  'Birebir dersler kesinlikle her kurusa degdi. Ogretmenim her dersi benim ozel ihtiyaclarina gore uyarladi. Musteri sunumlarindaki ozguvenim artik cok yuksek. Kesinlikle tavsiye ederim.',
  5, true, 3
),
(
  'Zeynep Arslan',
  'Doctor, Istanbul',
  'Doktor, Istanbul',
  'Learning English at London Language Academy was a fantastic experience. The teachers are extremely patient and attentive. I passed my Medical English exam on the first attempt — a wonderful team.',
  'London Language Academy ile Ingilizce ogrenmek harika bir deneyimdi. Ogretmenler son derece sabirl ve ilgili. Tip Ingilizcesi sinavini ilk denemede gectim — harika bir kadro.',
  5, true, 4
),
(
  'Can Ozturk',
  'Restaurant Owner, Bursa',
  'Restoran Sahibi, Bursa',
  'I chose evening German classes and I am very happy. The small class size means you really get to speak and practise. My German improved more in three months than in two years anywhere else.',
  'Aksam Almanca derslerini sectim ve cok memnun kaldim. Kucuk sinif mevcudu sayesinde gercekten konusma ve pratik yapma imkani buluyorsunuz. Almancam uc ayda baska hicbir yerde iki yilda ilerledigimden daha fazla gelisti.',
  5, true, 5
),
(
  'Selin Celik',
  'Accountant, Istanbul',
  'Muhasebeci, Istanbul',
  'The online courses are excellent — same quality as in-person but from the comfort of home. The live sessions are very engaging and the teachers make grammar genuinely fun. I have now enrolled in Spanish too!',
  'Online kurslar mukemmel — yuz yuze kurslarla ayni kalitede ama evimin rahatliginda. Canli dersler cok ilgi cekici ve ogretmenler grameri gercekten eglenceli hale getiriyor. Simdi Ispanyolca ya da kaydoldum!',
  5, true, 6
);

-- ─── Seed: FAQs ──────────────────────────────────────────────────────────────
INSERT INTO public.faqs (question_en, question_tr, answer_en, answer_tr, category, sort_order, published) VALUES
(
  'Where is London Language Academy located?',
  'London Language Academy nerede bulunuyor?',
  'Our main school has been based in central London for nearly 100 years. We also have branches in Bursa and Istanbul, Turkey, founded in 2021.',
  'Ana okulumuz yaklasik 100 yildir Londra''nin merkezinde yer almaktadir. Ayrica 2021 yilinda Turkiye''de Bursa ve Istanbul''da subelerimiz acildi.',
  'General', 1, true
),
(
  'What languages do you teach?',
  'Hangi dilleri ogretiyorsunuz?',
  'We offer English (General, Business, Exam), French, Spanish, German, Italian, Arabic, and Russian. Our flagship programme is English, taught from A1 Beginner to C2 Proficiency.',
  'Ingilizce (Genel, Is, Sinav), Fransizca, Ispanyolca, Almanca, Italyanca, Arapca ve Rusca sunuyoruz.',
  'General', 2, true
),
(
  'Do I need any prior knowledge to join?',
  'Katilmak icin onceden bilgim olmasi gerekiyor mu?',
  'Not at all. We welcome complete beginners. Our free online placement test identifies your exact level so you join the right class from day one.',
  'Hic gerekmiyor. Tam anlamiyla yeni baslayanlar memnuniyetle karsilanir. Ucretsiz seviye testimiz tam seviyenizi belirler.',
  'General', 3, true
),
(
  'How do I know which course is right for me?',
  'Hangi kursun benim icin dogru oldugunu nasil bilebilirim?',
  'Take our free online level test — it takes about 10 minutes and gives you an immediate result. Our academic advisors will then recommend the best course for your goals.',
  'Ucretsiz cevrimici seviye testimizi alin — yaklasik 10 dakika surer ve aninda sonuc verir. Akademik danismanlarimiz daha sonra hedeflerinize gore en iyi kursu oner.',
  'General', 4, true
),
(
  'How large are your classes?',
  'Siniflariniz ne kadar buyuk?',
  'We keep our classes small — a maximum of 12 students per group. This ensures every student gets individual attention and plenty of speaking time.',
  'Siniflarimizi kucuk tutuyoruz — grup basina maksimum 12 ogrenci. Bu, her ogrencinin bireysel ilgi ve cok sayida konusma suresi almasini saglar.',
  'Courses', 5, true
),
(
  'What is the difference between General English and Exam English?',
  'Genel Ingilizce ile Sinav Ingilizcesi arasindaki fark nedir?',
  'General English builds your overall language skills across all four skills through 6 progressive levels. Exam English prepares you for IELTS, TOEFL, or Cambridge and requires a minimum B1 level.',
  'Genel Ingilizce, 6 asama boyunca genel dil becerilerinizi gelistirir. Sinav Ingilizcesi, IELTS, TOEFL veya Cambridge icin hazirlar ve minimum B1 seviyesi gerektirir.',
  'Courses', 6, true
),
(
  'Can I study online?',
  'Cevrimici ders alabilir miyim?',
  'Yes. All our courses are available online via live, interactive sessions with the same expert teachers and curriculum as in-person students.',
  'Evet. Tum kurslarimiz, ayni uzman ogretmenler ve mufredat ile canli, etkilesimli oturumlar araciligiyla cevrimici olarak sunulmaktadir.',
  'Courses', 7, true
),
(
  'Are your teachers native speakers?',
  'Ogretmenleriniz ana dili Ingilizce olan kisiler mi?',
  'Our English teachers are a mix of highly qualified native speakers and expert non-native teachers — all with recognised teaching qualifications such as CELTA or DELTA.',
  'Ingilizce ogretmenlerimiz, CELTA veya DELTA gibi taninmis ogretmenlik nitelikleri olan yuksek nitelikli ana dil konusanlari ve uzman yabanci ogretmenlerin karisimdir.',
  'Teachers', 8, true
),
(
  'Do you offer accommodation for international students?',
  'Uluslararasi ogrenciler icin konaklama sunuyor musunuz?',
  'Yes, through our Study Abroad division we can arrange homestays, student residences, and shared apartments for students studying at our London campus.',
  'Evet, Yurt Disi Egitim bolumumuz araciligiyla Londra kampusumuzde okuyan ogrenciler icin ev pansiyonu ve ogrenci yurdu ayarlayabiliriz.',
  'General', 9, true
),
(
  'What study abroad programmes do you offer?',
  'Hangi yurt disi egitim programlarini sunuyorsunuz?',
  'We offer Language Education Abroad (12 countries), Summer School (ages 5-18), Academic Placement, Work and Travel (USA), and Internship Programmes.',
  'Yurt Disinda Dil Egitimi (12 ulke), Yaz Okulu (5-18 yas), Akademik Yerlestirme, Work and Travel (ABD) ve Staj Programlari sunuyoruz.',
  'Study Abroad', 10, true
);

-- ─── Seed: Study Abroad Programs ─────────────────────────────────────────────
INSERT INTO public.study_abroad_programs (city, country, flag, language, duration, price, description_en, description_tr, highlights_en, highlights_tr, published, sort_order) VALUES
(
  'Language Education Abroad',
  '12 Countries',
  '🌍',
  'Various',
  '2-44 weeks',
  'From £1,200',
  'Study a language in its natural environment. General and Intensive English, Business English, IELTS/TOEFL preparation, Academic Semesters, and specialist courses. Programmes start every Monday. Minimum age 16.',
  'Dili dogal ortaminda ogreyin. Genel ve Yogun Ingilizce, Is Ingilizcesi, IELTS/TOEFL hazirlik, Akademik Donem ve uzmanlik kurslari. Programlar her Pazartesi baslar. Minimum yas 16.',
  '["12 countries", "2-44 weeks", "Starts every Monday", "Age 16+", "General, Intensive & Exam prep", "Business, Legal & Medical English"]',
  '["12 ulke", "2-44 hafta", "Her Pazartesi baslar", "16 yas ve uzeri", "Genel, Yogun ve Sinav hazirliği", "Is, Hukuk ve Tip Ingilizcesi"]',
  true, 1
),
(
  'Summer School',
  'England, USA, Canada and more',
  '☀️',
  'English',
  '2-8 weeks',
  'From £900',
  'An unforgettable holiday and education programme combining language lessons with sports, cultural activities, and social events. Destinations include England, USA, Canada, Ireland, Malta, Spain, Germany, and Italy.',
  'Dil derslerini sporla, kulturel etkinliklerle ve sosyal etkinliklerle birlestiren unutulmaz bir tatil ve egitim programi. Ingiltere, ABD, Kanada, Irlanda, Malta, Ispanya, Almanya ve Italya.',
  '["Ages 5-18", "150+ partner schools", "15 hrs tuition per week", "English and Football or Basketball", "STEM and Future Leaders", "Individual, group or family"]',
  '["5-18 yas", "150+ ortak okul", "Haftada 15 saat egitim", "Ingilizce ve Futbol veya Basketbol", "STEM ve Gelecek Liderleri", "Bireysel, grup veya aile"]',
  true, 2
),
(
  'Academic Placement',
  'UK, USA, Canada, Australia and more',
  '🎓',
  'Various',
  'Term or Full year',
  'From £3,500',
  'Our advisors guide you through every step of securing a place at a school or university abroad — from choosing the right country to accommodation, scholarships, and visa applications.',
  'Danismanlarimiz yurt disinda okul veya universite yerine yerlesmenin her adiminda rehberlik eder — dogru ulkeyi secmekten konaklama, burs ve vize basvurularina kadar.',
  '["High school and university", "UK, USA, Canada, Australia", "Ireland, Germany, Italy", "Scholarships guidance", "Visa support", "College Counseling available"]',
  '["Lise ve universite", "Ingiltere, ABD, Kanada, Avustralya", "Irlanda, Almanya, Italya", "Burs rehberligi", "Vize destegi", "Kolej danismanligi mevcut"]',
  true, 3
),
(
  'Work and Travel',
  'USA',
  '🗽',
  'English',
  'Up to 4 months plus 25 days travel',
  'From £800',
  'Live and work in the United States for up to 4 months, then explore the country for a further 25 days. Gain real work experience, practise your English daily, and discover American culture.',
  'Amerika Birlesik Devletleri''nde 4 aya kadar yasayip calisin, ardindan 25 gun daha ulkeyi kesfedin. Gercek is deneyimi kazanin ve Ingilizceyi gunluk pratikte gelistirin.',
  '["Open to university students", "Up to 4 months work", "25 days travel", "Destination: USA", "Cultural immersion", "Improve your English daily"]',
  '["Universite ogrencilerine acik", "4 aya kadar calisma", "25 gun seyahat", "Hedef: ABD", "Kulturel dalmaca", "Ingilizcenizi gunluk gelistirin"]',
  true, 4
),
(
  'Internship Programme',
  'USA, Spain, Malta, Australia and more',
  '💼',
  'Various',
  '3-12 months',
  '$1,200-$3,500 per month',
  'Gain professional experience in an international environment while improving your language skills and earning a competitive salary. Available in Tourism, Marketing, IT, Finance, Education, and Engineering.',
  'Dil becerilerinizi gelistirirken ve rekabetci bir maas kazanirken uluslararasi bir ortamda mesleki deneyim kazanin. Turizm, Pazarlama, BT, Finans, Egitim ve Muhendislik alanlarinda.',
  '["$1,200-$3,500 per month", "USA, Spain, Malta, Australia", "Asia and Middle East", "Tourism, IT, Finance and more", "Professional consulting support", "Boost your CV internationally"]',
  '["Ayda 1200-3500 dolar", "ABD, Ispanya, Malta, Avustralya", "Asya ve Orta Dogu", "Turizm, BT, Finans ve daha fazlasi", "Profesyonel danismanlik destegi", "CV nizi uluslararasi arenada guclendirin"]',
  true, 5
);
