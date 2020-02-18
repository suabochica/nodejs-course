# Section 13: Sorting, Pagination and Filtering

## Index
1. Intro: Sorting, Pagination and Filtering
2. Working with Timestamps
3. Filtering Data
4. Paginating Data
5. Sorting Data

## 1. Intro: Sorting, Pagination and Filtering
In this section we will explore advanced techniques for fetching data. This includes sorting, filtering, and pagination. All three of these will give clients more control over what data they get back. This keeps applications fast, as they do not need to fetch unnecessary data.

## 2. Working with Timestamps
First, we will enable timestamps. Schema options are provided by passing an object in as the second argument to `mongoose.Schema`. Set `timestamps` to `true` to have Mongoose add `createAt` and `updateAt` fields to the model. You do not need to write any code to crate or manage those fields, as Mongoose does all that for you.

```js
const taskSchema = new mongoose.Schema({
    //...
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema)
```

## 3. Filtering Data
To filter data we will recall the query parameters. This will allow clients to fetch all tasks, just the complete tasks, or just the incomplete tasks.

### Filtering Data
`GET /tasks` below supports a `completed` query parameter which can be set to `true` or `false`. This will prevent clients from fetching unnecessary data that the do not plan on using.

First up, create an object to store the search criteria.

```js
const = {};
```

From there, check if the query parameter was provided. The provided value should be parsed into a boolean and stored on `match.completed`

```js
if (req.query.completed) {
    match.completed = req.query.completed === 'true';
}
```

Last up, `match` can be added onto `populate` to fetch just the users that match the search criteria.

```js
await req.user.populate({
    path: 'tasks',
    match
}).execPopulate()
```

## 4. Paginating Data
Time to add pagination to the application. This will allow the client to fetch data in pages. The client can start off with the first page of data and then fetch other pages as they are needed.

### Data Pagination
Pagination is configured using `limit` and `skip`. These two values give the client complete control of the data they are getting back.

If a client wanted the first page of 10 tasks, `limit` would be set to `10` and `skip` would be set to `0`. If the client wanted the third page of 10 tasks, `limit` would be set to `10` and `skip` would be set to `20`.

Both `limit` and `skip` can be added onto the `options` object passed to `populate`. The code below uses `parseInt` to convert the string query parameters into numbers first.

```js
await req.user.populate({
    path: 'tasks',
    match,
    options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip)
    }
}).execPopulate()
```

## 5. Sorting Data
Let's add sorting to the application. Clients will be able to fetch the data back in any order they like.

### Sorting Data
The `options` object used for pagination can also be used for sorting. A `sort` property should be set, which is an object containing key/values pairs. The key is the field to sort. The value is `1` for ascending and `-1` for descending sorting.

`GET /tasks` will get support for a a `sortBy` query parameter. The value should include the field to sort the order in which to sort. `createdAt:asc` would sort the tasks in according order with the older first. `createdAt:asc` would sort the tasks in a descending order with the newest first.

Start with an empty object to store the sorting options.

```js
const sort = {}
```

If the query parameter is provided, it will get parsed and `sort` will be updated.

```js
if (req.query.sortBy) {
  const parts = req.query.sortBy.split(':')
  sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
}
```

`sort` is the added onto `options`. If `sortBy` is not provided, `sort` will be an empty object and no sorting will occur.

```js
await req.user.populate({
    path: 'tasks',
    match,
    options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
    }
}).execPopulate()
```
