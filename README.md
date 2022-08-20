# REST Server with NodeJS

Template for any use in REST Server.
This base is for any use, it implements some characteristics like:

- Create a user and save it in the MongooseDB
- Everytime the user log-in a JWT is generated for authentication
- Create, Save, Update and Disable a user, some of this operation the user needs the role ADMIN_ROLE
- Google Authentication, saving the data in our MongooseDB for future logins
- Create, Updtae and Disable products and categories with custom values
- The categories needs JWT auth from a user to work, this save what person creat it in the db.
- The products also need the JWT and a category where will it belong.
- You can search any product or category depending on what are you looking for, you can search it by name, description or using a valid MongoID
- Two functionalities available, you can save your images, videos, etc. on local files or upload it on Cloudinary.


## Dependencies
* bcryptjs: ^2.4.3
* cloudinary: ^1.30.1
* cors: ^2.8.5
* dotenv: ^10.0.0
* express: ^4.17.1
* express-fileupload: ^1.4.0
* express-validator: ^6.13.0
* google-auth-library: ^8.1.0
* jsonwebtoken: ^8.5.1
* mongoose: ^6.0.13
* uuid: ^8.3.2
