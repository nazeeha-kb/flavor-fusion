# 🍽️ Flavor Fusion

<img src="bowl.gif" alt="Description" width="180"/>

Flavor Fusion is an **AI-powered** recipe generator web app that creates recipes based on ingredients or dish names entered by the user. It supports saving, deleting, and tracking recipes for each user.

> This is an ongoing project. More features and refinements are being added regularly.


## ✨ Features

1. AI-generated recipes using OpenAI
2. Search by ingredients or recipe name
3. Save your favorite recipes
4. Remove recipes from favorites
5. Image support via Pixabay API
6. Google login via NextAuth
7. Fast performance and modern UI

## 🚀 Live Demo

Check out the live version here: [Flavor Fusion Web-App](https://flavor-fusion-ai.vercel.app)

## 🛠️ Tech Stack
<div>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" alt="nextjs" width="45" height="45" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="45" height="45"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" width="45" height="45" />
</div>
  <br>
  
- NextAuth - for authentication
- Openrouter.ai API
- Pixabay API
- Vercel - Deployement


## 🔐 Authentication
Users must Sign in with their Google account to generate and manage recipes. Each user's data (saved recipes, etc.) is securely stored and accessed only by them.

## 📦 Dependencies
### Core Dependencies:
- next
- react & react-dom
- next-auth – Authentication via Google Sign-In
- mongoose & mongodb – MongoDB object modeling and database access
- uuid

### UI & Visualization:
- framer-motion – Animations and transitions
- recharts – Charting library for future visual data

## 🏗️ Build & Deploy

This app is deployed via Railway.

To deploy or build your own:
1. Clone the repo
2. Set environment variables (.env file) for:
- OpenRouter or OpenAI API key
- Pixabay API key
- MongoDB URI
- NextAuth credentials (Google Client ID/Secret)
3. Install dependencies
```bash
npm install
```
4. Run locally
```bash
npm run dev
```
5.Deploy
- Check your code for build errors
```bash
npm run build
```
- Push to GitHub and link your Railway project
- Set the environment variables in Railway dashboard
- Railway handles build and deployment automatically

## 📸 Screenshot
![Home Page image](image.png)

## 🤝 Contributing
Feel free to fork the repo and submit PRs or issues. Contributions are welcome!

## 📄 License
MIT License
