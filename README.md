# 4T1T-dashboard
Mainly developed as a programming exercise, this project serves as a simple dashboard for a little amateur gaming team.
The dashboard revolves around the game Dota 2, and its purpose is storing informations regarding the players and the heroes, such as the players' favourite heroes and the interactions between different heroes.
All this stored information is then used to provide strategic aid, by suggesting the best choices to make based on the players' preferences and on what choices have been made so far.

The project is developed using the [MEAN stack](http://mean.io/), and it therefore consists in a Node.js based back end, that stores data in a MongoDB database and provides a REST API routed through Express.js.
For the user interaction, the application comes with an AngularJS front end that interacts with the API to retrieve and store the data, and provides a pleasant User Interface, designed using [Bootstrap](http://getbootstrap.com/); the interface is fully responsive, and allows for a comfortable interaction.

The application features an authentication system based on [JWT tokens](https://jwt.io/); no API is therefore available unless a valid token is provided, except of course for the authentication service.

The main part of the application is in the pick and ban suggestion system: the data input by the users is used to compute the potential best picks/bans in a given situation.
The suggestion logic is distributed into modules, that calculate their outcomes based on different criteria; weights are assigned to each suggestion, to evaluate their relevance.
All the data is then returned to the main module, that merges and ranks them based on their aggregate weights.
This modular approach allows for new suggestion criteria to be easily added at any moment.
