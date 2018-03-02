/*jslint browser:true */
/*global $, jQuery, console, alert*/

/**
 * @license http://opensource.org/licenses/gpl-license.php GNU General Public License (GPL)
 */

/**
 * returns the html for one single search result
 */
var renderItem = function (title, url, content) {
    'use strict';
    var html = '';
    html += '<li class="searchresult abstract">';
    html += '<h2><a href="' + url + '">' + title + '</a></h2>';
    html += '<code>' + url + '</code>';
    html += '<p class="abstract">' + content + '</p>';
    html += '</div>';
    return html;
};

/*
 * processes the search result data
 */
var renderResults = function (data) {
    'use strict';

    // empty the content field, add a heading a hidden div container
    $('#results').empty();
    $('#results').append('<h2>Search Results</h2>');

    if ($(data).size() > 0) {
        // render each data item
        $(data).each(function () {
            var title = this.titleNoFormatting,
                url = this.url,
                content = this.content,
                html = renderItem(title, url, content);
            $('#results').append('<ul>' + html + '</ul>');
        });
    } else {
        // give a no matches output
        var searchterm = $('#searchterm').attr('value');
        $('#results').append('<p class="abstract">Could not find any pages matching "' + searchterm + '"</p>');
    }
    // select the query text in order to allow faster typing
    //$('#searchterm').select();
};

/*
 * requests the result for a specific query
 * adds site: keyword to the query
 *
 * based on the tutorial from
 * http://tutorialzine.com/2010/09/google-powered-site-search-ajax-jquery/
 *
 * TODO: check for errors and warnings
 */
var searchWithGoogle = function (query, start) {
    'use strict';
    // Google's AJAX search API
    var apiURL = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&callback=?',
        requestData = {
            q   : 'site:seebi.github.com' + query,
            rsz : 8,
            start : start
        };

    $.ajax({
        url: apiURL,
        dataType: 'json',
        data: requestData,
        success: function (data) {
            renderResults(data.responseData.results);
            $('#searchresults').fadeIn();
        }
    });
};

/*
 * adds the submit trigger and starts the query request
 */
$(document).ready(function () {
    'use strict';
    $('#search').submit(function () {
        // event.preventDefault();
        var query = $('#searchterm').prop('value');
        searchWithGoogle(query, 0);
        return false;
    });
});

