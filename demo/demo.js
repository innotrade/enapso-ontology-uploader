const { EnapsoOntologyUploader } = require("../index");
const jsonData = require("./config.json");

EnapsoOntologyUploader.add(jsonData)
	.then((res) => {
		console.log("here in response ", res);
	})
	.catch((err) => {
		console.log("here in cathc", err);
	});

EnapsoOntologyUploader.watch(function (error, result) {
	if (error) {
		console.log("here in error");
		console.log(error);
	} else {
		console.log("here in result", result);
	}
});

// EnapsoFileWatcher.on("fileChanged", function (message) {
// 	console.log(message);
// });

// console.log(jsonData.ontologies[0]);
// const GRAPHDB_BASE_URL = jsonData.ontologies[0].baseurl,
// 	GRAPHDB_REPOSITORY = jsonData.ontologies[0].repository,
// 	GRAPHDB_USERNAME = jsonData.ontologies[0].username,
// 	GRAPHDB_PASSWORD = jsonData.ontologies[0].password,
// 	GRAPHDB_CONTEXT_TEST = jsonData.ontologies[0].context;

// // the default prefixes for all SPARQL queries
// const GRAPHDB_DEFAULT_PREFIXES = [
// 	EnapsoGraphDBClient.PREFIX_OWL,
// 	EnapsoGraphDBClient.PREFIX_RDF,
// 	EnapsoGraphDBClient.PREFIX_RDFS,
// ];

// let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
// 	baseURL: GRAPHDB_BASE_URL,
// 	repository: GRAPHDB_REPOSITORY,
// 	prefixes: GRAPHDB_DEFAULT_PREFIXES,
// });

// EnapsoFileWatcher.add([
// 	{ path: jsonData.ontologies[0].filename, id: jsonData.ontologies[0].id },
// ])
// 	.then(async (res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log("Error", err);
// 	});

// EnapsoFileWatcher.on("fileChanged", function (message) {
// 	console.log("file changed");
// 	console.log(message);

// 	graphDBEndpoint
// 		.uploadFromFile({
// 			filename: jsonData.ontologies[0].filename,
// 			format: jsonData.ontologies[0].format,
// 			baseIRI: jsonData.ontologies[0].baseIRI,
// 			context: jsonData.ontologies[0].ontocontext,
// 		})
// 		.then((result) => {
// 			console.log(result);
// 			console.log("Ontology Uploaded");
// 		})
// 		.catch((err) => {
// 			console.log(err, "process error here...");
// 		});
// });
