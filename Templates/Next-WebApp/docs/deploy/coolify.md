# Deploying with Coolify

Coolify is a self-hosted PaaS that gives you push-to-deploy from GitHub, auto-SSL, and a Postgres database — all on your own VPS.

## One-time Coolify setup

1. Provision a Hetzner VPS (CPX21 or larger recommended).
2. SSH in and run the Coolify install:
   ```bash
   curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
   ```
3. Open `http://<your-vps-ip>:8000` in a browser and complete the Coolify setup wizard.

## Adding your app

1. In Coolify, create a new **Application** → **GitHub** → select your repo.
2. Set **Build pack** to **Dockerfile**.
3. Set **Port** to `3000`.
4. Under **Environment variables**, add:
   ```
   DATABASE_URL=postgresql://postgres:<password>@<postgres-service-host>:5432/<dbname>
   BETTER_AUTH_SECRET=<random-32-char-string>
   BETTER_AUTH_URL=https://<your-domain>
   NEXT_PUBLIC_APP_URL=https://<your-domain>
   RESEND_API_KEY=re_<your-key>
   ```
5. Add a **Postgres** service in Coolify and link it. Copy the internal connection string.
6. Set your custom domain in Coolify. It handles SSL via Let's Encrypt automatically.
7. Click **Deploy**. Future pushes to `main` trigger a new deploy automatically.

## Running migrations

After first deploy, open the Coolify terminal for your app container and run:

```bash
npm run db:migrate
```

Or add a **Start command** in Coolify that runs migrations before `node server.js`:

```bash
node -e "require('./node_modules/drizzle-kit').migrate()" && node server.js
```
