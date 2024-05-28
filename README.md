# serverless-forms
Serverless forms using Go, Lambda, React and NeonDB

This repository supports [this](https://youtu.be/JtgwiJggOU0) video.

## email-lambda-function
This folder contains the lambda function and SAM templates.

Make sure to modify the environment variables in `template.yaml`!

To create:
```bash
sam build
sam deploy --guided
```

To update:
```bash
sam build && sam deploy
```

To delete:
```bash
sam delete
```

## react-frontend
This folder contains the ReactJS frontend.

Don't forget to update the API Gateway endpoint URL with the output of the SAM deploy command!

Run:
```bash
npm install
npm run start
```