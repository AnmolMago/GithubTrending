Date.prototype.dayOfYear= function(){
    var j1= new Date(this);
    j1.setMonth(0, 0);
    return Math.floor((this-j1)/8.64e7);
}

$debugjson = "";

$(document).ready(function(){
	 fetch("daily");
   $('select').change(function(){
      $("#width_tmp_option").html($(this).children('option:selected').text());
      $(this).width($("#width_tmp_select").width());
	  $(this).parent().width($("#width_tmp_select").width() + 100);
   });
   $("#trendingSelect").change(function(){
     fetch($(this).val())
   });
});

function printEm($json){
	$debugjson = $json
	$("#repos").empty();
	for ($i = 0; $i < 15; $i++) {
		$item = $json['results'][$i];
    $stars = $item['stars'].substr(0, $item['stars'].length - 11);
    $desc = $item['description'];
    if($desc == undefined){
      $desc = "No description available :(";
    }
	//<img class="star" src="star.png">
	$("#repos").append('<div class="repo"><a href="'+$item['repo']+'"><h5>'+$item['repo/_text']+'</h5><p>'+$desc+'</p><span>'+$stars+'</span></a></div>');
	};
}

function fetchLive($timeframe) {
  $.getJSON( "https://api.import.io/store/connector/7db3ce02-2fcb-45c3-8f7a-40156c4301c6/_query?input=webpage/url:https%3A%2F%2Fgithub.com%2Ftrending?since="+$timeframe+"&&_apikey=906be87102c84aeabc7cdf0c3a113d0a478c0b7a9728d4cf98ee16c78b161b6da31cf3ce927173614c70a32a64804768319625a518c54cbfffaff2e75e2ca8ada9e32fc7a2c2ea7bdfbd704d6593882b", function( data ) {
    console.dir(data);
    localStorage.setItem($timeframe + "Cache", JSON.stringify(data));
    localStorage.setItem($timeframe + "CacheDay", new Date(Date.now()).dayOfYear());
    printEm(data);
  });
}

function fetch($timeframe) {
  $data = JSON.parse(localStorage.getItem($timeframe + "Cache"));
  $daySet = localStorage.getItem($timeframe + "CacheDay");
  if($daySet !== null && $data !== null && $daySet == new Date(Date.now()).dayOfYear()){
    printEm($data);
  }else{
    fetchLive($timeframe);
  }
}