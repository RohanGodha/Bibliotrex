const express = require('express');
const {users}= require("../data/users.json"); 

const router = express.Router();

/**
* Route: /users
* Method: GET
* Description: Get all users
* Access: Public
*Parameters: None
*/

router.get("/", (req, res) => {
    res.status(200).json({
        message: 'Get all users',
        success: true, 
        data: users,
    });
});

/**
* Route: /users/
* Method: GET
* Description: Get single user by id
* Access: Public
*Parameters: id 
*/

router.get("/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id ===id);
    if (!user) {    
        return res.status(404).json({
            message: 'User not found',
            success: false,
        });
    }
    res.status(200).json({
         success: true,
        data: user,
    });
});

/**
* Route: /users/
* Method: POST
* Description: Create New User
* Access: Public
*Parameters: id 
*/

router.post("/", (req, res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body;
    const user = users.find((each) => each.id ===id);
    if (user) {
        return res.status(404).json({
            message: "User already exists with ID",
            success: false,
        });
    }
    users.push({id, name, surname, email, subscriptionType, subscriptionDate});
    return res.status(201).json({
        message: 'User created successfully',
        success: true,
        data: users,
    });
});

/**
* Route: /users/:id
* Method: PUT
* Description: Update User
* Access: Public
*Parameters: 
*/

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    const user = users.find((each) => each.id ===id);
    if (!user) {
        return res.status(404).json({
            message: "User Not Found",
            success: false,
        });
    }
    const updatedUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each, 
                ...data
            }; 
    }
    return each;
});
    return res.status(200).json({
        message: 'User updated successfully',
        success: true,
        data: updatedUser,

});
});

/* Route: /users/:id
* Method: Delete
* Description: Delete User by id
* Access: Public
*Parameters: id
*/

router.delete("/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((each) => each.id ===id);
    if (!user) {
        return res.status(404).json({
            message: "User to be deleted was not Found",
            success: false,
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1);
    return res.status(202).json({
        message: 'User deleted successfully',
        success: true,
        data: users,
    });
});


module.exports = router;