var AdmZip = require('adm-zip'),
parser = require('xml2js').Parser(),
_ = require('underscore');

// unzip docx and get body text
getBody = function(path, callback) {
    var zip = new AdmZip(path);
    var zipEntries = zip.getEntries();

    // iterate through documents
    _.each(zipEntries, function(zipEntry) {
        if (zipEntry.entryName == "word/document.xml")
            parser.parseString(zipEntry.getData(), function(err, result) {
                if (err) callback(undefined, err);
                else {
                    var body = result['w:document']['w:body'][0]['w:p'];
                    callback(body, undefined);
                }
            });
    });
}

exports.getBody = getBody;

// getBody("./alit.docx", function(data, err) {
//     if (err) console.dir(err);
//     else console.dir(data);
// });