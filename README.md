# Case-Tracker


## Full project

https://www.youtube.com/watch?v=cONFD37A6y8

https://github.com/mterrano1/Case-Tracker-Final-Project


## Description

This React application is designed to track cases and connect to two API's that are also containerized in a Docker container, a [Flask API](https://github.com/mterrano1/case-tracker-flask) and a [Rails API](https://github.com/mterrano1/case-tracker-backend). The links to these APIs are as follows:


## Running the Application

To run this application, you will need to have Docker installed on your machine. Once you have Docker installed, you can follow these steps:

1. Clone the repository:
```console
$ git clone https://github.com/mterrano1/case-tracker-client
```

2. Navigate to the root directory of the project in your terminal
```console
$ cd <root-directory>
```

3. Build the Docker container with the following command:
```console
$ docker build -t case-tracker:dev .
``` 

4. Run the Docker container with the following command:
```console
$ docker run -it -p 3000:3000 case-tracker:dev
```

5. Once the Docker container is running, you can view the application by opening a web browser and navigating to http://localhost:3000.


## Conclusion

This application is a useful tool for tracking cases and analyzing case data. With the help of the Flask API and the Rails API, users can easily manage cases and generate reports to help make informed decisions.