# Section 12: API Authentication and Security

## Index
1. Intro: Authentication and Security
2. Securely Storing Passwords with Bcrypt: Part I
3. Securely Storing Passwords with Bcrypt: Part II
4. Login Users
5. JSON Web Tokens
6. Generating Authentication Tokens
7. Express Middleware
8. Accepting Authentication Tokens
9. Advanced Postman
10. Login Out
11. Hiding Private Data
12. Authenticating User Endpoints
13. The User/Task Relationship
14. Authenticating Task Endpoints
15. Cascade Delete Tasks

## 1. Intro: Authentication and Security
In this section, you will set up authentication for the task manager app. This will require users to log in before they will be able to manage their tasks. This section also covers password security, Express middleware, advanced postman, and more.

## 2. Securely Storing Passwords with Bcrypt: Part I
Currently all our information is public and if you check the values of the password field, they are plain text the everyone can consume. So, we have to find a way to securely store users password before to storing it in the database. To achieve this goal, we will hashing and salting the value before to introduce it in the database.

### Hashing Passwords
Storing plain text passwords is a bad idea. Most folks reuse password for multiple accounts online. That means that if your database gets compromised, the hacker can reuse those credentials on the other sites such as credit cards or bank accounts. We don't want to leave our users open to further attacks.

The solution is has passwords using a secure one-way hashing algorithm. Users passwords will stay hidden and secure, even if the database is compromised.

### Hashing Passwords with Bcrypt
First up, install the library

```
npm i bcrypt@2.4.3
```

The `hash` method of bcrypt can be used to hash the plain text password. The example below hashes "Red12345!",

```js
const password = 'Red12345!'
const hashedPassword = await bcrypt.hash(password, 8)
// The hashed password is what would be stored in the database
```

The `compare` method is used to compare a plain text against a previously hashed password. This would be useful when logging in. The user logging in provides the plain text password for their account. The application fetches the hashed password from the database for that user. `compare` is the called to confirm it's a match.

```js
const isMatch - await bcrypt.compare('Red12345!', hashedPassword)
console.log(isMatch)
```

### Links
+ [npm](bcryptjs)

## 3. Securely Storing Passwords with Bcrypt: Part II
## 4. Login Users
## 5. JSON Web Tokens
## 6. Generating Authentication Tokens
## 7. Express Middleware
## 8. Accepting Authentication Tokens
## 9. Advanced Postman
## 10. Login Out
## 11. Hiding Private Data
## 12. Authenticating User Endpoints
## 13. The User/Task Relationship
## 14. Authenticating Task Endpoints
## 15. Cascade Delete Tasks
