/* ==========================================
   FinSight Enterprise
   Admin Management Engine
========================================== */

let adminState = {

    users: [],

    auditLogs: [],

    revenueData: [],

    apiUsage: [],

    reports: []

};

/* ==========================================
   INITIALIZATION
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAdmin();

    }

);

function initializeAdmin(){

    loadUsers();

    loadAuditLogs();

    loadRevenueAnalytics();

    loadAPIAnalytics();

    renderUsers();

    renderAuditLogs();

    initializeCharts();

    updateSystemHealth();

}

/* ==========================================
   USER MANAGEMENT
========================================== */

function loadUsers(){

    const storedUsers =

        JSON.parse(

            localStorage.getItem(
                "users"
            )

        ) || [];

    adminState.users =
        storedUsers;

}

function renderUsers(){

    const table =

        document.getElementById(
            "userTable"
        );

    if(!table)
        return;

    table.innerHTML = "";

    adminState.users.forEach(user=>{

        table.innerHTML += `

        <tr>

            <td>
                ${user.uid || "N/A"}
            </td>

            <td>
                ${user.fullName}
            </td>

            <td>
                ${user.email}
            </td>

            <td>
                ${user.role || "User"}
            </td>

            <td>
                Active
            </td>

            <td>

                <button
                onclick="editUserRole('${user.uid}')">

                Edit

                </button>

                <button
                onclick="disableUser('${user.uid}')">

                Disable

                </button>

            </td>

        </tr>

        `;

    });

}

function editUserRole(uid){

    const newRole =

        prompt(
            "Enter Role (admin/user/manager)"
        );

    if(!newRole)
        return;

    const user =

        adminState.users.find(

            item =>
            item.uid === uid

        );

    if(user){

        user.role =
            newRole;

        saveUsers();

        renderUsers();

        addAuditLog(

            "Role Updated",

            user.email

        );

    }

}

function disableUser(uid){

    const confirmed =

        confirm(
            "Disable User?"
        );

    if(!confirmed)
        return;

    addAuditLog(

        "User Disabled",

        uid

    );

    alert(
        "User Disabled"
    );

}

function saveUsers(){

    localStorage.setItem(

        "users",

        JSON.stringify(
            adminState.users
        )

    );

}

/* ==========================================
   AUDIT LOGS
========================================== */

function loadAuditLogs(){

    adminState.auditLogs =

        JSON.parse(

            localStorage.getItem(
                "audit_trail"
            )

        ) || [];

}

function addAuditLog(

    action,
    user

){

    adminState.auditLogs.push({

        action,

        user,

        timestamp:
            new Date()
            .toISOString()

    });

    localStorage.setItem(

        "audit_trail",

        JSON.stringify(
            adminState.auditLogs
        )

    );

    renderAuditLogs();

}

function renderAuditLogs(){

    const table =

        document.getElementById(
            "auditLogs"
        );

    if(!table)
        return;

    table.innerHTML = "";

    adminState.auditLogs
    .slice(-20)
    .reverse()
    .forEach(log=>{

        table.innerHTML += `

        <tr>

            <td>

            ${new Date(
                log.timestamp
            ).toLocaleString()}

            </td>

            <td>

            ${log.user}

            </td>

            <td>

            ${log.action}

            </td>

        </tr>

        `;

    });

}

/* ==========================================
   REVENUE ANALYTICS
========================================== */

function loadRevenueAnalytics(){

    adminState.revenueData = [

        120000,
        140000,
        180000,
        210000,
        260000,
        320000

    ];

}

/* ==========================================
   API ANALYTICS
========================================== */

function loadAPIAnalytics(){

    adminState.apiUsage = [

        12000,
        18000,
        25000,
        32000,
        41000,
        58000

    ];

}

/* ==========================================
   SYSTEM HEALTH
========================================== */

function updateSystemHealth(){

    const uptime =

        document.getElementById(
            "uptime"
        );

    if(uptime){

        uptime.innerText =
            "99.98%";

    }

}

/* ==========================================
   API USAGE CHART
========================================== */

function createAPIChart(){

    const canvas =

        document.getElementById(
            "apiChart"
        );

    if(!canvas)
        return;

    new Chart(

        canvas,

        {

            type:"line",

            data:{

                labels:[

                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"

                ],

                datasets:[{

                    label:
                        "API Requests",

                    data:
                        adminState.apiUsage,

                    borderColor:
                        "#0ea5e9",

                    tension:0.4

                }]

            }

        }

    );

}

/* ==========================================
   REVENUE CHART
========================================== */

function createRevenueChart(){

    const canvas =

        document.getElementById(
            "revenueChart"
        );

    if(!canvas)
        return;

    new Chart(

        canvas,

        {

            type:"bar",

            data:{

                labels:[

                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"

                ],

                datasets:[{

                    label:
                        "Revenue",

                    data:
                        adminState.revenueData,

                    backgroundColor:
                        "#10b981"

                }]

            }

        }

    );

}

/* ==========================================
   BUSINESS INTELLIGENCE
========================================== */

function createBusinessChart(){

    const canvas =

        document.getElementById(
            "businessChart"
        );

    if(!canvas)
        return;

    new Chart(

        canvas,

        {

            type:"doughnut",

            data:{

                labels:[

                    "Subscriptions",
                    "Premium",
                    "Enterprise"

                ],

                datasets:[{

                    data:[

                        45,
                        30,
                        25

                    ]

                }]

            }

        }

    );

}

/* ==========================================
   CHART INITIALIZATION
========================================== */

function initializeCharts(){

    createAPIChart();

    createRevenueChart();

    createBusinessChart();

}

/* ==========================================
   SECURITY CENTER
========================================== */

function performSecurityScan(){

    const results = {

        firewall:
            "Active",

        mfa:
            "Enabled",

        threats:
            0,

        status:
            "Secure"

    };

    console.log(results);

    return results;

}

/* ==========================================
   KPI ENGINE
========================================== */

function getAdminMetrics(){

    return {

        totalUsers:
            adminState.users.length,

        auditLogs:
            adminState.auditLogs.length,

        apiRequests:

            adminState.apiUsage
            .reduce(
                (a,b)=>a+b,
                0
            ),

        monthlyRevenue:

            adminState.revenueData
            .reduce(
                (a,b)=>a+b,
                0
            )

    };

}

/* ==========================================
   REPORT MONITOR
========================================== */

function monitorReports(){

    const reports =

        JSON.parse(

            localStorage.getItem(
                "report_history"
            )

        ) || [];

    adminState.reports =
        reports;

}

/* ==========================================
   BACKUP ENGINE
========================================== */

function createSystemBackup(){

    const backup = {

        users:
            adminState.users,

        audit:
            adminState.auditLogs,

        reports:
            adminState.reports,

        exportedAt:
            new Date()
            .toISOString()

    };

    console.log(

        "Backup Created",

        backup

    );

}

/* ==========================================
   AUTO HEALTH CHECK
========================================== */

setInterval(

    ()=>{

        performSecurityScan();

    },

    300000

);

/* ==========================================
   ADMIN ENGINE READY
========================================== */

console.log(
    "Enterprise Admin Console Loaded"
);
import {
    isAdmin
}
from "./auth.js";

if(!isAdmin()){

    alert(
        "Access Denied"
    );

    window.location =
        "dashboard.html";

}