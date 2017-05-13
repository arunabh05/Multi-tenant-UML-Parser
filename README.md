# Muti-tenant-UML-Parser
A multi-tenant SaaS application with four tenants providing service to generate UML Diagram from Source Code. 

The application provides Grader with the following functionalities:

1. Authentication : A new grader can create an account and get started with grading UML Diagram. User authentication uses bcrypt for securing the user details.

2. Grader Dashboard : The grader can view all the students he has graded and which tenant service he/she used. The dashboard is developed to provide grader with better tracking of students performance. 

3. Grading a new file:
	1. Grader can choose a tenant service from all the available tenants. 
  
	2. Next, he/she upload a zip or text file, depending on the tenant service he/she chose.
  
	3. On submit, the grader get to view the UML Diagram generate for the source code.
  
	4. The grader can move ahead and start grading the student on his/her Source Code and UML Diagram.
  
	5. Each tenant provides a different grading criteria. 
  
## Cloud Architecture

1. The application was deployed on AWS in Oregon Zone.

2. The end point of the application is a Classic Loadbalancer which provided scalability to the Application Server, by spinning up new servers providing auto-scaling depending on the load. The auto-scaling group has the ability to create new instances in different availability zones to provide greater availability.

4. The Application server hits the Application Load balancer which provides path based routing and forwards the request to the respective tenant target group.

3. All the tenant target groups have the been configured to pass the request to the tenant servers in the respective tenant auto-scaling groups.

4. The application uses AWS RDS database which followed Multi-Tenant Data Architecture with Shared Database with Fixed Extension Columns.

![Alt text](https://github.com/arunabh05/Multi-tenant-UML-Parser/blob/master/CloudArchitecture.png)
