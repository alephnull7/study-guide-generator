# Study Guide Generator Frontend README

Welcome to the frontend codebase of the Study Guide Generator!

## Introduction

This README provides an overview of the frontend structure, dependencies, and how to get started with development.

## Table of Contents

* Project Structure
* Dependencies
* Getting Started
* Contributing
* License

## Project Structure

```
assets/
├── adaptive-icon.png
├── favicon.png
├── icon.png
└── splash.png
helpers/
└── helpers.js
views/
├── createAccountView.js
├── createClassroomView.js
├── instructorHomeView.js
├── landingView.js
├── loginView.js
├── manageAccountView.js
├── manageStudentsView.js
├── quizzesView.js
├── studentHomeView.js
├── studyGuidesView.js
├── styles.js
├── viewClassroomsView.js
└── viewStudyGuidesView.js
App.js
babel.config.js
package.json
README.md
LICENSE

```

*  assets/: Contains static assets like images, fonts, etc.
*  helpers/: Contains helpers for communicating with the backend
*  views/: Contains the main page components.
*  App.js: Entry point of the application.
*  babel.config.js: Handles the Expo configuration for development
*  package.json: Contains the dependencies for the project
*  app.json: App asset configuration

## Dependencies

* React
* React Native
* Expo
* React Navigation

## Getting Started

Clone the repository:

`git clone https://github.com/alephnull7/study-guide-generator.git`

Install dependencies:

`npm install @react-navigation/native-stack @react-navigation/native expo`
`npx expo install react-native-screens react-native-safe-area-context`

Start the development server:

`expo start`

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

Please follow our code of conduct when contributing.

## License

[Your License Name] - [License Description]

This is a basic example, and you may customize it further based on your project's specific requirements, including additional sections like deployment instructions, testing guidelines, and more.
