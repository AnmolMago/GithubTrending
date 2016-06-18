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

var languages = ["ABAP", "ActionScript", "Ada", "Agda", "AGS", "Script", "Alloy", "AMPL", "ANTLR", "ApacheConf", "Apex", "API", "Blueprint", "APL", "AppleScript", "Arc", "Arduino", "ASP", "AspectJ", "Assembly", "ATS", "Augeas", "AutoHotkey", "AutoIt", "Awk", "Batchfile", "Befunge", "Bison", "BitBake", "BlitzBasic", "BlitzMax", "Bluespec", "Boo", "Brainfuck", "Brightscript", "Bro", "C", "C#", "C++", "Cap'n", "Proto", "CartoCSS", "Ceylon", "Chapel", "Charity", "ChucK", "Cirru", "Clarion", "Clean", "Click", "CLIPS", "Clojure", "CMake", "COBOL", "CoffeeScript", "ColdFusion", "Common", "Lisp", "Component", "Pascal", "Cool", "Coq", "Crystal", "Csound", "Csound", "Document", "Csound", "Score", "CSS", "Cucumber", "Cuda", "Cycript", "D", "Darcs", "Patch", "Dart", "Diff", "DIGITAL", "Command", "Language", "DM", "Dogescript", "DTrace", "Dylan", "E", "Eagle", "eC", "ECL", "Eiffel", "Elixir", "Elm", "Emacs", "Lisp", "EmberScript", "Erlang", "F#", "Factor", "Fancy", "Fantom", "FLUX", "Forth", "FORTRAN", "FreeMarker", "Frege", "Game", "Maker", "Language", "GAMS", "GAP", "GDScript", "Genshi", "Gettext", "Catalog", "GLSL", "Glyph", "Gnuplot", "Go", "Golo", "Gosu", "Grace", "Grammatical", "Framework", "Groff", "Groovy", "Hack", "Handlebars", "Harbour", "Haskell", "Haxe", "HCL", "HLSL", "HTML", "Hy", "HyPhy", "IDL", "Idris", "IGOR", "Pro", "Inform", "7", "Inno", "Setup", "Io", "Ioke", "Isabelle", "J", "Jasmin", "Java", "JavaScript", "JFlex", "JSONiq", "Julia", "Jupyter", "Notebook", "KiCad", "Kit", "Kotlin", "KRL", "LabVIEW", "Lasso", "Lean", "Lex", "LilyPond", "Limbo", "Liquid", "LiveScript", "LLVM", "Logos", "Logtalk", "LOLCODE", "LookML", "LoomScript", "LSL", "Lua", "M", "M4", "Makefile", "Mako", "Markdown", "Mask", "Mathematica", "Matlab", "Max", "MAXScript", "Mercury", "Metal", "MiniD", "Mirah", "Modelica", "Modula-2", "Module", "Management", "System", "Monkey", "Moocode", "MoonScript", "MTML", "mupad", "Myghty", "NCL", "Nemerle", "nesC", "NetLinx", "NetLinx+ERB", "NetLogo", "NewLisp", "Nginx", "Nimrod", "Nit", "Nix", "NSIS", "Nu", "Objective-C", "Objective-C++", "Objective-J", "OCaml", "Omgrofl", "ooc", "Opa", "Opal", "OpenEdge", "ABL", "OpenSCAD", "Ox", "Oxygene", "Oz", "Pan", "Papyrus", "Parrot", "Pascal", "PAWN", "Perl", "Perl6", "PHP", "PicoLisp", "PigLatin", "Pike", "PLpgSQL", "PLSQL", "PogoScript", "Pony", "PostScript", "POV-Ray", "SDL", "PowerShell", "Processing", "Prolog", "Propeller", "Spin", "Protocol", "Buffer", "Puppet", "Pure", "Data", "PureBasic", "PureScript", "Python", "QMake", "QML", "R", "Racket", "Ragel", "in", "Ruby", "Host", "RAML", "RDoc", "REALbasic", "Rebol", "Red", "Redcode", "Ren'Py", "RenderScript", "RobotFramework", "Rouge", "Ruby", "Rust", "SaltStack", "SAS", "Scala", "Scheme", "Scilab", "Self", "Shell", "ShellSession", "Shen", "Slash", "Smali", "Smalltalk", "Smarty", "SMT", "SourcePawn", "SQF", "SQL", "SQLPL", "Squirrel", "Stan", "Standard", "ML", "Stata", "SuperCollider", "Swift", "SystemVerilog", "Tcl", "Tea", "Terra", "TeX", "Thrift", "TLA", "Turing", "TXL", "TypeScript", "Uno", "UnrealScript", "UrWeb", "Vala", "VCL", "Verilog", "VHDL", "VimL", "Visual", "Basic", "Volt", "Vue", "Web", "Ontology", "Language", "WebIDL", "wisp", "X10", "xBase", "XC", "XML", "Xojo", "XPages", "XProc", "XQuery", "XS", "XSLT", "Xtend", "Yacc", "Zephir", "Zimpl"];

$(document).ready(function() {
    fetch("daily");
    $("#trendingSelect").change(function() {
        $("#width_tmp_option").html($(this).children('option:selected').text());
        $(this).width($("#width_tmp_select").width()+12);
        $(this).parent().width($(this).width() + 100);
        $(this).next().css("cssText", "top: -8px !important");
        $("#repos").css("opacity","0.5");
        $("#loading").css("display","block");
        fetch($(this).val())
    });
	$("#forceRefresh").click(function(){
        $("#repos").css("opacity","0.5");
        $("#loading").css("display","block");
		fetchLive($("#trendingSelect").val());
	});
    $('#langSelect').select2();
});

function printEm($json) {
    $("#repos").css("opacity","");
    $("#loading").css("display","");
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
    $.getJSON("http://anmolmago.com/GithubTrending.php?timeframe=" + $timeframe, function(data) {
        if (!('results' in data) || data['results'].length === 0) {
            data = JSON.parse(localStorage.getItem($timeframe + "Cache"));
            if (!('results' in data) || data['results'].length === 0) {
                data = JSON.parse(localStorage.getItem("dailyCache"));//last hope
            }
        } else {
            localStorage.setItem($timeframe + "Cache", JSON.stringify(data));
            localStorage.setItem($timeframe + "CacheTimeSet", $now.getDOY() + "-" + $now.getHours());
        }
        printEm(data);
    });
}

function fetch($timeframe) {
    $data = JSON.parse(localStorage.getItem($timeframe + "Cache"));
    $TimeSet = localStorage.getItem($timeframe + "CacheTimeSet");
    if ($TimeSet !== null && $data !== null && typeof $TimeSet == "string") {
		$split = $TimeSet.split("-");
    	$now = new Date();
		if ($split[0] == $now.getDOY()) {
	        printEm($data);
			if ($split[1] == $now.getHours()){
				return;
			}
		}
    }
	fetchLive($timeframe);
}