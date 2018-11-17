# autocomplete-cra
simple autocomplete using create-react-app + express json api

# Setup
- in top directory: `npm install`
- `cd client && npm install`

# Whats going on

Server running at `localhost:5000`
- basic corpus of common words in English in data/
- returns matches via a Simple API `/api/words/lookup/:SEARCHSTRING`
- Return json array of suggestions, w SEARCHSTRING

Client running at `localhost:5000`
- based on create-react-app

# todos to make it awesome

- make *server* more clever
  - 1 huge corpus
  - 2 server-side query cache
  - 3 nodemon
  - 4 clever server-side data structure
  - 5 phrases
  
- make *client* more clever
  - 1 client-side query cache
  - 2 a11y
  - 3 debounce / throttle api calls to make more realistic, i.e. don't call server ever character.
  - 4 double check return from API, matches current query
  - 5 spinner for slow network
  - 6 visual css
  - 7 optimize with pre-fetch ... predict what striong will be

# Other tools / thank yous
- https://github.com/facebook/create-react-app
- JSONView chrome extension
- Thank you https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0 
