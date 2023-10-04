## COMMENTS
- **GET /api/comments/** will return a list of comments (may narrow down in the API by topic if fetching content gets silly)

- **POST /api/comments/** will submit new comment
- **DELETE /api/comments/:id** will delete comments with :id
- TODO: PUT logic
- TODO: **GET /api/comments/:postId** will return a list of comments only related to post with :postId > maybe circumvented with .populate() from mongoose.
- TODO: be more consistent with keys for ids...

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
    "user": "64dfb7738986dc2b9a460f6a",
    "postId": 64dfb7738986dc2b9a460f6aB,
    "text": "Brown chicken brown cow",
}

```

*Ex. Positive Comment response JSON:*
```
{
    "success": true,
    "id": "651d833777a6e3effe0139f2",
    "data": {
        "user": "64dfb7738986dc2b9a460f6a",
        "postId": "64dfb7738986dc2b9a460f6B",
        "text": "Brown chicken brown cow",
        "_id": "651d833777a6e3effe0139f2",
        "createdAt": "2023-10-04T15:22:31.075Z",
        "updatedAt": "2023-10-04T15:22:31.075Z",
        "__v": 0
    },
    "message": "Comment created!"
}
```
*Ex. Rejected Comment response JSON:*
```
This may seem redundant, but there's an error for the form, and then detailed errors within. Unfortunate naming on my part.
{
    "success": false,
    "message": {
        "errors": {
            "text": {
                "name": "ValidatorError",
                "message": "Path `text` is required.",
                "properties": {
                    "message": "Path `text` is required.",
                    "type": "required",
                    "path": "text"
                },
                "kind": "required",
                "path": "text"
            }
        },
        "_message": "Comments validation failed",
        "name": "ValidationError",
        "message": "Comments validation failed: text: Path `text` is required."
    }
}
```
*Ex. Positive Comment Delete response JSON
```

{
    "success": true,
    "data": {
        "_id": "651d833777a6e3effe0139f2",
        "user": "64dfb7738986dc2b9a460f6a",
        "postId": "64dfb7738986dc2b9a460f6aB",
        "text": "Brown chicken brown cow",
        "createdAt": "2023-10-04T15:22:31.075Z",
        "updatedAt": "2023-10-04T15:22:31.075Z",
        "__v": 0
    }
}

```
