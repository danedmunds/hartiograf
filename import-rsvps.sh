#/bin/bash

mongoimport --db hartiograf --collection rsvps --drop --file rsvps.json
