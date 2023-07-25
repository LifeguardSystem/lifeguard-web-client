# Lifeguard Web Client

## Dependencies

The webclient uses `11ty` as its static site generator, `jest` form testing and `prettier` for enforcing a cohesive code formatting throughout the project.

The UI elements are custom web components composed of simply `html`, `css` and `js`, no external library or framework, and are organized following the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology, those components can be found in `/src/components`.

The logic of the system, that hidrates the interface with content and communicates with the server can be found on the folder `scr/app` and are written in TypeScript.

## Running the project locally

After installing all the dependencies with the command `npm install`, you can run the project locally with `npm start`, and use `npm build` to build the project. The default port for running the client locally is 8080, so the site can be accessed on the url `http://localhost:8080`.

The built project will be found on the folder `/_site`.
