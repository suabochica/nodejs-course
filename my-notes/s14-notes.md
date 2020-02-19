# Section 14: File Uploads

## Index
1. Intro: File Uploads
2. Adding Support for File Uploads
3. Validating File Uploads
4. Validation Challenge
5. Handling Express Errors
6. Adding Images to the User Profile
7. Serving up Files
8. Auto-Cropping and Image Formatting

## 1. Intro: File Uploads
In this section you will learn how to configure Node.js to support file uploads. This will allow users to upload documents, profile pictures, and any other file type you might need to support. You will also see what it takes to store the uploaded files in MongoDb.

## 2. Adding Support for File Uploads
To support file uploads we will use an npm package called multer. Multer is a library in the Express ecosystem that allow your Express application easily support file uploads.

### Configuring Multer
First up, install the library

```
npm i multer@1.4.2
```

Multer can then be configured to fit your specific needs. The example below shows off a basic configuration where `dest` is set to `avatars`. This will store all uploaded files in a directory called `avatars`.

```js
const multer = require('multer')

const upload = multer({
    dest: 'avatars'
})
```

Multer is then added as middleware for the specific endpoint should allow for file uploads. The route below is expecting a single `avatar`  field on the submitted form.

```js
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send()
})
```

### Links
+ [npm: multer](https://www.npmjs.com/package/multer)

## 3. Validating File Uploads
## 4. Validation Challenge
## 5. Handling Express Errors
## 6. Adding Images to the User Profile
## 7. Serving up Files
## 8. Auto-Cropping and Image Formatting
