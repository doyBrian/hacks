# hacks
A simple yet versatile web platform for users to post or share their own, read or search life hacks contributed by other users.

### Deployed App Link
https://hacks-app.herokuapp.com/


### Design Plan
This project follows the MVC design pattern - uses Node and Express Web Server to query and route data in the app, MongoDB for Database and Mongoose for ORM.

* Has the full CRUD (create, read, update and delete) functionality.

* Utilizes Semantic UI React Integrated library for front end layout and design.

* The web app is a Single Page Application with components that render dynamic data.

* The web app is also mobile responsive.


### Overview

* App has a landing page in modal form which introduces the user to the name and concept of the site.

* There is no log-in required. The idea is to have the sense of anonymity emulating a hacker. 

* The main page is where life hacks can be posted, viewed and searched.

* Page content is laid out in grid form and mostly covering 2 equal width columns.

* In the right column, a button is available for posting/sharing a new life hack. Also a randomly-picked hack is displayed at page load referred to as (Hack of the )H.O.T. Moment which can change at any given moment.

* In the other section, there is the Feed column in which content is mounted on different tabs. There are currently 4 tabs which can be toggled and are as follows - New(s), recently added hacks; Lit As F-ive, top 5 most liked hacks; searcHacks, a search bar for finding hacks according to tag associated with the post; and lastly, WT-Hack, hacks that have been flagged for review (either deemed as suspicious or inappropriate).

* For each post, a random pre-made avatar is assigned without any regard to the sexual identity of the user. A post will also generate a Like button, a delete button and a flag button. Name, email (to be used as verification for deleting own post), tag(s) related to the hack and summary description of the hack are all required information in the form. There is also an option to add a link to a source, either picture or videos.

* All posts are stored in the database and are accessed through API queries using appropriate routers.

* A post can generate as many Likes (anyone can press it) but it is merely used for fun and perhaps tracking. 

* If a post is deemed inappropriate or suspicious (especially for link attachments), any user can flag it and it will be up to the admin to review and take cation (delete or approve).

* Both the Likes and Flag use the Update functionality.

* Only the original user that posted a specific hack can delete using the email associated to the post at the time it was written. Once deleted, it is gone permanently.




