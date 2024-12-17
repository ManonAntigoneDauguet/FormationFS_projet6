# P6-Full-Stack-reseau-dev

## Dependencies

This project is using java 17.


## Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Where to start

As you may have seen if you already started the app, a simple home page containing a logo, a title and a button is available. If you take a look at its code (in the `home.component.html`) you will see that an external UI library is already configured in the project.

This library is `@angular/material`, it's one of the most famous in the angular ecosystem. As you can see on their docs (https://material.angular.io/), it contains a lot of highly customizable components that will help you design your interfaces quickly.

Note: I recommend to use material however it's not mandatory, if you prefer you can get ride of it.

Good luck!


## Back

### How to install and run the project

After creating your own database, complete the `.env` file with the following constants :
- `DATABASE_USERNAME` as your database username
- `DATABASE_PASSWORD` as your database password
- `JWT_KEY` as the key used to encode the JWT token. It must be sufficiently long.  
(example : `ThisIsASecretKeyThatIsAtLeast32BytesLong1545135951695622156622`)

Running the project generate the necessary tables in the database and allow to use the necessary endpoints of the application.   

The server run on the port 3004.

When the server is launching, you can consult the documentation of the API with [this link](http://localhost:3004/api/swagger-ui/index.html).  

Note : by default the JWT token expiration time is set on 1 day. You can change this setting in the `application.properties` file with the `mddapi.app.jwtExpirationMs` property.
