---
publishDate: 2026-03-05T00:00:00Z
title: 'Self-Hosting Everything: Dokploy + Cloudflare Tunnels on a Home Server'
excerpt: My complete self-hosting stack — Dokploy as the deployment platform, Cloudflare Tunnels for zero-open-port exposure, and a wildcard subdomain setup that makes spinning up new services trivial.
image: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80
category: Infrastructure
tags:
  - self-hosting
  - dokploy
  - cloudflare
  - docker
  - devops
metadata:
  canonical: https://yourdomain.com/self-hosting-dokploy-cloudflare
---

## The Goal

Run production-grade personal services (Gitea, Plausible, Minio, n8n, custom apps) on a home server with:

- Zero open inbound ports on the router
- Automatic HTTPS via Cloudflare
- One-command deployments via Dokploy

## Stack

| Layer               | Tool                         |
| ------------------- | ---------------------------- |
| Deployment platform | Dokploy                      |
| Ingress / DNS       | Cloudflare Tunnels + Workers |
| Container runtime   | Docker + Compose             |
| Reverse proxy       | Traefik (managed by Dokploy) |
| Object storage      | MinIO                        |

## How It Works

**Cloudflare Tunnel** (`cloudflared`) runs as a Docker container on the server. It opens an outbound connection to Cloudflare's edge — no inbound firewall rules needed. DNS records point to `<tunnel-id>.cfargotunnel.com`.

**Dokploy** handles the deployment UI — connect a Git repo, set environment variables, and it handles compose file generation, rolling updates, and log streaming.

**Wildcard subdomain routing**: A single tunnel config routes `*.yourdomain.com` to the local Traefik instance, which then proxies to the correct container by hostname. Adding a new service = add a Traefik label, push, done.

## Gotchas

- Cloudflare Tunnel has a ~100 MB WebSocket payload limit — matters if you're proxying large file uploads directly (use MinIO pre-signed URLs instead).
- Dokploy's built-in Traefik conflicts with an external Traefik instance — pick one.
- `cloudflared` needs to be pinned to a specific version in compose to avoid surprise breakage on auto-update.
