var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Schema = mongoose.Schema;

var pageSchema = new Schema({
	title: { type: String, required: true },
	urlTitle: { type: String, required: true },
	content: { type: String, required: true },
	date: { type: Date, default: Date.now },
	status: { type: String, enum: ['open', 'closed'] },
  // author: { type: Object },
	author: { type: Schema.Types.ObjectId, ref: 'User'},
    tags: {type: [String] }
});

pageSchema.pre('validate', function(next) {
	this.urlTitle = this.title.replace(/\W/g,'').replace(/\s+/g,'_');
	next();
});

pageSchema.pre('validate', function(next) {
    this.tags = this.tags[0].replace(/,\s+/g, ',').split(',');
    next();
});

// pageSchema.pre('validate', function(next) {
//   console.log('\n\nOLD AUTHOR\n',this.author,'\n');
//   this.author = User.findOrCreate(this.author);
//   console.log('\n\nNEW AUTHOR\n',this.author,'\n');
//   next();
// })

pageSchema.virtual('route').get(function() {
	return '/wiki/' + this.urlTitle;
});

pageSchema.statics.findByTags = function(tags) {
  return this.find({ tags: { $in: tags } });
}

pageSchema.statics.findSimilar = function(page) {
  return this.find({ _id: { $ne: page._id }, tags: { $in: page.tags }});
}

var userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true }
});

userSchema.statics.findOrCreate = function(user) {
  this.findOne({ email: user.email })
  .then(function(userSearch) {
    if(!userSearch) {
      var newUser = new User({
        name: user.name,
        email: user.email
      });

      return newUser.save(function(err) {
        if(err) throw err;
      })
    } else {
      return userSearch;
    }
  })
  .then(function(newUser) {
    return newUser;
  })
}

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
	Page: Page,
	User: User
}