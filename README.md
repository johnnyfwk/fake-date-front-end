FakeDate.co.uk is a full-stack app where users can find a fake date for a social occasion, such as a wedding, party, or family gathering.

It was built using PostgreSQL, Express, React, and Node.js.

Live URL: https://fakedate.co.uk

The front end was created using React and uses Axios to request user, post, reply, and message data from the back end (Github repo: https://github.com/johnnyfwk/fake-date-back-end).

To run this project locally:
- go to the Github repo at https://github.com/johnnyfwk/fake-date-front-end;
- near the top of the page, click on the button labeled 'Code';
- in the 'Local' tab, copy the HTTPS URL 'https://github.com/johnnyfwk/fake-date-front-end.git';
- in Terminal, go to the folder you want to clone the repo;
- type 'git clone https://github.com/johnnyfwk/fake-date-front-end.git' to copy that repo to your local machine;
- type 'cd fake-date-front-end' to go that folder;
- type 'npm i' to install all the packages that the project requires to run;
- to seed the tables required for this project, follow the instructions in the back end readme at https://github.com/johnnyfwk/fake-date-back-end;
- in the api.js file located in the 'src' folder, change the baseUrl to 'http://localhost:9090/api';
- type 'npm start' to run the React project;
- your browser should automatically display the app; if it doesn't, type 'http://localhost:3000/' into your browser.
