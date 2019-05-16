# Aperturious

## About

This is a MERN stack website intended to give photographers a shared platform to share their photos. Photos are stored in collections that are marked as private or public. Public collections are displayed without authentication or special access, while private collections are password protected and intended only for specific clients. 

## Documentation

### User Features

Public photo collections and user accounts are publically available without authorization. An authorized account is required to browse private collections, create your own collections, upload and manage photos, and edit profile details.

To experiment with user features, sign in with a guest account: 

Email: `guest@example.com`
Password: `guestuser`

### React

Starting with [create-react-app](https://www.npmjs.com/package/create-react-app), This site is a single page application that navigates url routes with [react-router](https://www.npmjs.com/package/react-router-dom). Several routes are dynamic and publicly available with no authorization required. For example, user/collection/photo pages are available with unique id's in the url parameters (i.e. https://aperturious-jayrene.herokuapp.com/collections/5ccd9d375797e6002a5656bf). I used this site to exercise common vanilla React features without global state containers like React Redux. 

### Firebase

Firebase provides authentication and file storage. Auth account ID numbers are tracked in the React application to determine access to certain site features (such as uploading, editing profile information, and managing collections). For file uploads, React calls a Firebase Storage bucket and stores files with unique hash values. Downloadable URLs to the storage locations are stored to Aperturious' Mongo database. 

### Express and MongoDB

Node Express serves API routes for a MongoDB database (provided by MongoLab on Heroku addons). [Mongoose](https://www.npmjs.com/package/mongoose) models the database collections, and executes the query methods for each collection. Aperturious makes heavy use of the ".populate" method, which imitates relational data in SQL databases. User, photo collection, and photo documents contain ID references to each other to indicate ownership. The ".populate" method provides query results that display all collections associated with a specific user, and all photos associated with a specific collection.

React components use [axios](https://www.npmjs.com/package/axios) API calls to GET and POST user/collection/photo data. 
