var x = document.querySelectorAll("link");
var myarray = []
for (var i=0; i<x.length; i++){
var cleanlink = x[i].href;
myarray.push(cleanlink);
};
function make_table() {
    var table = '<table><thead><th>Link-elems</th></thead><tbody>';
   for (var i=0; i<myarray.length; i++) {
            table += '<tr><td>'+ '"' + myarray[i] + '"' + ',' + '</td></tr>';
    };
 
    var w = window.open("");
w.document.write(table); 
}
make_table()