-- ============================================================
-- Brew & Bloom — Supabase Database Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. CATEGORIES TABLE
create table if not exists public.categories (
  id   serial primary key,
  name text not null unique,
  sort_order integer default 0
);

insert into public.categories (name, sort_order) values
  ('Coffee',      1),
  ('Tea',         2),
  ('Cold Drinks', 3),
  ('Snacks',      4),
  ('Desserts',    5)
on conflict (name) do nothing;

-- 2. MENU ITEMS TABLE
create table if not exists public.menu_items (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null references public.categories(name) on update cascade,
  price       integer not null check (price >= 0),
  description text,
  image_url   text,
  veg         boolean not null default true,
  bestseller  boolean not null default false,
  available   boolean not null default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger menu_items_updated_at
  before update on public.menu_items
  for each row execute procedure update_updated_at();

-- 3. SEED DATA
insert into public.menu_items (name, category, price, description, image_url, veg, bestseller, available) values
  ('Cappuccino',     'Coffee',      180, 'Rich espresso with velvety steamed milk foam',              'https://picsum.photos/seed/cappuccino/400/300', true,  true,  true),
  ('Espresso',       'Coffee',      120, 'Double shot, dark roast single origin beans',               'https://picsum.photos/seed/espresso/400/300',   true,  false, true),
  ('Flat White',     'Coffee',      200, 'Microfoam milk over a double ristretto shot',               'https://picsum.photos/seed/flatwhite/400/300',  true,  false, true),
  ('Matcha Latte',   'Tea',         210, 'Ceremonial grade matcha with oat milk',                     'https://picsum.photos/seed/matcha/400/300',     true,  false, true),
  ('Chai Latte',     'Tea',         170, 'Spiced masala chai with steamed whole milk',                'https://picsum.photos/seed/chai/400/300',       true,  false, true),
  ('Cold Brew',      'Cold Drinks', 220, '12-hour slow steeped, served over ice',                     'https://picsum.photos/seed/coldbrew/400/300',   true,  true,  true),
  ('Iced Americano', 'Cold Drinks', 190, 'Bold espresso over ice with chilled water',                 'https://picsum.photos/seed/americano/400/300',  true,  false, true),
  ('Mango Smoothie', 'Cold Drinks', 240, 'Fresh Alphonso mango blended with yoghurt',                 'https://picsum.photos/seed/mango/400/300',      true,  false, true),
  ('Avocado Toast',  'Snacks',      280, 'Sourdough, smashed avocado, chilli flakes, microgreens',    'https://picsum.photos/seed/avocado/400/300',    true,  true,  true),
  ('Croissant',      'Snacks',      160, 'Butter croissant, baked fresh every morning',               'https://picsum.photos/seed/croissant/400/300',  true,  false, true),
  ('Belgian Waffle', 'Desserts',    250, 'Classic waffle with maple syrup and berries',               'https://picsum.photos/seed/waffle/400/300',     true,  true,  true),
  ('Tiramisu',       'Desserts',    290, 'Classic Italian, espresso soaked ladyfingers',              'https://picsum.photos/seed/tiramisu/400/300',   true,  true,  true);

-- 4. ROW-LEVEL SECURITY
alter table public.menu_items  enable row level security;
alter table public.categories  enable row level security;

-- Public: anyone can read available items
create policy "Public can read available menu items"
  on public.menu_items for select
  using (available = true);

-- Admins (authenticated): full access
create policy "Admins full access to menu_items"
  on public.menu_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Public can read categories"
  on public.categories for select
  using (true);

create policy "Admins full access to categories"
  on public.categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============================================================
-- HOW TO CREATE YOUR ADMIN USER:
-- After running this schema, go to:
--   Supabase Dashboard → Authentication → Users → Add User
--   Enter your admin email & password
-- That user will have full access via the RLS policies above.
-- ============================================================
