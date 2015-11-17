module.exports = function(swig) {
  var pageLink = function(page) {
    return '<a href="' + page.route + '">' + page.title + '</a>';
  };
  
  var tagLinks = function(tags) {
    return tags.map(function(tag) {
      return '<a href="' + '#' + '">' + tag + '</a>';
    }).join(', ');
  };
  
  pageLink.safe = true;
  tagLinks.safe = true;
  swig.setFilter('pageLink', pageLink);
  swig.setFilter('tagLinks', tagLinks);
}