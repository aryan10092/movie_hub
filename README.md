# Movie Explorer 🎬

A responsive web application that allows users to search and browse movies and TV series using the OMDb API. Built with Next.js, TypeScript, and Tailwind CSS.

![Movie Explorer](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

### 🔍 Search & Display
- **Smart Search Bar**: Search for movies and TV series with real-time results
- **Grid Layout**: Responsive card-based display with movie posters, titles, type, and year
- **Pagination**: Navigate through results with 10 items per page
- **Loading States**: Smooth loading animations and skeleton screens

### 🎛️ Advanced Filters
- **Type Filter**: Filter by Movies or TV Series
- **Year Filter**: Filter by specific release year
- **Combined Filtering**: Use search and filters together for precise results
- **Active Filter Display**: Visual indicators for applied filters

### 🎭 Movie Details (Bonus Feature)
- **Detailed Modal**: Click any movie card to view comprehensive details
- **Rich Information**: Plot, cast, director, ratings, awards, and more
- **Multiple Ratings**: IMDb, Rotten Tomatoes, and Metacritic scores
- **Responsive Design**: Optimized for both desktop and mobile viewing

### 🎨 UI/UX Excellence
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Error Handling**: Graceful error messages and empty states
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed on your machine
- An OMDb API key (free registration required)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd movies_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your OMDb API Key**
   - Visit [OMDb API](http://www.omdbapi.com/apikey.aspx)
   - Sign up for a free account
   - Check your email for the API key

4. **Configure environment variables**
   ```bash
   # Copy the example environment file
   cp .env.local.example .env.local
   
   # Edit .env.local and add your API key
   NEXT_PUBLIC_OMDB_API_KEY=your_api_key_here
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API with useReducer
- **Icons**: Lucide React
- **API**: OMDb API for movie data
- **Image Optimization**: Next.js Image component

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with grid layouts
- **Tablet**: Adaptive grid with optimized spacing
- **Mobile**: Stack layout with touch-friendly interfaces

## 🎯 Key Features Implementation

### Search Functionality
- Debounced search input for optimal performance
- Real-time search with loading states
- Error handling for API failures
- Empty state messaging

### Filter System
- Type-based filtering (Movie/TV Series)
- Year-based filtering with validation
- Combined search and filter queries
- Filter state persistence during navigation

### Pagination
- Intelligent pagination with ellipsis for large result sets
- Smooth page transitions
- URL state management for direct linking
- Mobile-optimized pagination controls

### Movie Details
- Lazy-loaded detailed information
- Comprehensive movie metadata display
- Multiple rating sources integration
- Modal-based overlay with backdrop dismissal

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type checking
npm run type-check
```

## 📂 Project Structure

```
src/
├── app/                   # Next.js App Router
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── SearchBar.tsx     # Search input component
│   ├── FilterPanel.tsx   # Filter controls
│   ├── MovieCard.tsx     # Movie display card
│   ├── MovieGrid.tsx     # Grid layout container
│   ├── MovieModal.tsx    # Movie details modal
│   └── Pagination.tsx    # Pagination controls
├── contexts/             # React contexts
│   └── MovieContext.tsx  # Global state management
├── lib/                  # Utility functions
│   └── api.ts           # OMDb API integration
└── types/                # TypeScript definitions
    └── movie.ts         # Movie-related types
```

## 🌟 Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting with Next.js
- **State Management**: Efficient useReducer for complex state
- **API Optimization**: Proper error handling and loading states
- **CSS Optimization**: Tailwind CSS with purging for minimal bundle size

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OMDb API** for providing the movie database
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide React** for the beautiful icons

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
