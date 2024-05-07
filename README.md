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
contexts/
└── authContext.js
helpers/
└── helpers.js
styles/
└── styles.js
test/
├── views/landingView.test.js
└── helpers.test.js
views/
├── classroomView.js
├── classroomsView.js
├── createAccountView.js
├── createClassroomView.js
├── createStudyGuideView.js
├── homeView.js
├── landingView.js
├── loginView.js
├── manageAccountView.js
├── studyGuideView.js
└── studyGuidesView.js
App.js
babel.config.js
package.json
README.md
LICENSE

```

*  assets/: Contains static assets like images, fonts, etc.
*  contexts/: Contains contexts for handling certain tasks
*  helpers/: Contains helpers for communicating with the backend
*  styles/: Contains styles for page elements
*  test/: Contains tests handled by Jest
*  views/: Contains the main page components
*  App.js: Entry point of the application
*  babel.config.js: Handles the Expo configuration for development
*  package.json: Contains the dependencies for the project
*  app.json: App asset configuration

## Dependencies

* React
* React Native
* Expo
* React Navigation
* Jest

## Getting Started

Either visit (https://main.d2lw0tnmuet566.amplifyapp.com/) or follow the instructions below to create a locally-hosted frontend server.

Clone the repository:

`git clone https://github.com/alephnull7/study-guide-generator.git`

Install dependencies:

`npm install @react-navigation/native-stack @react-navigation/native expo`
`npx expo install react-native-screens react-native-safe-area-context`
`npm install @testing-library/react-native`

Start the development server:

`expo start`

## Operation

Click either of the two buttons to log in or create an account. Once you do either, you will be automatically logged in. From there, you can create or view study guides and manage your account. Instructors also have the capability to create classrooms. For the forms in the screens, Email typically means an email address you have and password can be anything. Name fields will automatically be filled (with the option to change them if you wish), and dropdown boxes will have valid options displayed. Everything in the forms gets put into a JSON file that gets sent to the backend, which also returns a JSON file.  

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

Please follow our code of conduct when contributing.

## License

Mozilla Public License 2.0
