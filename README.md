# Suchaka - Self-Hosted Status Page

Modern, containerized status page for displaying real-time service health. Deploy in 5 minutes with Docker.

**Suchaka** is a free, open-source alternative to StatusPage.io. Perfect for startups, DevOps teams, and companies that need data sovereignty.

## Why Suchaka?

| Feature | Suchaka | StatusPage.io | Cachet |
|---------|---------|---------------|--------|
| Price | Free | $29-299/mo | Free |
| Self-hosted | ✅ | ❌ | ✅ |
| Modern Stack | ✅ React/Node/Go | N/A | ❌ PHP/Laravel |
| Docker | ✅ One-liner | N/A | Partial |
| Multi-region | ✅ | ✅ | ❌ |
| Easy Setup | ✅ 5 minutes | N/A | ❌ Complex |
| Data Sovereignty | ✅ | ❌ | ✅ |

## How It Helps Companies

**Transparency & Trust**
- Real-time service status visible to customers
- Reduces support tickets during incidents
- Builds confidence in your infrastructure

**Cost Savings**
- No monthly SaaS fees ($29-299/month)
- Self-hosted on your infrastructure
- One-time setup, unlimited services

**Data Control**
- Your data stays on your servers
- No third-party access to monitoring data
- Compliant with data residency requirements

**Customization**
- Full branding control (logo, colors, company name)
- Custom domain support
- Extensible architecture

## Quick Start

```bash
# 1. Clone repository
git clone git@github.com:VibhuviOiO/suchaka.git
cd suchaka/docker

# 2. Start PostgreSQL
docker compose up -d postgres

# 3. Start agents (in separate terminal)
cd ../agent
go mod tidy
go run cmd/agent/main.go

# 4. Start backend (in another terminal)
cd ../statuspage/backend
npm install
npm run dev

# 5. Start frontend (in another terminal)
cd ../statuspage/frontend
npm install
npm run dev

# 6. Access status page
open http://localhost:5173
```

## What Gets Monitored

Out of the box, Suchaka monitors 8 public APIs:
1. ISRO Spacecrafts
2. ISRO Launchers
3. ISRO Customer Satellites
4. Aviation Weather METAR
5. NHTSA Vehicle API
6. Squiggle AFL Teams
7. NVD Schema
8. JSONPlaceholder Posts

**Add your own:** Edit database to add custom endpoints

## Architecture

```
Agent (Go)              Status Page (React)         PostgreSQL
├─ Monitors APIs        ├─ Frontend UI              ├─ Monitors
├─ Collects metrics     ├─ Backend API (Node.js)    ├─ Heartbeats
├─ Stores heartbeats    └─ Branding config          ├─ Regions
└─ HA with failover                                 └─ Agents
```

**Components:**
- **Agent** (Go) - HTTP monitoring with HA support
- **Status Page** (React + Node.js) - Public dashboard
- **PostgreSQL** - Time-series data storage
- **Docker** - Containerized deployment

## Configuration

Edit `docker/.env` to customize:

```env
# Branding
NAVBAR_TITLE=Your Company
STATUS_PAGE_TITLE=Service Status
LOGO_URL=https://example.com/logo.png
COMPANY_WEBSITE=https://example.com
SUPPORT_EMAIL=support@example.com

# Theme Colors
NAVBAR_BG_COLOR=#ffffff
NAVBAR_TEXT_COLOR=#202124
PAGE_BG_COLOR=#f5f5f5
```

## Deployment Options

**Minimal (2 Agents)**
```bash
docker compose up -d
```

**Extended (14 Agents, 10 Regions)**
```bash
docker compose -f docker-compose.extended.yml up -d
```

## Database Partitioning

Heartbeat data is automatically partitioned by date for optimal performance:
- **On startup**: Agent creates partition for today
- **On each heartbeat**: Agent checks and creates partition if needed for that date
- **Zero maintenance**: No manual intervention needed, ever

Partitions are managed by agent-side creation logic.

## Access Points

- **Status Page**: http://localhost:5173 (dev) / http://localhost:8077 (prod)
- **Backend API**: http://localhost:8077/api
- **PostgreSQL**: localhost:5432 (uptimeo/uptimeo)
- **Agent Health**: http://localhost:8081/healthz

## Roadmap

### Incident Management (Planned)
- Create and manage incidents
- Track incident timeline and updates
- Incident history and analytics
- Customer RSS Feed
- Incident severity levels
- Automatic incident creation on service degradation

### Future Features
- Webhook integrations

## Documentation

- [Agent Setup](docs/AGENT.md) - Monitoring agent configuration
- [Status Page](docs/STATUS_PAGE.md) - Frontend & backend setup
- [Frontend](docs/FRONTEND.md) - React dashboard customization
- [Best Practices](docs/AGENT_BEST_PRACTICES.md) - Go code standards
- [Release Notes](docs/RELEASE_NOTES.md) - Version history

## Troubleshooting

```bash
# Check containers
docker compose ps

# View logs
docker compose logs -f status-page

# Restart
docker compose restart

# Clean slate
docker compose down -v
rm -rf docker/tmp/pgdata docker/tmp/data
docker compose up -d
```

## License

MIT - Free for personal and commercial use

## Support

- GitHub Issues: Report bugs
- Discussions: Ask questions
- Docs: See `docs/` folder

## About Vibhuvi OiO

Suchaka is built by **Vibhuvi OiO**, a company dedicated to creating open-source projects and contributing back to the community. We believe in building tools that empower developers and organizations.

Learn more: [Vibhuvi OiO](https://vibhuvioio.com)
