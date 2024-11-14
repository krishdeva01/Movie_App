# 🎬 Movie Booking Application
# User Credentials

# Normal User Login
Username: user1
Email: user1@gmail.com
Password: Password@01

# Admin Login (For Django Admin Panel)
Username: admin
Email: admin@gmail.com
Password: Password@01

# Features Implemented
User Authentication: Secure registration, login, and logout functionality with form validation for a smooth user experience.
Protected Routes: Users cannot access any pages (besides the homepage) without logging in.
Searching & Filtering: Dynamic search functionality with debouncing to reduce unnecessary API calls.
Pagination: Efficient pagination for browsing through large sets of movies.
State Management with Redux Toolkit: Centralized state management for seamless global access.
Routing: Navigation a
cross pages implemented using react-router-dom.

# Movie Pages:
Movie List Page: Displays all available movies.
Movie Detail Page: Shows detailed information about a selected movie.
Booking History Page: Users can view a complete history of their bookings.
Upcoming Movies Page: Users can view new upcoming movies

📂 Tech Stack
Frontend: React, JavaScript, TypeScript, TailwindCSS
Backend: Python, Django, Django REST Framework (DRF)
📈 Planned Future Enhancements
Frontend:

Suspense Fallback: Enhance loading experience for async components.
Lazy Loading: Optimize load times for faster page rendering.
Backend:

Caching: Improve response times and reduce server load.
Compression and Decompression: Optimize data transfer for faster API calls.