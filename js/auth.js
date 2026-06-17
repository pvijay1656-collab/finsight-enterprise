/* ==========================================
   FinSight Enterprise
   Authentication Engine
========================================== */

import {

    auth,
    db,

    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,

    onAuthStateChanged,

    setDoc,
    doc,

    COLLECTIONS

}
from "../firebase/firebase-config.js";

/* ==========================================
   GLOBALS
========================================== */

let currentUser = null;

/* ==========================================
   REGISTER USER
========================================== */

export async function registerUser(

    fullName,
    email,
    phone,
    password

) {

    try {

        const userCredential =

            await createUserWithEmailAndPassword(

                auth,
                email,
                password

            );

        const user =

            userCredential.user;

        await setDoc(

            doc(
                db,
                COLLECTIONS.USERS,
                user.uid
            ),

            {

                uid:
                    user.uid,

                fullName:
                    fullName,

                email:
                    email,

                phone:
                    phone,

                role:
                    "user",

                createdAt:
                    new Date()
                    .toISOString()

            }

        );

        localStorage.setItem(

            "finsight_user",

            JSON.stringify({

                uid:
                    user.uid,

                email:
                    email,

                fullName:
                    fullName,

                role:
                    "user"

            })

        );

        alert(
            "Registration Successful"
        );

      window.location.href = "/finsight-enterprise/dashboard.html";

    }

    catch(error){

        console.error(error);

        alert(
            error.message
        );

    }

}

/* ==========================================
   LOGIN USER
========================================== */

export async function loginUser(

    email,
    password

){

    try{

        const userCredential =

            await signInWithEmailAndPassword(

                auth,
                email,
                password

            );

        const user =
            userCredential.user;

        localStorage.setItem(

            "loggedIn",

            "true"

        );

        localStorage.setItem(
    "userEmail",
    user.email.toLowerCase().trim()
);

        alert(
            "Login Successful"
        );

        window.location.href =
            "../dashboard.html";

    }

    catch(error){

        console.error(error);

        alert(
            error.message
        );

    }

}

/* ==========================================
   LOGOUT
========================================== */

export async function logoutUser(){

    try{

        await signOut(auth);

        localStorage.removeItem(
            "loggedIn"
        );

        localStorage.removeItem(
            "userEmail"
        );

        localStorage.removeItem(
            "finsight_user"
        );

        alert(
            "Logged Out"
        );

      window.location.href = "/finsight-enterprise/login.html";

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================
   SESSION CHECK
========================================== */

export function isAuthenticated(){

    return localStorage.getItem(
        "loggedIn"
    ) === "true";

}

if(auth.currentUser){

    localStorage.setItem(
        "loggedIn",
        "true"
    );

    localStorage.setItem(
        "userEmail",
        auth.currentUser.email
    );

}
/* ==========================================
   ROUTE PROTECTION
========================================== */

export function protectRoute(){

    if(
        !isAuthenticated()
    ){

        alert(
            "Login Required"
        );

       window.location.href = "/finsight-enterprise/login.html";

    }

}

/* ==========================================
   CURRENT USER
========================================== */

export function getCurrentUser(){

    const user =

        localStorage.getItem(
            "finsight_user"
        );

    if(user){

        currentUser =
            JSON.parse(user);

        return currentUser;

    }

    return null;

}

/* ==========================================
   USER ROLE
========================================== */

export function getUserRole(){

    const user =
        getCurrentUser();

    if(!user)
        return null;

    return user.role;

}

/* ==========================================
   ADMIN CHECK
========================================== */

export function isAdmin(){

    const adminEmail =
        "pvijay1656@gmail.com";

    const currentEmail =
        localStorage.getItem(
            "userEmail"
        );

    return currentEmail === adminEmail;

}
/* ==========================================
   ADMIN ROUTE
========================================== */

export function protectAdminRoute(){

    if(!isAdmin()){

        alert(
            "Admin Access Only"
        );

        window.location.href =
            "../dashboard.html";

    }

}

/* ==========================================
   AUTH STATE LISTENER
========================================== */

onAuthStateChanged(

    auth,

    (user)=>{

        if(user){

            localStorage.setItem(
    "loggedIn",
    "true"
);

localStorage.setItem(
    "userEmail",
    user.email
);

            console.log(
                "Logged User:",
                user.email
            );

        }

        else{

            console.log(
                "No Active Session"
            );

        }

    }

);

/* ==========================================
   REMEMBER ME
========================================== */

export function rememberUser(email){

    localStorage.setItem(
        "rememberEmail",
        email
    );

}

export function loadRememberedUser(){

    return localStorage.getItem(
        "rememberEmail"
    );

}

/* ==========================================
   AUTH ENGINE READY
========================================== */

console.log(
    "Authentication Engine Loaded"
);
/* ==========================================
   FORGOT PASSWORD
========================================== */

import {
    sendPasswordResetEmail,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    sendEmailVerification
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ==========================================
   PASSWORD RESET
========================================== */

export async function forgotPassword(email){

    try{

        await sendPasswordResetEmail(
            auth,
            email
        );

        alert(
            "Password Reset Link Sent"
        );

    }

    catch(error){

        console.error(error);

        alert(error.message);

    }

}

/* ==========================================
   EMAIL VERIFICATION
========================================== */

export async function verifyEmail(){

    try{

        if(auth.currentUser){

            await sendEmailVerification(
                auth.currentUser
            );

            alert(
                "Verification Email Sent"
            );

        }

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================
   GOOGLE LOGIN
========================================== */

const googleProvider =
    new GoogleAuthProvider();

export async function loginWithGoogle(){

    try{

        const result =
            await signInWithPopup(
                auth,
                googleProvider
            );

        const user =
            result.user;

        localStorage.setItem(
    "userEmail",
    user.email.toLowerCase().trim()
);

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "finsight_user",
            JSON.stringify({
                uid:user.uid,
                email:user.email,
                fullName:user.displayName,
                role:"user"
            })
        );

       window.location.href = "/finsight-enterprise/dashboard.html";


    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================
   GITHUB LOGIN
========================================== */

const githubProvider =
    new GithubAuthProvider();

export async function loginWithGithub(){

    try{

        const result =
            await signInWithPopup(
                auth,
                githubProvider
            );

        const user =
            result.user;

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "finsight_user",
            JSON.stringify({
                uid:user.uid,
                email:user.email,
                fullName:user.displayName,
                role:"user"
            })
        );

       window.location.href = "/finsight-enterprise/dashboard.html";

    }

    catch(error){

        console.error(error);

    }

}

/* ==========================================
   PASSWORD STRENGTH
========================================== */

export function passwordStrength(password){

    let score = 0;

    if(password.length >= 8)
        score++;

    if(/[A-Z]/.test(password))
        score++;

    if(/[a-z]/.test(password))
        score++;

    if(/[0-9]/.test(password))
        score++;

    if(/[!@#$%^&*]/.test(password))
        score++;

    if(score <= 2)
        return "Weak";

    if(score <= 4)
        return "Medium";

    return "Strong";

}

/* ==========================================
   SESSION TIMEOUT
========================================== */

const SESSION_TIMEOUT =
    30 * 60 * 1000;

let sessionTimer;

export function startSessionTimer(){

    clearTimeout(sessionTimer);

    sessionTimer =
        setTimeout(()=>{

            logoutUser();

            alert(
                "Session Expired"
            );

        },
        SESSION_TIMEOUT);

}

document.addEventListener(
    "mousemove",
    startSessionTimer
);

document.addEventListener(
    "keydown",
    startSessionTimer
);

/* ==========================================
   USER ACTIVITY LOG
========================================== */

export function logActivity(action){

    let logs =
        JSON.parse(
            localStorage.getItem(
                "activity_logs"
            )
        ) || [];

    logs.push({

        action:action,

        timestamp:
            new Date()
            .toISOString()

    });

    localStorage.setItem(
        "activity_logs",
        JSON.stringify(logs)
    );

}

/* ==========================================
   AUDIT TRAIL
========================================== */

export function auditLog(

    module,
    activity

){

    let audit =

        JSON.parse(
            localStorage.getItem(
                "audit_trail"
            )
        ) || [];

    audit.push({

        module:
            module,

        activity:
            activity,

        performedAt:
            new Date()
            .toISOString()

    });

    localStorage.setItem(

        "audit_trail",

        JSON.stringify(audit)

    );

}

/* ==========================================
   DEVICE DETECTION
========================================== */

export function getDeviceInfo(){

    return {

        browser:
            navigator.userAgent,

        platform:
            navigator.platform,

        language:
            navigator.language

    };

}

/* ==========================================
   LOGIN ATTEMPT TRACKING
========================================== */

let loginAttempts = 0;

export function trackLoginFailure(){

    loginAttempts++;

    if(loginAttempts >= 5){

        alert(
            "Too Many Attempts"
        );

        return false;

    }

    return true;

}

/* ==========================================
   SECURITY MIDDLEWARE
========================================== */

export function securityCheck(){

    const user =
        getCurrentUser();

    if(!user){

        window.location.href =
            "../login.html";

        return false;

    }

    return true;

}

/* ==========================================
   TOKEN VALIDATION
========================================== */

export async function validateToken(){

    try{

        const user =
            auth.currentUser;

        if(user){

            const token =
                await user.getIdToken();

            return !!token;

        }

        return false;

    }

    catch(error){

        console.error(error);

        return false;

    }

}

/* ==========================================
   ENTERPRISE AUTH READY
========================================== */

console.log(
    "Enterprise Security Layer Loaded"
);
window.registerUser = registerUser;
window.loginUser = loginUser;
window.loginWithGoogle = loginWithGoogle;
window.logoutUser = logoutUser;
window.isAuthenticated = isAuthenticated;
window.getCurrentUser = getCurrentUser;

