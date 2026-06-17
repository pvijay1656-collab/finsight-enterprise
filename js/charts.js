/* ==========================================
   FinSight Enterprise
   Chart Management System
========================================== */

let allocationChartInstance = null;
let profitChartInstance = null;
let growthChartInstance = null;
let monthlyChartInstance = null;

/* ==========================================
   ENTERPRISE THEME
========================================== */

const CHART_THEME = {

    primary:
        "#0ea5e9",

    secondary:
        "#10b981",

    danger:
        "#ef4444",

    warning:
        "#f59e0b",

    dark:
        "#0f172a",

    light:
        "#f8fafc"

};

/* ==========================================
   INITIALIZATION
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeCharts();

    }

);

/* ==========================================
   MASTER LOADER
========================================== */

function initializeCharts(){

    loadAllocationChart();

    loadProfitChart();

    loadGrowthChart();

    loadMonthlyChart();

}

/* ==========================================
   ASSET ALLOCATION PIE CHART
========================================== */

function loadAllocationChart(){

    const canvas =

        document.getElementById(
            "allocationChart"
        );

    if(!canvas)
        return;

    const chartData =

        generateAllocationChartData();

    if(allocationChartInstance){

        allocationChartInstance.destroy();

    }

    allocationChartInstance =

        new Chart(

            canvas,

            {

                type:"pie",

                data:{

                    labels:
                        chartData.labels,

                    datasets:[{

                        data:
                            chartData.values,

                        backgroundColor:[

                            "#0ea5e9",
                            "#10b981",
                            "#ef4444",
                            "#f59e0b",
                            "#8b5cf6",
                            "#14b8a6"

                        ]

                    }]

                },

                options:{

                    responsive:true,

                    plugins:{

                        legend:{

                            position:"bottom"

                        }

                    }

                }

            }

        );

}

/* ==========================================
   PROFIT BAR CHART
========================================== */

function loadProfitChart(){

    const canvas =

        document.getElementById(
            "profitChart"
        );

    if(!canvas)
        return;

    const chartData =

        generateProfitChartData();

    if(profitChartInstance){

        profitChartInstance.destroy();

    }

    profitChartInstance =

        new Chart(

            canvas,

            {

                type:"bar",

                data:{

                    labels:
                        chartData.labels,

                    datasets:[{

                        label:
                            "Profit",

                        data:
                            chartData.values,

                        backgroundColor:
                            CHART_THEME.secondary

                    }]

                },

                options:{

                    responsive:true,

                    scales:{

                        y:{
                            beginAtZero:true
                        }

                    }

                }

            }

        );

}

/* ==========================================
   PORTFOLIO GROWTH CHART
========================================== */

function loadGrowthChart(){

    const canvas =

        document.getElementById(
            "growthChart"
        );

    if(!canvas)
        return;

    const history =

        getPortfolioHistory();

    const labels =

        history.map(
            item =>

            new Date(
                item.date
            )
            .toLocaleDateString()

        );

    const values =

        history.map(
            item => item.value
        );

    if(growthChartInstance){

        growthChartInstance.destroy();

    }

    growthChartInstance =

        new Chart(

            canvas,

            {

                type:"line",

                data:{

                    labels:labels,

                    datasets:[{

                        label:
                            "Portfolio Value",

                        data:values,

                        borderColor:
                            CHART_THEME.primary,

                        tension:0.4,

                        fill:false

                    }]

                },

                options:{

                    responsive:true

                }

            }

        );

}

/* ==========================================
   MONTHLY PERFORMANCE
========================================== */

function loadMonthlyChart(){

    const canvas =

        document.getElementById(
            "monthlyChart"
        );

    if(!canvas)
        return;

    const labels = [

        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"

    ];

    const data = [

        3.2,
        5.4,
        -2.1,
        7.6,
        4.1,
        6.8

    ];

    if(monthlyChartInstance){

        monthlyChartInstance.destroy();

    }

    monthlyChartInstance =

        new Chart(

            canvas,

            {

                type:"line",

                data:{

                    labels:labels,

                    datasets:[{

                        label:
                            "Monthly Return %",

                        data:data,

                        borderColor:
                            CHART_THEME.warning,

                        tension:0.3

                    }]

                },

                options:{

                    responsive:true

                }

            }

        );

}

/* ==========================================
   CHART REFRESH
========================================== */

function refreshCharts(){

    loadAllocationChart();

    loadProfitChart();

    loadGrowthChart();

    loadMonthlyChart();

}

/* ==========================================
   AUTO REFRESH
========================================== */

setInterval(

    ()=>{

        refreshCharts();

    },

    30000

);

/* ==========================================
   CHART EXPORT
========================================== */

function exportChart(chartId){

    const canvas =

        document.getElementById(
            chartId
        );

    if(!canvas)
        return;

    const link =
        document.createElement(
            "a"
        );

    link.download =
        chartId + ".png";

    link.href =
        canvas.toDataURL();

    link.click();

}

/* ==========================================
   CHART READY
========================================== */

console.log(
    "Enterprise Charts Loaded"
);
/* ==========================================
   ADVANCED ANALYTICS CHART ENGINE
========================================== */

/* ==========================================
   KPI TREND CHART
========================================== */

let kpiTrendChart = null;

function loadKPITrendChart(){

    const canvas =
        document.getElementById(
            "kpiTrendChart"
        );

    if(!canvas)
        return;

    const labels = [

        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun"

    ];

    const revenue = [

        120000,
        145000,
        180000,
        220000,
        260000,
        310000

    ];

    const expenses = [

        80000,
        85000,
        91000,
        110000,
        125000,
        140000

    ];

    if(kpiTrendChart){

        kpiTrendChart.destroy();

    }

    kpiTrendChart = new Chart(

        canvas,

        {

            type:"line",

            data:{

                labels:labels,

                datasets:[

                    {

                        label:"Revenue",

                        data:revenue,

                        borderColor:"#10b981",

                        tension:0.4

                    },

                    {

                        label:"Expenses",

                        data:expenses,

                        borderColor:"#ef4444",

                        tension:0.4

                    }

                ]

            },

            options:{
                responsive:true
            }

        }

    );

}

/* ==========================================
   SECTOR EXPOSURE CHART
========================================== */

let sectorChart = null;

function loadSectorChart(){

    const canvas =
        document.getElementById(
            "sectorChart"
        );

    if(!canvas)
        return;

    const sectorData =
        calculateSectorExposure();

    if(sectorChart){

        sectorChart.destroy();

    }

    sectorChart = new Chart(

        canvas,

        {

            type:"doughnut",

            data:{

                labels:
                    Object.keys(
                        sectorData
                    ),

                datasets:[{

                    data:
                        Object.values(
                            sectorData
                        )

                }]

            }

        }

    );

}

/* ==========================================
   GOAL PROGRESS CHART
========================================== */

let goalChart = null;

function loadGoalProgressChart(){

    const canvas =
        document.getElementById(
            "goalChart"
        );

    if(!canvas)
        return;

    if(goalChart){

        goalChart.destroy();

    }

    goalChart = new Chart(

        canvas,

        {

            type:"bar",

            data:{

                labels:[

                    "Emergency",
                    "Retirement",
                    "House",
                    "Education"

                ],

                datasets:[{

                    label:"Completion %",

                    data:[

                        68,
                        41,
                        52,
                        76

                    ],

                    backgroundColor:

                    [

                        "#0ea5e9",
                        "#10b981",
                        "#f59e0b",
                        "#8b5cf6"

                    ]

                }]

            }

        }

    );

}

/* ==========================================
   BENCHMARK COMPARISON
========================================== */

let benchmarkChart = null;

function loadBenchmarkChart(){

    const canvas =
        document.getElementById(
            "benchmarkChart"
        );

    if(!canvas)
        return;

    if(benchmarkChart){

        benchmarkChart.destroy();

    }

    benchmarkChart = new Chart(

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

                datasets:[

                    {

                        label:
                            "Portfolio",

                        data:

                        [

                            100,
                            108,
                            115,
                            130,
                            145,
                            162

                        ],

                        borderColor:
                            "#0ea5e9"

                    },

                    {

                        label:
                            "NIFTY 50",

                        data:

                        [

                            100,
                            104,
                            108,
                            116,
                            125,
                            136

                        ],

                        borderColor:
                            "#10b981"

                    }

                ]

            }

        }

    );

}

/* ==========================================
   RISK HEATMAP DATA
========================================== */

function generateRiskMatrix(){

    const riskAssets =

        portfolio.map(asset => {

            return {

                asset:
                    asset.name,

                risk:
                    calculateRiskScore(),

                value:
                    getCurrentValue(asset)

            };

        });

    return riskAssets;

}

/* ==========================================
   MARKET COMPARISON DATA
========================================== */

function getMarketComparisonData(){

    return {

        nifty:

            [100,102,105,108,112],

        sensex:

            [100,101,104,109,113],

        nasdaq:

            [100,104,110,118,127]

    };

}

/* ==========================================
   DASHBOARD WIDGET UPDATE
========================================== */

function updateDashboardWidgets(){

    const summary =
        getPortfolioSummary();

    const investment =
        document.getElementById(
            "dashboardInvestment"
        );

    const currentValue =
        document.getElementById(
            "dashboardCurrentValue"
        );

    const profit =
        document.getElementById(
            "dashboardProfit"
        );

    const roi =
        document.getElementById(
            "dashboardROI"
        );

    const risk =
        document.getElementById(
            "dashboardRisk"
        );

    const diversification =
        document.getElementById(
            "dashboardDiversification"
        );

    if(investment)
        investment.innerText =
            formatCurrency(
                summary.investment
            );

    if(currentValue)
        currentValue.innerText =
            formatCurrency(
                summary.current
            );

    if(profit)
        profit.innerText =
            formatCurrency(
                summary.profit
            );

    if(roi)
        roi.innerText =
            summary.roi + "%";

    if(risk)
        risk.innerText =
            summary.risk;

    if(diversification)
        diversification.innerText =
            summary.diversification;

}

/* ==========================================
   THEME REFRESH
========================================== */

function applyChartTheme(){

    const darkMode =

        document.body.classList.contains(
            "dark-mode"
        );

    if(darkMode){

        Chart.defaults.color =
            "#ffffff";

    }

    else{

        Chart.defaults.color =
            "#111827";

    }

}

/* ==========================================
   REPORT EXPORT ENGINE
========================================== */

function captureAllCharts(){

    const charts = [];

    [

        "allocationChart",
        "profitChart",
        "growthChart",
        "monthlyChart",
        "benchmarkChart"

    ]

    .forEach(id=>{

        const canvas =
            document.getElementById(id);

        if(canvas){

            charts.push({

                id:id,

                image:
                    canvas.toDataURL()

            });

        }

    });

    return charts;

}

/* ==========================================
   ANALYTICS PAGE LOADER
========================================== */

function initializeAdvancedCharts(){

    loadKPITrendChart();

    loadSectorChart();

    loadGoalProgressChart();

    loadBenchmarkChart();

    updateDashboardWidgets();

    applyChartTheme();

}

/* ==========================================
   AUTO INITIALIZATION
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        initializeAdvancedCharts();

    }

);

/* ==========================================
   ENTERPRISE ANALYTICS READY
========================================== */

console.log(
    "Advanced Analytics Charts Loaded"
);