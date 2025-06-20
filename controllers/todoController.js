import { TodoTaskModel } from "../models/ToDoTask.js";
export const getAllTodoController = async (req, res) => {
    try {
        const todo = await TodoTaskModel.find();
        if (!todo) {
            return res.status(400).json({ success: false, message: "Items not found!" })
        }
        if(todo.length===0){
            return res.status(400).json({ success: true, message: "Todo is empty.",data:todo })

        }
        res.status(200).json({ success: true, message: "Successfully found all Items.", data: todo });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
};

export const createTodoController = async (req, res) => {
    try {
        const { description, dueDate, isStarred } = req.body;
        const userId = req.user.id;

        // const userId = req.body.id;

        if (!description || !dueDate || !isStarred) {
            return res.status(400).json({ success: false, message: "Each field is required." });
        }

        const newTask = new TodoTaskModel({
            userId,
            description,
            dueDate,
            isStarred
        });

        const savedTask = await newTask.save();

        res.status(201).json({ success: true, message: "Todo created successfully.", data: savedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to create todo.", error: error.message });
    }
};

export const updateTodoController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updateTodo = await TodoTaskModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updateTodo) {
            return res.status(400).json({ success: false, message: "Todo not found with this ID" })
        }

        res.status(200).json({ success: true, message: "Todo updated successfully", data: updateTodo })


    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
};

export const deleteSpecificTodoController = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await TodoTaskModel.findByIdAndDelete(id);
        if (!deleteTodo) {
            return res.status(400).json({ success: false, message: "Todo not found with this ID" });
        }
        res.status(200).json({ success: true, message: "Todo deleted successfully", data: deleteTodo })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
};