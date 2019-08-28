# Restaurant Passport Marketing Page
## Page Features
* Links to Restaurant Passport
* Sections highlighting Restaurant Passport features
* Call to action
* Fixed navbar with hamburger on mobile and tablet sized devices
* Smooth scrolling
* Lighthouse :100: :100: :100: :100:
* Fully responsive

## Development
### Installation
```bash
git clone https://github.com/restaurantpassport-lambda/westley-feller-ui.git
yarn install
```
### Setup dev server
Create a server that auto refreshes on src updates.
```bash
yarn run start:dev
```
Open localhost:8080 in a web browser to view site and auto refresh on changes.

### Build dist
```bash
yarn run build
```

### Features
#### Styling
##### Bulma
Bulma makes responsive styling simple and scalable. Variables make customization and setting up a
 style guide simple.

##### SASS & PostCSS
SASS allows extensive styling to be created from less code. Combining SASS functionality with
 Bulma helper classes and variables allow for a modular design.

#### Webpack 
##### Performance
| Plugin  | Purpose |
| ------- | ------- |
| Purged CSS | Removes all unused CSS styles to minimize file size |
| Critter | Inline CSS used styles |
| Responsive Loader | Generates an appropriately sized image for each breakpoint and creates a srcset rule for it.

##### Development Tools
|Tool          | Purpose       |
| ------------ | ------------- |
| Dev Server   | Making changes to src files will automatically trigger dist updates and refresh localhost:8080. See changes in realtime. |
| Autoprefixer | Adds CSS prefixes to compiled CSS. No need to write vendor prefixes in SASS. |
| FontMagician | Automatically generate @fontface rules for each font used.

###### Linting
Configuration files are included with the project but the Webpack plugins are not. If you would
 like to utilize the linting functions, you will need to setup file watches through CLI, your IDE, or Webpack.

| Linter    | Files Linted |
| --------- | ------------ |
| HTML Hint | HTML         |
| ESLint    | JS           |
| Stylelint | SASS         |

###### Prettier
Configuration file included with project.
