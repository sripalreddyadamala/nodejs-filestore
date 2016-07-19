

## Steps to setup and run the application

1) Make sure you have nodejs, MongoDB installed
2) Unzip the folder and navigate to package.json
3) Open the terminal or command prompt and run `npm install`
4) This will create node_modules folder and will install all the required dependency
5) Run the command `node server`
6) It will print the message
	`Server is running on port: 3000`


7) Open the postman or Google REST client and try following URL

// To get all the contacts (GET)
1) http://localhost:3000/api/collections/

// To get specific contact by _id (GET)
2)http://localhost:3000/api/collections/578d30388616cfc9e2738f01

// To add new contact (POST)
Payload:

{
	"name": "Sripal"
	"email": "sripal@gmail.com"
	"number": "123456788"
}
3) http://localhost:3000/api/collections/


// To remove a contact (DELETE)
4) http://localhost:3000/api/collections/578d30388616cfc9e2738f01

// To update a contact (PUT)
Payload:

{
	"name": "Sripal-222"
	"email": "sripal-222@gmail.com"
	"number": "123456788"
}

5) http://localhost:3000/api/collections/578d30388616cfc9e2738f01

// To upload a file (POST)
Content-Type: multipart/form-data
6) http://localhost:3000/api/collections/upload

// To download a file (GET)
7) http://localhost:3000/api/collections/download/filename




