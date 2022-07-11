## React E-Commerce App

This project is an exercise of building front-end application using React. It is an advanced project involving many features:

- react-router-dom@6
- multiple contexts and reducers
- integrating with back-end
- working with 3rd party API (Stripe)

### Development

On local development, start the browser app (port 3000) and nodejs app (port 8080) on two separate terminals.

```bash
cd client
npm start

# in another terminal
npm run dev
```

### Deployment

The browser app and nodejs app are deployed to Heroku together.

1. Create Heroku app on web UI or CLI.
2. Set env variables on web UI or CLI.
3. Link to Heroku remote and push commit.
4. To manually trigger redeploy, must link app to github repo.

```bash
# after creating heroku app from the web UI
heroku git:remote -a react-e-commerce-shawlu95
git push heroku main
```
