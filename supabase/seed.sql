-- Demo provider directory for Uribcare.
-- Run after 0001_init.sql. These are published, verified listings with no
-- owning account (user_id is null), so search, the directory and booking work
-- immediately. Safe to re-run: it clears seeded (account-less) rows first.

delete from public.providers where user_id is null;

insert into public.providers
  (kind, name, title, specialty, services, bio, qualifications, years_experience,
   city, state, zip, phone, email, website, insurance, accepting_new, connection,
   rating, review_count, verified, status)
values
  ('counselor','Dr. Maya Reyes, LPC','Licensed Professional Counselor','Autism & family counseling',
   array['Autism counseling','Family therapy','Anxiety','Behavioral support'],
   'Supports autistic children and their families with compassionate, evidence-based counseling.',
   'LPC, M.S. Clinical Mental Health Counseling', 12,
   'Atlanta','GA','30305','770-910-5581','maya.reyes@example.com','https://example.com',
   array['Aetna','Cigna','Self-pay'], true,
   '{"phone":"770-910-5581","message":true,"video":true}'::jsonb, 4.9, 48, true, 'published'),

  ('counselor','Jordan Blake, LCSW','Licensed Clinical Social Worker','Behavioral counseling',
   array['Behavioral counseling','Parent coaching','Teletherapy'],
   'Helps families build routines and communication strategies that last.',
   'LCSW', 9,
   'Marietta','GA','30060','770-555-0142','jordan.blake@example.com',null,
   array['Blue Cross','UnitedHealthcare','Self-pay'], true,
   '{"message":true,"video":true}'::jsonb, 4.7, 31, true, 'published'),

  ('doctor','Dr. Aisha Khan, MD','Developmental Pediatrician','Developmental pediatrics',
   array['Autism assessment','Developmental screening','Care coordination'],
   'Board-certified developmental pediatrician focused on early diagnosis and coordinated care.',
   'MD, Board Certified in Developmental-Behavioral Pediatrics', 15,
   'Atlanta','GA','30309','770-555-0188','aisha.khan@example.com','https://example.com',
   array['Aetna','Cigna','Medicaid'], true,
   '{"phone":"770-555-0188","video":true,"appointment_url":"https://example.com/book"}'::jsonb,
   4.9, 72, true, 'published'),

  ('doctor','Dr. Samuel Ortiz, MD','Child Neurologist','Pediatric neurology',
   array['Neurology','Seizure management','Developmental evaluation'],
   'Pediatric neurologist partnering with therapists and families on whole-child care.',
   'MD, Pediatric Neurology', 18,
   'Jersey City','NJ','07302','201-555-0121','samuel.ortiz@example.com',null,
   array['Horizon BCBS','Aetna','Self-pay'], false,
   '{"phone":"201-555-0121","video":true}'::jsonb, 4.8, 54, true, 'published'),

  ('therapist','Bright Steps Therapy','Occupational Therapy','Pediatric occupational therapy',
   array['Occupational therapy','Sensory integration','Fine motor skills'],
   'A pediatric OT practice helping children build independence in daily activities.',
   'OTR/L', 11,
   'Alpharetta','GA','30009','770-555-0164','hello@brightsteps.example.com','https://example.com',
   array['Aetna','Cigna','UnitedHealthcare'], true,
   '{"phone":"770-555-0164","message":true,"appointment_url":"https://example.com/book"}'::jsonb,
   4.8, 63, true, 'published'),

  ('therapist','Clear Voice Speech Therapy','Speech-Language Pathology','Speech & language therapy',
   array['Speech therapy','Language development','AAC','Swallowing'],
   'Speech-language pathologists supporting communication for children and adults.',
   'CCC-SLP', 8,
   'Hoboken','NJ','07030','201-555-0199','care@clearvoice.example.com',null,
   array['Horizon BCBS','Self-pay'], true,
   '{"message":true,"video":true}'::jsonb, 4.9, 40, true, 'published'),

  ('therapist','Momentum Physical Therapy','Physical Therapy','Pediatric physical therapy',
   array['Physical therapy','Gait training','Strength & mobility'],
   'Restoring mobility and confidence through personalized physical therapy.',
   'DPT', 10,
   'Atlanta','GA','30312','770-555-0110','info@momentumpt.example.com','https://example.com',
   array['Aetna','Medicaid','Self-pay'], true,
   '{"phone":"770-555-0110","appointment_url":"https://example.com/book"}'::jsonb,
   4.7, 29, true, 'published'),

  ('nutritionist','Nourish Pediatric Nutrition','Registered Dietitian','Pediatric & feeding nutrition',
   array['Feeding therapy','Meal planning','Food sensitivity support'],
   'Registered dietitians specializing in selective eating and feeding challenges.',
   'RDN, LD', 7,
   'Decatur','GA','30030','770-555-0133','team@nourish.example.com',null,
   array['Cigna','Self-pay'], true,
   '{"message":true,"video":true}'::jsonb, 4.8, 22, true, 'published'),

  ('nutritionist','Balanced Table Nutrition','Registered Dietitian','Family nutrition',
   array['Nutrition counseling','Weight management','Diabetes support'],
   'Practical, judgment-free nutrition guidance for the whole family.',
   'RDN', 6,
   'Newark','NJ','07102','201-555-0177','hello@balancedtable.example.com',null,
   array['Horizon BCBS','Aetna'], true,
   '{"video":true}'::jsonb, 4.6, 18, true, 'published'),

  ('pharmacy','CareFirst Community Pharmacy','Pharmacy','Compounding & specialty pharmacy',
   array['Prescription fulfillment','Compounding','Medication reviews','Delivery'],
   'Independent pharmacy offering compounding and personalized medication support.',
   null, null,
   'Atlanta','GA','30308','770-555-0150','rx@carefirst.example.com','https://example.com',
   array['Most insurance','GoodRx','Self-pay'], true,
   '{"phone":"770-555-0150","message":true}'::jsonb, 4.7, 90, true, 'published'),

  ('pharmacy','Harbor Specialty Pharmacy','Pharmacy','Specialty medications',
   array['Specialty medications','Home delivery','Adherence packaging'],
   'Specialty pharmacy with adherence packaging and reliable home delivery.',
   null, null,
   'Jersey City','NJ','07310','201-555-0198','care@harborrx.example.com',null,
   array['Most insurance','Self-pay'], true,
   '{"phone":"201-555-0198","message":true}'::jsonb, 4.6, 57, true, 'published'),

  ('laboratory','Precision Diagnostics Lab','Diagnostic Laboratory','Clinical & genetic testing',
   array['Blood work','Genetic testing','At-home collection','Allergy panels'],
   'CLIA-certified diagnostic lab with convenient at-home collection options.',
   'CLIA Certified', null,
   'Atlanta','GA','30313','770-555-0120','lab@precisiondx.example.com','https://example.com',
   array['Most insurance','Self-pay'], true,
   '{"phone":"770-555-0120","appointment_url":"https://example.com/book"}'::jsonb,
   4.8, 65, true, 'published'),

  ('laboratory','Metro Clinical Labs','Diagnostic Laboratory','Routine diagnostics',
   array['Blood work','Metabolic panels','Rapid testing'],
   'Fast, accurate routine diagnostics with multiple collection sites.',
   'CLIA Certified', null,
   'Newark','NJ','07105','201-555-0144','info@metrolabs.example.com',null,
   array['Horizon BCBS','Aetna','Self-pay'], true,
   '{"phone":"201-555-0144"}'::jsonb, 4.5, 33, true, 'published');
