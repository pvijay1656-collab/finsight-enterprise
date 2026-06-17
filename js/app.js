/* =====================================
   FinSight Enterprise
   app.js
===================================== */

/* =====================================
   GLOBAL VARIABLES
===================================== */

const APP_NAME = "FinSight Enterprise";

let currentUser = null;

/* =====================================
   DOM LOADED
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApplication();

});

/* =====================================
   APPLICATION STARTUP
===================================== */

function initializeApplication() {

    console.log(`${APP_NAME} Started`);

    animateStatistics();

    initializeDarkMode();

    loadUserSession();

    initializeTooltips();

}

/* =====================================
   STATISTICS COUNTER
===================================== */

function animateStatistics() {

    animateCounter(
        "usersCount",
        5000,
        2000
    );

    animateCounter(
        "assetsCount",
        100,
        2500,
        " Cr+"
    );

    animateCounter(
        "reportsCount",
        25000,
        3000
    );

}

function animateCounter(
    elementId,
    target,
    duration,
    suffix = "+"
) {

    const element =
        document.getElementById(elementId);

    if (!element) return;

    let start = 0;

    let increment =
        target /
        (duration / 20);

    const timer = setInterval(() => {

        start += increment;

        if (start >= target) {

            start = target;

            clearInterval(timer);

        }

        element.textContent =
            Math.floor(start) + suffix;

    }, 20);

}

/* =====================================
   DARK MODE
===================================== */

function initializeDarkMode() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }

}

function toggleDarkMode() {

    document.body.classList.toggle(
        "dark-mode"
    );

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        localStorage.setItem(
            "theme",
            "dark"
        );

        showNotification(
            "Dark Mode Enabled",
            "success"
        );

    } else {

        localStorage.setItem(
            "theme",
            "light"
        );

        showNotification(
            "Light Mode Enabled",
            "success"
        );

    }

}

/* =====================================
   USER SESSION
===================================== */

function loadUserSession() {

    const user =
        localStorage.getItem(
            "finsight_user"
        );

    if (user) {

        currentUser =
            JSON.parse(user);

        console.log(
            "Logged User:",
            currentUser
        );

    }

}

function logout() {

    localStorage.removeItem(
        "finsight_user"
    );

    showNotification(
        "Logged Out Successfully",
        "success"
    );

    setTimeout(() => {

        window.location.href =
            "login.html";

    }, 1000);

}

/* =====================================
   LOCAL STORAGE HELPERS
===================================== */

function saveData(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}

function getData(key) {

    const data =
        localStorage.getItem(key);

    return data
        ? JSON.parse(data)
        : null;

}

function removeData(key) {

    localStorage.removeItem(key);

}

/* =====================================
   NOTIFICATION SYSTEM
===================================== */

function showNotification(
    message,
    type = "info"
) {

    const notification =
        document.createElement("div");

    notification.classList.add(
        "notification"
    );

    notification.classList.add(type);

    notification.innerText =
        message;

    document.body.appendChild(
        notification
    );

    setTimeout(() => {

        notification.classList.add(
            "show"
        );

    }, 100);

    setTimeout(() => {

        notification.remove();

    }, 3000);

}

/* =====================================
   ALERT TYPES
===================================== */

function success(message) {

    showNotification(
        message,
        "success"
    );

}

function error(message) {

    showNotification(
        message,
        "error"
    );

}

function warning(message) {

    showNotification(
        message,
        "warning"
    );

}

/* =====================================
   TOOLTIPS
===================================== */

function initializeTooltips() {

    const elements =
        document.querySelectorAll(
            "[data-tooltip]"
        );

    elements.forEach((element) => {

        element.addEventListener(
            "mouseenter",
            () => {

                console.log(
                    element.dataset.tooltip
                );

            }
        );

    });

}

/* =====================================
   DATE UTILITIES
===================================== */

function getCurrentDate() {

    return new Date()
        .toISOString()
        .split("T")[0];

}

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR"
        }
    ).format(value);

}

/* =====================================
   PORTFOLIO UTILITIES
===================================== */

function calculateROI(
    investment,
    currentValue
) {

    if (investment === 0)
        return 0;

    return (
        (
            (currentValue -
                investment) /
            investment
        ) *
        100
    ).toFixed(2);

}

function calculateProfit(
    investment,
    currentValue
) {

    return currentValue - investment;

}

/* =====================================
   RANDOM ID GENERATOR
===================================== */

function generateId() {

    return (
        Date.now().toString(36) +
        Math.random()
            .toString(36)
            .substring(2)
    );

}

/* =====================================
   MARKET STATUS
===================================== */

function getMarketStatus() {

    const hour =
        new Date().getHours();

    if (
        hour >= 9 &&
        hour <= 15
    ) {

        return "OPEN";

    }

    return "CLOSED";

}

/* =====================================
   SYSTEM HEALTH
===================================== */

function checkSystemHealth() {

    return {
        application:
            "Running",

        storage:
            "Connected",

        market:
            getMarketStatus(),

        version:
            "1.0.0"
    };

}

/* =====================================
   APP VERSION
===================================== */

const VERSION = "1.0.0";

console.log(
    `${APP_NAME} Version ${VERSION}`
);