#!/bin/bash

# Build the application
npm run build

# Preview the build
echo "Starting preview server..."
npm run preview

# Wait for user to confirm
read -p "Press [Enter] key after verifying the preview..."

# Deploy to GitHub Pages
git add .
git commit -m "deploy: update production build"
git push origin main

# Clean up
echo "Build and deploy completed successfully!"
