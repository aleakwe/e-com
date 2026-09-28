# Bidly — Online Auction Marketplace

Bidly is an online auction marketplace project built for the **Design and Implementation of an E-Commerce Bidding Website** project.

## 1. Project architecture

```
Browser
  │
  ├── HTML / CSS / JavaScript
  │
  ▼
PHP application
  │
  ├── Authentication
  ├── Auction management
  └── Bid validation
  │
  ▼
MySQL database
```

## 2. Repository structure

```
e-com/
├── index.html
├── style.css
├── script.js
│
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── auctions.js
│   ├── auth.js
│   └── bidding.js
│
├── php/
│   ├── config/
│   │   └── database.php
│   ├── auth/
│   │   ├── register.php
│   │   ├── login.php
│   │   └── logout.php
│   ├── auctions/
│   │   └── get.php
│   └── bids/
│       └── place-bid.php
│
├── database/
│   └── auction.sql
└── img/
```

### What each part does

| Folder/file | Purpose |
|---|---|
| `index.html` | Main marketplace page |
| `style.css` | Current Bidly visual design |
| `script.js` | Current frontend demo interactions |
| `css/` | Organized stylesheet layer |
| `js/` | Frontend API and feature modules |
| `php/config/` | Database configuration |
| `php/auth/` | Registration, login and logout |
| `php/auctions/` | Auction data endpoints |
| `php/bids/` | Secure server-side bid processing |
| `database/` | MySQL schema |

## 3. Authentication

### Registration

```
User enters name + email + password
        ↓
php/auth/register.php
        ↓
password_hash()
        ↓
MySQL users table
        ↓
PHP session
```

### Login

```
Email + password
        ↓
php/auth/login.php
        ↓
password_verify()
        ↓
PHP session
        ↓
User can perform protected actions
```

Passwords are **never stored as plain text**. The database stores a password hash.

## 4. Bidding

```
User enters bid
      ↓
JavaScript
      ↓
POST php/bids/place-bid.php
      ↓
Check logged-in session
      ↓
Lock auction row
      ↓
Check auction is active
      ↓
Check bid >= current bid + minimum increment
      ↓
INSERT bid into MySQL
      ↓
UPDATE auction current_bid
      ↓
Return result
```

The browser is not trusted to decide whether a bid is valid.

## 5. Database

The database contains three core tables:

- **users** — accounts, password hashes and roles
- **auctions** — auction items, prices, status and closing time
- **bids** — every submitted bid and the user who placed it

Import `database/auction.sql` into MySQL/phpMyAdmin.

## 6. Run with XAMPP

1. Install XAMPP.
2. Start **Apache** and **MySQL**.
3. Copy the project to `C:\xampp\htdocs\e-com`.
4. Open phpMyAdmin.
5. Import `database/auction.sql`.
6. Check the MySQL credentials in `php/config/database.php`.
7. Open `http://localhost/e-com/`.

## 7. GitHub Pages

GitHub Pages can host the HTML/CSS/JavaScript frontend, but **cannot execute PHP or host MySQL**.

So:

- **GitHub Pages** → frontend/demo
- **XAMPP or PHP-capable hosting** → PHP + MySQL backend

For a complete deployment, the JavaScript API URLs must point to the deployed PHP backend.

## 8. Security checklist before production

- HTTPS
- CSRF protection
- Secure/HttpOnly session cookies
- Input validation
- Rate limiting
- Authorization checks
- Server-side auction closing
- Transaction-safe bidding
- Payment integration
- Seller/admin authorization
- Audit logs

## 9. Current status

The repository now contains the polished Bidly frontend **and** a clearly separated PHP/MySQL backend foundation. The original `script.js` remains as the browser demo; the new PHP endpoints demonstrate the production request flow.

Repository: https://github.com/aleakwe/e-com
