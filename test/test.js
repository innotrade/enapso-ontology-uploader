const { EnapsoOntologyUploader } = require("../index");
const chai = require('chai');
const { expect } = require('chai');
describe('Enapso File Watcher Test Cases', function () {
    it('Add a Single Ontology File in Watcher', function () {
        const jsonData = require("./config.json");
        EnapsoOntologyUploader.add(jsonData)
            .then((res) => {
             expect(res).to.have.property('statusCode', 200);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it('Add Multiple Ontology Files in Watcher', function () {
        const jsonData = require("./configs.json");
        EnapsoOntologyUploader.add(jsonData)
            .then((res) => {
             expect(res).to.have.property('statusCode', 200);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    it('Watch Files in Watcher', function () {
       EnapsoOntologyUploader.watch()
            .then((res) => {
         // expect(res).to.have.property('statusCode', 202);
            })
            .catch((err) => {
                console.log(err);
            });
    });
   
   


});

