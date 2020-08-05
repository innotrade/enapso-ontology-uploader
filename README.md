# enapso-ontology-uploader

enapso automated ontology uploader in which you add ontology files in watcher and if any change occur in ontology file then it automatically upload the updated ontology file in GraphDB.
To discuss questions and suggestions with the enapso, we'll be happy to meet you in our forum at https://www.innotrade.com/forum/.

# Add Method

```javascript
const jsonData = require("./config.json");
EnapsoOntologyUploader.add(jsonData)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

jsonData which pass the json file in which use JSON Format where you have the following information

```
{
	"ontologies": [
		{
			"filename": "./EnapsoOntologyRepository.owl",

			"id": "test1",

			"repository": "Test",

			"username": "admin",

			"password": "root",

			"dburl": "http://localhost:7200",

			"baseurl": "http://localhost:7200",

			"format": "application/rdf+xml",

			"baseIRI": "http://ont.enapso.com/repo#",
			"context": "http://ont.enapso.com/repo"
		},

		{
			"filename": "./EnapsoAuthorization.owl",

			"id": "test2",

			"repository": "enapso-admin",

			"username": "admin",

			"password": "root",

			"dburl": "http://localhost:7200",

			"baseurl": "http://localhost:7200",

			"format": "application/rdf+xml",

			"baseIRI": "http://ont.enapso.com/auth#",

			"context": "http://ont.enapso.com/auth"
		}
	]
}
```

so while adding it you will get the `id` and `path` from that json file of each record and add each ontology file in the watcher

# Watch Method

```javascript
EnapsoOntologyUploader.watch(function (error, result) {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
});
```

watch method watch the added ontology files and if any change occur it get the `id` of that file and get the detail and using it, it will clear the existing context of ontology and upload the updated file of ontology.
