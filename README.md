# Handy Man Api

HandyMan API is a **RESTful API** that provides access to the HandyMan service.  ([https://github.com/anirudhsingh20/HandyMan](https://github.com/anirudhsingh20/HandyMan))

## Example Endpoint

### Get Posts

`GET /post/get-posts`

Retrieves a list of all posts related to home maintenance and repair tasks.

#### Response

A JSON object with the following properties:

-   `posts`: An array of posts, where each post is an object with the following properties:
    -   `id`: The ID of the post
    -   `title`: The title of the post
    -   `description`: A brief description of the post
    -   `created_at`: The date and time the post was created

  ---

`curl https://handy-man-api.onrender.com/post/get-posts`

    {
      "posts": [
        {
          "id": 1,
          "title": "How to fix a leaky faucet",
          "description": "A step-by-step guide to fixing a leaky faucet",
          "created_at": "2022-01-01T12:00:00Z"
        },
        {
          "id": 2,
          "title": "How to paint a room",
          "description": "A comprehensive guide to painting a room",
          "created_at": "2022-01-02T12:00:00Z"
        }
      ]
    }

---
### About the Handy Man Application

> **HandyMan** is an app that connects you with local service providers for various home maintenance and repair tasks. This app aims to make
> it easy for you to find reliable and affordable service providers for
> your needs.
---