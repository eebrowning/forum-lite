## POSTS
- **GET /api/posts** will return a list of posts (may narrow down in the API by topic if fetching content gets silly)
- **POST /api/posts/** will submit new post
- **GET /api/posts/:id** will retrieve post with :id

- **DELETE /api/posts/:id** will delete post with :id

- TODO: PUT logic


*Ex. Sample Post payload JSON:*
```
{
    "user": 555dffdfd9ca3accac55f5dfc2,
    "title": "Some title",
    "body": "Some string of reasonable length",
    "topic": "Some Topic"
}

```

*Ex. Positive Post response JSON:*
```
{
    "success": true,
    "id": "7edf55d9cc2azc3d7855977",
    "data": {
        "user": 555dffdfd9ca3accac55f5dfc2,
        "title": "Some title",
        "body": "Some string of reasonable length",
        "topic": "Some Topic",
        "_id": "64edf54d9ca3acc3d7855971",
        "createdAt": "2023-08-29T13:40:29.724Z",
        "updatedAt": "2023-08-29T13:40:29.724Z",
        "__v": 0
    },
    "message": "Post created!"
}
```
*Ex. Rejected Post response JSON:*
- note: 'location' is closer to 'form field'
```
{
    "success": false,
    "errors": [
        {
            "type": "field",
            "msg": "Please provide an associated userId.",
            "path": "user",
            "location": "body"
        }
    ]
}
```
*Ex. Positive Delete response JSON
```
{
    "success": true,
    "data": {
        "_id": "77ydf2c0d165ebza25961c7e",
        "user": 555dffdfd9ca3accac55f5dfc2,
        "title": "Test Post",
        "body": "Some string of reasonable length",
        "topic": "Some Topic",
        "createdAt": "2023-08-29T13:59:28.524Z",
        "updatedAt": "2023-08-29T13:59:28.524Z",
        "__v": 0
    }
}
```
