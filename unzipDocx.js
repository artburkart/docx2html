var AdmZip = require('adm-zip'),
parser = require('xml2js').Parser();

// unzip docx and get each entry
var zip = new AdmZip("./alit.docx");
var zipEntries = zip.getEntries();

// iterate through documents
zipEntries.forEach(function(zipEntry) {
    if (zipEntry.entryName == "word/document.xml")
        parser.parseString(zipEntry.getData(), function(err, result) {
            console.dir(result['w:document']['w:body'][0]['w:p']);
        });
});