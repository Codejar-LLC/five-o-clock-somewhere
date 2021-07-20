Setup Process:

1. Install dependencies (some yarn and npm)
2. Run yarn gen in public folder to generate graphql.tsx (creates hooks to interact with backend)
3. Install PSQL and setup a username and password
	This may not be necessary (macs are different) but if you make one, change mikro-orm.config
4. Run new migration in Mikro-ORM using "npx mikro-orm migration:create --initial"
5. Set up Redis and run it on your computer (this is for cookies - not technically necessary rn)
6. To run:
	in backend -
		compile ts -> run dist/app.js (starts localhost:4000)
	in frontend (public) -
		npm run dev (starts localhost:3000)
7. Locations: 
	localhost:3000/register to register user in psql
	localhost:3000/login to login with pre-registered account
	localhost:3000 for home screen (currently completely unfinished)
	localhost:4000/graphql for GraphQL playgrounds 
	
	
Architecture:

	Backend
		entities
			Files containing "entities" (essentially psql tables used by Mikro-ORM & GraqphQL)
		app.ts
				Main file that creates an Apollo server and also sets up cookies
		resolvers
			defined the functions performed on the entities, can be used in graphQL playground
			
	Frontend
		components
			standard react components folder
		generated
			An auto generated folder that is created when you run "npn run gen"
		graphql
			basically just copying graphql queries/mutations into a file to be accessed by codegen
		pages
			folder necessary for nextJS that routes each file to a new location based on name
			standard react files
		utils
			standard react folder for utilities to not crowd the pages
		codegen.yml
			represents all of the settings used in codegen to create generated folder