// ==UserScript==
// @name         Duolingo Word Strength
// @version      1.2.1
// @description  Shows "Words" List for all Languages
// @author       Miriam Oe
// @match        https://www.duolingo.com/
// @namespace    https://twitter.com/mimomimo983
// @grant        none
// @updateURL    https://raw.githubusercontent.com/MiriamOe/DuoWords/master/DuoWordsScript.js
// @downloadURL  https://raw.githubusercontent.com/MiriamOe/DuoWords/master/DuoWordsScript.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.2.1/lodash.min.js
// ==/UserScript==

function inject(f) { 
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.setAttribute('name', 'duo_words');
    script.textContent = f.toString().substring(15, f.toString().length-1);
    document.body.appendChild(script);
}
inject(f);

function f($) {
    var dat, vocab;

    //loads words & language info into dat & vocab
    function getData(bool) {
        dat = null;
        vocab = null;
        $.ajax({
            url: '/vocabulary/overview',
            async : bool,
            success: function (data) {
                dat = data;
                vocab = dat.vocab_overview;
            }
        });
    }

    //returns an empty string in case it was null
    function emptyStrings(word) {
        switch(word) {
            case null: return ""; break;
            default: return word;
        }
    }
  
    //returns the class name for the strength bar span element
    function getStrengthBarsCode(strength) {
        switch(strength) {
            case 4: return "_6s8NZ _2SbBh"; break;
            case 3: return "_3NjYP _2SbBh"; break;
            case 2: return "_3VX71 _2SbBh"; break;
            case 1: return "gh0Vi _2SbBh"; break;
        }
    };

    //creates white box on the right with info about word strength
    function createDivSpacedRepetition() {
        var parent = document.getElementsByClassName("aFqnr _1E3L7")[0];
        if(!parent) {
            parent=document.getElementsByClassName("NYMhm _3zjVe")[0];
        }
        parent.className = "NYMhm _3zjVe";
        parent.innerHTML = "<h2 class='_14EgH'>Spaced repetition</h2><p class='_2xYtL'>Duolingo's algorithms figure out when you should practice words to get them into your long-term memory.</p><div class='_1Sj8J'><div class='_3JM-f'><span class='_6s8NZ _2SbBh'></span><span class='_3Io2c'>"+vocab.filter(function(v) {return v.strength_bars===4}).length+"</span></div><div class='_3JM-f'><span class='_3NjYP _2SbBh'></span><span class='_3Io2c'>"+vocab.filter(function(v) {return v.strength_bars===3}).length+"</span></div><div class='_3JM-f'><span class='_3VX71 _2SbBh'></span><span class='_3Io2c'>"+vocab.filter(function(v) {return v.strength_bars===2}).length+"</span></div><div class='_3JM-f'><span class='gh0Vi _2SbBh'></span><span class='_3Io2c'>"+vocab.filter(function(v) {return v.strength_bars===1}).length+"</span></div></div>";
    }

    //shows info about selected word in the right box
    function showInfo(i) {
        var parent = document.getElementsByClassName("NYMhm _3zjVe")[0];
        var inner = "";
        inner = "<span class='qlupP' onclick='createDivSpacedRepetition()'><span class='_2K1km _1k9o2 cCL9P'></span>Back</span><h2 class='GPwOu'>"+vocab[i].word_string+"</h2><p class='_2xYtL'></p><div class='_2zg2R'><div class='_2LQp9'><div class='_1qdQI'>Gender</div><div>" + emptyStrings(vocab[i].gender) + "</div></div><div class='_2LQp9'><div class='_1qdQI'>Strength</div><span class='"+getStrengthBarsCode(vocab[i].strength_bars)+"'></span></div><div class='_2LQp9'><div class='_1qdQI'>Skill</div><a class='_2FsKS' href='Common-Phrases'>" + vocab[i].skill + "</a></div><div class='_2LQp9'><div class='_1qdQI'>Part of speech</div><span>" + emptyStrings(vocab[i].pos) + "</span></div></div>";
        parent.innerHTML = inner;
    }

    //calculates time difference and returns the string to display
    function getTime(time) {
        var now = new Date().getTime();
        var diff = now-time; //ms
        diff /= 60000; //min
        if(diff<60) {
            return "Just now";
        }
        diff /= 60; //h
        if(diff<24) {
            switch(Math.floor(diff)) {
                case 1: return "1 hour ago"; break;
                default: return Math.floor(diff) + " hours ago";
            }
        }
        diff /= 24; //day
        if(diff<7) {
            switch(Math.floor(diff)) {
                case 1: return "yesterday"; break;
                default: return Math.floor(diff) + " days ago";
            }
        }
        diff /= 7; //week
        if(diff<4) {
            switch(Math.floor(diff)) {
                case 1: return "1 week ago"; break;
                default: return Math.floor(diff) + " weeks ago";
            }
        }
        diff /=4;
        if(diff<12) {
            switch(Math.floor(diff)) {
                case 1: return "1 month ago"; break;
                default: return Math.floor(diff) + " months ago";
            }
        }
        diff /=12;
        switch(Math.floor(diff)) {
            case 1: return "1 year ago"; break;
            default: return Math.floor(diff) + " years ago";
        }
    }

    //(re)loads words table
    function createWordTable() {
        //get and clear table
        var parent = document.getElementsByTagName("tbody")[0];
        parent.innerHTML="";
        var child, word, type, time, strength;
        //add each word to the table
        for(var i = 0; i<vocab.length; i++) {
            child= document.createElement("tr");
            child.className="VjtrX _7xnlz";
            child.setAttribute("onclick", "showInfo("+i+")");
            word = vocab[i].word_string;
            type = emptyStrings(vocab[i].pos);
            time = getTime(vocab[i].last_practiced_ms);
            strength = getStrengthBarsCode(vocab[i].strength_bars);
            child.innerHTML = "<td>"+word+"</td><td>"+type+"</td><td>"+time+"</td><td><span class='"+strength+"'></span></span></td>";
            parent.append(child);
        }
    }

    //part of merge sort algorithm, explanation can be googled
    function merge(arr1, arr2, arg) {
        var a, b, result = [];
        a=0; b=0;
        if(arr1.length>0 && arr2.length>0) {
            while(a<arr1.length && b<arr2.length) {
                switch(arg) {
                    case "w":
                        if(arr1[a].word_string < arr2[b].word_string) {result[a+b]=Object.assign({}, arr1[a]); a++;} else {result[a+b] = Object.assign({}, arr2[b]); b++;} break;
                    case "p":
                        if(arr1[a].pos < arr2[b].pos) {result[a+b]=Object.assign({}, arr1[a]); a++;} else {result[a+b] = Object.assign({}, arr2[b]); b++;} break;
                    case "l":
                        if(arr1[a].last_practiced_ms > arr2[b].last_practiced_ms) {result[a+b]=Object.assign({}, arr1[a]); a++;} else {result[a+b] = Object.assign({}, arr2[b]); b++;} break;
                    case "s":
                        if(arr1[a].strength < arr2[b].strength) {result[a+b]=Object.assign({}, arr1[a]); a++;} else {result[a+b] = Object.assign({}, arr2[b]); b++;} break;
                }
            }
        }
        while(a<arr1.length) {
            result[a+b] = Object.assign({}, arr1[a]); a++;
        }
        while(b<arr2.length) {
            result[a+b] = Object.assign({}, arr2[b]); b++;
        }
        return result;
    }

    //also part of merge sort
    function mergeSort(arr, arg) {
        if(arr.length <= 1) {return arr;}
        var arr1 = mergeSort(arr.slice(0, arr.length/2), arg);
        var arr2 = mergeSort(arr.slice(arr.length/2, arr.length), arg);
        var result = merge(arr1, arr2, arg);
        return result;
    }

    //returns inverted version of the vocab list
    function invertVocab() {
        var v = [];
        for(var i = 0; i<vocab.length; i++) {
            v[i] = Object.assign({}, vocab[vocab.length-1-i]);
        }
        return v;
    }

    var current = "";
    function orderBy(arg) {
        //if vocab is ordered by the same argument, invert the list
        if(current==arg) {
            vocab = invertVocab();
        //else order it by the new argument
        } else {
            current = arg;
            vocab = mergeSort(vocab, arg);
        }
        //reload the table
        createWordTable();
    }

    //refreshes vocab list and spaced repetition div (word count for each strength)
    function refreshVocab () {
        current = "";
        getData(false);
        createWordTable();
        createDivSpacedRepetition();
    }

    function showWords(t) {
        //change onclick of words button to refresh table
        t.setAttribute("onclick", "refreshVocab()");

        //replace skill tree box with vocab box
        var parent = document.getElementsByClassName("LFfrA _3MLiB")[0];
        parent.innerHTML = "<div class='Yd1hn'><div class='_3zjVe'><h1 class='_2cWRr'>"+dat.language_string+" words learned</h1><span class='_2xYtL'>"+vocab.length+" Words</span><table class='_1Xn1F'><thead><tr><th class='_3PIPp _2fZva rxSYY'>Word</th><th class='_3PIPp _2fZva rxSYY'>Part of speech</th><th class='_3PIPp _3ZtOu rxSYY'>Last practiced</th><th class='_3PIPp _2fZva rxSYY'>Strength</th></tr></thead><tbody></tbody></table></div><div class='_34CX7'><div class='NYMhm _3zjVe'></div></div></div>";
        
        //Create info Box on the right
        createDivSpacedRepetition();
      
        //create Table
        var cells=document.getElementsByClassName("_3zjVe")[0].getElementsByTagName("tr")[0].getElementsByTagName("th");
        for(var i=0; i<cells.length; i++) {
            switch(cells[i].innerHTML) {
                case "Word": cells[i].setAttribute('onclick', 'orderBy("w")'); break;
                case "Part of speech": cells[i].setAttribute('onclick', 'orderBy("p")'); break;
                case "Last practiced": cells[i].setAttribute('onclick', 'orderBy("l")'); break;
                case "Strength": cells[i].setAttribute('onclick', 'orderBy("s")'); break;
            }
        }
        createWordTable();
    }

    function init() {
        //When "home" or "Duolingo" is clicked, reload the page (script starts again in case language has been changed)
        var duo = document.getElementsByClassName('NJXKT _1nAJB cCL9P _2s5Eb');
        if(duo.length>0) {
            duo[0].setAttribute("onclick", "location.reload()");}

        duo = document.getElementsByClassName('uWoNt _2QyU5');
        if(duo.length>0) {
            duo[0].setAttribute("onclick", "location.reload()");}
        
        duo = document.getElementsByClassName('_2kNgI _1qBnH');
        for(var i = 0; i<duo.length; i++) {
            duo[i].setAttribute("onclick", "location.reload()");
        }
    }

    var load = false;
    function createWordButton() {
        if(load) {return;}
        //get menu buttons
        var menu = document.getElementsByClassName("zDDkq")[0];
        if(!menu) {return;}
        var menubtns = document.getElementsByClassName("_2rS3d");
        if(!menubtns) {return;}

        //check if "words" exists
        var menuexists = false;
        for(var i = 0; i<menubtns.length; i++) {
            if(menubtns[i].getElementsByTagName("a")[0].pathname=="/words") {
                menuexists=true;
            }
        }
        if(menuexists) {return;}
        load = true;

        //if not, create it
        var wordbtn = document.createElement("li");
        wordbtn.setAttribute("class", "_2rS3d");
        var wordtext = document.createElement("p");
        wordtext.setAttribute("class", "_2QyU5");
        wordtext.setAttribute("onclick", "showWords(this)");
        wordtext.appendChild(document.createTextNode("Words"));
        wordbtn.appendChild(wordtext);
        menu.insertBefore(wordbtn, menubtns[1]);
    }

    $(document).ready(function () {
        init();
        getData(true);
        createWordButton();
    });
}
