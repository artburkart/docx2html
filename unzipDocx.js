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
        entry = entry.getData().toString()
            .replace(/ w:type="spell[Start|End]"/, "")
            .replace(/w:type="gram[End|Start].*?\/>/g, "/>")
            .replace(/w:rsidP.*?>/g, ">")
            .replace(/<w:contextualSpacing\/>/g, "")
            .replace(/<w:t xml:space="preserve">/g, "<w:t>")
            .replace(/<w:pStyle w:val="style0"\/>/g, "")
            .replace(/<w:spacing.*?\/>/g, "")
            .replace(/<w:rStyle w:val="style16"\/>/g, "")
            .replace(/<w:ind.*?\/>/g, "")
            .replace(/<\/w:t>/g, "")
            .replace(/<w:t>/g, "")
            .replace(/<w:b\/>/g, "<strong></strong>")
            .replace(/<w:i\/>/g, "<em></em>")
            .replace(/<w:u.*?\/>/g, "<u></u>")
            .replace(/<\/w:p>/g, "</p>")
            .replace(/<w:p>/g, "<p>")
            .replace(/<\/w:r>/g, "</span>")
            .replace(/<w:r>/g, "<span>")
            .replace(/<\/w:rPr>/g, "")
            .replace(/<w:rPr>/g, "")
            .replace(/<\/w:pPr>/g, "")
            .replace(/<w:pPr>/g, "")
            .replace(/<\/w:hyperlink>/g, "<\/a>")
            .replace(/<w:hyperlink.*?>/g, "<a>")
            .replace(/<w:br\/>/g, "<br\/>")
            .replace(/<\/w:body>/g, "<\/body>")
            .replace(/<w:body>/g, "<body>")
            .replace(/<\/w:document>/g, "</html>")
            .replace(/<w:document.*?>/g, "<html>")
            .replace(/<\/w:numPr>/g, "</li>")
            .replace(/<w:numPr>/g, "<li>")
            .replace(/<w:ilvl \D*(\d)\D*\/>/g, "<lvl-$1\/>")
            .replace(/<w:numId \D*(\d)\D*\/>/g, "<indent-$1\/>")
            .replace(/<\/*w:.*?>/g, "")


        etree = et.parse(entry).findall('*')[0]
        var tags = entry.split(/><|<|>/);
        var text = entry.split(/>[^>|<]*</); 

        return callback(entry, undefined);
    });
};

var nodes;
traverseTree = function(node) {
    if (node == undefined) console.log(true)
    console.log(node)
    if (node._children) {
        for (var i = 0; i < node._children.length; i++) {
            traverseTree(node._children[i])
        }
    }
}

exports.getBody = getBody;

getBody("./nom.docx", function(data, err) {
    if (err) console.log(err);
    else console.dir(data.split(/><|<|>/));
});
// >[^>|<]*<
// /<[^<|>]*>/
// /><|<|>/

// getBody("./nom.docx", function(data, err) {
//     if (err) console.log(err)
//     else console.dir(traverseTree(data));
// });