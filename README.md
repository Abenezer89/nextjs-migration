# Next.js Migration Project - Job Board Application

This project demonstrates the migration of a job board application from Vite to Next.js 14, highlighting common challenges and their solutions.

## 🚀 Migration Challenges & Solutions

### 1. Tailwind CSS Integration
During the migration from Vite to Next.js, we encountered several styling-related challenges:

- **Issue**: PostCSS configuration conflicts between Vite and Next.js setups
- **Solution**: Simplified PostCSS config and installed specific compatible versions:
  ```js
  // postcss.config.js
  module.exports = {
    plugins: {
      'postcss-import': {},
      'tailwindcss': {},
      'autoprefixer': {},
    }
  }
  ```

### 2. CSS File Organization
- **Issue**: Duplicate CSS files (`globals.css` and `index.css`) causing style conflicts
- **Solution**: Consolidated styles into `src/app/globals.css` following Next.js App Router conventions

### 3. Package Dependencies
Working versions for this setup:
```json
{
  "dependencies": {
    "tailwindcss": "3.3.0",
    "postcss": "8.4.31",
    "autoprefixer": "10.4.14",
    "postcss-import": "15.1.0"
  }
}
```

## 🛠️ Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- React Query

## 📦 Project Structure

```
src/
├── app/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   └── JobCard.tsx
└── types/
    └── index.ts
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Features

- Modern job board interface
- Dark/Light mode support
- Responsive design
- Job search and filtering
- Custom UI components

## 🔧 Common Issues & Fixes

1. **Dark Mode Not Working**
   - Ensure ThemeProvider is properly configured in layout.tsx
   - Check CSS variable definitions in globals.css

2. **Styling Issues**
   - Clear `.next` cache folder
   - Verify PostCSS configuration
   - Check Tailwind configuration paths

## 📝 Notes

- This project uses the App Router feature of Next.js 14
- Custom CSS classes are defined in globals.css
- Component styling uses a combination of Tailwind utilities and custom classes

## 🤝 Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
