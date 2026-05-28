# Supabase setup

1. Abrir Supabase SQL Editor en el proyecto de Ana Labs.
2. Ejecutar `schema.sql`.
3. Ejecutar `seed-vpm.sql`.
4. Ejecutar `seed-driven.sql` para cargar la marca DRV / Driven.
5. En Authentication, crear o registrar `paumedium@gmail.com` con contraseña.
6. En Authentication > URL Configuration:
   - Site URL: `https://ana-labs.vercel.app`
   - Redirect URLs:
     - `https://ana-labs.vercel.app/auth/callback`
     - `https://ana-labs.vercel.app/auth/confirm`
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/auth/confirm`
7. Confirmar que el usuario pueda entrar a `/login` y ver VPM + DRV.

No pegar en el chat ni commitear `service_role`, password de DB, JWT secret ni connection strings con password.
