/* ==========================================
   FinSight Enterprise
   Financial Calculation Engine
========================================== */

/* ==========================================
   SIP CALCULATOR
========================================== */

function calculateSIP(){

    const monthlySIP = parseFloat(
        document.getElementById(
            "sipAmount"
        ).value
    );

    const annualRate = parseFloat(
        document.getElementById(
            "sipRate"
        ).value
    );

    const years = parseFloat(
        document.getElementById(
            "sipYears"
        ).value
    );

    const monthlyRate =
        annualRate / 12 / 100;

    const months =
        years * 12;

    const futureValue =

        monthlySIP *

        (
            (
                Math.pow(
                    1 + monthlyRate,
                    months
                ) - 1
            )
            /
            monthlyRate
        )

        *
        (
            1 + monthlyRate
        );

    document.getElementById(
        "sipResult"
    ).innerText =

        `Future Value:
        ${formatCurrency(
            futureValue
        )}`;

    updateWealthProjection(
        futureValue
    );

}

/* ==========================================
   EMI CALCULATOR
========================================== */

function calculateEMI(){

    const principal = parseFloat(
        document.getElementById(
            "loanAmount"
        ).value
    );

    const annualRate = parseFloat(
        document.getElementById(
            "loanRate"
        ).value
    );

    const years = parseFloat(
        document.getElementById(
            "loanYears"
        ).value
    );

    const monthlyRate =
        annualRate /
        12 /
        100;

    const months =
        years * 12;

    const emi =

        (
            principal *
            monthlyRate *
            Math.pow(
                1 + monthlyRate,
                months
            )
        )
        /
        (
            Math.pow(
                1 + monthlyRate,
                months
            ) - 1
        );

    document.getElementById(
        "emiResult"
    ).innerText =

        `Monthly EMI:
        ${formatCurrency(
            emi
        )}`;

}

/* ==========================================
   CAGR CALCULATOR
========================================== */

function calculateCAGR(){

    const initialValue =
        parseFloat(
            document.getElementById(
                "cagrInitial"
            ).value
        );

    const finalValue =
        parseFloat(
            document.getElementById(
                "cagrFinal"
            ).value
        );

    const years =
        parseFloat(
            document.getElementById(
                "cagrYears"
            ).value
        );

    const cagr =

        (
            Math.pow(
                (
                    finalValue /
                    initialValue
                ),
                (
                    1 /
                    years
                )
            )
            - 1
        )
        * 100;

    document.getElementById(
        "cagrResult"
    ).innerText =

        `CAGR:
        ${cagr.toFixed(2)}%`;

}

/* ==========================================
   ROI CALCULATOR
========================================== */

function calculateROIResult(){

    const investment =
        parseFloat(
            document.getElementById(
                "roiInvestment"
            ).value
        );

    const current =
        parseFloat(
            document.getElementById(
                "roiCurrent"
            ).value
        );

    const roi =

        (
            (
                current -
                investment
            )
            /
            investment
        )
        * 100;

    document.getElementById(
        "roiResult"
    ).innerText =

        `ROI:
        ${roi.toFixed(2)}%`;

}

/* ==========================================
   GOAL PLANNER
========================================== */

function calculateGoalSIP(){

    const targetAmount =
        parseFloat(
            document.getElementById(
                "goalTarget"
            ).value
        );

    const annualReturn =
        parseFloat(
            document.getElementById(
                "goalReturn"
            ).value
        );

    const years =
        parseFloat(
            document.getElementById(
                "goalYears"
            ).value
        );

    const monthlyRate =
        annualReturn /
        12 /
        100;

    const months =
        years * 12;

    const requiredSIP =

        targetAmount /

        (
            (
                (
                    Math.pow(
                        1 +
                        monthlyRate,
                        months
                    ) - 1
                )
                /
                monthlyRate
            )
            *
            (
                1 +
                monthlyRate
            )
        );

    document.getElementById(
        "goalResult"
    ).innerText =

        `Required SIP:
        ${formatCurrency(
            requiredSIP
        )}`;

    updateGoalAchievement(
        targetAmount
    );

}

/* ==========================================
   RETIREMENT PLANNER
========================================== */

function calculateRetirement(){

    const currentAge =
        parseInt(
            document.getElementById(
                "currentAge"
            ).value
        );

    const retirementAge =
        parseInt(
            document.getElementById(
                "retirementAge"
            ).value
        );

    const monthlyExpense =
        parseFloat(
            document.getElementById(
                "monthlyExpense"
            ).value
        );

    const yearsToRetirement =
        retirementAge -
        currentAge;

    const corpus =

        monthlyExpense *
        12 *
        25;

    document.getElementById(
        "retirementResult"
    ).innerText =

        `Required Corpus:
        ${formatCurrency(
            corpus
        )}`;

    updateRetirementScore(
        yearsToRetirement
    );

}

/* ==========================================
   INFLATION CALCULATOR
========================================== */

function calculateInflation(){

    const cost =
        parseFloat(
            document.getElementById(
                "inflationCost"
            ).value
        );

    const inflationRate =
        parseFloat(
            document.getElementById(
                "inflationRate"
            ).value
        );

    const years =
        parseFloat(
            document.getElementById(
                "inflationYears"
            ).value
        );

    const futureCost =

        cost *

        Math.pow(

            (
                1 +
                inflationRate / 100
            ),

            years

        );

    document.getElementById(
        "inflationResult"
    ).innerText =

        `Future Cost:
        ${formatCurrency(
            futureCost
        )}`;

    updateInflationImpact(
        inflationRate
    );

}

/* ==========================================
   WEALTH DASHBOARD
========================================== */

function updateWealthProjection(value){

    const element =
        document.getElementById(
            "wealthProjection"
        );

    if(element){

        element.innerText =
            formatCurrency(value);

    }

}

function updateRetirementScore(years){

    const score =
        Math.max(
            0,
            100 -
            years
        );

    const element =
        document.getElementById(
            "retirementScore"
        );

    if(element){

        element.innerText =
            score;

    }

}

function updateGoalAchievement(target){

    const percentage = 75;

    const element =
        document.getElementById(
            "goalAchievement"
        );

    if(element){

        element.innerText =
            percentage + "%";

    }

}

function updateInflationImpact(rate){

    const element =
        document.getElementById(
            "inflationImpact"
        );

    if(element){

        element.innerText =
            rate + "%";

    }

}

/* ==========================================
   FINANCIAL HEALTH SCORE
========================================== */

function calculateFinancialHealth(){

    let score = 0;

    score += 25;
    score += 20;
    score += 15;
    score += 30;

    return score;

}

/* ==========================================
   READY
========================================== */

console.log(
    "Financial Engine Loaded"
);
/* ==========================================
   ADVANCED FINANCIAL ANALYTICS
========================================== */

/* ==========================================
   MONTE CARLO SIMULATION
========================================== */

function runMonteCarloSimulation(

    initialInvestment,
    monthlyContribution,
    expectedReturn,
    volatility,
    years,
    simulations = 1000

){

    const results = [];

    for(let i=0;i<simulations;i++){

        let portfolio =
            initialInvestment;

        for(let y=0;y<years;y++){

            const randomReturn =

                expectedReturn +

                (
                    (
                        Math.random() * 2
                    )
                    - 1
                )

                * volatility;

            portfolio =

                portfolio *
                (
                    1 +
                    randomReturn/100
                );

            portfolio +=

                monthlyContribution *
                12;

        }

        results.push(
            portfolio
        );

    }

    results.sort(
        (a,b)=>a-b
    );

    return {

        pessimistic:
            results[
                Math.floor(
                    simulations * 0.10
                )
            ],

        median:
            results[
                Math.floor(
                    simulations * 0.50
                )
            ],

        optimistic:
            results[
                Math.floor(
                    simulations * 0.90
                )
            ]

    };

}

/* ==========================================
   FIRE CALCULATOR
========================================== */

function calculateFIRE(

    annualExpense

){

    return annualExpense * 25;

}

/* ==========================================
   NET WORTH TRACKER
========================================== */

function calculateNetWorth(

    assets,
    liabilities

){

    return assets -
           liabilities;

}

/* ==========================================
   EMERGENCY FUND
========================================== */

function calculateEmergencyFund(

    monthlyExpense,
    months = 6

){

    return (

        monthlyExpense *
        months

    );

}

/* ==========================================
   TAX PLANNER
========================================== */

function estimateTax(

    annualIncome

){

    let tax = 0;

    if(

        annualIncome <= 700000

    ){

        tax = 0;

    }

    else if(

        annualIncome <= 1200000

    ){

        tax =

            annualIncome *
            0.10;

    }

    else{

        tax =

            annualIncome *
            0.20;

    }

    return tax;

}

/* ==========================================
   ASSET ALLOCATION OPTIMIZER
========================================== */

function recommendAllocation(

    riskProfile

){

    switch(riskProfile){

        case "Low":

            return {

                debt:60,

                equity:25,

                gold:15

            };

        case "Medium":

            return {

                debt:30,

                equity:55,

                gold:15

            };

        case "High":

            return {

                debt:10,

                equity:80,

                gold:10

            };

        default:

            return {

                debt:40,

                equity:50,

                gold:10

            };

    }

}

/* ==========================================
   RETIREMENT SUCCESS SCORE
========================================== */

function calculateRetirementSuccess(

    currentCorpus,
    requiredCorpus

){

    const score =

        (
            currentCorpus /
            requiredCorpus
        ) * 100;

    return Math.min(
        score,
        100
    );

}

/* ==========================================
   GOAL FORECASTING
========================================== */

function forecastGoalAchievement(

    currentAmount,
    targetAmount,
    annualReturn,
    monthlyContribution

){

    let months = 0;

    let value =
        currentAmount;

    const monthlyRate =

        annualReturn /
        12 /
        100;

    while(

        value <
        targetAmount

    ){

        value =

            value *

            (
                1 +
                monthlyRate
            )

            +

            monthlyContribution;

        months++;

        if(months > 1000)
            break;

    }

    return months;

}

/* ==========================================
   SHARPE RATIO
========================================== */

function calculateSharpeRatio(

    portfolioReturn,
    riskFreeRate,
    standardDeviation

){

    return (

        (
            portfolioReturn -
            riskFreeRate
        )

        /

        standardDeviation

    ).toFixed(2);

}

/* ==========================================
   SORTINO RATIO
========================================== */

function calculateSortinoRatio(

    portfolioReturn,
    riskFreeRate,
    downsideDeviation

){

    return (

        (
            portfolioReturn -
            riskFreeRate
        )

        /

        downsideDeviation

    ).toFixed(2);

}

/* ==========================================
   FINANCIAL HEALTH AI SCORE
========================================== */

function calculateAIScore(

    savingsRate,
    debtRatio,
    emergencyFundMonths,
    investments

){

    let score = 0;

    score +=
        savingsRate * 0.4;

    score +=
        (100 - debtRatio) * 0.2;

    score +=
        emergencyFundMonths * 5;

    score +=
        investments * 0.00001;

    return Math.min(

        Math.round(score),

        100

    );

}

/* ==========================================
   PERSONAL FINANCE INSIGHTS
========================================== */

function generateFinanceInsights(

    score

){

    const insights = [];

    if(score >= 85){

        insights.push(

            "Excellent financial health"

        );

    }

    else if(score >= 65){

        insights.push(

            "Good financial foundation"

        );

    }

    else{

        insights.push(

            "Increase savings and investments"

        );

    }

    insights.push(

        "Review asset allocation quarterly"

    );

    insights.push(

        "Maintain emergency fund"

    );

    return insights;

}

/* ==========================================
   WEALTH PROJECTION ENGINE
========================================== */

function projectFutureWealth(

    currentInvestment,
    monthlyContribution,
    annualReturn,
    years

){

    let value =
        currentInvestment;

    const monthlyRate =

        annualReturn /
        12 /
        100;

    const months =
        years * 12;

    for(

        let i=0;
        i<months;
        i++

    ){

        value =

            value *

            (
                1 +
                monthlyRate
            )

            +

            monthlyContribution;

    }

    return value;

}

/* ==========================================
   PORTFOLIO REBALANCING
========================================== */

function suggestRebalancing(

    allocation

){

    const suggestions = [];

    if(

        allocation.equity > 80

    ){

        suggestions.push(

            "Reduce equity exposure"

        );

    }

    if(

        allocation.debt < 10

    ){

        suggestions.push(

            "Increase debt allocation"

        );

    }

    if(

        allocation.gold < 5

    ){

        suggestions.push(

            "Add gold allocation"

        );

    }

    return suggestions;

}

/* ==========================================
   ENTERPRISE ANALYTICS READY
========================================== */

console.log(
    "Advanced Financial Analytics Loaded"
);