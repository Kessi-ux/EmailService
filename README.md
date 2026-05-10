# 📧 Email Microservice (NestJS)

A standalone, scalable email microservice built with **NestJS**, designed to handle transactional emails, newsletters, templates, queue processing, and full email lifecycle tracking (delivery, opens, clicks, bounces, complaints).

---

# 🚀 Features

- 📩 Transactional email sending (registration, notifications, etc.)
- 📰 Newsletter broadcasting
- 🧩 Dynamic email templates (Handlebars)
- ⚙️ Queue-based processing (Bull + Redis)
- 🔁 Retry logic with failure handling
- 🚫 Unsubscribe management
- 📊 Email delivery tracking (delivered, opened, clicked)
- ⚠️ Bounce & complaint handling
- 🐳 Docker support (app + PostgreSQL + Redis)

---

# 🏗️ Architecture Overview

- **Email Service** → API entry point
- **Queue (Bull + Redis)** → handles async email processing
- **Email Provider (SendGrid)** → sends actual emails
- **Webhook System** → tracks events (open, click, bounce)
- **Prisma + PostgreSQL** → stores emails, templates, events, unsubscribe data

---

# 📡 API Endpoints

## 📩 Email Endpoints

### Send transactional email
```http
POST /emails/send

Body:
{
  "to": "user@example.com",
  "subject": "Welcome",
  "html": "<h1>Hello</h1>"
}

Send newsletter
POST /emails/newsletter

Body:

{
  "recipients": ["user1@example.com", "user2@example.com"],
  "subject": "Weekly Update",
  "html": "<h1>News</h1>"
}
🧩 Template Endpoints
Create template
POST /templates

Body:

{
  "name": "welcome",
  "html": "<h1>Hello {{firstName}}</h1>"
}
🚫 Unsubscribe
Unsubscribe user
POST /unsubscribe

Body:

{
  "email": "user@example.com"
}
📊 Webhooks (SendGrid)
Email events (delivery tracking)
POST /webhooks/email

Handles:

delivered
open
click
bounce
spam complaint
⚙️ How It Works
API receives email request
Email is validated (unsubscribe check)
Email is pushed to queue
Worker processes queue job
SendGrid sends email
Webhook captures events
Events stored in database
🗄️ Database Models
EmailEvent → tracks delivery lifecycle
Template → email templates
Queue → queued emails
Unsubscribe → blocked recipients
🧪 Running Locally
1. Install dependencies
npm install
2. Setup environment variables

Create .env file:

DATABASE_URL="postgresql://email_service_user:Password@localhost:5432/email_service_db"
REDIS_HOST=localhost
REDIS_PORT=6379
3. Run database migrations
npx prisma migrate dev
npx prisma generate
4. Start Redis (required for queue)
redis-server
5. Start application
npm run start:dev
🐳 Running with Docker
1. Build and start services
docker compose up --build
2. Services included
NestJS API → http://localhost:3000
PostgreSQL → localhost:5432
Redis → localhost:6379
3. Stop services
docker compose down
📦 Tech Stack
NestJS
Prisma
PostgreSQL
Redis
Bull Queue
SendGrid
Docker
📈 Acceptance Criteria (Completed)
✅ Emails are sent successfully
✅ Templates render dynamic data
✅ Queue processes emails reliably
✅ Retry logic implemented
✅ Unsubscribed users are blocked
✅ Email events tracked (delivery, open, click)
✅ Bounce and complaint handling
✅ Fully dockerized system