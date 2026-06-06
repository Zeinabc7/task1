# React Native Users Matches App

A simple mobile application built with React Native, Expo, and TypeScript.

The app fetches users from DummyJSON, displays them in a performant list, shows full user details, and suggests top matches for each selected user.

## Objective

The goal of this project is to implement a simple React Native application that displays a list of users and shows suggested matches for a selected user.

## Tech Stack

- React Native
- Expo
- TypeScript
- Zustand
- React Navigation
- Jest
- jest-expo
- React Native Testing Library
- Docker
- Nginx

## Features

- Fetch users from `https://dummyjson.com/users`
- Display a list of users
- Show each user's:
  - First name
  - Last name
  - City
  - Age
  - Profile image
- Navigate from the users list screen to the user details screen
- Display full user information on the details screen
- Find and display top 3 suggested matches
- Loading state handling
- Error state handling with retry option
- Pull to refresh on the users list
- RTL-aware layout support
- FlatList performance optimizations
- Simple fade animation when displaying matches
- Image fallback handling
- Unit and component tests
- Dockerized web production build

## How to Run

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Run on web:

```bash
npm run web
```

Or press `w` in the Expo terminal.

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Type check the project:

```bash
npm run typecheck
```

## Available Scripts

```bash
npm run start
```

Starts the Expo development server.

```bash
npm run android
```

Runs the app on Android.

```bash
npm run ios
```

Runs the app on iOS.

```bash
npm run web
```

Runs the app on web.

```bash
npm run typecheck
```

Runs TypeScript type checking.

```bash
npm run build:web
```

Builds the Expo web version into the `dist` directory.

```bash
npm test
```

Runs all tests.

```bash
npm run test:watch
```

Runs tests in watch mode.

```bash
npm run test:coverage
```

Runs tests and generates a coverage report.

## Docker

This project is dockerized for serving the Expo web production build.

The Docker setup uses a multi-stage build:

1. The first stage uses Node.js to install dependencies and build the Expo web app.
2. The second stage uses Nginx to serve the generated `dist` folder.

Build the Docker image:

```bash
docker build -t rn-users-matches .
```

Run the Docker container:

```bash
docker run --rm -p 8080:80 rn-users-matches
```

Open the app in the browser:

```txt
http://localhost:8080
```

Stop the running container:

```bash
Ctrl + C
```

Docker-related files:

```txt
Dockerfile
.dockerignore
nginx.conf
```

## Testing

This project uses Jest, jest-expo, and React Native Testing Library for testing.

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

The current test setup includes:

- API success and failure behavior
- Zustand store match generation logic
- UserCard rendering behavior
- UserCard press behavior

Current test files:

```txt
src/api/__tests__/usersApi.test.ts
src/features/users/store/__tests__/usersStore.test.ts
src/components/__tests__/UserCard.test.tsx
```

Expected test result:

```txt
Test Suites: 3 passed
Tests: 6 passed
```

Coverage is generated inside:

```txt
coverage/
```

The `coverage/` folder should not be committed or included in the Docker image.

## Project Structure

```txt
rn-users-matches/
  assets/

  src/
    api/
      __tests__/
        usersApi.test.ts
      usersApi.ts

    components/
      __tests__/
        UserCard.test.tsx
      ErrorView.tsx
      LoadingView.tsx
      MatchCard.tsx
      UserCard.tsx

    features/
      users/
        screens/
          UsersListScreen.tsx
          UserDetailsScreen.tsx
        store/
          __tests__/
            usersStore.test.ts
          usersStore.ts
        types.ts

    navigation/
      AppNavigator.tsx
      types.ts

    styles/
      rtl.ts

  App.tsx
  index.ts
  app.json
  package.json
  package-lock.json
  tsconfig.json
  Dockerfile
  .dockerignore
  nginx.conf
  README.md
```

## Folder Explanation

### `src/api`

Contains API-related logic.

The `usersApi.ts` file is responsible for fetching users from DummyJSON.

### `src/components`

Contains reusable UI components such as:

- User cards
- Match cards
- Loading view
- Error view

### `src/features/users`

Contains all user-related logic, screens, types, and state management.

This keeps the users feature isolated and easier to maintain.

### `src/features/users/screens`

Contains the main screens:

- `UsersListScreen`
- `UserDetailsScreen`

### `src/features/users/store`

Contains the Zustand users store.

The store manages users, loading state, refresh state, error state, and generated matches.

### `src/navigation`

Contains app navigation setup and typed route definitions.

### `src/styles`

Contains shared style helpers, including RTL-related utilities.

## State Management

Zustand is used for state management.

The users store is responsible for:

- Storing the list of users
- Managing loading state
- Managing error state
- Managing refresh state
- Generating and storing top matches for each selected user

Zustand was chosen because this project has a small and focused global state.

It keeps the state management simple and avoids unnecessary boilerplate while still providing a clean global store.

## Navigation

React Navigation is used for screen navigation.

The app has two main screens:

- `UsersList`
- `UserDetails`

Navigation params are typed using TypeScript to prevent invalid route parameters.

## Users List Screen

The users list screen fetches users from:

```txt
https://dummyjson.com/users
```

Each list item displays:

- First name
- Last name
- City
- Age
- Profile image

The list is rendered using `FlatList` for better performance.

The screen also supports:

- Loading state
- Error state
- Retry action
- Pull to refresh
- Navigation to user details

## User Details Screen

The user details screen displays full information about the selected user, including:

- Username
- Age
- Gender
- Email
- Phone
- Birth date
- City
- Address
- Company
- Job title
- University

The screen also includes a button labeled:

```txt
Find Matches
```

When the button is pressed, the app displays three other users as top matches.

## Match Selection Logic

The app uses a simple deterministic matching logic.

When the user presses the `Find Matches` button, the app selects three other users as top matches.

The match score is calculated based on:

- Same city
- Age difference within 5 years
- Different gender

The top 3 users with the highest score are displayed as suggested matches.

This approach was chosen instead of fully random matching because it is easier to test, explain, and maintain.

## RTL Support

RTL support is handled using React Native's `I18nManager`.

Shared RTL helpers are used to control:

- Text alignment
- Writing direction
- Row direction

This helps the layout work properly in both LTR and RTL environments.

## Performance Considerations

The users list is rendered using `FlatList`.

Basic performance optimizations include:

- `keyExtractor`
- Memoized render functions
- `React.memo` for list items
- `initialNumToRender`
- `maxToRenderPerBatch`
- `windowSize`
- `removeClippedSubviews`

These optimizations help keep the list rendering efficient.

## Error and Loading Handling

The app displays a loading indicator while users are being fetched.

If the API request fails, an error message and retry button are displayed.

Pull to refresh is also supported on the users list screen.

## Image Fallback Handling

If a profile image cannot be loaded, the app displays a fallback avatar using the user's initials.

This prevents empty or broken profile image placeholders in the UI.

## Animation

A simple fade animation is used when displaying the top matches.

This improves the user experience while keeping the animation lightweight and easy to maintain.

## Architectural Decisions

- A feature-based folder structure was used to keep the project modular.
- API logic was separated from UI components.
- Zustand was used for simple and lightweight state management.
- React Navigation was typed with TypeScript.
- Reusable components were created for user cards, match cards, loading, and error states.
- RTL logic was centralized in a shared helper file.
- Match logic was kept deterministic instead of random so that the result is easier to test and explain.
- FlatList was used for efficient rendering of the users list.
- Tests were added for the API layer, store logic, and UI component behavior.
- Docker was added to provide a production-like web deployment setup.

## Task Requirements Coverage

| Requirement | Status |
|---|---|
| React Native + Expo | Completed |
| TypeScript | Completed |
| Zustand or Redux Toolkit | Completed with Zustand |
| Fetch users from DummyJSON | Completed |
| Display first and last name | Completed |
| Display city | Completed |
| Display age | Completed |
| Display profile image | Completed |
| Navigate to user details | Completed |
| Display full user information | Completed |
| Find Matches button | Completed |
| Display three top matches | Completed |
| Loading state | Completed |
| Error state | Completed |
| Clean modular folder structure | Completed |
| RTL support | Completed |
| FlatList for users list | Completed |
| Pull to refresh | Completed |
| Animation for matches | Completed |
| Basic performance optimizations | Completed |
| README with run instructions | Completed |
| README with project structure | Completed |
| README with architectural decisions | Completed |
| README with scaling recommendations | Completed |

## Scaling Recommendations

If this project were scaled into a larger production-ready application, the following improvements would be recommended:

- Add a data fetching and caching library such as TanStack Query.
- Add pagination or infinite scrolling for large user lists.
- Add unit tests for more store actions and edge cases.
- Add component tests for all reusable components and screens.
- Add end-to-end tests using Detox or Maestro.
- Add proper localization using a library such as i18next.
- Add environment-based API configuration.
- Add a shared design system for colors, typography, spacing, and components.
- Add analytics and error reporting.
- Add CI checks for linting, type checking, tests, and Docker build.
- Add stronger error handling for different API failure cases.
- Add accessibility improvements.
- Add stricter coverage thresholds.
- Add production monitoring and logging.
- Add app configuration per environment such as development, staging, and production.

## Final Checklist

- Users are fetched from the API.
- Users are displayed in a FlatList.
- Each user item shows name, city, age, and profile image.
- Clicking a user opens the user details screen.
- User details screen displays full user information.
- Find Matches button displays three top matches.
- Loading state is handled.
- Error state is handled.
- Pull to refresh is implemented.
- RTL layout support is included.
- Basic animation is implemented.
- Basic performance optimizations are included.
- TypeScript type checking passes.
- Tests pass.
- Test coverage can be generated.
- Docker build works.
- Docker container serves the web app with Nginx.