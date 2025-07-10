# Try it NOW [here!](https://tickets-wizard.web.app/#/)

<img width="750" height="607" alt="logo" src="https://github.com/user-attachments/assets/14154388-918e-4289-b690-9bf8a7f9554e" />

# **What's Tickets Wizard**

Tickets Wizard is is a modern, responsive web application built with Angular and .NET. It allows users to browse, filter, and purchase tickets for events, view their ticket history, and manage authentication. The app is styled with Angular Material and Bootstrap, and is set up for deployment on Firebase Hosting, and communicates with a separate backend API implemented with .NET for authentication all ticketing operations.

---
# **Backend repository**
https://github.com/abtlb/TicketsAPI2

---

# **Frontend Workspace Structure**

- **src/**  
  - **app/**  
    - **event/**: Event listing and details components  
    - **models/**: TypeScript interfaces for data models (Event, Ticket, Performer, etc.)  
    - **services/**: Angular services for API communication (user, event, auth)  
    - **my-tickets/**: User’s purchased tickets  
    - **ticket/**: Ticket display component  
    - **navbar/**, **footer/**: Layout components  
    - **register/**, **login/**: Authentication components  
    - **shared/**: Shared components (e.g., loading spinner)
    - **environments/**: Environment configs for API URLs
  - **index.html**: Main HTML entry point
  - **main.ts**: Angular bootstrap
  - **main.server.ts**: Server-side bootstrap for SSR
  - **styles.css**: Global styles

- **public/**  
  - Static assets (images, favicon, etc.)

- **dist/**  
  - Production build output

- **server.ts**  
  - Express server for SSR and serving static files

- **firebase.json, .firebaserc**  
  - Firebase Hosting and project configuration

- **angular.json**  
  - Angular CLI project configuration

---
# **Core Features**
- **User Authentication:** Register, login, and logout with secure token handling.
- **Event Browsing:** View, search, and filter events by name, location, date, and performer.
- **Event Details:** See detailed event information, performers, and ticket types.
- **Ticket Purchase:** Buy tickets for events (with confirmation prompts and sold-out handling).
- **My Tickets:** View a list of all tickets you have purchased.
- **Receipts:** Instantly view a receipt after purchasing a ticket.
- **Responsive Design:** Fully responsive UI using Angular Material and Bootstrap.
- **Loading & Error Handling:** User-friendly loading indicators and error messages.
- **Firebase Hosting Ready:** Optimized for deployment to Firebase Hosting, with optional SSR (Server-Side Rendering).

# **API Integration**

- All data is fetched from an external API [API Repo](https://github.com/abtlb/TicketsAPI2)
- `UserService` handles ticket purchase, history, and receipts
- `EventService` fetches event data

---

# **Notable Implementation Details**

- **Responsive Design:**  
  Media queries in CSS for mobile/tablet/desktop layouts
- **Animations:**  
  Angular animations for confirmation prompts (e.g., "Are you sure?" on ticket purchase)
- **Type Safety:**  
  TypeScript interfaces for all data models
- **Environment Separation:**  
  Separate configs for development and production API endpoints

---

# **How It Works (User Flow)**

1. **Landing Page:**  
   User sees a hero section and carousel of features.
2. **Authentication:**  
   User can register or log in.
3. **Browse Events:**  
   User can filter and view events.
4. **Event Details:**  
   User sees event info, performers, and ticket options.
5. **Buy Ticket:**  
   User confirms purchase and receives a receipt.
6. **My Tickets:**  
   User can view all purchased tickets.

---

# **Deployment & Hosting**

- **Firebase Hosting:**  
  - firebase.json rewrites all routes to index.html for SPA support
  - Static assets are served from public
---
