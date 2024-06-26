/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const TODOS_PATH = path.resolve(__dirname, "todos.txt");

app.use(bodyParser.json());

const findIndexById = (arr, targetId) => {
  const index = arr.findIndex((item) => item.id === targetId);
  return index;
};

app.get("/todos", async (req, res) => {
  let fileData = await fs.promises.readFile(TODOS_PATH, "utf-8");
  todoData = JSON.parse(fileData || "[]");

  if (fileData.trim() !== "") {
    todoData.splice(0, 1);
  }

  res.status(200).send(todoData);
});

app.get("/todos/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  let fileData = await fs.promises.readFile(TODOS_PATH, "utf-8");
  todoData = JSON.parse(fileData || "[]");
  let idx = findIndexById(todoData, id);
  if (idx == -1) {
    res.status(404).send();
  } else {
    res.status(200).send(todoData[idx]);
  }
});

app.post("/todos", async (req, res) => {
  let fileData = await fs.promises.readFile(TODOS_PATH, "utf-8");
  todoData = JSON.parse(fileData || "[]");
  let id = 0;
  let newFile = false;
  if (fileData.trim() !== "") {
    id = todoData[0].lastId;
    todoData[0] = { lastId: id + 1 };
    newFile = true;
  } else {
    todoData = [];
    todoData.push({ lastId: id + 1 });
  }

  todoData.push({ ...req.body, id: todoData[0].lastId });

  await fs.promises.writeFile(TODOS_PATH, JSON.stringify(todoData));
  res.status(201).send({ id: todoData[0].lastId });
});

app.put("/todos/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  let fileData = await fs.promises.readFile(TODOS_PATH, "utf-8");
  todoData = JSON.parse(fileData || "[]");
  let idx = findIndexById(todoData, id);
  if (idx == -1) {
    res.status(404).send();
  } else {
    todoData[idx] = { ...req.body, id: id };
    await fs.promises.writeFile(TODOS_PATH, JSON.stringify(todoData));
    res.status(200).send();
  }
});

app.delete("/todos/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  let fileData = await fs.promises.readFile(TODOS_PATH, "utf-8");
  todoData = JSON.parse(fileData || "[]");
  let idx = findIndexById(todoData, id);
  if (idx == -1) {
    res.status(404).send();
  } else {
    todoData.splice(idx, 1);
    await fs.promises.writeFile(TODOS_PATH, JSON.stringify(todoData));
    res.status(200).send();
  }
});

app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3000);

module.exports = app;
