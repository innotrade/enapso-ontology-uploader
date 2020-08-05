const { EnapsoGraphDBClient } = require("@innotrade/enapso-graphdb-client");
const { EnapsoGraphDBAdmin } = require("@innotrade/enapso-graphdb-admin");
const { EnapsoFileWatcher } = require("enapso-file-watcher");
const isJSON = require("is-json");
let data = [];
const EnapsoOntologyUploader = {
	add: async function (jsonData) {
		return new Promise(async (resolve, reject) => {
			if (!isJSON(jsonData, true)) {
				return reject({
					statusCode: 400,
					message: "Please Input correct JSON Format",
					success: false,
				});
			}

			try {
				for (let i = 0; i < jsonData.ontologies.length; i++) {
					EnapsoFileWatcher.add([
						{
							path: jsonData.ontologies[i].filename,
							id: jsonData.ontologies[i].id,
						},
					]);
					data.push(jsonData.ontologies[i]);
				}
			} catch (e) {
				return reject({
					statusCode: 400,
					message: e.message,
					success: false,
				});
			}
		});
	},
	watch: async function () {
		EnapsoFileWatcher.on("fileChanged", async function (message) {
			console.log("file changed");
			// console.log(message);
			// data.forEach((element) => {

			for (let i = 0; i < data.length; i++) {
				if (data[i].id == message.id) {
					// the default prefixes for all SPARQL queries
					const GRAPHDB_DEFAULT_PREFIXES = [
						EnapsoGraphDBClient.PREFIX_OWL,
						EnapsoGraphDBClient.PREFIX_RDF,
						EnapsoGraphDBClient.PREFIX_RDFS,
					];

					let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
						baseURL: data[i].baseurl,
						repository: data[i].repository,
						prefixes: GRAPHDB_DEFAULT_PREFIXES,
					});
					let check = await graphDBEndpoint.clearContext(
						data[i].context
					);

					console.log(check);
					await graphDBEndpoint
						.uploadFromFile({
							filename: data[i].filename,
							format: data[i].format,
							baseIRI: data[i].baseIRI,
							context: data[i].context,
						})
						.then((result) => {
							console.log(result);
							console.log("Ontology Uploaded");
						})
						.catch((err) => {
							console.log(err, "process error here...");
						});
				}
			}
			// console.log(data);

			// // the default prefixes for all SPARQL queries
			// const GRAPHDB_DEFAULT_PREFIXES = [
			// 	EnapsoGraphDBClient.PREFIX_OWL,
			// 	EnapsoGraphDBClient.PREFIX_RDF,
			// 	EnapsoGraphDBClient.PREFIX_RDFS,
			// ];

			// let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
			// 	baseURL: data.ontologies[0].baseurl,
			// 	repository: data.ontologies[0].repository,
			// 	prefixes: GRAPHDB_DEFAULT_PREFIXES,
			// });

			// graphDBEndpoint
			// 	.uploadFromFile({
			// 		filename: jsonData.ontologies[0].filename,
			// 		format: jsonData.ontologies[0].format,
			// 		baseIRI: jsonData.ontologies[0].baseIRI,
			// 		context: jsonData.ontologies[0].ontocontext,
			// 	})
			// 	.then((result) => {
			// 		console.log(result);
			// 		console.log("Ontology Uploaded");
			// 	})
			// 	.catch((err) => {
			// 		console.log(err, "process error here...");
			// 	});
		});
	},
};

module.exports = EnapsoOntologyUploader;
