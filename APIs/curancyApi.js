const axios = require("axios");
const Mongo = require("./Db/mongoDb");

const mongo = new Mongo("zbab", "currency");

const key = "4ec3ae8e4d68bd8e404ae89e";
const currency = "SAR";

(async () => {
    try {
        // Fetch exchange rates
        const response = await axios.get(
            `https://v6.exchangerate-api.com/v6/${key}/latest/${currency}`
        );
        const rates = response.data.conversion_rates;

        // Insert or update currency data
        for (const [currency, rate] of Object.entries(rates)) {
            await mongo.firstOrCreate({
                title: currency,
                rate: rate,
                rate_date: new Date(),
            });
        }
        console.log("Currency data processed successfully.");
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        await mongo.closeConnection();
    }
})();
