const API_KEY = "5544d871ea2144998e90f4e1175842ff";

async function fetchStockPrice(symbol){

    try{

        const response = await fetch(

            `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${API_KEY}`

        );

        const data = await response.json();

        return parseFloat(data.price);

    }

    catch(error){

        console.error(error);

        return null;

    }

}