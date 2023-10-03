/auth/passport feels wordy, but we may have google, passport, facebook, and twitter auth routes at some point as well

## USERS: ./auth
#### ./auth/google : sends users through google auth -- **TODO**

### ./auth/passport : sends users through passport authentication
- **POST /auth/passport/register** will register new users
- **POST /auth/passport/login** will pass data to attempt login validation
- **GET /auth/passport** will return a list of users
- **GET /auth/passport/:id** will return a specific user associated with :id
- **PUT /auth/passport/:id** will pass data and UPDATE a specific user associated with :id
- **DELETE /auth/passport/delete/:id** will delete a specific user associated with :id (extra /delete endpoint mainly to avoid easy mistakes at the moment while testing in POSTMAN)


 **Note**: 
 - userId will be issued automatically to ensure unique ids, and will look something like "64ecd3b95408311fe678eb77". 'userId's will be required to make comments and posts, as they are associated by them.
 - the "Token" from the login or registration is needed, be sure to save in local storage or cookies for a time 
 - note that the input password gets turned into a hash: that's how user passwords appear to the database so only the users 'know' their password.



*Ex. Sample User Login payload JSON:*
```

{
    "email": "wendys",
    "password": "clever_password"
}


```

*Ex. Positive Login JSON:*
```
{
    success: true,
    token: 'Bearer ' + token,
    user: { 
        id: user.id, 
        firstname: user.lastname, 
        lastname: user.lastname, 
        email: user.email,
        posts: [...<whatever posts the user has made>] 
        },
}
```
*Ex. Rejected Login JSON:*
```
{
    error: 'Incorrect password',
    status: 400
}
```


*Ex. Sample User Registration payload JSON:*
```

{
    "firstname": "wendy",
    "lastname": "testerburger",
    "email": "sirthisis@wendys.com",
    "password": "clever_password"
}


```


*Ex. Positive User Registration response JSON:*
```
{
    "success": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWNkM2I5NTQwODMxMWZlNjE4ZWI1NyIsImlhdCI6MTY5MzI0MjI5NywiZXhwIjoxNjkzMjQ1ODk3fQ.pZPNbtz_2iHYg3vwsewfzbQIULincTnyd8vVHNoKm8c",
    "user": {
        "password": "$2a$10$XOLZpfarJ0XNPUMWLMd/2OvZadsrft0xBxwd3AW6MHTxMW83.TYD7YC",
        "email": "sirthisis@wendys.com",
        "firstname": "wendy",
        "lastname": "testerburger",
        "_id": "77ecd3b95408311fe678eb77",
        "createdAt": "2023-08-28T17:04:57.425Z",
        "updatedAt": "2023-08-28T17:04:57.425Z",
        "__v": 0
    }
}
```
*Ex. Rejected Registration JSON:*
```
{
    "success": false,
    "errors": [
        {
            "type": "field",
            "value": "",
            "msg": "Invalid value",
            "path": "email",
            "location": "body"
        },
        {
            "type": "field",
            "value": "",
            "msg": "Please provide a valid email.",
            "path": "email",
            "location": "body"
        }
    ]
}
```
