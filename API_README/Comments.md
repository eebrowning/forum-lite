## COMMENTS
- **GET /api/comments/** will return a list of comments (may narrow down in the API by topic if fetching content gets silly)

- **POST /api/comments/** will submit new comment
- **DELETE /api/comments/:id** will delete comments with :id
- TODO: PUT logic
- TODO: **GET /api/comments/:postId** will return a list of comments only related to post with :postId > maybe circumvented with .populate() from mongoose.



*Ex. Sample GET response JSON:*
{
    "success": true,
    "data": {
        "comments": [
            {
                "_id": "64dfb7738986dc2b9a460f6a",
                "user": "1",
                "postId": 1,
                "text": "Brown chicken brown cow",
                "createdAt": "2023-08-18T18:24:51.038Z",
                "updatedAt": "2023-08-18T18:24:51.038Z",
                "__v": 0
            }
        ]
    }
}



*Ex. Sample Comment payload JSON:*
```
{

}

```

*Ex. Positive Comment response JSON:*
```
{

}
```
*Ex. Rejected Comment response JSON:*
```
{

}
```
*Ex. Positive Comment Delete response JSON
```
{

}
```
