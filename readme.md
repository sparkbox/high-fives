![High Fives](docs/high-fives-logo.png)

A website to encourage Sparkboxers who are doing cool things.

---

## How to run the app

### Prerequisites

This app uses a pretty standard setup.

1. Node (>= version 8)
2. npm

### Installation

After cloning this repo, we'll need to install the dependencies of this project. To do this, `cd` into the project's root and run this:

```
npm install
```

This will run for a little while. When it's done, you should have all required dependencies installed.

We're almost ready to run the app, but first we need to add credentials to an `.env` file in the root of this project. These credentials can't be stored in the codebase, because that would be insecure.

#### Installing credentials for Sparkboxers

Credentials are stored in the 1Password Sparkbox Team vault. Search for "High Fives .env file", and drop that file into the root of this project. You should have everything you need to run the app now.

*Never check this file into the repo!* It contains credentials, and we don't want them to be public. It is set to be ignored by git, so this shouldn't be a problem. Just don't rename the file or put it in a different directory.

#### Installing credentials for non-Sparkboxers

If you want to set this up for your own company, awesome! But you're on your own for this part. But I believe in you! You'll have to make some accounts on your own, and put some API keys in a `.env` file in the root of this project. You can `cp .env-sample .env` for a template to get started.

If you get stuck, feel free to open up an issue.

### Startup

Running the app is handled through npm's scripts. After installation, you can start the app by running:

```
npm start
```

This will build out styles and scripts, as well as start up the node app itself. By default, this will run in the **development** environment, which will watch files for changes and re-run tasks and apps when necessary.

When running in the `production` environment, SSL is forced. I can't think of any reason why you should run in this mode locally.

#### Using the app

#### Express app

At this point, you should be able to see the app in a web browser! Visit http://localhost:3000 to see it in action.

Data refreshes when starting up, then on a 10 minute interval. If you want _fresh_ data, visit localhost:3000/?fresh=true (This isn't enabled by default because it takes longer to load)

#### Slackbot

Running the app will also run the slackbot, but that part isn't documented yet. 😉