# Forum-lite API
A basic api to securely register users and communicate with a MongoDB database.

## Using Forum-Lite
'npm install' to set up dependencies.

On whichever service you will use to host the forum, you will need to provide environment variables, such as MONGO_URI for your MongoDB connection and CLIENT_ID from the Google user authentication logic.(the entire environment variable list used is: MONGO_URI, SESSION_SECRET, CLIENT_ID, CLIENT_SECRET, SECRET)



## USERS: ./auth
### ./auth/google : sends users through google auth 


### ./auth/passport : sends users through passport authentication
- **POST /auth/passport/register** will register new users
- **POST /auth/passport/login** will pass data to attempt login validation
- **GET /auth/passport** will return a list of users
- **GET /auth/passport/:id** will return a specific user associated with :id
- **PUT /auth/passport/:id** will pass data and UPDATE a specific user associated with :id
- **DELETE /auth/passport/delete/:id** will delete a specific user associated with :id (extra /delete endpoint mainly to avoid easy mistakes at the moment while testing in POSTMAN)


## POSTS
- **GET /api/posts** will return a list of posts (may narrow down in the API by topic if fetching content gets silly)
- **POST /api/posts/** will submit new post
- **DELETE /api/posts/:id** will delete post with :id
- TODO: PUT logic

## COMMENTS
- **GET /api/comments/** will return a list of comments (may narrow down in the API by topic if fetching content gets silly)

- **POST /api/comments/** will submit new comment
- **DELETE /api/comments/:id** will delete comments with :id
- TODO: PUT logic
- TODO: **GET /api/comments/:postId** will return a list of comments only related to post with :postId
