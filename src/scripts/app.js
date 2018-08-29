// jQuery
// ------
import $ from 'jquery';

// Images
// -------

// Here, we're requiring all images inside JS in order to use the webpack
// fileloader even on images that are not otherwise required in js

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('../img/', false, /\.(png|gif|jpe?g|svg)$/));


// Foundations
// -----------

import Foundation from 'foundation-sites';

$(function() {
    $(document).foundation();
});