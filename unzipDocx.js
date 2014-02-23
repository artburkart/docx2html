var AdmZip = require('adm-zip'),
parser = require('xml2js').Parser(),
_ = require('underscore'),
fs = require('fs');

// unzip docx and get body text
getBody = function(path, callback) {

    // path validation
    fs.exists(path, function (exists) {
        if (!exists) return callback(undefined, "Error: file does not exist.");

        var zip = new AdmZip(path);
        var zipEntries = zip.getEntries();

        // grabs the body xml
        var entry = _.findWhere(zipEntries, {entryName: "word/document.xml"});

        // parse the body xml and return the blob of interest
        parser.parseString(entry.getData(), function(err, result) {
            if (err) return callback(undefined, err);
            else {
                var body = result['w:document']['w:body'][0]['w:p'];
                return callback(body, undefined);
            }
        });
    });
}

exports.getBody = getBody;

// getBody("./nom.docx", function(data, err) {
//     if (err) console.dir(err);
//     else console.dir(data);
// });