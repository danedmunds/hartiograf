build:
	docker build . -t danedmunds/hartiograf

mongo-import:
	mongoimport --db hartiograf --collection rsvps --drop --file rsvps.json

start:
	nodemon index.js
