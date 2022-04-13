const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')


/**
 * @description Get goals
 * @method GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.status(200).json(goals)
})

/**
 * @description Set goal
 * @method POST /api/goals
 * @access Private
 */
 const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal)
})

/**
 * @description Update goal
 * @method PUT /api/goal/:id
 * @access Private
 */
 const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check if logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(403)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    
    res.status(200).json(updatedGoal)
})

/**
 * @description Delete goal
 * @method DELETE /api/goals/:id
 * @access Private
 */
 const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    
    const user = await User.findById(req.user.id)

    // check for user
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check if logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(403)
        throw new Error('User not authorized')
    }


    await Goal.findByIdAndDelete(goal)

    res.status(200).json({message: `Deleted goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}