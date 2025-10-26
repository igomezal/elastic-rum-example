
# Elastic RUM Example

This is a example project which has been build using webcomponents developed with lit and with shoelace library to showcase how Elastic RUM works.

## Installation

For this project you will need to have installed node, npm, docker and make.

The first part is to prepare the elastic stack and for that we will use [elastdocker project](https://github.com/sherifabdlnaby/elastdocker).

Clone the repository:

```bash
git clone https://github.com/igomezal/elastic-rum-example.git
```

Change your current directory to the configured elastdocker folder:

```bash
cd ./elastdocker
```

To prepare secrets files:

```bash
make setup
```

Launch ELK stack:

```bash
make elk
```

With this your ELK stack is ready to consume events from RUM so we just need to start the front application.

In the root of the project install it:

```bash
npm install
```

Then start the front application:

```bash
npm run start
```

And now just navigate through the application.

> It is possible the application can give you errors as it is using self signed certificates generated on the fly, so to ensure it works you will have to accept the warning shown in the browser.

Finally, go to your local kibana [https://localhost:5601](https://localhost:5601) to check the traces stored thanks to APM RUM.

## Usage

The idea of the project is simple, it has three steps and a welcome page, the user just need to enter an username and then navigate through the three steps.

Each step will create a new span that will be send to APM.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)