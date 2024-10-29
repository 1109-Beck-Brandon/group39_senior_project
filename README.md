# group39_senior_project

This is the repository for Group 39's Senior Capstone Project

Notes for setup:
1. Added this repository to github desktop. NOTE: When I did this I made the folder path to a directory in my WSL Ubuntu-22.04 Environment in Visual Studio Code. I found the WSL environment folders in Windows File Explorer by entering "\\wsl$" in the address bar
2. I ran the following commands in the terminal (To install npm and nodejs that are need for Vue):
    2a. sudo apt update
    2b. curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    2c. sudo apt install -y nodejs
3. To check that these installed correctly:
    3a. node -v
    3b. npm -v
4. Install Vue CLI
    4a. sudo npm install -g @vue/cli
    4b. vue --version

I created the project with: "vue create ."

The following text was automatically inputted after the vue project creation

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
