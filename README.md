# URL Shortener with Role-Based Access Control

A comprehensive URL shortening service built with Laravel and React (Inertia.js) featuring advanced role-based access control, company-based filtering, and user management.

## 🚀 Features

### User Management
- **SuperAdmin**: Full system access, can manage users and companies (cannot create URLs)
- **Admin**: Company-scoped access, can manage users and URLs within their company
- **Member**: Can create and manage their own URLs only

### URL Shortening
- Create custom or auto-generated short codes
- Click tracking and analytics
- URL expiration dates
- Active/inactive status management
- Company-based access control

### Security
- Role-based permissions using Spatie Laravel Permission
- Company-based data isolation
- Authenticated URL access only
- Comprehensive authorization checks

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **NPM** or **Yarn**
- **SQLite** (default) or **MySQL/PostgreSQL**

## 🛠️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd urlShortner
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Install JavaScript Dependencies

```bash
npm install
```

### 4. Environment Configuration

```bash
# Copy the environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Database Setup

The project is configured to use SQLite by default. The database file will be created automatically.

```bash
# Run migrations
php artisan migrate

# Seed the database with roles, permissions, and test data
php artisan db:seed
```

### 6. Start Development Servers

You need to run both the Laravel backend and Vite frontend servers:

**Terminal 1 - Laravel Server:**
```bash
php artisan serve
```

**Terminal 2 - Vite Development Server:**
```bash
npm run dev
```

The application will be available at: `http://127.0.0.1:8000`

## 👥 Test Accounts

After running the seeders, you'll have access to these test accounts:

### SuperAdmin
- **Email**: `superadmin@example.com`
- **Password**: `password`
- **Access**: Full system access, cannot create URLs

### Company: Tech Corp
- **Admin**: `admin@techcorp.com` / `password`
- **Member**: `member@techcorp.com` / `password`

### Company: Marketing Inc
- **Admin**: `admin@marketing.com` / `password`
- **Member**: `member@marketing.com` / `password`

## 🔐 Access Control Rules

### URL Management Access
- **SuperAdmin**: ❌ Cannot access URL management
- **Admin**: ✅ Can see/manage URLs from their company users
- **Member**: ✅ Can see/manage only their own URLs

### URL Redirect Access
- **SuperAdmin**: ✅ Can access all URLs
- **Admin**: ✅ Can access URLs from their company
- **Member**: ✅ Can access only their own URLs

## 🧪 Testing the System

### 1. Login as Different Users
Test the role-based access by logging in with different accounts and observing:
- Navigation menu differences
- Available features
- Data visibility

### 2. Test URL Creation
- Login as `member@techcorp.com`
- Create a short URL
- Note the generated short code

### 3. Test Access Control
- Login as `member@marketing.com`
- Try to access the URL created by Tech Corp member
- Should be denied access

### 4. Test Admin Scope
- Login as `admin@techcorp.com`
- Should see URLs from both Tech Corp users
- Should not see Marketing Inc URLs

## 📁 Project Structure

```
urlShortner/
├── app/
│   ├── Http/Controllers/
│   │   ├── Admin/           # Admin panel controllers
│   │   └── RedirectController.php
│   ├── Models/              # Eloquent models
│   └── Http/Middleware/     # Custom middleware
├── database/
│   ├── migrations/          # Database migrations
│   └── seeders/            # Database seeders
├── resources/
│   └── js/
│       ├── Pages/          # React components
│       └── Layouts/        # Layout components
└── routes/                 # Application routes
```

## 🔧 Key Components

### Models
- **User**: Enhanced with roles and company relationships
- **Company**: Manages company data and user associations
- **ShortUrl**: Handles URL shortening with access control

### Controllers
- **UserController**: User CRUD with role management
- **ShortUrlController**: URL management with company filtering
- **CompanyController**: Company management
- **RedirectController**: Handles URL redirects with authorization

### Middleware
- **CheckAdminAccess**: Validates admin panel access
- **Auth**: Ensures authenticated access to URLs

## 🚨 Troubleshooting

### Common Issues

<!-- **1. Database Connection Error**
```bash
# Ensure SQLite file exists
touch database/database.sqlite
php artisan migrate
```

**2. Permission Denied Errors**
```bash
# Clear cache and config
php artisan config:clear
php artisan cache:clear
```

**3. Vite Build Issues**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**4. Role/Permission Issues**
```bash
# Re-run seeders
php artisan migrate:fresh --seed
```

## 📝 Additional Commands

```bash
# Create a new user with specific role
php artisan tinker
>>> $user = User::create(['name' => 'Test', 'email' => 'test@test.com', 'password' => Hash::make('password')]);
>>> $user->assignRole('admin');

# Check user permissions
>>> $user->hasRole('admin');
>>> $user->can('create_users');

# View all short URLs
>>> ShortUrl::with('user')->get();
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open-sourced software licensed under the [MIT license](LICENSE). -->
