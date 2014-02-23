var AdmZip = require('adm-zip'),
parser = require('xml2js').Parser(),
_ = require('underscore'),
fs = require('fs'),
et = require('elementtree');

var XML = et.XML;
var ElementTree = et.ElementTree;
var element = et.Element;
var subElement = et.SubElement;

var etree;

// unzip docx and get body text
getBody = function(path, callback) {

    // path validation
    fs.exists(path, function (exists) {
        if (!exists) return callback(undefined, "Error: file does not exist.");

        var zip = new AdmZip(path);
        var zipEntries = zip.getEntries();

        // grabs the body xml
        var entry = _.findWhere(zipEntries, {entryName: "word/document.xml"});
        entry = entry.getData().toString();
        etree = et.parse(entry);
        console.log(etree.findall('w:body/w:p'));

    });
};

exports.getBody = getBody;

getBody("./nom.docx", function(data, err) {
    if (err) console.dir(err);
    else console.dir(data);
});