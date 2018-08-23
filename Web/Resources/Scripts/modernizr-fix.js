// Modernizr doesn't detect IE10 correctly.
// see https://github.com/Modernizr/Modernizr/issues/812#issuecomment-15591525
if (typeof Modernizr != "undefined" && Modernizr && Modernizr.flexboxtweener === undefined) {
    Modernizr.addTest("flexboxtweener", Modernizr.testAllProps("flexAlign"));
}