## Ticketing system microservices bootcamp

### Services
**auth service**
- implement features like signup, signin, signout and retrieve details of current user
- implement session management using cookies with JWT tokens
- implement Docker file with monitoring for any file changes
- Generic Error handling using classes and express error handling middleware
- Ability to throw errors in async callbacks using `express-async-errors` npm package
- client side cookie management using `cookie-session` npm package
- We use `jwt.verify` to verify the token received as session on cookie channel

### Automated Testing using Jest
- first seperate express app configuration from server settings. making so will segregate app functionality from server.
- we will be installing all deps for testing as dev dependencies like jest, supertest, **mongodb-memory-server**. mongodb-memory-server is mainly used to mock mongodb functionality for testing purposes. Since we are having both dev and prod dependencies coming into the picture. so we need to modify on how to create container allowing only prod deps to be considered.






#### Other Useful notes

**How do you store environment variables or secretes in kubernetes ??**
- we use kubernetes secrets object and inject into deployment file env key and make it visible into the `process.env`, which we can use it in our code
- we create secrets using `$ kubectl create secret generic jwt-secret --from-literal=<ENV_VARIABLE_NAME>=<jwt-secret-used-in-signing-toke>`
- we can access the environment variable using `process.env.ENV_VARIABLE_NAME`