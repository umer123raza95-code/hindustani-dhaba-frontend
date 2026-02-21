# Hindustani Dhaba - Modern Admin Dashboard

A beautifully designed, fast, and responsive admin dashboard for managing the Hindustani Dhaba restaurant's menu items. Built with **React 18**, **Vite**, and **Tailwind CSS** for optimal performance and user experience.

## 🎨 Features

- **Modern UI Design**: Clean, intuitive interface built with Tailwind CSS
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Fast Performance**: Optimized with Vite for instant load times
- **Menu Management**: 
  - Add, edit, and delete menu items
  - Categorize dishes
  - Set spice levels
  - Mark vegetarian items
  - Toggle item availability
  - Upload dish images
- **Authentication**: Secure admin login with JWT tokens
- **Advanced Search & Filtering**: Find dishes by name, description, or category
- **Real-time Updates**: Changes reflect immediately across the dashboard
- **Error Handling**: User-friendly error messages and validation
- **Smooth Animations**: Fade-in and slide-up animations for better UX

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Backend server running on `http://localhost:5000`
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Navigate to the frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Create .env.local file
VITE_API_URL=http://localhost:5000/api
```

4. **Start the development server:**
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

The optimized build will be created in the `dist` folder.

## 📁 Project Structure

```
frontend/
├── public/                  # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation bar
│   │   ├── Modal.jsx       # Modal dialog
│   │   ├── Toast.jsx       # Toast notifications
│   │   ├── LoadingSpinner.jsx
│   │   ├── MenuItemCard.jsx # Menu item display card
│   │   └── MenuItemForm.jsx # Add/Edit form
│   ├── pages/              # Page components
│   │   ├── LoginPage.jsx   # Admin login
│   │   └── Dashboard.jsx   # Main dashboard
│   ├── services/           # API service calls
│   │   ├── authService.js  # Authentication API
│   │   └── menuService.js  # Menu management API
│   ├── utils/              # Utility functions
│   │   ├── api.js          # Axios instance with interceptors
│   │   └── auth.js         # Authentication helpers
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS plugins
└── .gitignore              # Git ignore rules
```

## 🔐 Authentication

- Login with admin credentials
- JWT tokens stored in localStorage
- Automatic token refresh on API calls
- Protected routes - redirects to login if unauthorized

**Demo Credentials:**
- Email: `admin@hindustanidhaba.com`
- Password: `password123`

## 🎯 API Integration

The frontend connects to the following backend endpoints:

### Authentication
- `POST /api/auth/login` - Admin login

### Menu Management
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create new menu item (protected)
- `GET /api/menu/:id` - Get single menu item
- `PUT /api/menu/:id` - Update menu item (protected)
- `DELETE /api/menu/:id` - Delete menu item (protected)

All requests include Authorization header with JWT token.

## 🎨 Design System

### Colors
- **Primary**: `#D4A574` (Warm gold/tan) - Main actions
- **Secondary**: `#8B4513` (Saddle brown) - Secondary elements
- **Accent**: `#FF6B6B` (Red) - Delete/danger actions
- **Dark**: `#1a1a1a` - Text
- **Light**: `#f5f5f5` - Backgrounds

### Typography
- Font Family: Inter (Google Fonts)
- Responsive font sizes for all screen sizes
- Clear visual hierarchy

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (Single column layout)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns grid)

## ⚡ Performance Optimizations

- **Vite**: Lightning-fast cold start and HMR
- **Tree-shaking**: Only used code is bundled
- **Code Splitting**: Dynamic imports for routes
- **Lazy Loading**: Images load on-demand
- **CSS Optimization**: Tailwind CSS purges unused styles
- **Minification**: Automatic in production builds

## 🚫 Error Handling

- Network error fallbacks
- Form validation with user-friendly messages
- API error responses displayed in toasts
- Automatic logout on 401 errors
- Try-catch blocks in async operations

## 🔄 State Management

- React hooks (useState, useEffect)
- Local storage for authentication
- Props drilling for data passing
- Toast notifications for user feedback

## 🎯 Key Features Explained

### Menu Item Card
Displays each dish with:
- Image preview (with fallback icon)
- Name and description
- Category badge
- Price in rupees
- Spice level indicator
- Vegetarian status
- Availability status
- Edit and Delete actions

### Add/Edit Form
Form features:
- Input validation
- Category selection
- Spice level dropdown
- Image URL input
- Vegetarian and availability toggles
- Error message display
- Success/failure feedback

### Search & Filter
Advanced filtering:
- Real-time search by name/description
- Category-based filtering
- Item count display
- Empty state handling

### Responsive Navigation
- Desktop menu with user info
- Mobile hamburger menu
- Quick logout button
- Admin information display

## 👨‍💻 Development

### Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm preview

# Install new dependencies
npm install <package-name>
```

### Browser DevTools
- React Developer Tools extension recommended
- Network tab for API debugging
- Console for error messages

## 🛠️ Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#YourColor',
      secondary: '#YourColor',
      accent: '#YourColor',
    },
  },
}
```

### Add New Features
1. Create component in `src/components/`
2. Create service in `src/services/` if needed
3. Import and use in pages
4. Follow existing code patterns

## 📚 Dependencies

- **react** (18.2.0) - UI library
- **react-dom** (18.2.0) - React rendering
- **react-router-dom** (6.20.0) - Client-side routing
- **axios** (1.6.0) - HTTP client
- **lucide-react** (0.294.0) - Icon library
- **tailwindcss** (3.3.0) - CSS framework
- **vite** (5.0.0) - Build tool

## 🔗 Backend Integration

Ensure your backend is running:
```bash
cd ../backend
npm install
npm run dev
```

Backend should be accessible at `http://localhost:5000`

## 📖 Documentation

For backend documentation, see `../SETUP_GUIDE.md` and `../RUN_GUIDE.md`

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
# Use different port
npm run dev -- --port 3001
```

### API connection errors
- Check backend is running on port 5000
- Verify CORS is enabled on backend
- Check .env.local for correct API URL

### Module not found errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Hot Module Replacement (HMR) not working
- Ensure firewall allows localhost connections
- Try restarting the dev server
- Clear browser cache (Ctrl/Cmd + Shift + Delete)

## 📝 License

ISC License - See LICENSE file for details

## 🤝 Support

For issues or questions, contact the development team.

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
