### Deploy

1. Create Heroku app on web UI or CLI
2. Set env variables on web UI or CLI
3. Link to Heroku remote and push commit
4. To manually trigger redeploy, must link app to github repo

```bash
# after creating heroku app from the web UI
heroku git:remote -a react-e-commerce-shawlu95
git push heroku main
```
