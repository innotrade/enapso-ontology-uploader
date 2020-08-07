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

			for (let i = 0; i < jsonData.ontologies.length; i++) {
				try {
					await EnapsoFileWatcher.add([
						{
							path: jsonData.ontologies[i].filename,
							id: jsonData.ontologies[i].id,
						},
					]);
					data.push(jsonData.ontologies[i]);
				} catch (e) {
					return reject({
						statusCode: 400,
						message: e.message,
						success: false,
					});
				}
			}

			return resolve({
				statusCode: 200,
				message: "Successfully Added",
				success: true,
			});
		});
	},
	watch: async function (callback) {
		return EnapsoFileWatcher.on("fileChanged", async function (message) {
			// console.log("file changed");
			// console.log(message);
			// data.forEach((element) => {

			for (let i = 0; i < data.length; i++) {
				if (data[i].id == message.id) {
					try {
						// the default prefixes for all SPARQL queries
						const GRAPHDB_DEFAULT_PREFIXES = [
							EnapsoGraphDBClient.PREFIX_OWL,
							EnapsoGraphDBClient.PREFIX_RDF,
                            EnapsoGraphDBClient.PREFIX_RDFS,
                            {
                                prefix: data[i].prefix,
                                iri: data[i].baseIRI,
                            },
						];

						let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
							baseURL: data[i].baseurl,
							repository: data[i].repository,
							prefixes: GRAPHDB_DEFAULT_PREFIXES,
						});
						await graphDBEndpoint.clearContext(data[i].context);

						let res = await graphDBEndpoint.uploadFromFile({
							filename: data[i].filename,
							format: data[i].format,
							baseIRI: data[i].baseIRI,
							context: data[i].context,
						});
						// callback(null, res);
						callback(null, { file: message, result: res });
					} catch (e) {
						callback({ file: message, error: e });
						// throw e;
						// callback(e);
						// return;
					}
				}
			}
		});
	},
};

module.exports = EnapsoOntologyUploader;
