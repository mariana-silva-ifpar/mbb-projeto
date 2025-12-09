import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({ projectId: "mbb-ppi", appId: "1:1075211904570:web:0083218eead6eb6b41b703", storageBucket: "mbb-ppi.firebasestorage.app", apiKey: "AIzaSyDVrwE6bF8ZfA_il6BfJJoAlU4IECoew0I", authDomain: "mbb-ppi.firebaseapp.com", messagingSenderId: "1075211904570", measurementId: "G-TW61BESQ8C" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
