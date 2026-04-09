-- ─── Seed: Branches ──────────────────────────────────────────────────────────
INSERT INTO public.branches (name_en, name_tr, address_en, address_tr, city, country, phone, email, whatsapp, maps_url, published, sort_order) VALUES
(
  'London — Main Campus',
  'Londra — Ana Kampus',
  '14 Long Acre, Covent Garden, London WC2E 9LN',
  '14 Long Acre, Covent Garden, Londra WC2E 9LN',
  'London',
  'United Kingdom',
  '+44 (0)20 1234 5678',
  'london@londonlanguageacademy.com',
  '+44 7700 000000',
  'https://maps.google.com/?q=14+Long+Acre+London',
  true,
  1
),
(
  'Bursa Branch',
  'Bursa Subesi',
  'Odunluk Mah. Akademi Cad. No:1, Nilufer, Bursa',
  'Odunluk Mah. Akademi Cad. No:1, Nilufer, Bursa',
  'Bursa',
  'Turkey',
  '+90 224 000 00 00',
  'bursa@londonlanguageacademy.com',
  '+90 530 000 00 00',
  'https://maps.google.com/?q=Nilufer+Bursa',
  true,
  2
),
(
  'Istanbul Branch',
  'Istanbul Subesi',
  'Basaksehir, Istanbul',
  'Basaksehir, Istanbul',
  'Istanbul',
  'Turkey',
  '+90 212 000 00 00',
  'istanbul@londonlanguageacademy.com',
  '+90 530 000 00 00',
  'https://maps.google.com/?q=Basaksehir+Istanbul',
  true,
  3
);
