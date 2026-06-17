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