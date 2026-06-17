if(
    localStorage.getItem("loggedIn")
    !== "true"
){
    window.location.href =
        "login.html";
}
/* ==========================================
   FinSight Enterprise
   Portfolio Management Engine
========================================== */

let portfolio = [];

let selectedAssetId = null;

/* ==========================================
   INITIALIZATION
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPortfolio();

        initializePortfolioForm();

        initializeSearch();

        renderPortfolio();

        updatePortfolioPrices();

    }
);

/* ==========================================
   LOAD PORTFOLIO
========================================== */

function loadPortfolio(){

  const userEmail =
    localStorage.getItem(
        "userEmail"
    )?.toLowerCase().trim();

    const data =
        localStorage.getItem(
            "portfolio_" +
            userEmail
        );

    if(data){

        portfolio =
            JSON.parse(data);

    }

}

/* ==========================================
   SAVE PORTFOLIO
========================================== */

function savePortfolio(){

    const userEmail =
    localStorage.getItem(
        "userEmail"
    )?.toLowerCase().trim();

    localStorage.setItem(

        "portfolio_" +
        userEmail,

        JSON.stringify(
            portfolio
        )

    );

}

/* ==========================================
   ADD ASSET
========================================== */

function initializePortfolioForm(){

    const form =
        document.getElementById(
            "assetForm"
        );

    if(!form) return;

    form.addEventListener(
        "submit",
        addAsset
    );

}

function addAsset(event){

    event.preventDefault();

    const asset = {

        id:
            generateId(),

        name:
            document.getElementById(
                "assetName"
            ).value,

        symbol:

            document.getElementById(
                "assetSymbol"
            ).value,
        

        type:
            document.getElementById(
                "assetType"
            ).value,

        quantity:
            parseFloat(
                document.getElementById(
                    "quantity"
                ).value
            ),

        buyPrice:
    parseFloat(
        document.getElementById(
            "buyPrice"
        ).value
    ),

currentPrice: 0,

createdAt:
            new Date()
            .toISOString()

    };

    portfolio.push(asset);

    savePortfolio();

    renderPortfolio();

    updatePortfolioPrices();

    event.target.reset();

    success(
        "Asset Added"
    );

}

/* ==========================================
   DELETE ASSET
========================================== */

function deleteAsset(id){

    const confirmDelete =

        confirm(
            "Delete Asset?"
        );

    if(!confirmDelete)
        return;

    portfolio =

        portfolio.filter(

            asset =>
            asset.id !== id

        );

    savePortfolio();

    renderPortfolio();

    success(
        "Asset Deleted"
    );

}

/* ==========================================
   EDIT ASSET
========================================== */

function editAsset(id){

    const asset =

        portfolio.find(

            item =>
            item.id === id

        );

    if(!asset)
        return;

    selectedAssetId =
        id;

    document.getElementById(
        "editId"
    ).value =
        asset.id;

    document.getElementById(
        "editAssetName"
    ).value =
        asset.name;

    document.getElementById(
        "editQuantity"
    ).value =
        asset.quantity;

    document.getElementById(
        "editBuyPrice"
    ).value =
        asset.buyPrice;

    document.getElementById(
        "editCurrentPrice"
    ).value =
        asset.currentPrice;

    document.getElementById(
        "editModal"
    ).style.display =
        "block";

}

function updateAsset(){

    const asset =

        portfolio.find(

            item =>
            item.id ===
            selectedAssetId

        );

    if(!asset)
        return;

    asset.name =
        document.getElementById(
            "editAssetName"
        ).value;

    asset.quantity =
        parseFloat(
            document.getElementById(
                "editQuantity"
            ).value
        );

    asset.buyPrice =
        parseFloat(
            document.getElementById(
                "editBuyPrice"
            ).value
        );

    asset.currentPrice =
        parseFloat(
            document.getElementById(
                "editCurrentPrice"
            ).value
        );

    savePortfolio();

    renderPortfolio();

    closeModal();

    success(
        "Asset Updated"
    );

}

/* ==========================================
   CLOSE MODAL
========================================== */

function closeModal(){

    document.getElementById(
        "editModal"
    ).style.display =
        "none";

}

/* ==========================================
   INVESTMENT CALCULATIONS
========================================== */

function getInvestment(asset){

    return (
        asset.quantity *
        asset.buyPrice
    );

}

function getCurrentValue(asset){

    return (
        asset.quantity *
        asset.currentPrice
    );

}

function getProfit(asset){

    return (
        getCurrentValue(asset)
        -
        getInvestment(asset)
    );

}

function getROI(asset){

    const investment =

        getInvestment(asset);

    if(investment === 0)
        return 0;

    return (

        (
            getProfit(asset)
            /
            investment
        ) * 100

    ).toFixed(2);

}

/* ==========================================
   RENDER TABLE
========================================== */

function renderPortfolio(){

    const table =

        document.getElementById(
            "portfolioTable"
        );

    if(!table)
        return;

    table.innerHTML = "";

    portfolio.forEach(asset => {

        table.innerHTML += `

        <tr>

            <td>${asset.id}</td>

            <td>${asset.name}</td>

            <td>${asset.type}</td>

            <td>${asset.quantity}</td>

            <td>${formatCurrency(asset.buyPrice)}</td>

            <td>${formatCurrency(asset.currentPrice)}</td>

            <td>${formatCurrency(getInvestment(asset))}</td>

            <td>${formatCurrency(getCurrentValue(asset))}</td>

            <td>${formatCurrency(getProfit(asset))}</td>

            <td>

                <button
                onclick="editAsset('${asset.id}')">

                Edit

                </button>

                <button
                onclick="deleteAsset('${asset.id}')">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

    updateSummaryCards();

}

/* ==========================================
   SUMMARY METRICS
========================================== */

function updateSummaryCards(){

    let totalInvestment = 0;

    let totalCurrentValue = 0;

    portfolio.forEach(asset => {

        totalInvestment +=
            getInvestment(asset);

        totalCurrentValue +=
            getCurrentValue(asset);

    });

    const totalProfit =

        totalCurrentValue -
        totalInvestment;

    const roi =

        totalInvestment === 0

        ? 0

        :

        (
            (
                totalProfit /
                totalInvestment
            ) * 100
        )
        .toFixed(2);

    document.getElementById(
        "totalInvestment"
    ).innerText =
        formatCurrency(
            totalInvestment
        );

    document.getElementById(
        "currentValue"
    ).innerText =
        formatCurrency(
            totalCurrentValue
        );

    document.getElementById(
        "totalProfit"
    ).innerText =
        formatCurrency(
            totalProfit
        );

    document.getElementById(
        "portfolioROI"
    ).innerText =
        roi + "%";

}

/* ==========================================
   SEARCH
========================================== */

function initializeSearch(){

    const searchBox =

        document.getElementById(
            "searchAsset"
        );

    if(!searchBox)
        return;

    searchBox.addEventListener(
        "keyup",
        searchPortfolio
    );

}

function searchPortfolio(){

    const keyword =

        document.getElementById(
            "searchAsset"
        ).value
        .toLowerCase();

    const rows =

        document.querySelectorAll(
            "#portfolioTable tr"
        );

    rows.forEach(row => {

        const text =
            row.innerText
            .toLowerCase();

        row.style.display =

            text.includes(
                keyword
            )

            ? ""

            : "none";

    });

}

/* ==========================================
   EXPORT HOOKS
========================================== */

function exportPDF(){

    alert(
        "PDF Export Module Connected"
    );

}

function exportExcel(){

    alert(
        "Excel Export Module Connected"
    );

}

/* ==========================================
   READY
========================================== */

console.log(
    "Portfolio Engine Loaded"
);
/* ==========================================
   ADVANCED PORTFOLIO ANALYTICS
========================================== */

/* ==========================================
   ASSET ALLOCATION
========================================== */

function calculateAssetAllocation(){

    const allocation = {};

    portfolio.forEach(asset => {

        const value =
            getCurrentValue(asset);

        if(!allocation[asset.type]){

            allocation[asset.type] = 0;

        }

        allocation[asset.type] += value;

    });

    return allocation;

}

/* ==========================================
   DIVERSIFICATION SCORE
========================================== */

function calculateDiversificationScore(){

    const assetTypes =

        new Set(
            portfolio.map(
                item => item.type
            )
        );

    const count =
        assetTypes.size;

    if(count >= 5)
        return "Excellent";

    if(count >= 3)
        return "Good";

    return "Poor";

}

/* ==========================================
   TOP GAINER
========================================== */

function getTopGainer(){

    if(portfolio.length === 0)
        return null;

    return portfolio.reduce(

        (best,current)=>

            getProfit(current) >
            getProfit(best)

            ? current

            : best

    );

}

/* ==========================================
   TOP LOSER
========================================== */

function getTopLoser(){

    if(portfolio.length === 0)
        return null;

    return portfolio.reduce(

        (worst,current)=>

            getProfit(current) <
            getProfit(worst)

            ? current

            : worst

    );

}

/* ==========================================
   PORTFOLIO RISK SCORE
========================================== */

function calculateRiskScore(){

    let equityValue = 0;

    let totalValue = 0;

    portfolio.forEach(asset=>{

        const value =
            getCurrentValue(asset);

        totalValue += value;

        if(

            asset.type === "Stock"
            ||
            asset.type === "Crypto"

        ){

            equityValue += value;

        }

    });

    if(totalValue === 0)
        return "Low";

    const ratio =

        (
            equityValue
            /
            totalValue
        ) * 100;

    if(ratio > 70)
        return "High";

    if(ratio > 40)
        return "Medium";

    return "Low";

}

/* ==========================================
   REBALANCING ENGINE
========================================== */

function getRebalancingSuggestion(){

    const allocation =
        calculateAssetAllocation();

    const total =
        Object.values(allocation)
        .reduce(
            (a,b)=>a+b,
            0
        );

    const suggestions = [];

    Object.keys(allocation)
    .forEach(type=>{

        const percentage =

            (
                allocation[type]
                /
                total
            ) * 100;

        if(percentage > 50){

            suggestions.push(

                `Reduce ${type} exposure (${percentage.toFixed(1)}%)`

            );

        }

    });

    if(
        suggestions.length === 0
    ){

        suggestions.push(
            "Portfolio Well Balanced"
        );

    }

    return suggestions;

}

/* ==========================================
   AI INSIGHTS
========================================== */

function generatePortfolioInsights(){

    const insights = [];

    const risk =
        calculateRiskScore();

    if(risk === "High"){

        insights.push(

            "Portfolio Risk is High"

        );

    }

    const diversification =

        calculateDiversificationScore();

    if(
        diversification === "Poor"
    ){

        insights.push(

            "Increase Diversification"

        );

    }

    const loser =
        getTopLoser();

    if(
        loser &&
        getProfit(loser) < 0
    ){

        insights.push(

            `${loser.name} is underperforming`

        );

    }

    return insights;

}

/* ==========================================
   SECTOR ANALYSIS
========================================== */

function calculateSectorExposure(){

    const sectors = {};

    portfolio.forEach(asset=>{

        const sector =
            asset.sector ||
            "Other";

        if(!sectors[sector]){

            sectors[sector] = 0;

        }

        sectors[sector] +=
            getCurrentValue(asset);

    });

    return sectors;

}

/* ==========================================
   PORTFOLIO PERFORMANCE HISTORY
========================================== */

function savePortfolioSnapshot(){

    const history =

        JSON.parse(
            localStorage.getItem(
                "portfolio_history"
            )
        ) || [];

    let total = 0;

    portfolio.forEach(asset=>{

        total +=
            getCurrentValue(asset);

    });

    history.push({

        date:
            new Date()
            .toISOString(),

        value:
            total

    });

    localStorage.setItem(

        "portfolio_history",

        JSON.stringify(history)

    );

}

function getPortfolioHistory(){

    return JSON.parse(

        localStorage.getItem(
            "portfolio_history"
        )

    ) || [];

}

/* ==========================================
   CHART DATA GENERATION
========================================== */

function generateAllocationChartData(){

    const allocation =
        calculateAssetAllocation();

    return {

        labels:
            Object.keys(
                allocation
            ),

        values:
            Object.values(
                allocation
            )

    };

}

function generateProfitChartData(){

    return {

        labels:

            portfolio.map(
                asset=>asset.name
            ),

        values:

            portfolio.map(
                asset=>getProfit(asset)
            )

    };

}

/* ==========================================
   INVESTMENT SUMMARY
========================================== */

function getPortfolioSummary(){

    let investment = 0;
    let current = 0;

    portfolio.forEach(asset=>{

        investment +=
            getInvestment(asset);

        current +=
            getCurrentValue(asset);

    });

    return {

        investment,

        current,

        profit:
            current - investment,

        roi:
            calculateROI(
                investment,
                current
            ),

        diversification:
            calculateDiversificationScore(),

        risk:
            calculateRiskScore()

    };

}

/* ==========================================
   EXPORT READY DATA
========================================== */

function getPortfolioExportData(){

    return portfolio.map(asset=>({

        Asset:
            asset.name,

        Type:
            asset.type,

        Quantity:
            asset.quantity,

        BuyPrice:
            asset.buyPrice,

        CurrentPrice:
            asset.currentPrice,

        Investment:
            getInvestment(asset),

        CurrentValue:
            getCurrentValue(asset),

        Profit:
            getProfit(asset)

    }));

}

/* ==========================================
   AUTO SAVE SNAPSHOT
========================================== */

setInterval(

    ()=>{

        if(
            portfolio.length > 0
        ){

            savePortfolioSnapshot();

        }

    },

    86400000

);

/* ==========================================
   ANALYTICS ENGINE READY
========================================== */

console.log(
    "Portfolio Analytics Engine Loaded"
);
async function updatePortfolioPrices(){

    for(const asset of portfolio){

        const livePrice = await fetchStockPrice(
            asset.symbol
        );

        if(livePrice){

            asset.currentPrice =
                livePrice;

        }

    }

    savePortfolio();

    renderPortfolio();

}
setInterval(

    updatePortfolioPrices,

    60000

);