function searchFlickr(f, e) {
  e.preventDefault();
  var flickerAPI = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';

  // get form values
  var searchTags = $('#searchCriteria').val(); // comma delimited tags
  var searchMode = $('input:radio[name=SearchMode]:checked').val();
 $('#records_table').html('');
   $('<h3>').html('');
  // GET images and build HTML
  $.getJSON(flickerAPI, { 
  tags: searchTags, tagmode: searchMode, 
  format: 'json' })
    .done(function (data) {
      console.log(data);
        var trHTML = '';
//         console.log(data.title);

    $.each(data.items, function (i, item) {
    var author =item.author;
    var link = item.link;
    var tagItem =item.tags;
      var img2 = '<img src="' + item.media.m + '"/>';
     // var imageTitle = item.title;
     //  if (imageTitle === '') {
     //    imageTitle = searchTags;
     //  }
   
      trHTML = '<tr><td>' + item.author + '</td><td>' + item.link + '</td><td>' + item.tags + '</td><td>'  + img2 + '</td></tr>';
       $('#records_table').append(trHTML);
      // build <figure> tag
    
      // Max number of images is 20. Change length to reduce output.
      if (i === data.items.length) { return false; }
    });
  });
 }

// clear page and form values
function resetForm() {
  document.location.reload(true);
  $('#searchCriteria').val(null);
  $('#message').html('');
  $('#images').html('');
  $('#records_table').html('');
}
