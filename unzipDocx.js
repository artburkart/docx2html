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

        // iterate through documents
        var entry = _.findWhere(zipEntries, {entryName: "word/document.xml"});

        parser.parseString(entry.getData(), function(err, result) {
            if (err) return callback(undefined, err);
            else {
                var body = result['w:document']['w:body'][0]['w:p'];
                return callback(body, undefined);
            }
        });
        return callback(undefined, "Error: not a valid docx file.");
    });
}

exports.getBody = getBody;

// getBody("./nom.docx", function(data, err) {
//     if (err) console.dir(err);
//     else console.dir(data);
// });