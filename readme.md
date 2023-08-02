# Lifeguard Web Client

## Index

- Stack and Dependencies
- Running the project locally
- How to ship it

## Stack and Dependencies

The webclient uses [11ty](https://www.11ty.dev/) as its static site generator, `jest` as it testing framework and `prettier` for enforcing a cohesive code formatting throughout the project.

The UI elements are custom web components made with no external library or framework, and are organized following the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology - those components can be found in the directory `/src/components`.

The logic of the system, that hidrates the interface with content and communicates with the server can be found on the folder `scr/app` and is written in TypeScript.

## Running the project locally

After installing all the dependencies with the command `npm install`, you can run the project locally with `npm start`. The default port for running the client locally is 8080, so the site can be accessed from the url `http://localhost:8080`.

The static site resultant from the built project will be found on the folder `/_site`. When running locally, the project by default will not connect to real servers and, instead will run from locally sourced mock files, that can be edited in `/src/mock-local`.

## Testing the code

The test files are found on the `/test` directory.

Attention: The test suite runs on the transpiled JS expected result from the TypeScript code, so before running `npm run test` you should run either `npm start` or `npm run build`.

## How to ship it

The files that results from the build process of the project are by default saved at the directory `_site`. You can populate it either using `npm run build`.

Note: Runing `npm start` will also populate the `_site` folder, but it will also generate the mock files in there, so it is recommended to use `npm run build` in production.

### Configuring the project to access your Lifeguard server

Remenber! The global configuration file should be editted before deploying your client. You can find the global configuration file at `/src/app/global`, it is important to change at least the `domain` variable to point to your production Lifeguard server.

### Shipping

To ship it manually, simply copy the data you generated at the `_site` directory to a simple storage service, such as Amazon S3. To make the deploy automatic, you can create a CI/CD pipeline that, after any Pull Request to `main` (or any other target branch) executes the command `npm run build` and targets the output folder `_site` as its publish directory.
