# Development

1. Steps to start the application in development

- Start database using the command

```
docker compose up -d
```

2. Rename the .env.template for .env

3. Replace the variables in the string connection

4. Install node dependencies using the command:

```
npm install
```

5. Run the project:

```
npm run dev
```

6. Fill the database using seed [executing the endpoint](localhost:3000/api/seed)

# Prisma commands

- Command for initialize prisma on the project

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

## Notes:

**user:** test1@google.com
**password:** 123456
