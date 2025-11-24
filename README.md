# Suchaka - Self-Hosted Status Page

Modern, containerized status page for displaying real-time service health. Deploy in 5 minutes with Docker.

**Suchaka** is a free, open-source alternative to StatusPage.io. Perfect for startups, DevOps teams, and companies that need data sovereignty.

![Status Page](docs/status-page.png)

## Architecture

### Agent (Go) - Monitoring & Resilience
- **HTTP Monitoring**: Tracks DNS, TCP, TLS, TTFB metrics
- **High Availability**: Leader election via PostgreSQL advisory locks
- **Multi-replica Support**: Run multiple agents with same ID for automatic failover (~30s recovery)
- **Config Reload**: Detects monitor changes every 1 minute (configurable)
- **Persistent Queue**: Survives restarts with local disk queue
- **Graceful Shutdown**: Flushes pending heartbeats on exit
- **Health Endpoints**: `/healthz` and `/readyz` for orchestration

### Status Page (React + Node.js) - Real-time Dashboard
- **Live Updates**: Auto-refresh every 30 seconds
- **Multi-region View**: See service status across regions
- **Historical Data**: 5m, 15m, 30m, 1h, 4h, 24h, 1w, 2w windows
- **Customizable Branding**: Logo, colors, company info
- **Response Charts**: Visualize performance trends
- **Uptime Percentage**: Track SLA compliance

### PostgreSQL - Scalable Data Storage
- **Time-series Optimized**: Partitioned by date for performance
- **Auto-partitioning**: Agent creates daily partitions automatically
- **30-day Retention**: Configurable data cleanup
- **Advisory Locks**: Leader election for HA agents
- **Indexes**: Optimized for heartbeat queries

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

## Sample Data vs Custom Monitoring

### Sample Data (Testing)
By default, Suchaka loads 8 public APIs for testing:
- ISRO Spacecrafts, Launchers, Customer Satellites
- Aviation Weather METAR
- NHTSA Vehicle API
- Squiggle AFL Teams
- NVD Schema
- JSONPlaceholder Posts

Use this to test the system without setting up your own monitors.

### Custom Monitoring (Production)
Replace sample data with your own services using SQL commands:

**1. Create Region**
```sql
INSERT INTO regions (name, region_code, group_name) 
VALUES ('US East', 'us-east-1', 'US');
```

**2. Create Datacenter**
```sql
INSERT INTO datacenters (code, name, region_id) 
VALUES ('us-east-1a', 'US East 1A', 1);
```

**3. Create Agent**
```sql
INSERT INTO agents (name, datacenter_id) 
VALUES ('Agent 1', 1);
```

**4. Create Monitor**
```sql
INSERT INTO api_monitors (name, method, type, url, schedule_id) 
VALUES ('My API', 'GET', 'HTTPS', 'https://api.example.com/health', 1);
```

**5. Assign Monitor to Agent**
```sql
INSERT INTO agent_monitors (agent_id, monitor_id, active, created_by) 
VALUES (1, 1, TRUE, 'admin');
```

**6. Agent Picks Up Changes**
- Agent reloads config every 1 minute (configurable)
- Starts monitoring assigned endpoints
- Sends heartbeats to database

## Configuration

Edit `docker/.env` to customize all aspects of your status page:

### Database
```env
DB_CONN_STRING=postgres://uptimeo:uptimeo@postgres:5432/uptimeo?sslmode=disable
```

### Server
```env
PORT=8077                    # Backend server port
CORS_ORIGIN=*               # CORS origin for API requests
```

### Branding
```env
NAVBAR_TITLE=Your Company                    # Header title
STATUS_PAGE_TITLE=Service Status             # Page title
STATUS_PAGE_SUBTITLE=Real-time dashboard     # Page subtitle
LOGO_URL=https://example.com/logo.png        # Company logo
LOGO_DISPLAY_MODE=both                       # logo_only, title_only, or both
FOOTER_TEXT=Powered by Your Company          # Footer text
```

### Theme Colors
```env
NAVBAR_BG_COLOR=#ffffff         # Navigation bar background
NAVBAR_TEXT_COLOR=#202124       # Navigation bar text
FOOTER_BG_COLOR=#ffffff         # Footer background
FOOTER_TEXT_COLOR=#5f6368       # Footer text
PAGE_BG_COLOR=#f5f5f5           # Page background
```

### SEO Meta Tags
```env
META_DESCRIPTION=Real-time service status monitoring    # Page description
META_KEYWORDS=uptime,status,monitoring                  # Page keywords
META_AUTHOR=Your Company                                # Page author
FAVICON_URL=https://example.com/favicon.ico             # Browser tab icon
```

### External Connectivity
```env
NAVBAR_LINK_TEXT=Console                    # Link text in navbar
NAVBAR_LINK_URL=https://console.example.com # External console URL
COMPANY_WEBSITE=https://example.com         # Company website
SUPPORT_EMAIL=support@example.com           # Support email
SUPPORT_PHONE=+1-800-123-4567              # Support phone number
```

### Company Information
```env
COMPANY_NAME=Your Company    # Company name displayed on page
```

### UI View Behavior
```env
SHOW_LATENCY_INDICATORS=true              # Show latency values (true/false)
STATUS_DETAIL_LEVEL=detailed              # detailed (4 indicators) or simple (2 indicators)
```

**Status Indicators:**
- `SHOW_LATENCY_INDICATORS=true` + `STATUS_DETAIL_LEVEL=detailed`: Shows 4 indicators (Available, Elevated latency, High latency, Service disruption) with latency values
- `SHOW_LATENCY_INDICATORS=true` + `STATUS_DETAIL_LEVEL=simple`: Shows 2 indicators (Available, Service disruption) with latency values
- `SHOW_LATENCY_INDICATORS=false` + `STATUS_DETAIL_LEVEL=detailed`: Shows 4 indicators without latency values
- `SHOW_LATENCY_INDICATORS=false` + `STATUS_DETAIL_LEVEL=simple`: Shows 2 indicators without latency values

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
