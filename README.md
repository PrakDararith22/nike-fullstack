Porsche Clone - Frontend Project
A vanilla JavaScript, HTML, and CSS clone of the Porsche online store, built to replicate the layout, user experience, and core functionality of a modern e-commerce website without relying on frameworks.
🎯 Project Overview
This project emphasizes both development skills and Information Architecture (IA), focusing on how project structure, files, components, and logic are organized for clarity, scalability, and team collaboration. The project follows professional team management practices for real-world applications.
🚀 Getting Started
Prerequisites
Before setting up the project, ensure you have the following installed:

Git: Check installation with git --version. If not installed, download from git-scm.com
Gitflow extension: Required for branch management
Node.js and npm: Download the latest LTS version from nodejs.org

Installation

Clone the Repository
bashgit clone <project-remote-repo-url>
cd <project-directory>

Run Setup Script
bashsh setup.sh
The setup script will:

Install dependencies using npm install
Check for required tools (git, git-flow, node)
Configure Git username and email
Initialize Git Flow (optional)
Apply useful Git configuration settings

Start Development Server
bashnpm run dev
This launches the project at http://localhost:3000 with hot module replacement (HMR) for real-time updates.

📁 Project Structure
Root Directories
├── public/ # Static files (favicons, robots.txt, etc.)
├── src/ # Source code
│ ├── assets/ # Images, icons, fonts
│ ├── components/ # Reusable Web Components
│ ├── data/ # JSON files and mock data
│ ├── layout/ # Layout components (header, footer)
│ ├── pages/ # Page-level components
│ ├── style/ # Global CSS files
│ └── utils/ # Helper functions
└── .gitlab/ # GitLab configuration
├── merge_request_templates/
└── comment_templates/
Folder Details

public/: Static files copied directly to build output
src/assets/: Static files imported in components/styles
src/components/: Small, reusable UI components
src/data/: JSON files and mock data
src/layout/: Main layout structure components
src/pages/: Page-level components for different views
src/style/: Global CSS, variables, themes
src/utils/: Helper functions and utilities

📋 Code Conventions
Naming Conventions
TypeConventionExampleVariablescamelCaseuserName, totalAmountConstantsUPPER_SNAKE_CASEMAX_RETRY_COUNT, API_BASE_URLFunctionscamelCase (verb-based)getUser(), fetchData()ClassesPascalCaseUserProfile, ProductListFileskebab-caselogin-form.js, user-profile.cssBooleanscamelCase with prefixesisLoggedIn, hasPermission, canEdit
Function Prefixes
PrefixUsageExamplegetFetch or retrieve datagetUser(), getValue()setAssign or update valuesetUser(), setTheme()updateModify existing dataupdateProfile()deleteRemove or clear datadeleteUser(), deleteItem()fetchFetch data from APIfetchUsers()handleHandle events/logichandleLogin(), handleError()onEvent handlersonClick(), onHover()isBoolean state checkisLoading(), isValid()hasBoolean ownership checkhasPermission(), hasToken()canBoolean capabilitycanEdit(), canSubmit()
Comments

Explain what and why, not obvious code
Use TODO: for incomplete tasks
Use FIXME: for known bugs
Keep comments up-to-date with code changes
Document functions, classes, and modules

🔧 Code Quality Tools
Prettier Configuration
json{
"semi": true,
"singleQuote": false,
"printWidth": 100,
"tabWidth": 2,
"useTabs": false,
"trailingComma": "es5",
"bracketSpacing": true,
"arrowParens": "avoid",
"endOfLine": "auto"
}
ESLint Configuration
The project uses ESLint with Airbnb base configuration and Lit framework support:
json{
"plugins": ["lit"],
"extends": ["airbnb-base"],
"env": {
"browser": true,
"es2021": true,
"node": true
},
"overrides": [
{
"files": ["src/components/**/*.js"],
"extends": ["plugin:lit/recommended"],
"rules": {
"lit/no-invalid-html": "error",
"lit/attribute-value-entities": "error",
"lit/no-duplicate-template-bindings": "error",
"lit/no-property-change-update": "error"
}
}
],
"rules": {
"import/no-extraneous-dependencies": ["error", {
"devDependencies": ["vite.config.js"]
}],
"no-console": "warn",
"no-undef": "error",
"quotes": ["error", "double"],
"semi": ["error", "always"],
"no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
"object-curly-spacing": ["error", "always"],
"arrow-body-style": ["error", "as-needed"],
"import/prefer-default-export": "off",
"import/extensions": "off",
"camelcase": ["error", { "properties": "always" }],
"id-match": ["error", "^[a-z][a-zA-Z0-9]_$|^[A-Z][a-zA-Z0-9]_$", {
"onlyDeclarations": true
}]
}
}
Key Rules:

Airbnb Base: Extends Airbnb's JavaScript style guide
Lit Framework: Special rules for Lit components in src/components/
Import Rules: Allows dev dependencies in vite.config.js
Naming: Enforces camelCase/PascalCase naming conventions
Code Quality: Warns on console usage, enforces semicolons and double quotes

🌿 Git Workflow
Branch Naming Convention
bash# Feature branches
git flow feature start <short-description>

# Example

git flow feature start "login-page"
Commit Message Format
<type>(<scope>): <subject>

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Code formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance tasks
  Development Workflow

Git Flow Commands
bash# Start feature
git flow feature start homepage

# Publish feature

git flow feature publish homepage

# Finish feature

git flow feature finish homepage

# Start release

git flow release start v1.0.0

# Start hotfix

git flow hotfix start v1.1.0

📚 Additional Resources

Git Flow Documentation : https://docs.google.com/document/d/1RKvA8cC2OWyCVmTVndzy7xoDjlUOyXCQm6uFsKVA5i8/edit?usp=sharing
Prettier Configuration
ESLint Rules

Note: This project uses Vite for development server. Do not manually open index.html in the browser - use npm run dev instead.
database constraint name
<tablename>_<columnname>_<constrainttype>
