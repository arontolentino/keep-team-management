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

## Highlights

- Fully working authentication with access/refresh tokens, JWT, and cookies
- Database migration and seeding
- API endpoint validations
- API endpoint restrictions based on required permissions
- Page and component restriction based on required permissions

## User Stories

### Authentication

- [x] As a an admin, I want to register an account for my business with my business name, email mand password.
- [x] As a user, I want to login with my email and password.
- [ ] As an user, I want to set my password when I activate my account via an invitation.

### Team Management

- [x] As an admin, I want to see a list of team members.
- [x] As an admin, I want to see a list of invites.
- [x] As an admin, I want to invite new admins to the team.
- [x] As an admin, I want to invite new employees to the team.

### Card Management

- [ ] As an admin, I want to create a card for anyone on the team.
- [ ] As an admin, I want to approve a requested card.
- [ ] As an admin, I want to decline a requested card.
- [ ] As an admin, I want to see all cards.
- [ ] As an employee, I want to see my own cards.
- [ ] As an employee, I want to request a card to be issued.

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

### permissions

- featureId (PK)
- name

### rolePermissions

- roleId (FK)
- featureId (FK)

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
  - Description:
    - Login with email and password
  - Request body:
    ```
    {
      "email": "arontolentino@outlook.com",
      "password": "password@1234",
    }
    ```
- `POST v1/auth/register`
  - Description:
    - Register with name, email, password, and business name.
  - Query params:
    - `inviteId`
  - Request body:
    ```
    {
      "name": "Aron Tolentino",
      "email": "arontolentino@outlook.com",
      "password": "password@1234",
      "businessName: "John Doe Ventures Inc."
    }
    ```
    
- `POST /v1/auth/activate/:inviteId
  - Description:
    - Activates invited user account
  - Request body:
    ```
    {
      "password": "password@1234",
    }
    ```
  
- `GET v1/auth/logout`
  - Description:
    - Log out by clearing cookies and delete refresh token from database

### Users

- `GET /v1/users`
  - Description:
    - Gets all users from a business
  - Query params:
    - `searchTerm`
    - `soryBy`
    - `sortDirection`
    - `page`
    - `pageSize`
- `PUT /v1/users/:userId`
  - TBD
- `DELETE /v1/users/:userId`
  - TBD

### Invites

- `GET /v1/invites`
  - Description:
    - Gets all user invitations
  - Query params:
    - `searchTerm`
    - `soryBy`
    - `sortDirection`
    - `page`
    - `pageSize`
- `GET /v1/invites:/inviteId
  - Description:
    - Gets a specific user invitation

### Cards

- `GET /v1/cards`
  - TBD
- `POST /v1/cards`
  - TBD
- `GET /v1/cards/:cardId/approve`
  - TBD
- `GET /v1/cards/:cardId/decline`
  - TBD
- `DELETE /v1/card:cardId`
  - TBD
