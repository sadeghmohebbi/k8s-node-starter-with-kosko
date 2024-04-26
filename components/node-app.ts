import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { Service } from "kubernetes-models/v1";

const name = "backend-node-app"
const labels = { app: name }
const port = 3030


const deployment = new Deployment({
  metadata: {
    name
  },
  spec: {
    selector: {
      matchLabels: {
        name
      }
    },
    replicas: 5,
    template: {
      metadata: { labels },
      spec: {
        containers: [
          {
            name,
            image: 'backend-node-app:figleter',
            env: [
              {
                name: 'PORT',
                value: String(port)
              }
            ],
            imagePullPolicy: 'Never'
          }
        ]
      }
    }
  }
})

const service = new Service({
  metadata: {
    name: 'edge'
  },
  spec: {
    selector: {
      name
    },
    ports: [
      {
        port: 8030,
        targetPort: port
      }
    ]
  }
})

export default [deployment,service]