function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
require([
        "./requirejs/modernizr.custom.js",
        "./requirejs/deck.core.js",
        "./requirejs/deck.menu.js",
        "./requirejs/deck.goto.js",
        "./requirejs/deck.status.js",
        "./requirejs/deck.navigation.js",
        "./requirejs/deck.hash.js",
        "./requirejs/keynode.watch.js"
        ], function() {
            // Deck initialization-->
            $.deck('.slide');
        }
       );

