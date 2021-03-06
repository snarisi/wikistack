module.exports = function(swig) {
  var pageLink = function(page) {
    return '<a href="' + page.route + '">' + page.title + '</a>';
  };
  
  var tagLinks = function(tags) {
    return tags.map(function(tag) {
      return '<a href="../search/results/?search-tags=' + tag + '">' + tag + '</a>';
    }).join(', ');
  };
  
  var userLink = function(user) {
    return '<a href="../users/' + user._id.toString() + '">' + user.name + '</a>'
  }
  
  pageLink.safe = true;
  tagLinks.safe = true;
  userLink.safe = true;
  swig.setFilter('pageLink', pageLink);
  swig.setFilter('tagLinks', tagLinks);
  swig.setFilter('userLink', userLink);
}