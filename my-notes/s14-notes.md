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
## 5. Handling Express Errors
## 6. Adding Images to the User Profile
## 7. Serving up Files
## 8. Auto-Cropping and Image Formatting
