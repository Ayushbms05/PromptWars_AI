/**
 * @fileoverview Secrets Configuration File
 * Externalizing credentials prevents API keys from scraping in source HTML.
 * Used dynamically by script bootstrappers.
 */

export const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";

export const FIREBASE_CONFIG = {
    apiKey: "YOUR_FIREBASE_KEY",
    authDomain: "flowai-project.firebaseapp.com",
    databaseURL: "https://flowai-project-default-rtdb.firebaseio.com",
    projectId: "flowai-project",
    storageBucket: "flowai-project.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:123:web:123",
    measurementId: "G-DUMMYID"
};
