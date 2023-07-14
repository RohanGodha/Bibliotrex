const express = require('express');
const {users}= require("./data/users.json");
const app = express();

const PORT= 8081;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World'
    });
});

/**
* Route: /users
* Method: GET
* Description: Get all users
* Access: Public
*Parameters: None
*/

app.get("/users", (req, res) => {
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

app.get("/users/:id", (req, res) => {
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

app.post("/users", (req, res) => {
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

app.put("/users/:id", (req, res) => {
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

app.get("*", (req, res) => {
    res.status(404).json({
        message: 'The Route Does not Exist'
        });
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
