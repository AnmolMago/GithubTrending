Date.prototype.isLeapYear = function () {
    var year = this.getFullYear();
    if ((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
};

// Get Day of Year
Date.prototype.getDOY = function () {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = this.getMonth();
    var dn = this.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if (mn > 1 && this.isLeapYear()) dayOfYear++;
    return dayOfYear;
};

var languages = ["All", "ABAP", "ActionScript", "Ada", "Agda", "AGS Script", "Alloy", "AMPL", "ANTLR", "ApacheConf", "Apex", "API Blueprint", "APL", "AppleScript", "Arc", "Arduino", "ASP", "AspectJ", "Assembly", "ATS", "Augeas", "AutoHotkey", "AutoIt", "Awk", "Batchfile", "Befunge", "Bison", "BitBake", "BlitzBasic", "BlitzMax", "Bluespec", "Boo", "Brainfuck", "Brightscript", "Bro", "C", "C#", "C++", "Cap'n Proto", "CartoCSS", "Ceylon", "Chapel", "Charity", "ChucK", "Cirru", "Clarion", "Clean", "Click", "CLIPS", "Clojure", "CMake", "COBOL", "CoffeeScript", "ColdFusion", "Common Lisp", "Component Pascal", "Cool", "Coq", "Crystal", "Csound", "Csound Document", "Csound Score", "CSS", "Cucumber", "Cuda", "Cycript", "D", "Darcs Patch", "Dart", "Diff", "DIGITAL Command Language", "DM", "Dogescript", "DTrace", "Dylan", "E", "Eagle", "eC", "ECL", "Eiffel", "Elixir", "Elm", "Emacs Lisp", "EmberScript", "Erlang", "F#", "Factor", "Fancy", "Fantom", "FLUX", "Forth", "FORTRAN", "FreeMarker", "Frege", "Game Maker Language", "GAMS", "GAP", "GDScript", "Genshi", "Gettext Catalog", "GLSL", "Glyph", "Gnuplot", "Go", "Golo", "Gosu", "Grace", "Grammatical Framework", "Groff", "Groovy", "Hack", "Handlebars", "Harbour", "Haskell", "Haxe", "HCL", "HLSL", "HTML", "Hy", "HyPhy", "IDL", "Idris", "IGOR Pro", "Inform 7", "Inno Setup", "Io", "Ioke", "Isabelle", "J", "Jasmin", "Java", "JavaScript", "JFlex", "JSONiq", "Julia", "Jupyter Notebook", "KiCad", "Kit", "Kotlin", "KRL", "LabVIEW", "Lasso", "Lean", "Lex", "LilyPond", "Limbo", "Liquid", "LiveScript", "LLVM", "Logos", "Logtalk", "LOLCODE", "LookML", "LoomScript", "LSL", "Lua", "M", "M4", "Makefile", "Mako", "Markdown", "Mask", "Mathematica", "Matlab", "Max", "MAXScript", "Mercury", "Metal", "MiniD", "Mirah", "Modelica", "Modula-2", "Module Management System", "Monkey", "Moocode", "MoonScript", "MTML", "mupad", "Myghty", "NCL", "Nemerle", "nesC", "NetLinx", "NetLinx+ERB", "NetLogo", "NewLisp", "Nginx", "Nimrod", "Nit", "Nix", "NSIS", "Nu", "Objective-C", "Objective-C++", "Objective-J", "OCaml", "Omgrofl", "ooc", "Opa", "Opal", "OpenEdge ABL", "OpenSCAD", "Ox", "Oxygene", "Oz", "Pan", "Papyrus", "Parrot", "Pascal", "PAWN", "Perl", "Perl6", "PHP", "PicoLisp", "PigLatin", "Pike", "PLpgSQL", "PLSQL", "PogoScript", "Pony", "PostScript", "POV-Ray SDL", "PowerShell", "Processing", "Prolog", "Propeller Spin", "Protocol Buffer", "Puppet", "Pure Data", "PureBasic", "PureScript", "Python", "QMake", "QML", "R", "Racket", "Ragel in Ruby Host", "RAML", "RDoc", "REALbasic", "Rebol", "Red", "Redcode", "Ren'Py", "RenderScript", "RobotFramework", "Rouge", "Ruby", "Rust", "SaltStack", "SAS", "Scala", "Scheme", "Scilab", "Self", "Shell", "ShellSession", "Shen", "Slash", "Smali", "Smalltalk", "Smarty", "SMT", "SourcePawn", "SQF", "SQL", "SQLPL", "Squirrel", "Stan", "Standard ML", "Stata", "SuperCollider", "Swift", "SystemVerilog", "Tcl", "Tea", "Terra", "TeX", "Thrift", "TLA", "Turing", "TXL", "TypeScript", "Uno", "UnrealScript", "UrWeb", "Vala", "VCL", "Verilog", "VHDL", "VimL", "Visual Basic", "Volt", "Vue", "Web Ontology Language", "WebIDL", "wisp", "X10", "xBase", "XC", "XML", "Xojo", "XPages", "XProc", "XQuery", "XS", "XSLT", "Xtend", "Yacc", "Zephir", "Zimpl"];

$(document).ready(function () {
    init();
    $("#trendingSelect").change(function () {
        $("#width_tmp_option").html($(this).children('option:selected').text());
        $(this).width($("#width_tmp_select").width() + 15);
        $(this).parent().width($(this).width() + 100);

        $(this).next().css("cssText", "top: -8px !important");
        fetch(true);
    });
    $("#forceRefresh").click(function () { fetchLive(true); });
    $("#langSelect").change(function () { fetch(true); });
    languages.forEach(function (lang) {
        $('#langSelect').append($('<option>', {
            value: lang.replace(new RegExp(" ", 'g'), "-").toLowerCase(),
            text: lang
        }));
    });
    fetch(false);
    $('#langSelect').select2();
    $ugly = setInterval(function(){ onResize(); }, 10);
    setTimeout(function(){ clearInterval($ugly) }, 100);
    $( window ).resize(function() {
        onResize();
    });
});

function onResize() {
    if($(this).width() > 711){
        $current = $(this).height() - 130 - 25;
        // if($(this).width() < 710){ $current = $(this).height() - 130 - 65;}
        $margin = parseFloat($(".repo").css("margin-bottom"));
        $one = $(".repo").height() + $margin;
        $boxes = Math.floor(($current + $margin - 10)/$one);
        $("#repos").height($boxes * $one - 10)
    }
}

function printEm($json) {
    $("#repos").css("opacity", "");
    $("#loading").css("display", "");
    $("#repos").empty();
    for ($i = 0; $i < $json['results'].length; $i++) {
        $item = $json['results'][$i];
		$starSplit = $item['stars'].split(" \u2022");
		if ($starSplit.length >= 3){
       		$item['stars'] = $starSplit[0] +" \u2022"+ $starSplit[1];
		}else{
       		$item['stars'] = $starSplit[0];
		}
        $desc = $item['description'];
        if ($desc == undefined) {
            $desc = "No description available :(";
        }
        $("#repos").append('<div class="repo"><a href="' + escapeHtml($item['repo']) + '"><h5>' + escapeHtml($item['repo/_text']) + '</h5><p>' + escapeHtml($desc) + '</p><span>' + escapeHtml($item['stars']) + '</span></a></div>');
    };
}

function fetchLive($loading) {
    if($loading){
        $("#repos").css("opacity", "0.5");
        $("#loading").css("display", "block");
    }
    $timeframe =  $("#trendingSelect").val();
    $lang = $("#langSelect").val();
    $id = $lang + "-" + $timeframe; 
    $now = new Date();
    $.getJSON("http://anmolmago.com/GithubTrending.php?timeframe=" + $timeframe + "&language=" + $lang, function (data) {
        if (!('results' in data) || data['results'].length === 0) {
            data = JSON.parse(localStorage.getItem($id + "Cache"));
            if (!('results' in data) || data['results'].length === 0) {
                data = JSON.parse(localStorage.getItem("dailyCache"));//last hope
            }
        } else {
            localStorage.setItem($id + "Cache", JSON.stringify(data));
            localStorage.setItem($id + "CacheTimeSet", $now.getDOY() + "-" + $now.getHours());
        }
        printEm(data);
    }).fail(function(){
        $data = JSON.parse(localStorage.getItem($id + "Cache"));
        if ($data === null || !('results' in $data) || $data['results'].length === 0) {
            $data = JSON.parse(localStorage.getItem("all-dailyCache"));//last hope
        }
        if ($data !== null) {
            printEm($data);
        }
    });
}

function init() {
    $id = $("#langSelect").val() + "-" + $("#trendingSelect").val();
    $data = JSON.parse(localStorage.getItem($id + "Cache"));
    if ($data !== null) {
        printEm($data)
    }
}

function fetch($loading) {
    if($loading){
        $("#repos").css("opacity", "0.5");
        $("#loading").css("display", "block");
    }
    $id = $("#langSelect").val() + "-" + $("#trendingSelect").val();
    $data = JSON.parse(localStorage.getItem($id + "Cache"));
    $TimeSet = localStorage.getItem($id + "CacheTimeSet");
    if ($TimeSet !== null && $data !== null && typeof $TimeSet == "string") {
        $split = $TimeSet.split("-");
        $now = new Date();
        if ($split[0] == $now.getDOY()) {
            printEm($data);
            if ($split[1] == $now.getHours()) {
                return;
            }
        }
    }
    fetchLive($loading);
}

function escapeHtml(string) {
    var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
    };
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}