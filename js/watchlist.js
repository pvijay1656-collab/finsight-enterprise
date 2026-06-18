if(
    localStorage.getItem("loggedIn")
    !== "true"
){
    window.location.href =
        "login.html";
}

/* ==========================================
   FinSight Enterprise
   Watchlist Management System
========================================== */

let watchlist = [];

/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadWatchlist();

        initializeWatchlistForm();

        renderWatchlist();

        startMarketMonitoring();

    }

);

/* ==========================================
   STORAGE
========================================== */

function loadWatchlist(){

    const userEmail =
    localStorage.getItem(
        "userEmail"
    )?.toLowerCase().trim();

    console.log(
        "Loading Watchlist For:",
        userEmail
    );

    const data =
        localStorage.getItem(
            "watchlist_" +
            userEmail
        );

    console.log(
        "Watchlist Data:",
        data
    );

    if(data){

        watchlist =
            JSON.parse(data);

    }

}
function saveWatchlist(){

    const userEmail =
    localStorage.getItem(
        "userEmail"
    )?.toLowerCase().trim();

    if(
        !userEmail
    ){
        return;
    }

    if(
        watchlist.length === 0
    ){
        console.log(
            "Prevented empty save"
        );
        return;
    }

    localStorage.setItem(

        "watchlist_" +
        userEmail,

        JSON.stringify(
            watchlist
        )

    );

}
/* ==========================================
   FORM
========================================== */

function initializeWatchlistForm(){

    const form =

        document.getElementById(
            "watchlistForm"
        );

    if(!form)
        return;

    form.addEventListener(

        "submit",

        addWatchlistItem

    );

}

/* ==========================================
   ADD ITEM
========================================== */

function addWatchlistItem(event){

    event.preventDefault();

    const symbol =

        document.getElementById(
            "stockSymbol"
        )
        .value
        .toUpperCase();

    const targetPrice =

        parseFloat(

            document.getElementById(
                "targetPrice"
            ).value

        );

    const item = {

        id:
            generateId(),

        symbol:
            symbol,

        targetPrice:
            targetPrice,

        currentPrice:
             0,

        createdAt:
            new Date()
            .toISOString()

    };

   watchlist.push(item);
let activities =

JSON.parse(
localStorage.getItem(
"recentActivity"
)
) || [];

activities.unshift({

date:
new Date()
.toLocaleDateString(),

activity:
"Added Watchlist: " +
item.symbol

});

localStorage.setItem(

"recentActivity",

JSON.stringify(
activities
)

);
saveWatchlist();

renderWatchlist();

refreshMarketPrices();

    event.target.reset();

    success(
        "Watchlist Item Added"
    );

}

/* ==========================================
   DELETE
========================================== */

function deleteWatchlistItem(id){

    const confirmDelete =

        confirm(
            "Delete Item?"
        );

    if(!confirmDelete)
        return;

    watchlist =

        watchlist.filter(

            item =>
            item.id !== id

        );

    saveWatchlist();

    renderWatchlist();

}

/* ==========================================
   RENDER TABLE
========================================== */

function renderWatchlist(){

    const table =

        document.getElementById(
            "watchlistTable"
        );

    if(!table)
        return;

    table.innerHTML = "";

    watchlist.forEach(item=>{

        const difference =

            item.targetPrice -
            item.currentPrice;

        const status =

            item.currentPrice >=
            item.targetPrice

            ? "Triggered"

            : "Pending";

        table.innerHTML += `

        <tr>

            <td>
                ${item.symbol}
            </td>

            <td>
                ₹${item.currentPrice}
            </td>

            <td>
                ₹${item.targetPrice}
            </td>

            <td>
                ₹${difference.toFixed(2)}
            </td>

            <td>
                ${status}
            </td>

            <td>

                <button
                onclick="deleteWatchlistItem('${item.id}')">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

    updateAlerts();

}

/* ==========================================
   ALERT ENGINE
========================================== */

function updateAlerts(){

    const container =

        document.getElementById(
            "alertsContainer"
        );

    if(!container)
        return;

    const triggered =

        watchlist.filter(

            item =>

            item.currentPrice >=
            item.targetPrice

        );

    if(triggered.length === 0){

        container.innerHTML =

            "<p>No active alerts.</p>";

        return;

    }

    container.innerHTML = "";

    triggered.forEach(item=>{

        container.innerHTML += `

        <div class="dashboard-card">

            <strong>

                ${item.symbol}

            </strong>

            reached

            ₹${item.currentPrice}

        </div>

        `;

    });

}

/* ==========================================
   MOCK MARKET DATA
========================================== */



/* ==========================================
   PRICE REFRESH
========================================== */

async function refreshMarketPrices(){

    for(const item of watchlist){

        const livePrice =

            await fetchStockPrice(
                item.symbol
            );

        if(livePrice){

            item.currentPrice =
                livePrice;

        }

    }

    saveWatchlist();

    renderWatchlist();

}

/* ==========================================
   MONITORING
========================================== */

function startMarketMonitoring(){

    setInterval(

        async ()=>{

            await refreshMarketPrices();

        },

        60000

    );

}

/* ==========================================
   TOP GAINERS
========================================== */

function getTopGainers(){

    return watchlist

        .sort(

            (a,b)=>

                b.currentPrice -
                a.currentPrice

        )

        .slice(0,5);

}

/* ==========================================
   TOP LOSERS
========================================== */

function getTopLosers(){

    return watchlist

        .sort(

            (a,b)=>

                a.currentPrice -
                b.currentPrice

        )

        .slice(0,5);

}

/* ==========================================
   MARKET STATUS
========================================== */

function updateMarketStatus(){

    const status =

        document.getElementById(
            "apiStatus"
        );

    if(status){

        status.innerText =
            "Connected";

    }

}

/* ==========================================
   NEWS FEED
========================================== */

function loadMarketNews(){

    const newsPanel =

        document.getElementById(
            "newsPanel"
        );

    if(!newsPanel)
        return;

    const news = [

        "NIFTY closes higher on strong IT buying",

        "US markets rally after inflation data",

        "Banking sector sees fresh inflows",

        "Crude oil prices stabilize"

    ];

    newsPanel.innerHTML = "";

    news.forEach(item=>{

        newsPanel.innerHTML +=

        `<li>${item}</li>`;

    });

}

/* ==========================================
   STARTUP
========================================== */

loadMarketNews();

updateMarketStatus();

/* ==========================================
   READY
========================================== */

console.log(
    "Watchlist Engine Loaded"
);


