# POC: Keep - Team Management Features

## Technology Stack
- Next.js
- Redux Toolkit
- Tailwind CSS
- Headless UI
- Node.js
- Express.js
- Knex.js ORM
- PostgreSQL
- Docker + Doker Compose
- Nginx

## User Stories

### Authentication
- [ ] As a an admin, I want to register an account for my business with my business name, email mand password.
- [ ] As a user, I want to login with my email and password.
- [ ] As an user, I want to set my password when I activate my account via an invitation. 

### Team Management
- [ ] As an admin, I want to see a list of team members.
- [ ] As an admin, I want to invite new admins to the team.
- [ ] As an admin, I want to invite new employees to the team.

### Card Management
- [ ] As an admin, I want to create a card for anyone on the team.
- [ ] As an employee, I want to request a card to be issued.
- [ ] As an admin, I want to approve a requested card.
- [ ] As an admin, I want to decline a requested card.

## DB Schema
### businesses
- businessId (PK)
- businessName
- createAt
- updatedAt

### users
- userId (PK)
- businessId (FK -> businesses.businessId)
- firstName
- lastName
- password
- createdAt
- updatedAt

### roles
- roleId (PK)
- name

### features
- featureId (PK)
- name

### roleFeatures
- roleId (PK)
- featureId (PK)

### invites
- inviteId (PK)
- businessId (FK -> businesses.businessId)
- firstName
- lastName
- role
- createdAt
- updatedAt

### cards
- cardId (PK)
- userId (FK -> users.userId)
- businessId (FK -> businesses.businessId)
- name
- type
- status
- limitAmount
- limitCurrency
- createdAt
- updatedAt

## v1 API Endpoints
### Authentication
- `POST v1/auth/login`
- `POST v1/auth/register`
- `GET v1/auth/activate/:inviteId
- `POST v1/auth/activate/:inviteId`

### Team management
- `GET /v1/team-members`
- `POST /v1/team-members`
- `PUT /v1/team-members/:teamMemberId`
- `DELETE /v1/team-members/:teamMemberId`

### Cards
- `GET /v1/cards?status={status}`
- `POST /v1/cards`
- `POST /v1/cards/request`
- `GET /v1/cards/:cardId/approve`
- `GET /v1/cards/:cardId/decline`
- `DELETE /v1/card:cardId`


