# API DOCUMENTATION

# METHOD 4 (POST, GET, POST, DELETE)

LIST ENDPOINTS:
- `POST /users/register`
- `POST /users/login`
- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

### POST /users/register : http://localhost:3000/users/register

Request: 
body: 

```json
{
    "email" : "newuser@mail.com",
    "password" : "coba1234",
    "organization" : "Hacktiv8"
}
```

Response: 

```json
{
    "email": "newuser@mail.com",
    "organization": "Hacktiv8",
    "password": "$2b$10$L/gSUSKbZvOYuT3Dh1TwiOPM7Ox3eftmVK5FkCUbn50GkIZYyv/U2"
}
```


### POST /users/login : http://localhost:3000/users/login

Request: 
body: 

```json
{
    "email" : "newuser@mail.com",
    "password" : "coba1234"
}
```

Response: 

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJuZXd1c2VyQG1haWwuY29tIiwiaWF0IjoxNTkyNTM2MzM2fQ.oXmYVtL7eaBE8xNVmuXyzEA5KudoSP9ThVR9TjM-yh4"
}
```

### POST /tasks : http://localhost:3000/tasks/

Request: 
body: 

```json
{
    "title" : "Make Kanban App",
    "category" : "BackLog"
}
```

headers:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJuZXd1c2VyQG1haWwuY29tIiwiaWF0IjoxNTkyNTM2MzM2fQ.oXmYVtL7eaBE8xNVmuXyzEA5KudoSP9ThVR9TjM-yh4"
}
```

Response: 

```json
{
    "id": 26,
    "title": "Make Kanban App",
    "category": "BackLog",
    "UserId": 8,
    "updatedAt": "2020-06-19T03:13:57.354Z",
    "createdAt": "2020-06-19T03:13:57.354Z"
}
```

### GET /tasks
Request:
body: 

Response: 

```json
[
[
    {
        "id": 1,
        "title": "Mengerjakan API",
        "category": "Completed",
        "UserId": 2,
        "createdAt": "2020-06-16T13:57:11.915Z",
        "updatedAt": "2020-06-16T23:09:01.845Z"
    },
    {
        "id": 10,
        "title": "Mengerjakan Server",
        "category": "Doing",
        "UserId": 7,
        "createdAt": "2020-06-18T16:30:10.099Z",
        "updatedAt": "2020-06-18T16:30:10.099Z"
    },
    {
        "id": 11,
        "title": "Mengerjakan Client",
        "category": "ToDo",
        "UserId": 7,
        "createdAt": "2020-06-18T16:30:20.467Z",
        "updatedAt": "2020-06-18T16:30:20.467Z"
    },  
    {
        "id": 11,
        "title": "Mengerjakan Documentation",
        "category": "BackLog",
        "UserId": 7,
        "createdAt": "2020-06-18T16:30:20.467Z",
        "updatedAt": "2020-06-18T16:30:20.467Z"
    }
]
```


### GET /tasks/:id : http://localhost:3000/tasks/:id

Request: 

params: 23

body: 

Response: 

```json
{
    "id": 23,
    "title": "Mengerjakan BackLog 67855",
    "category": "ToDo",
    "UserId": 7,
    "createdAt": "2020-06-18T19:08:30.482Z",
    "updatedAt": "2020-06-18T19:57:54.733Z"
}
```

### PUT /tasks/:id : http://localhost:3000/tasks/:id

Request: 
params: 26

body: 

```json
{
    "title" : "Make Kanban App Ver 2",
    "category" : "BackLog"
}
```

headers:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJuZXd1c2VyQG1haWwuY29tIiwiaWF0IjoxNTkyNTM2MzM2fQ.oXmYVtL7eaBE8xNVmuXyzEA5KudoSP9ThVR9TjM-yh4"
}
```

Response: 

```json
{
    "id": 26,
    "title": "Make Kanban App Ver 2",
    "category": "BackLog",
    "UserId": 8,
    "createdAt": "2020-06-18T19:08:30.482Z",
    "updatedAt": "2020-06-21T08:57:54.733Z"
}
```


### DELETE /tasks/:id : http://localhost:3000/tasks/:id

Request: 3

body: 

headers:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJuZXd1c2VyQG1haWwuY29tIiwiaWF0IjoxNTkyNTM2MzM2fQ.oXmYVtL7eaBE8xNVmuXyzEA5KudoSP9ThVR9TjM-yh4"
}
```

Response: 
```json
[
    {
        "id": 1,
        "title": "Make Kanban App Ver 1",
        "category": "Completed",
        "UserId": 8,
        "createdAt": "2020-06-18T19:08:30.482Z",
        "updatedAt": "2020-06-21T08:57:54.733Z"
    },
        {
        "id": 2,
        "title": "Make Kanban App Ver 2",
        "category": "BackLog",
        "UserId": 8,
        "createdAt": "2020-06-18T16:30:20.467Z",
        "updatedAt": "2020-06-18T16:30:20.467Z"
    }
]
```