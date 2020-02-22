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
Let's associate the uploaded avatar with the users account.

First of all, a new file needs to be added to the user model to store the avatar image data. The snippet below adds `avatar` on the user with the type of `Buffer`. The `Buffer` type should be used when storing binary data, which is exactly the type of data that multer provides.

```js
// Existing code omitted for brevity
const userSchema = new mongoose.Schema({
    avatar: {
        type: Buffer
    }
})
```

The avatar upload route will be able to change the user profile data, so the route should be put behind authentication. The handler function grabs the binary data and stores it on the `avatar` field. Finally, the changes are saved.

```js
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})
```

Now that we attach an image to the user profile, it is possible delete it. We just have to set the `req.user.avatar` values as `undefined` and save the user. The next code illustrates this description:

```js
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});
```

> Note: you can render an image with his binary data with the next format: `<img src="data:image/jpg;base64,{binary data}"/>`

## 7. Serving up Files
Time to serve up user profile images. These images will be served up as if they were static assets for the application.

Serving up the user avatars will require two pieces of data from the server. The first is the images data, and the second is the `Content-Type` header. The image data is stored on the user profile. The header should be set equal to `image/png` which lets the client know they are getting a PNG image back.

The route below fetches the image data and sets the `Content-Type` header for the response. The URL could be visited to view the profile picture.

```js
router.get('/users/:id/avatar', async (req, res) => { try {
        const user = await User.findById(req.params.id)
if (!user || !user.avatar) { throw new Error()
}
        res.set('Content-Type', 'image/jpg')
res.send(user.avatar) } catch (e) {
        res.status(404).send()
    }
})
```

## 8. Auto-Cropping and Image Formatting
Finally, we will resize and format images. This will let you create uniform sizes and file types for users avatars.

First up, install the npm library

```
npm i sharp@0.21.1
```

Now sharp can be used to manipulate uploaded images. Before the image data is added onto the user profile, the data should be passed through sharp. The example below uses `resize` to resize all uploads to 250 by 250 pixels. The example also use `png` to convert all images to portable network graphics. Lastly, `toBuffer` is used to retrieve the modified image data. The modified data is what should be saved in the database.

```js
const sharp = require('sharp')
const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250
}).png().toBuffer()
```

### Links
+ [npm: sharp](https://www.npmjs.com/package/sharp)
