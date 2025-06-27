# Spy Cat Agency Frontend

A Next.js dashboard for managing spy cats, missions, and targets for the Spy Cat Agency.

## Features

- **Spy Cat Management**: View, add, edit, and delete spy cats
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Form Validation**: Client-side validation with error handling
- **API Integration**: Seamless communication with the backend API
- **Breed Validation**: Real-time cat breed validation using TheCatAPI
- **Error Handling**: Graceful error handling with user-friendly messages

## Requirements

- Node.js 18.17 or later
- npm or yarn
- Backend API running on http://localhost:8000

## Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Setup environment (optional)**
   The app is configured to work with the backend running on `http://localhost:8000` by default.

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Production Build

1. **Build the application**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start the production server**
   ```bash
   npm start
   # or
   yarn start
   ```

## Features Overview

### Spy Cat Management
- **View All Cats**: See a list of all spy cats with their details
- **Add New Cat**: Form to add new spy cats with breed validation
- **Edit Cat**: Update spy cat salary (as per requirements)
- **Delete Cat**: Remove spy cats from the system
- **Real-time Validation**: Breed validation using TheCatAPI

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Visual feedback during API operations
- **Error Handling**: Clear error messages for failed operations
- **Modern Design**: Clean, professional interface with Tailwind CSS

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **HTTP Client**: Axios
- **State Management**: React useState hooks
- **Icons**: Heroicons

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # React components
│   │   ├── SpyCatForm.tsx      # Form for adding/editing cats
│   │   └── SpyCatList.tsx      # List display component
│   ├── lib/                    # Utility functions
│   │   └── api.ts              # API client functions
│   └── types/                  # TypeScript definitions
│       └── index.ts            # Interface definitions
├── public/                     # Static assets
├── package.json               # Project dependencies
├── tailwind.config.js         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── next.config.js             # Next.js configuration
```

## API Integration

The frontend communicates with the backend API at `http://localhost:8000/api/v1`. Key API endpoints used:

- `GET /spy-cats/` - Fetch all spy cats
- `POST /spy-cats/` - Create new spy cat
- `PUT /spy-cats/{id}` - Update spy cat salary
- `DELETE /spy-cats/{id}` - Delete spy cat

## Validation

- **Client-side validation** for form fields
- **Real-time breed validation** using TheCatAPI
- **Error handling** for API responses
- **User feedback** for all operations

## Development

The application uses:
- **Next.js** for the React framework
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Axios** for HTTP requests

## Browser Support

The application supports all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

1. **Cannot connect to backend**
   - Ensure the backend is running on http://localhost:8000
   - Check that CORS is properly configured in the backend

2. **Breed validation fails**
   - TheCatAPI might be temporarily unavailable
   - The app will fall back to a predefined list of breeds

3. **Styling issues**
   - Ensure Tailwind CSS is properly installed
   - Check that PostCSS is configured correctly

### Development Mode Issues

If you encounter issues in development mode:

1. Clear the Next.js cache:
   ```bash
   rm -rf .next
   npm run dev
   ```

2. Reinstall dependencies:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ``` 