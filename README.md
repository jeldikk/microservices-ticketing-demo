## Ticketing system microservices bootcamp

### Services
**auth service**
- implement features like signup, signin, signout and retrieve details of current user
- implement session management using cookies with JWT tokens
- implement Docker file with monitoring for any file changes
- Generic Error handling using classes and express error handling middleware
- Ability to throw errors even in async callbacks







#### Other Useful notes

**How do you store environment variables or secretes in kubernetes ??**
- we use kubernetes secrets object and inject into deployment file env key and make it visible into the `process.env`, which we can use it in our code
- we create secrets using `$ kubectl create secret generic jwt-secret --from-literal=<ENV_VARIABLE_NAME>=<jwt-secret-used-in-signing-toke>`
- we can access the environment variable using `process.env.ENV_VARIABLE_NAME`