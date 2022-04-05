const asyncHandler = require('express-async-handler')

/**
 * @description Get goals
 * @method GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Get goals'})
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


    res.status(200).json({message: 'Set goal'})
})

/**
 * @description Update goal
 * @method PUT /api/goal/:id
 * @access Private
 */
 const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Updated goal ${req.params.id}`})
})

/**
 * @description Delete goal
 * @method DELETE /api/goals/:id
 * @access Private
 */
 const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Deleted goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}