var AdmZip = require('adm-zip'),
parser = require('xml2js').Parser(),
_ = require('underscore'),
fs = require('fs'),
et = require('elementtree');

var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;

// unzip docx and get body text
getBody = function(path, callback) {
    var etree;

    // path validation
    fs.exists(path, function (exists) {
        if (!exists) return callback(undefined, "Error: file does not exist.");

        var zip = new AdmZip(path);
        var zipEntries = zip.getEntries();

        // grabs the body xml
        for (var i = 0; i < zipEntries.length; i++) {
            if (zipEntries[i].entryName === "word/document.xml") {
                entry = zipEntries[i];
                break;
            }
        }
        entry = entry.getData().toString();
        etree = et.parse(entry).findall('w:body/w:p');
        etree.iter();
        return callback(etree, undefined);
    });
};

// parse = function(tree) {

// }

exports.getBody = getBody;

getBody("./nom.docx", function(data, err) {
    if (err) console.log(err);
    else console.dir(data);
});

var x;

getBody("./nom.docx", function(data, err) {
    if (err) console.log(err);
    else x = data;
});