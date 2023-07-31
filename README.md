# Authorization Code and Credentials Flow for Public Clients
The Authorization Code and Credientials flow is especially for customer and partner. you unable to setup this flow for employees accessing the salesforce platform (login.salesforce.com). you can control Front-end and Back-end separately. 

You call headless login API via Your Experience cloud site to handle the back-end work of authenticating users and granting access to protected Salesforce resources.

You need to share you Client Secret to Client-Side. If you have security concern, Just go with Authorization Code and Credentials Flow for Private Clients (https://github.com/Priyananth-Salesforce/Headless-SF-Authenication--Login-Via-Javascript-App).

For Salesforce Recommendation, For security, we strongly recommend that you always use the client-server variation of this flow whenever you can. The client-server variation gives you extra protection for the consumer secret during the code exchange.
