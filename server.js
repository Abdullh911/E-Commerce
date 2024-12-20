import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
const app = express();
const port = 3000;

const mongoURI =
    "";
const dbName = "shopCoDb";

app.use(cors());

app.use(express.json());

app.get("/category/:category", async (req, res) => {
    const { category } = req.params;
    const { page = 1, pageSize = 10 } = req.query;

    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(category);

        const skip = (page - 1) * pageSize;
        const result = await collection.find().skip(skip).limit(parseInt(pageSize)).toArray();

        res.json(result);
    } catch (error) {
        console.error("Error fetching category with pagination:", error);
        res.status(500).json({ error: "Failed to fetch category with pagination." });
    } finally {
        await client.close();
    }
});

async function getProductByIdAndCategory(category, id) {
    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(category);
        const product = await collection.findOne({ id: id });

        return product || null;
    } catch (error) {
        console.error("Error fetching product by ID and category:", error);
        throw error;
    } finally {
        await client.close();
    }
}


app.post("/users", async (req, res) => {
    const { email, Fname, Lname, cart, orders, password } = req.body;

    if (!email || !Fname || !Lname || !password) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "User with this email already exists." });
        }

        const newUser = { email, Fname, Lname, cart: cart || [], orders: orders || [], password };

        await usersCollection.insertOne(newUser);

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ error: "Failed to add user." });
    } finally {
        await client.close();
    }
});

app.put("/users/:email", async (req, res) => {
    const { email } = req.params;
    let updatedUser = req.body; 
    
    if (!updatedUser) {
        return res.status(400).json({ error: "No update data provided." });
    }
    delete updatedUser._id;

    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection("users");

        const result = await usersCollection.updateOne(
            { email },
            { $set: updatedUser }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "User not found." });
        }
        
        const updated = await usersCollection.findOne({ email });
        res.json(updated);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user." });
    } finally {
        await client.close();
    }
});


app.get("/users/:email", async (req, res) => {
    const { email } = req.params;

    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user by email:", error);
        res.status(500).json({ error: "Failed to fetch user." });
    } finally {
        await client.close();
    }
});




app.get("/category/:category/product/:id", async (req, res) => {
    const { category, id } = req.params;
    
    
    try {
        const product = await getProductByIdAndCategory(category, id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: `No product found with ID: ${id} in category: ${category}` });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch product." });
    }
});

app.post("/category/:category/filter", async (req, res) => {
    const { category } = req.params; 
    const { page = 1, pageSize = 10 } = req.query;
    const filter = req.body;

    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(category);
        const skip = (page - 1) * pageSize;
        const result = await collection.find(filter).skip(skip).limit(parseInt(pageSize)).toArray();
        res.json(result);
    } catch (error) {
        console.error("Error fetching filtered category:", error);
        res.status(500).json({ error: "Failed to fetch filtered category with pagination." });
    } finally {
        await client.close();
    }
});


app.put("/category/:category/product/:id", async (req, res) => {
    const { category, id } = req.params;
    const updatedFields = req.body;

    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(category);

        const result = await collection.updateOne(
            { id: id },
            { $set: updatedFields }
        );

        if (result.matchedCount > 0) {
            res.json({ message: `Product with ID ${id} updated successfully.` });
        } else {
            res.status(404).json({ error: `No product found with ID: ${id}` });
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product." });
    } finally {
        await client.close();
    }
});

app.delete("/category/:category/product/:id", async (req, res) => {
    const { category, id } = req.params;

    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(category);

        const result = await collection.deleteOne({ id: id });

        if (result.deletedCount > 0) {
            res.json({ message: `Product with ID ${id} deleted successfully.` });
        } else {
            res.status(404).json({ error: `No product found with ID: ${id}` });
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product." });
    } finally {
        await client.close();
    }
});

app.post("/search", async (req, res) => {
    const { filter = {}, page = 1, pageSize = 10 } = req.body;

    const client = new MongoClient(mongoURI);
    try {
        await client.connect();
        const db = client.db(dbName);
        const categories = ["men", "women", "boys", "girls"];
        const searchResults = [];
        for (const category of categories) {
            const collection = db.collection(category);
            const matches = await collection.find(filter).toArray();
            searchResults.push(
                ...matches.map((item) => ({
                    ...item,
                    category,
                }))
            );
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + parseInt(pageSize);
        const paginatedResults = searchResults.slice(startIndex, endIndex);
        res.json(paginatedResults);
    } catch (error) {
        console.error("Error searching in all categories with filter:", error);
        res.status(500).json({ error: "Failed to search across all categories with filter." });
    } finally {
        await client.close();
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});