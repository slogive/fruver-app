# Fruver App

## English

### Overview

Fruver App is a simple web application for managing a fruit and vegetable store. Users can add products to their cart, view the total price, and see the IVA (tax) applied to their purchases.

### Features

- Add products to the cart
- Remove products from the cart
- View total price and IVA
- Responsive design

### Dependencies

Before you begin, make sure you have the following dependencies installed:

- **Android Studio:** For building and running the native Android app.
- **Java SDK 21:** The Java Development Kit version 21 is required for Android development.
- **Bun 1.2.2 (or later):** A fast JavaScript runtime and package manager.
- **Node.js 20.18.1 (or later):** JavaScript runtime environment.
- **npm 10.8.2 (or later):** Node.js package manager (usually comes with Node.js).
- **Operating System:** Windows

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yourusername/fruver-app.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd fruver-app
    ```

3.  Install dependencies:

    ```bash
    bun install
    ```

4.  Start the development server:

    ```bash
    bun run dev
    ```

### Usage

- Open your browser and navigate to `http://localhost:5173`.
- Browse the products and add them to your cart.
- View the total price and IVA in the summary section.

### Technologies Used

- React
- TypeScript
- Ant Design
- SCSS
- Capacitor

### Running as a Native Mobile App (Android) with Capacitor

These steps will guide you through setting up and running the Fruver App as a native Android application using Capacitor.

1.  **Initialize a Capacitor App:**

    ```bash
    npm init @capacitor/app@latest
    ```

    - This command initializes a new Capacitor project. It will prompt you for the app name, app ID, and web directory.

2.  **Install Capacitor Core and Android Dependencies:**

    ```bash
    bun i @capacitor/core @capacitor/android
    ```

    - This command installs the core Capacitor libraries and the Capacitor Android platform. `@capacitor/core` provides the core Capacitor functionality, and `@capacitor/android` provides the native Android runtime.

3.  **Install the Capacitor CLI as a Development Dependency:**

    ```bash
    bun i -D @capacitor/cli
    ```

    - This command installs the Capacitor command-line interface (CLI) as a development dependency. The CLI is used to manage your Capacitor project, add platforms, sync web assets, and run the app.

4.  **Initialize Capacitor:**

    ```bash
    bunx cap init
    ```

    - This command initializes Capacitor in your project. It will ask you for your app name and app ID (reverse domain name notation, e.g., `com.example.myapp`). It reads the configuration from [capacitor.config.ts](http://_vscodecontentref_/1).

5.  **Add the Android Platform:**

    ```bash
    bunx cap add android
    ```

    - This command adds the Android platform to your Capacitor project. It creates an [android](http://_vscodecontentref_/2) directory in your project root, which contains the native Android project.

6.  **Sync Web Assets to the Native Project:**

    ```bash
    bunx cap sync
    ```

    - This command copies your built web assets (from your `webDir` directory, usually [dist](http://_vscodecontentref_/3)) to the native Android project. It also updates any native dependencies or configurations. You should run this command every time you rebuild your web app.

7.  **Run the App on Android:**

    ```bash
    bunx cap run android
    ```

    - This command opens the Android project in Android Studio. From there, you can build and run the app on an emulator or a connected Android device. You can also use the Android Studio UI to build and run the app.
