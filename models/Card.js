import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    download_url: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Card || mongoose.model('Card', CardSchema);