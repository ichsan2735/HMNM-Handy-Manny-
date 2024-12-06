# HMNM-Handy-Manny-
Handy Manny Nany to Many

npm init -y
npm i pg express ejs sequelize
npm i -D nodemon sequelize-cli
npx sequelize init
mkdir controllers views routers helpers

bikin db: sesuaikan di config
npx sequelize-cli db:create

npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,role:string
npx sequelize-cli model:generate --name Category --attributes categoryName:string
npx sequelize-cli model:generate --name Profile --attributes fullName:string,profilePicture:string,interest:string,UserId:integer
npx sequelize-cli model:generate --name Course --attributes courseName:string,description:text,duration:integer,videoUrl:string,imageUrl:string,views:integer,ratings:integer,CategoryId:integer
npx sequelize-cli model:generate --name UserCourse --attributes UserId:integer,CourseId:integer

npx sequelize-cli migration:create --name addProcedureCol

npx sequelize-cli seed:create --name User
npx sequelize-cli seed:create --name Category
npx sequelize-cli seed:create --name Profile
npx sequelize-cli seed:create --name Course
npx sequelize-cli seed:create --name UserCourse