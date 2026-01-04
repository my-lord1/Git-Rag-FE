# GitHub RAG – Frontend

This project lets users paste a GitHub repository link and ask questions about the code. It fetches the repo files, finds the most relevant parts, and uses AI to answer questions based on the actual code. This helps developers understand repositories faster without reading every file.

This repo is for frontend of this project  
[For backend purposes click here](https://github.com/my-lord1/Git-Rag-BE)

---

## Tech Stack

- React 
- Tailwind CSS - CSS framework for styling
- Framer Motion - Animation library
- ReactMarkdown - Markdown rendering library
- LucideReact - Icon library
- Background - prism(reactbits)

## Project Structure

- App component manages all state including Landing view, Loadin view and Chat view.
- Landing view where users paste and validate GitHub repository URLs
- Loading view that displays progress animation while repository is being processed
- Chat view with message history and input field for asking questions
- MessageContent component that renders markdown formatted responses
- Button and Input are reusable styled components for user interactions

## How It Works

- User enters a GitHub repository URL on the landing page
- Frontend validates the URL format before allowing submission
- Clicking Connect sends the URL to backend `/api/ingest` endpoint to download and process files
- Loading screen displays while backend indexes the repository
- Chat interface appears once indexing is complete
- User types questions which are sent to `/api/chat` endpoint
- Backend returns AI answer with relevant source files 