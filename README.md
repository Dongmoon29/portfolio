# Dongmoon Kim's Portfolio

VS Code 스타일의 인터랙티브 포트폴리오 웹사이트입니다.

## 🚀 Features

- **VS Code Interface**: 실제 VS Code와 유사한 UI/UX
- **File Explorer**: 사이드바에서 파일/폴더 탐색
- **Tab Management**: 여러 파일을 탭으로 열고 관리
- **Theme Switching**: 다크/라이트 모드 지원
- **Keyboard Shortcuts**: Alt+W로 탭 닫기 등
- **Responsive Design**: 모바일/데스크톱 지원
- **Error Handling**: 견고한 에러 처리 및 사용자 피드백

## 🛠 Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS, DaisyUI
- **State Management**: React Context + useReducer
- **Code Editor**: @uiw/react-textarea-code-editor
- **Markdown**: react-markdown, remark-gfm
- **Icons**: react-icons
- **Hotkeys**: react-hotkeys-hook

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── globals.css        # Global Styles
│   ├── layout.tsx         # Root Layout
│   └── page.tsx           # Main Page
├── components/            # React Components
│   ├── about/vscode/      # VS Code Components
│   ├── fileIcons/         # File Type Icons
│   ├── os/               # OS-specific UI
│   └── tooltip.tsx       # Tooltip Component
├── context/              # React Context
│   ├── OsContext.tsx     # OS State Management
│   ├── ThemeContext.tsx  # Theme State Management
│   ├── ThemeWrapper.tsx  # Theme Wrapper
│   └── VscodeContext.tsx # VS Code State Management
├── hooks/                # Custom Hooks
│   └── useTyping.tsx     # Typing Effect Hook
├── reducers/             # State Reducers
│   └── vscodeReducer.ts  # VS Code State Reducer
├── types/                # TypeScript Types
│   └── vscodeTypes.ts    # VS Code Type Definitions
└── utils/                # Utility Functions
    ├── constants.ts       # Application Constants
    ├── errorHandler.ts    # Error Handling Utilities
    └── fileUtils.ts       # File Utility Functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/Dongmoon29/portfolio.git
cd portfolio
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New Files

1. Add your files to the `db/` directory
2. Files will automatically appear in the VS Code interface
3. Supported file types: `.md`, `.json`, `.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.html`, `.txt`, `.pdf`, `.png`, `.jpg`, `.jpeg`, `.gif`

### Modifying Content

- Update `db/DONGMOON_KIM.md` for main portfolio content
- Modify files in `db/about/` for detailed information
- Add projects to `db/side_projects/`

## 🔧 Technical Improvements

### Recent Enhancements

- **Type Safety**: Enhanced TypeScript types and removed `any` usage
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Performance**: Optimized re-renders and memory management
- **Security**: Added path traversal protection in media API
- **Constants**: Centralized application constants
- **Utilities**: Added file utilities and error handling utilities

### Code Quality

- Removed `@ts-ignore` comments
- Improved type definitions
- Added proper error boundaries
- Enhanced loading states
- Better memory management with cleanup

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

**Dongmoon Kim**

- Email: dongmoonkim8@gmail.com
- GitHub: [@Dongmoon29](https://github.com/Dongmoon29)
- LinkedIn: [Dongmoon Kim](https://www.linkedin.com/in/dongmoon-kim-144674198/)
