## IMPORTANT Notice: This is a test project. 
---
# MARVEL API

This is a simple mavel characters api that has two endpoints

## Requirements
Install [Node.js](https://nodejs.org/en/download/) on your machine.

## installation
1. Install dependencies
    ```bash
    npm install
    ```
   
2. copy **/.env.example** to **/.env** and update the **.env** file with your Marvel's api keys (MARVEL_PUBLIC_KEY & MARVEL_PRIVATE_KEY). Default port is set to 8080 but you can change it in the .env file
    ```
    PORT=8080

    MARVEL_PUBLIC_KEY=your-public-key
    MARVEL_PRIVATE_KEY=your-private-key
    ```

3. Build the project
   ```bash
   npm run build
   ```
   
4. Run the app
   ```bash
   npm run start
   ```

   Access the api docs on [http://localhost:8080/docs](http://localhost:8080/docs)


## Test
To run the tests
```bash
npm run test
```