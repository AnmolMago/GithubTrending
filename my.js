Date.prototype.isLeapYear = function() {
    var year = this.getFullYear();
    if ((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
};

// Get Day of Year
Date.prototype.getDOY = function() {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = this.getMonth();
    var dn = this.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if (mn > 1 && this.isLeapYear()) dayOfYear++;
    return dayOfYear;
};

$(document).ready(function() {
    fetch("daily");
    $('select').change(function() {
        $("#width_tmp_option").html($(this).children('option:selected').text());
        $(this).width($("#width_tmp_select").width());
        $(this).parent().width($("#width_tmp_select").width() + 100);
    });
    $("#trendingSelect").change(function() {
        fetch($(this).val())
    });
});

function printEm($json) {
    $("#repos").empty();
    for ($i = 0; $i < 15; $i++) {
        $item = $json['results'][$i];
        $stars = $item['stars'].substr(0, $item['stars'].length - 11);
        $desc = $item['description'];
        if ($desc == undefined) {
            $desc = "No description available :(";
        }
        //<img class="star" src="star.png">
        $("#repos").append('<div class="repo"><a href="' + $item['repo'] + '"><h5>' + $item['repo/_text'] + '</h5><p>' + $desc + '</p><span>' + $stars + '</span></a></div>');
    };
}

function fetchLive($timeframe) {
    $now = new Date();
    $DayID = $now.getFullYear() + "-" + $now.getDOY();
    $.getJSON("http://anmolmago.com/GithubTrending.php?timeframe=" + $timeframe + "&DayID=" + $DayID, function(data) {
        if (data['results'].length == 0) {
            //alert("Could not retrieve results. Github may be updating. Attempting to load results from cache.");
            data = JSON.parse(localStorage.getItem($timeframe + "Cache"));
            if (data['results'].length == 0) {
                data = JSON.parse(localStorage.getItem("dailyCache"));
            }
        } else {
            localStorage.setItem($timeframe + "Cache", JSON.stringify(data));
            localStorage.setItem($timeframe + "CacheDay", $now.getDOY());
        }
        printEm(data); //print something
    });
}

function fetch($timeframe) {
    $data = JSON.parse(localStorage.getItem($timeframe + "Cache"));
    $daySet = localStorage.getItem($timeframe + "CacheDay");
    if ($daySet !== null && $data !== null && $daySet == new Date().getDOY()) {
        printEm($data);
    } else {
        fetchLive($timeframe);
    }
}