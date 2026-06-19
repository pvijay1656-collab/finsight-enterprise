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


}


const userEmail =
localStorage.getItem("userEmail")
?.toLowerCase()
?.trim();

const dashboardPortfolio =
JSON.parse(
localStorage.getItem(
"portfolio_" + userEmail
)
) || [];
if(dashboardPortfolio.length){

const topHolding =
dashboardPortfolio.reduce(
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
if(dashboardPortfolio.length){

const best =
dashboardPortfolio.reduce(
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
if(dashboardPortfolio.length){

const worst =
dashboardPortfolio.reduce(
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

const insightsBox =
document.getElementById(
"aiInsights"
);

if(
insightsBox
){

insightsBox.innerHTML =

`
<li>Total Stocks:
${dashboardPortfolio.length}</li>

<li>Portfolio Loaded Successfully</li>

<li>Track performance regularly</li>
`;

}
const activityTable =
document.getElementById(
"activityTable"
);

const activities =
JSON.parse(
localStorage.getItem(
"recentActivity"
)
) || [];

if(
activityTable
){

activityTable.innerHTML = "";

activities
.slice(0,5)
.forEach(item=>{

activityTable.innerHTML += `

<tr>

<td>${item.date}</td>

<td>${item.activity}</td>

</tr>

`;

});

}


const watchlistData =
JSON.parse(

localStorage.getItem(
"watchlist_" +
userEmail
)

) || [];

const watchlistTable =
document.getElementById(
"dashboardWatchlist"
);

if(
watchlistTable
){

watchlistTable.innerHTML = "";

watchlistData
.slice(0,5)
.forEach(item=>{

watchlistTable.innerHTML += `

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

</tr>

`;

});

}
