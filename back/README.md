# MDD (Monde de Dév)

Welcome to this "Minimum Viable Product" for the MDD ("Monde de Dév") project.   

This projet is the back part of a global project.  
To see the global information about this project, go [there](../README.md) !

## Dependencies

This project is using java 17 and MySQL.

## How to install and run the project

After creating your own MySQL database, complete the `.env` file with the following constants :
- `DATABASE_USERNAME` as your database username
- `DATABASE_PASSWORD` as your database password
- `JWT_KEY` as the key used to encode the JWT token. It must be sufficiently long.  
  (example : `ThisIsASecretKeyThatIsAtLeast32BytesLong1545135951695622156622`)

Running the project generate the necessary tables in the database and allow to use the necessary endpoints of the application.

The server run on the port 3004.

When the server is launching, you can consult the documentation of the API with [this link](http://localhost:3004/api/swagger-ui/index.html).

Note : by default the JWT token expiration time is set on 1 day. You can change this setting in the `application.properties` file with the `mddapi.app.jwtExpirationMs` property.

## Mocked data

To test application before production, the database is cleared and repopulated, at each run, with the data.sql file.  
On the application, Postman, or SWAGGER documenation, try login with email 'scar@mdd.com' and password 'Password!123'

In test environment, we use a copy of these mocked data in data-test.sql.   
This one will be conserved in production.