-- ========================================
-- INSTRUCTIONS:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Copy your user ID (looks like: 6f26c12c-d016-4ac9-b490-9207d86b586f)
-- 3. Replace 'YOUR_USER_ID_HERE' below with your actual user ID
-- 4. Run this SQL in Supabase SQL Editor
-- ========================================

-- Insert BMW 520d
INSERT INTO cars (user_id, make, model, year, registration_number, registration_expiry, vignette_expiry, car_mileage, image_url, registration_certificate)
VALUES ('YOUR_USER_ID_HERE', 'BMW', '520d', 2014, 'LJ52-UVC', '2026-07-18', '2026-04-19', 130000, '/src/assets/bmw.png', '/src/assets/bmw-registration.jpg')
RETURNING id;

-- Note the returned ID and use it below as bmw_car_id
-- Replace BMW_CAR_ID with the actual ID returned above

-- BMW Registration PDF
INSERT INTO registration_pdfs (car_id, name, file_url)
VALUES (BMW_CAR_ID, 'Registracija in zavarovanje BMW 2025/26', '/src/assets/registrations/bmw-registration-2025.pdf');

-- BMW Service (May 2025)
INSERT INTO car_services (car_id, date, mileage, paid)
VALUES (BMW_CAR_ID, '2025-05-17', 120478, 175.86)
RETURNING id;

-- Note the returned ID as bmw_service_id
-- Replace BMW_SERVICE_ID with the actual ID

-- BMW Service Items
INSERT INTO service_items (service_id, description, cost) VALUES
(BMW_SERVICE_ID, 'Olje CASTROL C3 5W30 + zav. tekočina ATE DO4', NULL),
(BMW_SERVICE_ID, 'Filter olja BOSCH P 7123', NULL),
(BMW_SERVICE_ID, 'Filter kabine BOSCH R 2315', NULL),
(BMW_SERVICE_ID, 'Filter zraka BOSCH S 0343', NULL),
(BMW_SERVICE_ID, 'Filter goriva BOSCH N 6457', NULL);

-- BMW Service Attachments
INSERT INTO service_attachments (service_id, name, file_url) VALUES
(BMW_SERVICE_ID, 'Račun.pdf', '/src/assets/pdfs/bmw-redni-servis-1-17-05-2025.pdf'),
(BMW_SERVICE_ID, 'Kaj je bilo narejeno.pdf', '/src/assets/pdfs/bmw-redni-servis-2-17-05-2025.pdf');

-- ========================================
-- Insert Renault Espace
-- ========================================
INSERT INTO cars (user_id, make, model, year, registration_number, registration_expiry, vignette_expiry, car_mileage, image_url, registration_certificate)
VALUES ('YOUR_USER_ID_HERE', 'Renault Espace', 'TCe 200 Energy Initiale Paris EDC', 2016, 'LJ57-ZIJ', '2026-11-11', '2026-11-06', 137000, '/src/assets/renault-espace.jpg', '/src/assets/espace-registration.png')
RETURNING id;

-- Note the returned ID as espace_car_id
-- Replace ESPACE_CAR_ID below

-- Espace Registration PDF
INSERT INTO registration_pdfs (car_id, name, file_url)
VALUES (ESPACE_CAR_ID, 'Registracija in zavarovanje ESPACE 2025/26', '/src/assets/registrations/espace-registration-2025.pdf');

-- Espace Service 1 (October 2024)
INSERT INTO car_services (car_id, date, mileage, paid)
VALUES (ESPACE_CAR_ID, '2024-10-21', 126459, 388.14)
RETURNING id;

-- Note the returned ID as espace_service_1_id
-- Replace ESPACE_SERVICE_1_ID below

-- Espace Service 1 Items
INSERT INTO service_items (service_id, description, cost) VALUES
(ESPACE_SERVICE_1_ID, 'Servis pregled vozilo', 18.4),
(ESPACE_SERVICE_1_ID, 'Odstr - pon nam svečka', 18.4),
(ESPACE_SERVICE_1_ID, 'Odstr - pon nam hladilnik', 105.8),
(ESPACE_SERVICE_1_ID, 'Zamenjava zadnji zavorni kolut', 59.8),
(ESPACE_SERVICE_1_ID, 'Filter olja', 15.65),
(ESPACE_SERVICE_1_ID, 'Tesnilo', 3.71),
(ESPACE_SERVICE_1_ID, 'Castrol RN 5W40 (4.6L)', 73.04),
(ESPACE_SERVICE_1_ID, 'Tekočina hladilna (6.5L)', 26.98),
(ESPACE_SERVICE_1_ID, 'Čistilo zavor', 5.63),
(ESPACE_SERVICE_1_ID, 'Vijak', 6.46),
(ESPACE_SERVICE_1_ID, 'Ekološka odst. olja, filtrov...', 5.50),
(ESPACE_SERVICE_1_ID, 'Drobni materijal', 7.34);

-- Espace Service 1 Attachment
INSERT INTO service_attachments (service_id, name, file_url)
VALUES (ESPACE_SERVICE_1_ID, 'Račun.pdf', '/src/assets/pdfs/espace-redni-servis-21-10-2024.pdf');

-- Espace Service 2 (October 2023)
INSERT INTO car_services (car_id, date, mileage, paid)
VALUES (ESPACE_CAR_ID, '2023-10-09', 115544, 452.42)
RETURNING id;

-- Note the returned ID as espace_service_2_id
-- Replace ESPACE_SERVICE_2_ID below

-- Espace Service 2 Items
INSERT INTO service_items (service_id, description, cost) VALUES
(ESPACE_SERVICE_2_ID, 'Zamenjava x2 spodnje vodilo sprednje polpreme', 88),
(ESPACE_SERVICE_2_ID, 'Test vozilo s testerjem', 12),
(ESPACE_SERVICE_2_ID, 'Diagnostika zavorni sistem in reprogramiranje', 20),
(ESPACE_SERVICE_2_ID, 'Vilica', 144.02),
(ESPACE_SERVICE_2_ID, 'Vilica', 143.98),
(ESPACE_SERVICE_2_ID, 'Drobni materijal', 4.04);

-- Espace Service 3 (August 2021)
INSERT INTO car_services (car_id, date, mileage, paid)
VALUES (ESPACE_CAR_ID, '2021-08-17', 97009, 191.21)
RETURNING id;

-- Note the returned ID as espace_service_3_id
-- Replace ESPACE_SERVICE_3_ID below

-- Espace Service 3 Items
INSERT INTO service_items (service_id, description, cost) VALUES
(ESPACE_SERVICE_3_ID, 'Zamenjava olja in filtra', 20),
(ESPACE_SERVICE_3_ID, 'Filter olja', 9.41),
(ESPACE_SERVICE_3_ID, 'Tesnilo', 2.36),
(ESPACE_SERVICE_3_ID, 'Olje CASTROL sod 5W40 (4.3L)', 45.84),
(ESPACE_SERVICE_3_ID, 'Tekočina hladilna', 6.39),
(ESPACE_SERVICE_3_ID, 'GRT obvezne opreme', 10.95),
(ESPACE_SERVICE_3_ID, 'set za prevmatike', 36.78);

-- Espace Service 3 Attachment
INSERT INTO service_attachments (service_id, name, file_url)
VALUES (ESPACE_SERVICE_3_ID, 'Račun.pdf', '/src/assets/pdfs/espace-redni-servis-17-08-2021.pdf');

-- ========================================
-- Insert Renault Grand Scenic
-- ========================================
INSERT INTO cars (user_id, make, model, year, registration_number, registration_expiry, vignette_expiry, car_mileage, image_url, registration_certificate)
VALUES ('YOUR_USER_ID_HERE', 'Renault Grand Scenic III', 'dCi 110 Dynamique', 2014, 'LJ87-AAP', '2025-11-28', '2026-05-14', 290000, '/src/assets/renault-grand-scenic.jpg', '/src/assets/scenic-registration.jpg')
RETURNING id;

-- Note the returned ID as scenic_car_id
-- Replace SCENIC_CAR_ID below

-- Scenic Registration PDF
INSERT INTO registration_pdfs (car_id, name, file_url)
VALUES (SCENIC_CAR_ID, 'Registracija in zavarovanje SCENIC 2025/26', '/src/assets/registrations/scenic-registration-2025.pdf');

-- Scenic Service (August 2024)
INSERT INTO car_services (car_id, date, mileage, paid)
VALUES (SCENIC_CAR_ID, '2024-08-21', 281176, 2275.62)
RETURNING id;

-- Note the returned ID as scenic_service_id
-- Replace SCENIC_SERVICE_ID below

-- Scenic Service Items
INSERT INTO service_items (service_id, description, cost) VALUES
(SCENIC_SERVICE_ID, 'Servis pregled vozilo', 104.13),
(SCENIC_SERVICE_ID, 'Odstr - pon nam zračni filter', 16.02),
(SCENIC_SERVICE_ID, 'Zamenjava filter potniškega prostora', 24.03),
(SCENIC_SERVICE_ID, 'Mazanje bat sprednjega zavornega sedla', 32.04),
(SCENIC_SERVICE_ID, 'Zamenjava zadnja zavorna ploščica', 80.10),
(SCENIC_SERVICE_ID, 'Mazanje sklop zdanjega zavornega sedla', 32.04),
(SCENIC_SERVICE_ID, 'Konfiguaracija ročne zavore', 32.04),
(SCENIC_SERVICE_ID, 'Odstr - pon nam vodna črpalka', 40.05),
(SCENIC_SERVICE_ID, 'Zamenjava enota predgretja in postgretja', 240.30),
(SCENIC_SERVICE_ID, 'Zamenjava jermen za pogon opreme motorja', 48.06),
(SCENIC_SERVICE_ID, 'Pra izp pol odz krogotok hladilne tekočine - odzračevan', 136.17),
(SCENIC_SERVICE_ID, 'Odstr - pon nam kompresor klimatske naprave', 200.25),
(SCENIC_SERVICE_ID, 'Odstr - pon nam kondenzator', 88.11),
(SCENIC_SERVICE_ID, 'Čiščenje odduščkov požarne stene', 80.10),
(SCENIC_SERVICE_ID, 'Prazn - polnjenje olje za menjalnik', 48.06),
(SCENIC_SERVICE_ID, 'Zamenjava zavorna tekočina', 48.06),
(SCENIC_SERVICE_ID, 'Grt. tesnil klime', 40.26),
(SCENIC_SERVICE_ID, 'Glaceol - Antifriz 1L', 32.31);

-- Scenic Service Attachment
INSERT INTO service_attachments (service_id, name, file_url)
VALUES (SCENIC_SERVICE_ID, 'Veliki, redni in servis klime.pdf', '/src/assets/pdfs/scenic-veliki-redni-klima-servis-21-08-2024.pdf');
