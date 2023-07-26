# Lifeguard Web Client

## Index

- Stack and Dependencies
- Running the project locally
- How to ship it

## Stack and Dependencies

The webclient uses `11ty` as its static site generator, `jest` form testing and `prettier` for enforcing a cohesive code formatting throughout the project.

The UI elements are custom web components composed of simply `html`, `css` and `js`, no external library or framework, and are organized following the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology, those components can be found in `/src/components`.

The logic of the system, that hidrates the interface with content and communicates with the server can be found on the folder `scr/app` and are written in TypeScript.

## Running the project locally

After installing all the dependencies with the command `npm install`, you can run the project locally with `npm start`. The default port for running the client locally is 8080, so the site can be accessed on the url `http://localhost:8080`.

The built project will be found on the folder `/_site`.

## How to ship it

The build result of the project by default is saved on the folder `_site`. You can populate it either using `npm run build` to make it, or using `npm start` to get it updated in real-time when editing.

To ship it manually, simply copy the data from `_site` to a simple storage service, such as Amazon S3. To make the deploy automatic, you can create a CI/CD pipeline that, after any Pull Request to `main` (or any other target branch) executes the command `npm run build` and targets the output folder `_site` as its publish directory.
