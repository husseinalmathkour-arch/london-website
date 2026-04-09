
-- ─── Enable UUID extension ────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Admin Roles ──────────────────────────────────────────────────────────────
create table public.admin_users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  role text not null default 'admin' check (role in ('super_admin', 'admin')),
  created_at timestamptz default now()
);
alter table public.admin_users enable row level security;
create policy "Admins can view all admins" on public.admin_users for select using (auth.uid() in (select id from public.admin_users));
create policy "Super admins can manage admins" on public.admin_users for all using (auth.uid() in (select id from public.admin_users where role = 'super_admin'));

-- ─── Level Test Submissions ───────────────────────────────────────────────────
create table public.level_test_submissions (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  score integer not null,
  total integer not null,
  level text not null,
  answers jsonb,
  created_at timestamptz default now()
);
alter table public.level_test_submissions enable row level security;
create policy "Admins can view submissions" on public.level_test_submissions for select using (auth.uid() in (select id from public.admin_users));
create policy "Anyone can insert submission" on public.level_test_submissions for insert with check (true);

-- ─── Blog Posts ───────────────────────────────────────────────────────────────
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title_en text not null,
  title_tr text,
  excerpt_en text,
  excerpt_tr text,
  content_en text,
  content_tr text,
  image_url text,
  category text,
  author text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table public.blog_posts enable row level security;
create policy "Public can read published posts" on public.blog_posts for select using (published = true or auth.uid() in (select id from public.admin_users));
create policy "Admins can manage posts" on public.blog_posts for all using (auth.uid() in (select id from public.admin_users));

-- ─── FAQs ─────────────────────────────────────────────────────────────────────
create table public.faqs (
  id uuid default uuid_generate_v4() primary key,
  question_en text not null,
  question_tr text,
  answer_en text not null,
  answer_tr text,
  category text,
  sort_order integer default 0,
  published boolean default true,
  created_at timestamptz default now()
);
alter table public.faqs enable row level security;
create policy "Public can read faqs" on public.faqs for select using (published = true or auth.uid() in (select id from public.admin_users));
create policy "Admins can manage faqs" on public.faqs for all using (auth.uid() in (select id from public.admin_users));

-- ─── Contact Enquiries ────────────────────────────────────────────────────────
create table public.contact_enquiries (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  service text,
  status text default 'new' check (status in ('new', 'read', 'replied')),
  created_at timestamptz default now()
);
alter table public.contact_enquiries enable row level security;
create policy "Admins can view enquiries" on public.contact_enquiries for select using (auth.uid() in (select id from public.admin_users));
create policy "Admins can update enquiries" on public.contact_enquiries for update using (auth.uid() in (select id from public.admin_users));
create policy "Anyone can submit enquiry" on public.contact_enquiries for insert with check (true);

-- ─── Courses ──────────────────────────────────────────────────────────────────
create table public.courses (
  id uuid default uuid_generate_v4() primary key,
  title_en text not null,
  title_tr text,
  description_en text,
  description_tr text,
  category text,
  price text,
  duration text,
  level text,
  features_en jsonb default '[]',
  features_tr jsonb default '[]',
  image_url text,
  popular boolean default false,
  published boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);
alter table public.courses enable row level security;
create policy "Public can read courses" on public.courses for select using (published = true or auth.uid() in (select id from public.admin_users));
create policy "Admins can manage courses" on public.courses for all using (auth.uid() in (select id from public.admin_users));

-- ─── Branches ─────────────────────────────────────────────────────────────────
create table public.branches (
  id uuid default uuid_generate_v4() primary key,
  name_en text not null,
  name_tr text,
  address_en text,
  address_tr text,
  city text,
  country text,
  phone text,
  email text,
  whatsapp text,
  maps_url text,
  image_url text,
  published boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);
alter table public.branches enable row level security;
create policy "Public can read branches" on public.branches for select using (published = true or auth.uid() in (select id from public.admin_users));
create policy "Admins can manage branches" on public.branches for all using (auth.uid() in (select id from public.admin_users));

-- ─── Testimonials ─────────────────────────────────────────────────────────────
create table public.testimonials (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role_en text,
  role_tr text,
  content_en text not null,
  content_tr text,
  avatar_url text,
  rating integer default 5 check (rating between 1 and 5),
  published boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);
alter table public.testimonials enable row level security;
create policy "Public can read testimonials" on public.testimonials for select using (published = true or auth.uid() in (select id from public.admin_users));
create policy "Admins can manage testimonials" on public.testimonials for all using (auth.uid() in (select id from public.admin_users));

-- ─── Team Members ─────────────────────────────────────────────────────────────
create table public.team_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role_en text,
  role_tr text,
  bio_en text,
  bio_tr text,
  avatar_url text,
  languages jsonb default '[]',
  experience text,
  published boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);
alter table public.team_members enable row level security;
create policy "Public can read team" on public.team_members for select using (published = true or auth.uid() in (select id from public.admin_users));
create policy "Admins can manage team" on public.team_members for all using (auth.uid() in (select id from public.admin_users));

-- ─── Study Abroad Programs ────────────────────────────────────────────────────
create table public.study_abroad_programs (
  id uuid default uuid_generate_v4() primary key,
  city text not null,
  country text,
  flag text,
  language text,
  duration text,
  price text,
  description_en text,
  description_tr text,
  highlights_en jsonb default '[]',
  highlights_tr jsonb default '[]',
  image_url text,
  published boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);
alter table public.study_abroad_programs enable row level security;
create policy "Public can read programs" on public.study_abroad_programs for select using (published = true or auth.uid() in (select id from public.admin_users));
create policy "Admins can manage programs" on public.study_abroad_programs for all using (auth.uid() in (select id from public.admin_users));

-- ─── Languages ────────────────────────────────────────────────────────────────
create table public.languages_offered (
  id uuid default uuid_generate_v4() primary key,
  name_en text not null,
  name_tr text,
  flag text,
  level_en text,
  level_tr text,
  description_en text,
  description_tr text,
  students integer default 0,
  color text,
  image_url text,
  published boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);
alter table public.languages_offered enable row level security;
create policy "Public can read languages" on public.languages_offered for select using (published = true or auth.uid() in (select id from public.admin_users));
create policy "Admins can manage languages" on public.languages_offered for all using (auth.uid() in (select id from public.admin_users));

-- ─── Newsletter Subscribers ───────────────────────────────────────────────────
create table public.newsletter_subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  subscribed_at timestamptz default now(),
  active boolean default true
);
alter table public.newsletter_subscribers enable row level security;
create policy "Admins can view subscribers" on public.newsletter_subscribers for select using (auth.uid() in (select id from public.admin_users));
create policy "Anyone can subscribe" on public.newsletter_subscribers for insert with check (true);

-- ─── Site Settings ────────────────────────────────────────────────────────────
create table public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);
alter table public.site_settings enable row level security;
create policy "Public can read settings" on public.site_settings for select using (true);
create policy "Admins can manage settings" on public.site_settings for all using (auth.uid() in (select id from public.admin_users));

-- Default site settings
insert into public.site_settings (key, value) values
  ('phone_london', ''),
  ('phone_bursa', ''),
  ('phone_istanbul', ''),
  ('whatsapp', ''),
  ('email_general', ''),
  ('email_contact_notifications', ''),
  ('address_london_en', ''),
  ('address_london_tr', ''),
  ('address_bursa_en', ''),
  ('address_bursa_tr', ''),
  ('address_istanbul_en', ''),
  ('address_istanbul_tr', ''),
  ('instagram', ''),
  ('facebook', ''),
  ('twitter', ''),
  ('linkedin', '');
