- Clone this repo
- In the project root run `npm install`
- Create a .env file and place the following in it
    OPENAI_APIKEY=<your openai api key>
    WCS_HOST=<your weaviate cloud server name - without the https://>
    WCS_ADMIN_KEY=<your weaviate cloud admin key>
- To load the data, run `npm run load`
- Once data is loaded, the node project can run as the backend to the front end app. Run `npm run dev`

- You can also run `npm run deleteall` to delete everything from your weaviate db and start over
