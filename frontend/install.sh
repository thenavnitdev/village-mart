#!/bin/bash

# NamkeenMart Frontend Installation Script
echo "🚀 Setting up NamkeenMart Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or higher) first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cat > .env << EOF
# NamkeenMart Environment Variables
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key_here
REACT_APP_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
REACT_APP_SITE_URL=http://localhost:3000
EOF
    echo "✅ Environment file created"
else
    echo "✅ Environment file already exists"
fi

# Create build directory
echo "🏗️  Creating build directory..."
mkdir -p build

# Run build to check for errors
echo "🔨 Running build check..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "🎉 NamkeenMart Frontend setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the development server: npm start"
echo "2. Open http://localhost:3000 in your browser"
echo "3. Update .env file with your actual API keys"
echo ""
echo "🔧 Available commands:"
echo "  npm start     - Start development server"
echo "  npm build     - Build for production"
echo "  npm test      - Run tests"
echo "  npm run lint  - Run ESLint"
echo ""
echo "📚 Documentation:"
echo "  - README.md for detailed information"
echo "  - Check src/ folder for component structure"
echo ""
echo "🌟 Happy coding with NamkeenMart!"
