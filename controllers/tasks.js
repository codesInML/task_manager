const Task = require("../models/Task")
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/customError")

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks, len: tasks.length})
})

const createTasks = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params
    const task = await Task.findOne({_id: taskID})

    if (!task) {
        return next(createCustomError(`No task with the id: ${taskID}`, 404))
    }

    res.status(200).json({task})
})

const updateTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) {
        return next(createCustomError(`No task with the id: ${taskID}`, 404))
    }

    res.json({id: taskID, task})
})

const deleteTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id
    const task = await Task.findByIdAndDelete({_id: taskID})

    if (!task) {
        return next(createCustomError(`No task with the id: ${taskID}`, 404))
    }

    res.status(200).json({message: `Task with the id ${taskID} has been deleted successfully`, task})
})

module.exports = {
    getAllTasks,
    createTasks,
    getTask,
    updateTask,
    deleteTask
}