if(
    localStorage.getItem("loggedIn")
    !== "true"
){
    window.location.href =
        "login.html";
}

function calculateDailyPnL(){

    let profit = 0;

    portfolio.forEach(asset=>{

        profit +=

        (

            asset.currentPrice
            -
            asset.buyPrice

        )

        *

        asset.quantity;

    });

    return profit;

}

function updateDailyPnL(){

    const pnl =

        calculateDailyPnL();

    const element =

        document.getElementById(
        "dailyPnL"
        );

    if(element){

        element.innerText =

            formatCurrency(
                pnl
            );

    }

}

setInterval(

    ()=>{

        updateDailyPnL();

        if(typeof loadDashboardMetrics === "function"){

            loadDashboardMetrics();

        }

    },

    60000

);
function loadDashboardWatchlist(){

    const watchlist =

        JSON.parse(
            localStorage.getItem(
                "watchlist"
            )
        ) || [];

    const table =

        document.getElementById(
            "dashboardWatchlist"
        );

    if(!table)
        return;

    table.innerHTML = "";

    watchlist.forEach(stock=>{

        table.innerHTML += `

        <tr>

            <td>${stock.symbol}</td>

            <td>₹${stock.currentPrice}</td>

            <td>₹${stock.targetPrice}</td>

        </tr>

        `;

    });

}

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        loadDashboardWatchlist();

    }

);
const userEmail =
localStorage.getItem("userEmail")
?.toLowerCase()
?.trim();

const portfolio =
JSON.parse(
localStorage.getItem(
"portfolio_" + userEmail
)
) || [];
if(portfolio.length){

const topHolding =
portfolio.reduce(
(a,b)=>

(a.quantity * a.currentPrice) >
(b.quantity * b.currentPrice)

? a : b
);

document.getElementById(
"topHolding"
).innerText =
topHolding.name;

}
if(portfolio.length){

const best =
portfolio.reduce(
(a,b)=>

((a.currentPrice-a.buyPrice)*a.quantity)
>
((b.currentPrice-b.buyPrice)*b.quantity)

? a : b
);

document.getElementById(
"bestPerformer"
).innerText =
best.name;

}
if(portfolio.length){

const worst =
portfolio.reduce(
(a,b)=>

((a.currentPrice-a.buyPrice)*a.quantity)
<
((b.currentPrice-b.buyPrice)*b.quantity)

? a : b
);

document.getElementById(
"worstPerformer"
).innerText =
worst.name;

}
