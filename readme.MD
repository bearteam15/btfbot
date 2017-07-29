# Bears team 15 project - Github Battle Bot

### :construction::construction::construction: Currently work in progress :construction::construction::construction:

Github battle idea comes from a great [React course](https://learn.tylermcginnis.com/p/reactjsfundamentals), by Tyler McGinnis, where it was implemented in a form of a React App. Here ~~is~~ will be a Slack Bot example!

---

### Usage:

1. Install dependencies `npm install`
2. Run build tasks & start node server with one command `npm start`

#### How can I update landing page?

The only files that you should edit, when it comes to a landing page are located in a `src` folder in a separate `landing-page` directory - `dist` folder is recreated each time the build tasks are triggered, so no changes made in this folder will be preserved.

###### HTML

HTML template is located in a `src/html` folder - this is the file that you should edit if you want to update landing page.

###### Images

Put images into `src/images` folder - they will be minified as a part of a build process.

###### Javascript

`src/js` folder is a place where you can edit javascript - Babel is included so feel free to use new Javascript features https://babeljs.io/learn-es2015/.

`app.js` file is an entry point for webpack. Import other Javascript files here, so they will be included in the outputted bundle called `main.js`.

###### Static folder
Everything you put into the `static` folder will be copied **untouched** to the root of a `dist` folder.

###### Styling

You can use Sass to style the landing page. The main file that will be converted during the build process to CSS is `main.scss`. Every other file in `src/styles` directory is just a Sass partial imported to this file. As stated on [Sass Guide](http://sass-lang.com/guide) web page:

> This is a great way to modularize your CSS and help keep things easier to maintain. A partial is simply a Sass file named with a leading underscore.

After you create a new partial, just import it in `src/_imports.scss` file with `@import "<name-of-your-partial>"`.
Here you can read more to have a quick overview of what you can do with Sass http://sass-lang.com/guide

Autoprefixer is also included into the build process, so don't use any vendor prefixes in your stylesheets, they will be added automatically.
