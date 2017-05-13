# Muti-tenant-UML-Parser
A multi-tenant SaaS application with four tenants providing service to generate UML Diagram from Source Code. 

A application server providing Grader with the following functionalities:

1. Authentication : A new grader can create an account and get started with grading UML Diagram. User authentication uses bcrypt for securing the user details.

2. Grader Dashboard : The grader can view all the students he has graded and which tenant service he/she used. The dashboard is developed to provide grader with better tracking of students performance. 

3. Grading a new file : 
  a. Grader can choose a tenant service from all the available tenants. 
  
  b. Next, he/she upload a zip or text file, depending on the tenant service he/she chose.
  
  c. On submit, the grader get to view the UML Diagram generate for the source code.
  
  d. The grader can move ahead and start grading the student on his/her Source Code and UML Diagram.
  
  e. Each tenant provides a different grading criteria. 
  
4. The database has been developed using Multi-Tenant Data Model with Shared Database with Fixed Extension.
  
![Alt text](https://github.com/arunabh05/Multi-tenant-UML-Parser/blob/master/CloudArchitecture.png)
