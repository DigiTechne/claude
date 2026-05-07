# Deploying with Docker + Caddy

Manual self-hosted deploy using `compose.prod.yml`. Caddy handles SSL automatically.

## Prerequisites

- Linux VPS with Docker + Docker Compose installed
- A domain pointed at the VPS IP (A record)
- Ports 80 and 443 open in the firewall

## Setup

1. Clone your repo on the VPS:

   ```bash
   git clone <repo-url> /opt/myapp
   cd /opt/myapp
   ```

2. Copy and fill in production env:

   ```bash
   cp .env.prod.example .env.prod
   nano .env.prod   # fill in DOMAIN, POSTGRES_PASSWORD, BETTER_AUTH_SECRET, RESEND_API_KEY
   ```

3. Start the stack:

   ```bash
   docker compose -f compose.prod.yml --env-file .env.prod up -d
   ```

   Caddy will automatically obtain SSL certificates on first start.

4. Run migrations:
   ```bash
   docker compose -f compose.prod.yml exec app npm run db:migrate
   ```

## Deploying updates

```bash
git pull
docker compose -f compose.prod.yml --env-file .env.prod up -d --build
```

## Viewing logs

```bash
docker compose -f compose.prod.yml logs -f app
docker compose -f compose.prod.yml logs -f postgres
```
