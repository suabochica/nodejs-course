# Section 9: Application Deployment

## Index
1. Intro: Application Deployment
2. Joining Heroku and Github
3. Version Control with Git
4. Exploring Git
5. Integrating Git
6. Setting up SSH Keys
7. Pushing code to Github
8. Deploying Node.js to Heroku
9. New Feature Deployment Workflow
10. Avoiding Global Modules

## 1. Intro: Application Deployment
Time to learn how to set up communication between the client and the server. This will be done via HTTP request. The goal is that users will be able to type an address in the browser to view their forecast.

## 2. Joining Heroku and Github
You will join to Github and Heroku. Github is a development platform that makes it easy to manage software development projects. Heroku is an application deployment platform which provides everything needed to deploy your Node.js applications.

### Joining to Heroku
Make sure to sign up for an account with both, Github and Heroku. From there, install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli). After running the installer, you can confirm the Heroku CLI was installed correctly by running `heroku -v` to print the installed version.

The Heroku CLI give you commands to deploy and manage you Node.js applications. Before you can do that, you will need to log in to your Heroku account. This makes sure that the command you run actually changes your Heroku applications.

```
heroku login
```

### Links
+ [Github](https://github.com/)
+ [Heroku](https://dashboard.heroku.com/apps)
+ [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## 3. Version Control with Git
Version control allows you to track changes to your project code over time. This makes it easy to recover lost code and restore your project to a previously working version.

### Version Control with Git
Version control lets you track changes to your application code over the time. It is an important tool, and it should be used for all personal and professional projects.

Imagine you have an application with 250 paying users. You just finished work on a great new feature and you deploy it to production so your customer can use it. Hours later, you discover a bug that is preventing users from using the application. What do you do next?

Without version control, you are in trouble. The only version of your app is the one you have on your machine. The buggy application that is crashing for your users. You have no way of getting back to the old version of your application that was working. Users are stuck with a broken application until you can fix the bug and get a new version of the app deployed.

With version control, you are in the clear. You can revert back to your application's previous working state and deploy that. This means that users can continue to use the original version while you can take a breath and get back to working on that new feature until it is ready.

You can grab the Git installer from the git official page. After installing Git, run `git --version` to print the Git version installed.

### Links
+ [Git](https://git-scm.com/)

## 4. Exploring Git
Git is not the easiest tool in the world to get started with. For that reason it is important share the next fundamentals concepts:

![image](assets/version_control_git.png)

The above image shows the four possible states for a file inside git.

+ **Untracked Files:** Files that are new for the git project. In the last the `readme.md` file is an untracked file. By default these file are not candidate to be committed.
+ **Unstaged Changes:** Files that the git project recognize and were changed from the last commit but are not candidates to be recorded. 
+ **Stage Changes:** Files that the git project recognize and were changed from the last commit and are candidates to be recorded in a new commit. 
+ **Commits:** Files changes recorded. Each commit has a hash associated that makes it unique.

To move a file from a state to another state you should use the git command. For example, to move a file from untracked or unstaged to state you have to run

```
git add name_file.format
```

To move from stage to commit you have to run

```
git commit
```

Every commit have a message, so this command will open your terminal editor to record the changes with a message.

## 5. Integrating Git
Let start to use Git. First we will to set up Git in the project. Also, you will explore the commands needed to get Git tracking your code.

### Initializing Git
Git needs to be initialized in your project before it can be used. You can initialize Git in your project by running `git init` from the root of the project. All Git commands should be run from the root of the project.

Before going any further, Git needs to be configured to ignore the `node_modules` folder. This is a generated directory which doesn't need to be under version control. You can always regenerate the `node_modules` by running `npm install`. Create a `.gitignore` file with the following line to ignore the folder.

```
node_modules/
```

### Commiting Changes
Think of a commit as a save point. A commit lets you create a save point that contains your project files exactly as they were when the commit was created. You will create new commits to track your changes as you continue to build out your application.

Before creating a commit, it is a good idea run `git status` to get a summary of the changes that are about to be commited. This will show untracked files, unstaged changes and staged files.

Using `git add <path to file>`, you can add files to the staging area. Changes to files in the staging area will be included in the next commit. The shortcut below adds all untracked files and unstaged changes to the staging area.

```
git add .
```

You can now use the git commit command to create a commit. Each commit requires a commit message. The command below creates a commit and provides "initial commit" as the commit message.

```
git commit -m "Initial commit"
```

From here, you can continue to add new features to the project and use the git commands to create new commits.

## 6. Setting up SSH Keys
## 7. Pushing code to Github
## 8. Deploying Node.js to Heroku
## 9. New Feature Deployment Workflow
## 10. Avoiding Global Modules
