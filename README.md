# roberto : AI Chat Desktop App

A side project built to explore Large Language Models (LLMs), Electron development, and glassmorphism design. This desktop application provides a modern chat interface for interacting with local LLMs using `node-llama-cpp`.

## 🚀 Features

- **Local LLM Integration**: Uses `node-llama-cpp` to run Gemma 2 2B model locally
- **Modern UI**: Built with React 19, TypeScript, and Emotion for styling
- **Desktop App**: Cross-platform Electron application with native window controls
- **Real-time Chat**: Interactive chat interface with message history
- **Internationalization**: Support for multiple languages (English/French)
- **Code Highlighting**: Syntax highlighting for code blocks in responses
- **Markdown Support**: Rich text rendering with GitHub Flavored Markdown

## 🛠️ Tech Stack

### Frontend

- React 19
- TypeScript
- TanStack Router
- Emotion
- i18next
- React Markdown

### Backend/Desktop

- Electron
- node-llama-cpp
- Zustand

### Development

- Vite
- ESLint
- Husky
- lint-staged

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd node-llama-cpp-project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start
   ```

## 🎯 Usage

### Development Mode

```bash
npm start
```

This starts both the Vite dev server and Electron app in development mode.

### Building for Production

```bash
npm run build
```

Creates a distributable package for your platform.

### Code Quality

```bash
npm run lint          # Run ESLint
npm run format        # Fix linting issues
npm run clean         # Clean build artifacts
```

## 🏗️ Project Structure

```
├── electron/                 # Electron main process
│   ├── ipc/                 # IPC handlers
│   ├── store/               # Data persistence
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
├── src/                     # React renderer process
│   ├── components/          # React components
│   │   ├── layout/          # Layout components
│   │   ├── pages/           # Page components
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── localization/        # i18n configuration
│   ├── routes/              # TanStack Router routes
│   ├── stores/              # Zustand stores
│   └── theme/               # Design system
├── models/                  # LLM model files
└── public/                  # Static assets
```

## 🔮 Future Improvements

### Data Persistence

- **Local Database** : Add a database to automatically save conversations when the application closes
- **Backup/Export** : Export and import conversation functionalities

### Conversation Information

- **Enhanced Sidebar** : Add detailed information about each conversation in the sidebar
- **Automatic Summaries** : Automatic generation of conversation summaries
- **Context Modification** : Interface to modify and adjust conversation context
- **Metadata** : Display conversation statistics (message count, duration, etc.)

### Document Usage

- **Multi-format Support** : Ability to transmit documents (images, videos, text) to the model
- **Drag & Drop Interface** : Intuitive interface to add documents to a conversation
- **Content Analysis** : The model will be able to analyze and use document content as context
- **Preview** : Display documents in the chat interface
