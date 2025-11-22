Scan & Track - Simple Inventory Tracker

This document provides a concise overview of the "Scan & Track" application, developed as a final project for the Mobile Programming course.

Scan & Track is a simple mobile application designed for personal inventory management. Its primary function is to allow users to catalog items by name, location, and, critically, by capturing a real-time photo using the device's camera. This solution effectively addresses the problem of tracking the whereabouts of personal or small-scale business items.

1. Key Technologies and Dependencies

The application is built using the React Native framework, leveraging its ability for cross-platform development. TypeScript is employed to enhance code quality and maintainability.

Base Framework: React Native (Functional Components & Hooks)

Core Language: JavaScript and TypeScript (Used for main logic and type safety)

Development Environment: Expo Go (For testing and rapid development on mobile devices)

User Interface: React Native basic components (Styling optimized for simplicity and mobile readability)

Navigation System: @react-navigation/native-stack (Handles screen transitions between item list and input forms)

Data Persistence: @react-native-async-storage/async-storage (Utilized for simple, non-relational, local data storage of inventory items).

Mandatory Hardware Feature: expo-image-picker (This essential package is used to access the native device camera, fulfilling the core project requirement for camera interaction).

2. Main Features and Functionality

Image Capture: The application integrates the native camera, allowing users to take and store a photograph directly linked to the inventory record when a new item is added.

Data Management (CRUD): Users can easily Create, Read, and Delete items from their inventory list.

Real-Time Listing: The main screen displays a list of all managed items, including a small visual thumbnail of the captured photo for quick recognition.

User Experience: The design is minimal and functional, focusing on efficiency and clarity for rapid item cataloging.

3. Setup and Execution

To set up and run the project locally, please follow these steps:

Clone the repository:

git clone [https://github.com/bhw942-scs/ScanAndTrack-FinalProject.git](https://github.com/bhw942-scs/ScanAndTrack-FinalProject.git)
cd ScanAndTrack-FinalProject


Install dependencies:

npm install
# Ensure critical native dependencies are installed
npx expo install @react-navigation/native @react-navigation/native-stack expo-image-picker @react-native-async-storage/async-storage


Run the application:

npx expo start


Scan the generated QR code using the Expo Go app on your mobile device to view and test the application.

Developed by: Sebastian Aaron Carbajal Santivanez
Course: Mobile Programming (Final Project)