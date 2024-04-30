This is a [Kosko] project bootstrapped with `create-kosko` command.

## Getting Started

Before you start, install minikube (or whatever else to provide k8s environment) and docker. then run command below:
```sh
docker buildx build -t backend-node-app:figleter ./app
# in case you install minikube
docker save backend-node-app > backend-node-app.tar
minikube image load backend-node-app.tar
```

Generate Kubernetes manifests with the following command.

```sh
npm run generate
```

The result will be printed in the console. You can pipe the output to `kubectl` to apply generated manifests on Kubernetes.

```sh
npm run --silent generate | kubectl apply -f -
# in case when you minikube
minikube tunnel
kubectl get services # to access edge loadbalancer ip
```

When `--env` option is set, Kosko will read variables from environment files. Then you can fetch variables with `@kosko/env` package.

```sh
npm run generate -- --env dev
```

You can try editing files in `components` and `environments` folder and re-run `npm run generate` to see changes.

## Learn More

Check [Kosko docs](https://kosko.dev/docs/) for more information about Kosko.

[kosko]: https://kosko.dev/
