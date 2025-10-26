import { init as initApm } from '@elastic/apm-rum';

const apm = initApm({
  serviceName: 'my-app-example',
  serviceVersion: '1.0.0',
  serverUrl: 'https://localhost:8200',
  environment: 'test'
});

export { apm };
export default apm;