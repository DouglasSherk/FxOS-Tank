var txtFile = new XMLHttpRequest();
var ids;
txtFile.open("GET", "comedy_comparisons_videos.txt", true);
txtFile.onreadystatechange = function()
{
  if (txtFile.readyState === 4) {  // document is ready to parse.
    if (txtFile.status === 200) {  // file is found
      allText = txtFile.responseText; 
      ids = txtFile.responseText.split("\n");
      getYoutubeData();
    }
  }
}
txtFile.send(null);


var youData = new Array();

//var url = "https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyB5D-SzrHae0MBPJl65RLZ2pyXDG6am_8A%20&part=snippet,contentDetails,statistics,status";


var url_1 = "https://www.googleapis.com/youtube/v3/videos?id=";
var url_2 = "&key=AIzaSyB5D-SzrHae0MBPJl65RLZ2pyXDG6am_8A%20&part=snippet,contentDetails,statistics,status";

var url;

var count = 0;

function getYoutubeData() {
  for(var i=3000; i<5000; i++){
    url = url_1 + ids[i] + url_2;
    $.getJSON(url,
      function(response){
          //title = response.data.items[0].title;
          //description = response.data.items[0].description;
         youData.push(response);
        // $("#response").text(recMap(response));

        if (++count == 1000) {
          var str = '';
          for (var response in youData) {
            if (youData[response].items[0] != undefined) {
              //str += '* ' + youData[response].items[0].statistics.commentCount + '<br />';
              str += youData[response].items[0].id;
              //str += ", " + youData[response].items[0].snippet.publishedAt;
              //str += ", " + youData[response].items[0].snippet.title;
              //str += ", " + youData[response].items[0].snippet.description;
              //str += ", " + youData[response].items[0].contentDetails.duration;
              str += ", " + youData[response].items[0].statistics.viewCount;
              str += ", " + youData[response].items[0].statistics.likeCount;
              str += ", " + youData[response].items[0].statistics.dislikeCount;
              str += ", " + youData[response].items[0].statistics.favoriteCount;
              str += ", " + youData[response].items[0].statistics.commentCount;
              str += '\n';
            }
          }
          document.write(str.split('\n').join('<br />'));
        }
      }
   );
  }
}


/*$.getJSON(url,
    function(response){
        //title = response.data.items[0].title;
        //description = response.data.items[0].description;
        youData.push(response);
        $("#response").text(recMap(response));
});*/

var recMap = function(obj) {
    return $.map(obj, function(val, ind) { 
        return typeof val !== 'object' 
               ? '"' + ind + '":"' + val + '"' : recMap(val);
    });
}
