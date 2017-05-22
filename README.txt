This application was deployed on AWS. The Application server was configured in a auto scaling group and a classic load balancer. The Tenants server were also in a autos caling group and a application load balancer.

This is a multi-tenant application which has a application server UMLParser which is a SPA for the graders to login and grade student code using different tenant services. There are 4 tenants available and the grader can choose to use any of them. The user dashboard provides the details of all the students assignment that has been graded and can view which students are not doing good in class. MySQL database is used with Shared Database Model for all the graded assignments.

The UMLParser server has a 4 services:

Login
Provide login for the user.

Register
Provides registration for new user.

GenerateUML
This service calls the tenant specific server and process the uploaded code to generate a UML diagram.

Grade
This services provides user to submit the grades and store them in the MySQL server.


Tenant Servers

Each tenant server has 1 service.

GenerateUML
This services recieves the uploaded file and use the UML Parser java application and generates an image for the UML diagram, which is then sent back to the application server.

