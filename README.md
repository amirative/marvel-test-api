## IMPORTANT Notice: This is a test project. 
---
# MARVEL API

This is a simple mavel characters api.

## Requirements
Install [Node.js](https://nodejs.org/en/download/) on your machine.

## installation
1. Install dependencies
    ```bash
    npm install
    ```
   
2. copy **/.env.example** to **/.env** and update the **.env** file with your Marvel's api keys (MARVEL_PUBLIC_KEY & MARVEL_PRIVATE_KEY). you can get the Marvel's api keys from [Marvel's Developers Site](https://developer.marvel.com/). The default port is set to 8080 but you can change it in the .env file
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
&nbsp;
## Code Explanation
#### /characters caching strategy
In this project [node-cache](https://github.com/node-cache/node-cache) library was used to do an in-momory caching. Refer to [character.service.ts](https://github.com/amirative/marvel-test-api/blob/master/src/services/character.service.ts) file to see the code. Below are the steps taken to cache the results obtained from Marvel's API:
1. Get the last modified character & total number of characters in Marvels API using /characters endpoint with (orderBy: '-modified' and limit:1). 
2. Compare the last_modified timestamp obtained in step 1  with the cached last_modified value.
   - If both values are equal, then serve the data from the cache 
   - If not equal, then get the latest list from Marvel’s API then store the results in the cache and update the cached last_modified.

#### Getting all characters data from Marvel’s API
After we get the total number of records (poinit 1 above), we create an array of javascript promises. Each promise will have a limit of 100 records. So if the total number of characters on Marvel’s API is 1450, 15 promises will be created and run concurrently to get the data. After getting all the data we will filter the ids only cache then in memory.
