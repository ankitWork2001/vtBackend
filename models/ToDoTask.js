import mongoose from "mongoose";

const toDoTaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    isStarred: { type: Boolean, default: false },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const TodoTaskModel = mongoose.model("ToDoTask", toDoTaskSchema);