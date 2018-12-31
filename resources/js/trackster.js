var Trackster = {};
const API_KEY = 'a8d2f16b15cb40112174941355c30e9b';

$(document).ready(function() {
  $('#search-button').click(function() {
    Trackster.searchTracksByTitle($('search-input').val());
    $('#search-input').keydown();
  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $('#track-list').empty();
for (var i = 0; i < tracks.length; i++) {
  var track = tracks[i];
  var mediumAlbumArt = track.image[1]["#text"];
var trackRow =
  '<div class="row track">' +
    '<div class="col-xs-1">' +
    '<a href="' + track.title + '"><i class="fa fa-play-circle fa-2x"></i></a>' +
    '</div>' +
    '<div class="col-xs-3">' + track.name + '</div>' +
    '<div class="col-xs-2">' + track.artist + '</div>' +
    '<div class="col-xs-2">' + mediumAlbumArt + '</div>' +
    '<div class="col-xs-2">' + track.listeners + '</div>' +
    '<div class="col-xs-2">' + track.length + '</div>'
  '</div>';

  $('#track-list').append(trackRow);
}
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
    datatype: 'jsonp',
    success: function(response) {
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  });
};
