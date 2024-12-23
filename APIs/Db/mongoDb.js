const { MongoClient } = require("mongodb");

module.exports = class Mongo {
    constructor(db, collection) {
        this.uri = "mongodb://127.0.0.1:27017";
        this.db = db;
        this.collection = collection;
        this.client = new MongoClient(this.uri);
    }

    async connection() {
        if (!this.client.topology || !this.client.topology.isConnected()) {
            await this.client.connect();
            console.log("MongoDB connected.");
        }
    }

    database() {
        if (!this.client.topology || !this.client.topology.isConnected()) {
            throw new Error(
                "MongoDB client is not connected. Call connection() first."
            );
        }
        return this.client.db(this.db).collection(this.collection);
    }

    async insertOne(query) {
        await this.connection();
        await this.database().insertOne(query);
    }

    async findOne(query) {
        await this.connection();
        return await this.database().findOne(query);
    }

    async findAll() {
        await this.connection();
        return await this.database().find().toArray();
    }

    async firstOrCreate(query) {
        await this.connection();
        const existingDoc = await this.findOne(query);
        if (!existingDoc) {
            await this.insertOne(query);
        }
        return this.findOne(query);
    }

    async updateOrCreate(filter, updateData) {
        await this.connection();
        const options = { upsert: true };
        const result = await this.database().updateOne(
            filter,
            { $set: updateData },
            options
        );

        if (result.upsertedId) {
            return { created: true, id: result.upsertedId };
        }
        return { updated: true, matchedCount: result.matchedCount };
    }

    async closeConnection() {
        if (
            this.client &&
            this.client.topology &&
            this.client.topology.isConnected()
        ) {
            await this.client.close();
            console.log("MongoDB connection closed.");
        } else {
            console.log("No active MongoDB connection to close.");
        }
    }
};
