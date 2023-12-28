import Card from "@/models/Card";
import { headers } from "next/headers";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
// Here is the set of CRUD (Create, Read, Update, Delete) operations for a server-side application using Next.js, a popular React framework. These operations are defined as asynchronous functions, which means they return a Promise that resolves when the operation is complete.

// The GET function retrieves a card by its ID from the database. If an ID is provided in the request headers, it will find and return the card with that ID. If no ID is provided, it will return all cards.
export async function GET(req, res) {
    try {
        const headerList = headers();
        const id = headerList.get('id');
        await connectDB();

        if (id) {
            const author = await Card.findOne({ id });
            return NextResponse.json({ message: "author found", author }, { status: 200 });
        } else {
            const authors = await Card.find();
            return NextResponse.json({ message: "authors found", authors }, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
// The POST function creates a new card. It first checks if a card with the same author, download_url, or id already exists. If it does, it returns a message indicating that these fields should be unique. If no such card exists, it creates a new card with the data provided in the request body.
export async function POST(req, res) {
    const body = await req.json();

    try {
        await connectDB();
        const author = await Card.findOne({ $or: [{ author: body.author }, { download_url: body.download_url }, { id: body.id }] });
        const authors = await Card.find();

        if (author) {
            return NextResponse.json({ message: "fields should be unique" }, { status: 404 });
        }

        const createdCard = await Card.create(body);
        return NextResponse.json({ message: "card added", authors }, { status: 200 });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
// The PUT function updates an existing card. It retrieves the card by its ID from the request headers, then updates the fields provided in the request body. If the card doesn't exist in the database, it returns a message indicating that it cannot be updated.
export async function PUT(req, res) {
    try {
        const body = await req.json();
        const headerList = headers();
        const cardId = headerList.get('id');
        const { id, download_url, author } = body;

        const card = await Card.findOne({ id: cardId });

        if (!card) {
            return NextResponse.json({ message: "cannot update since it is not on database it is on api of picsum" });
        }

        if (id) {
            card.id = id;
        }

        if (download_url) {
            card.download_url = download_url;
        }

        if (author) {
            card.author = author;
        }

        await card.save();
        const authors = await Card.find();
        return NextResponse.json({ message: "card updated", authors });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

// The DELETE function deletes a card by its ID. If the card is found in the database, it is deleted and a success message is returned. If the card is not found, it returns a message indicating that it cannot be deleted.
export async function DELETE(req, res) {
    try {
        const headerList = headers();
        const id = headerList.get('id');
        console.log(id)
        const result = await Card.deleteOne({ id });
        const authors = await Card.find();

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "cannot delete since it is not on database it is on api of picsum", authors });
        } else {
            return NextResponse.json({ message: "card deleted ", authors });
        }
    } catch (error) {
        return NextResponse.json({ message: error.message });
    }
}

// In all these functions, connectDB is called to establish a connection to the database before performing any operations. The Card model is used to interact with the cards collection in the database. The NextResponse.json method is used to send a JSON response with the result of the operation.
