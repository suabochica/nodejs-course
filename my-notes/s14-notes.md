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
It is important add validations over the files. This will allow you to reject files that are too large or files of the wrong type.

### Validating Multer Uploads
The multer configuration below adds these two types of validation.

+ `limits.fileSize` is set to limit the file size in bytes. The configuration below uses 1,000,000 bytes which is equivalent to 1 megabyte.
+ `fileFilter` is set to validate the file type. The method below will reject all documents that do not have either `.doc` or `docx` file extensions. This same technique could be used to limit uploads to just images, PDFs, or any other file type.

```js
const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(request, file, callback) {
        // For validate just one type of file, you can use !file.originalname.endsWith('.pdf'))
        // For validate several types of files, you should use a regex as shown below
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return callback(new Error("Please upload a PDF File"));
        }

        callback(undefined, true);
    }
});
```

### Tools
+ [Regex 101](https://regex101.com/)

## 4. Validation Challenge
The goal of this challenge is: Add validation to the avatar upload route. To achieve it you need.

+ Limit the upload size to 1 Mb
+ Only allow jpg, jpeg, and png image formats
+ Test your work! Upload large fails to validate the fail and upload not image to validate the fail.

Below, is the code to solve this challenge:

```js
const upload = multer({
    dest: 'avatars',
    limits: {
        fileSize: 1000000,
    },
    fileFilter(request, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error("Please upload a JPG, JPEG or PNG file."));
        } else {
            callback(undefined, true);
        }
    }
});

router.post('/users/me/avatar', upload.single('avatar'), (request, response) => {
    response.send();
});
```

## 5. Handling Express Errors
Let's customize the error that multer provides. This will give you complete control of what sort of response the client gets when their upload is rejected.

### Handling Express Errors
You can handle errors fro middleware function by providing a function to Express. As shown below, a new function is passed as the final argument to `router.post`. This function accepts `error`, `req`, `res` and `next`. This call signature lets Express know the function is designed to handle errors.

The function itself send back a JSON response with the error message from multer.

```js
router.post('/users/me/avatar', upload.single('avatar'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
```

## 6. Adding Images to the User Profile
## 7. Serving up Files
## 8. Auto-Cropping and Image Formatting
