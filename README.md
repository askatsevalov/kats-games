# Kats Games

Kats Games is a simple web application which gives you an opportunity to play your favourite board games with friends online.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node JS](https://nodejs.org/en/download/)
- [Dotnet](https://dotnet.microsoft.com/download)

### Installing

#### Backend

Go to backend folder:

```
cd backend
```

Install all dependencies:

```
dotnet restore
```

Build projects:

```
dotnet build
```

Run api with command:

```
dotnet run -p API
```

After this steps, Web API will be available at http://localhost:5000 (by default)

By following the link you will see api documentaion created with Swagger UI

// @TODO - Insert screenshot of swagger

#### Frontend

Go to frontend folder:

```
cd frontend
```

Install all dependencies:

```
npm install
```

Run application:

```
npm run serve
```

After this steps, Web App will be available at http://localhost:4200 (by default)

By following the link you will see main page of application:

// @TODO - Insert screenshot of main page

## Deployment

Use this command in root directory to run whole application in production mode using docker-compose:

```
docker-compose --build -d up
```

## Built With

* [Vue.js](https://vuejs.org/) - web application framework
* [Buefy](https://buefy.org/) - rich UI components collection for Vue.js
* [ASP.NET Core](https://docs.microsoft.com/ru-ru/aspnet/core/) - framework used for web api development
* [Nuget](https://www.nuget.org/) - dotnet dependency management

## Authors

* **Artem Katsevalov** - *Initial work* - [askatsevalov](https://github.com/askatsevalov)
