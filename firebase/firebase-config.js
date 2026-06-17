/* ==========================================
   FinSight Enterprise
   Firebase Configuration
========================================== */

/*
--------------------------------------------
1. Create Firebase Project
2. Enable Authentication
3. Enable Firestore Database
4. Copy Credentials
5. Replace Below Values
--------------------------------------------
*/

/* ==========================================
   FIREBASE IMPORTS
========================================== */

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {

    getFirestore,

    collection,

    addDoc,

    setDoc,

    getDocs,

    getDoc,

    doc,

    updateDoc,

    deleteDoc,

    query,

    where

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ==========================================
   FIREBASE CONFIG
========================================== */

const firebaseConfig = {
  apiKey: "AIzaSyBWB9rPYdxY8ByTlWwrIrYscEbaRSRzRBM",
  authDomain: "finsight-enterprise.firebaseapp.com",
  projectId: "finsight-enterprise",
  storageBucket: "finsight-enterprise.firebasestorage.app",
  messagingSenderId: "150608183556",
  appId: "1:150608183556:web:53e9b6ea215a97de509051"
};

/* ==========================================
   INITIALIZE APP
========================================== */

const app =
    initializeApp(
        firebaseConfig
    );

/* ==========================================
   AUTH
========================================== */

const auth =
    getAuth(app);

/* ==========================================
   DATABASE
========================================== */

const db =
    getFirestore(app);

/* ==========================================
   EXPORTS
========================================== */

export {

    app,

    auth,

    db,

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged,

    collection,

    addDoc,

    getDocs,

    getDoc,

    setDoc,

    updateDoc,

    deleteDoc,

    query,

    where,

    doc

};

/* ==========================================
   USER COLLECTIONS
========================================== */

/*

users

{
    uid
    fullName
    email
    phone
    createdAt
}

portfolios

{
    userId
    assetName
    quantity
    buyPrice
    currentPrice
}

transactions

{
    userId
    asset
    amount
    date
}

goals

{
    userId
    targetAmount
    currentAmount
    targetDate
}

watchlist

{
    userId
    symbol
    targetPrice
}

*/

/* ==========================================
   APP SETTINGS
========================================== */

const SETTINGS = {

    APP_NAME:
        "FinSight Enterprise",

    VERSION:
        "1.0.0",

    DEFAULT_CURRENCY:
        "INR",

    DEFAULT_COUNTRY:
        "India"

};

export {
    SETTINGS
};

/* ==========================================
   SYSTEM STATUS
========================================== */

console.log(
    "Firebase Connected"
);

console.log(
    SETTINGS.APP_NAME
);

console.log(
    "Version:",
    SETTINGS.VERSION
);

/* ==========================================
   HELPER FUNCTIONS
========================================== */

export function getCurrentTimestamp() {

    return new Date()
        .toISOString();

}

export function generateDocumentId() {

    return (
        Date.now()
        .toString(36)
        +
        Math.random()
        .toString(36)
        .substring(2)
    );

}

/* ==========================================
   FIRESTORE COLLECTION NAMES
========================================== */

export const COLLECTIONS = {

    USERS:
        "users",

    PORTFOLIOS:
        "portfolios",

    TRANSACTIONS:
        "transactions",

    GOALS:
        "goals",

    WATCHLIST:
        "watchlist",

    REPORTS:
        "reports"

};

/* ==========================================
   FIREBASE READY
========================================== */