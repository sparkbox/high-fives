![High Fives](docs/high-fives-logo.png)

A website to showcase Sparkboxers doing cool things.

## How to run the app

### Prerequisites

This app uses a pretty standard setup.

1. Node (>= version 8)
2. npm

### Installation

To install this project's dependencies, run this:

```
npm install
```

### Running the app

Running the app is handled through npm's scripts. After installation, you can start the app by running:

```
npm start
```

This will build out styles and scripts, as well as start up the node app itself. This will also watch files for changes and re-run tasks when necessary.

#### Environments

By default, the app will run in the `development` environment. While in this environment, data will be retrieved from a static, cached data file. When in `development`, you can run the app offline.

When running in the `production` environment, the app will retrieve real live data from servers. Since this is using actual Google Analytics data, you'll need to put a JSON Web Token (JWT) in place. This is a JSON file that contains all the juicy credentials to read data from Google Analytics. **Without this file, you can't run in production mode.**

The JWT lives in the 1Password Sparkbox Team vault. It's filed under _"High Fives Google Analytics JWT"_. When you find it, you need to place it in the root directory of this repo. To do this:

1. Retrieve the actual file in 1Password by clicking **Click to Download & View**. This will trigger a short download.
2. Hover the file icon → click the down arrow → **Show in Finder**
3. Copy the revealed _client_secret.json_ file into the root of the high-fives repo

After this, you should be good to go:

```
NODE_ENV=production npm start
```

However, it's important that you **do not check this file into the repo,** as it contains important credentials. It will be ignored as part of the `.gitignore` file, so this is only a concern if you rename the file or put it in a nested directory.

