---
layout: post
title: Jest | Use Jest write unit testing for DOM manipulation
image: img/Jest.jpg
author: GQSM
date: 2020-02-02T13:39:26.149Z
draft: false
tags: 
  - Jest
  - JavaScript
---

Hello I am Clark! Today we're gonna write test case of unit testing for DOM manipulation.

If we have a piece code of HTML and JavaScript in one `index.html` file, this is a todo list:

```html
<html>
  <body>
    <input id="newTodo" />
    <button onclick="addTodo()">Add todo</button>
    <ol id="todoList"></ol>
    <script>
      const addTodo = () => {
        const newTodoInput = document.getElementById('newTodo');
        let currentTodoList = document.getElementById('todoList').innerHTML;
        currentTodoList += `<li>${newTodoInput.value}</li>`;
        document.getElementById('todoList').innerHTML = currentTodoList;
        newTodoInput.value = '';
      }
    </script>
  </body>
</html>
```

Umm...this todo list give people quite don't know how to write test case, because this code confuse DOM with logic of JavaScript, so first of all, we should would logic of control todo list disassemble from `index.html`:

```html
<html>
  <body>
    <input id="newTodo" />
    <button id="addTodo">Add todo</button>
    <ol id="todoList"></ol>

    <script type="text/javascript" src="./todolist.js"></script>
  </body>
</html>
```

About logic of todo list move to `todoList.js` file:

```javascript
const addTodo = () => {
  const newTodoInput = document.getElementById('newTodo');
  let currentTodoList = document.getElementById('todoList').innerHTML;
  currentTodoList += `<li>${newTodoInput.value}</li>`;
  document.getElementById('todoList').innerHTML = currentTodoList;
  newTodoInput.value = '';
}

document.getElementById('addTodo').addEventListener('click', addTodo);
```

Right now, view is view, logic is logic, so we can very easy to write test case for JavaScript, but...we no have DOM, how to trigger `addTodo`? yes! so we must ready DOM for test case of `addTodo`!

As mention [document of Jest](https://jestjs.io/docs/en/tutorial-jquery):

> Jest ships with jsdom which simulates a DOM environment as if you were in the browser. This means that every DOM API that we call can be observed in the same way it would be observed in a browser!

So we can very easy to simulates a DOM environment when use Jest, get start install Jest and write test case!

Install Jest in project(If you have no npm or NodeJS environment, must download Node when before start):

```
npm inatall jest
```

Next, we add file `todoList.test.js` and write a test case:

```javascript
test('Check addTodo able add todo to todoList', () => {
  
});
```

Like above name of test case, I want test function `addTodo` can be real add todo to todoList.

I’ve divided write test case into three parts:

1. We have to find out which elements is `addTodo` need? let's look at `todoList.js`,first we need a `button` of id is `addTodo`, we will would add click event of `addTodo` for it, also need a `input` of id is `newTodo`, last we need a `ol` of id is `todoList` to display todo list.

    Yes! just three elements is `addTodo` need! we don't care other elements in the HTML file, we just only prepare those for test case:

```javascript
test('Check addTodo able add todo to todoList', () => {
  document.body.innerHTML = `
    <input id="newTodoInput" />
    <button id="addTodoBtn">Add todo</button>
    <ol id="todoList"></ol>
  `;
});
```

2. Use `require` import `todoList.js` file add logic to elements of readied, it have logic of `addTodo`, it is we target of test in test case too:

```javascript
test('Check addTodo able add todo to todoList', () => {
  document.body.innerHTML = `
    <input id="newTodoInput" />
    <button id="addTodoBtn">Add todo</button>
    <ol id="todoList"></ol>
  `;
  require('../todolist.js');
});
```

3. Use selector get element, write new todo name `input` and trigger `addTodo` by `button`, then check if `innerHTML` of `ol` correct add new todo!

```javascript
test('Check addTodo able add todo to todoList', () => {
  document.body.innerHTML = `
    <input id="newTodoInput" />
    <button id="addTodoBtn">Add todo</button>
    <ol id="todoList"></ol>
  `;
  require('../todolist.js');

  const newTodoInput = document.getElementById('newTodoInput');
  const addTodoBtn = document.getElementById('addTodoBtn');
  const todolist = document.getElementById('todoList');

  newTodoInput.value = 'New todolist!';
  addTodoBtn.click();

  expect(todolist.innerHTML).toBe('<li>New todolist!</li>');
});
```

Now we're finish first test case for `todoList.js`! let's execute test check if logic correct:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/zm5hz3qafcvjuzhvvmig.png)

Thanks guys for reading this post, if you have any question or find out ant wrong in the post, please submit discussion for me! 😃
