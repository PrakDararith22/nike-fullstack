#!/bin/bash

# Exit if any command fails
set -e

echo "🔧 Setting up Git configuration for this project..."

npm install 
echo "✅  npm install successfully"

git_ok=false
gitflow_ok=false
node_ok=false
review_board_ok=false

# Checking for Git
echo ""
echo "🔍 Checking for Git..."
if command -v git &> /dev/null; then
  git_ok=true
  echo "✅  Git is installed: $(git --version)"
else
  echo "❌  Git is not installed."
  echo "👉  Install it from: https://git-scm.com/"
fi

# Checking for Git Flow
echo ""
echo "🔍 Checking for Git Flow..."
if command -v git-flow &> /dev/null; then
  gitflow_ok=true
  echo "✅  Git Flow is installed: $(git-flow version)"
else
  echo "❌  Git Flow is not installed."
  echo "👉  Install it from: https://github.com/nvie/gitflow/wiki/Installation"
fi

# Checking for Node.js
echo ""
echo "🔍 Checking for Node.js..."
if command -v node &> /dev/null; then
  node_ok=true
  echo "✅  Node.js is installed: $(node -v)"
else
  echo "❌  Node.js is not installed."
  echo "👉  Install it from: https://nodejs.org/"
fi

# Checking for Review Board CLI
echo ""
echo "🔍 Checking for rbt..."
if command -v rbt &> /dev/null; then
  review_board_ok=true
  echo "✅ Review Board CLI (rbt) is installed: $(rbt --version)"
else
  echo "❌ Review Board CLI (rbt) is not installed. Install with: pipx install RBTools"
  exit 1
fi

# If all conditions are met
if [ "$git_ok" = true ] && [ "$gitflow_ok" = true ] && [ "$node_ok" = true ] && [ "$review_board_ok" = true ]; then
  echo ""
  echo "🎯  All preconditions met. Proceeding with Git setup..."

 current_git_username=$(git config user.name | xargs || echo "")
current_git_email=$(git config user.email | xargs || echo "")


  if [ -n "$current_git_username" ] && [ -n "$current_git_email" ]; then
    echo "🔎 Existing Git config found:"
    echo "   👤 Name: $current_git_username"
    echo "   📧 Email: $current_git_email"

    read -p "❓ would you like to change your User_name👤 and 📧Email? (y to change / n to keep): " use_existing

    if [[ "$use_existing" == "n" || "$use_existing" == "N" ]]; then
      git_username="$current_git_username"
      git_email="$current_git_email"
    else
      read -p "👤  Enter your new Git user name: " git_username
      read -p "📧  Enter your new Git email: " git_email
    fi
  else
    echo "ℹ️  No existing Git user config found. Please enter new details."
    read -p "👤  Enter your Git user name: " git_username
    read -p "📧  Enter your Git email: " git_email
  fi

  # Set Git config
  git config user.name "$git_username"
  git config user.email "$git_email"

  echo ""
  read -p "🚀 Do you want to initialize Git Flow in this repository? (y/n): " run_gitflow_init

  if [[ "$run_gitflow_init" == "y" || "$run_gitflow_init" == "Y" ]]; then
    echo "⚙️  Running git flow init..."
    git flow init -d
  else
    echo "ℹ️ Skipping git flow initialization."
  fi

  git config pull.rebase true
  git config rebase.autoStash true
  git config init.defaultBranch main

  echo ""
  echo "✅  Git setup completed for $git_username <$git_email>"
else
  echo ""
  echo "⚠️  Skipping Git setup because one or more requirements were not met."
  exit 1
fi
