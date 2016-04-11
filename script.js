
var Riddle = function (task, level) {
    this.task = task;
    this.answer = "";
    this.level = level;
    this.type = "";
}

function selectLevel(str) {
    var n = str.search("<<.*>>");
    if (n===-1) {
        return n    
    }
    var substr = str.substring(n+3,n+4)
    return Number(substr);
}


console.log("DONE"); 

$.getJSON( "riddles.ipynb", function( data ) {
  var riddlesArr = [];
  var flag = false;
  var n = -1;
  for (i = 0; i < data.cells.length; i++) {
      if (flag==false){
          n = selectLevel(data.cells[i].source.toString());
          if (n!=-1){
              flag = true;
              riddlesArr.push(new Riddle(data.cells[i].source.join("\n"), n));
          }
      }
      else {
          riddlesArr[riddlesArr.length-1].answer = data.cells[i].source.join("\n");
          flag = false;
      }
  }
  console.log(riddlesArr[0])
  var theDiv = document.getElementById("r");

  for (r of riddlesArr){
    var innerDivRidd = document.createElement('div');
    innerDivRidd.className = 'riddle';
    var innerDivTask = document.createElement('div');
    innerDivTask.className = 'task';
    var innerDivAns = document.createElement('div');
    innerDivAns.className = 'answer';
    innerDivTask.innerHTML = r.task;
    innerDivAns.innerHTML = r.answer;
    innerDivRidd.appendChild(innerDivTask);
    innerDivRidd.appendChild(innerDivAns);  
    theDiv.appendChild(innerDivRidd);
  }
  console.log(innerDivRidd);

/*
 * for (i = 0; i < data.cells[0].length; i++) { 
     text += cars[i] + "<br>";
    }
 *   $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" ); */
});
