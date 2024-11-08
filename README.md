# group39_senior_project

This is the repository for Group 39's Senior Capstone Project

Notes for setup:
1. Added this repository to github desktop. NOTE: When I did this I made the folder path to a directory in my WSL Ubuntu-22.04 Environment in Visual Studio Code. I found the WSL environment folders in Windows File Explorer by entering "\\wsl$" in the address bar<br />
2. I ran the following commands in the terminal (To install npm and nodejs that are needed for Vue):<br />
    &emsp;2a. sudo apt update<br />
    &emsp;2b. curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -<br />
    &emsp;2c. sudo apt install -y nodejs<br />
3. To check that these installed correctly:<br />
    &emsp;3a. node -v<br />
    &emsp;3b. npm -v<br />
4. Install Vue CLI<br />
    &emsp;4a. sudo npm install -g @vue/cli<br />
    &emsp;4b. vue --version<br />

Note: I created the project with: "vue create .". I believe the project should just already exist if you are pulling the project from main. 

## IMPORTANT, BEFORE PUSHING:

Run the "npm run build" command to make a new build, which will be automatically outputted to a new 'docs' folder. This is the folder where the vue website is deployed from in github

The following text was automatically inputted after the vue project creation, they are not my own notes.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
