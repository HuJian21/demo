var mongoDb = require('./db');
var markdown = require('markdown').markdown;

function Post(username, title, post) {
    this.name = username;
    this.title = title;
    this.post = post;
}

Post.findAll = function (name, callback) {
    mongoDb.open(function (err, db) {
        if (err) {
            mongoDb.close();
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongoDb.close();
                return callback(err);
            }
            var query = {};
            if (name) {
                query.name = name;
            }
            collection.find(query).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongoDb.close();
                if (err) {
                    callback(err);
                }
                docs.forEach(function (doc) {
                    doc.post = markdown.toHTML(doc.post);
                });
                callback(null, docs);
            });
        });
    });
}

Post.findOne = function (name, day, title, callback) {
    mongoDb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                return callback(err);
            }
            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title
            }, function (err, doc) {
                mongoDb.close();
                if (err) {
                    return err;
                }
                doc.post = markdown.toHTML(doc.post);
                callback(null, doc);
            });
        })
    })
}

// 保存文章
Post.prototype.save = function (callback) {
    var date = new Date();
    // 存储各种时间格式
    var time = {
        date: date,
        year: date.getFullYear(),
        month: date.getFullYear() + '-' + (date.getMonth() + 1 ),
        day: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay(),
        minute: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay() + ' ' + date.getHours() + ':'
                + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':' + date.getSeconds()
    }
    // 要存入数据库的文档
    var post = {
        name: this.name,
        time: time,
        title: this.title,
        post: this.post
    }
    mongoDb.open(function (err, db) {
        if (err) {
            callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongoDb.close();
                callback(err);
            }
            collection.insert(post, {safe: true}, function (err) {
                mongoDb.close();
                if (err) {
                    callback(err);
                }
                callback(null);
            })
        })
    })
}
Post.edit = function (name, day, title, callback) {
    mongoDb.open(function (err, db) {
        if (err) {
            callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongoDb.close();
                callback(err);
            }
            collection.findOne({
                "title": title,
                "time.day": day,
                "name": name
            }, function (err, doc) {
                mongoDb.close();
                if (err) {
                    callback(err);
                }
                callback(null, doc);  // markdown格式
            });
        });
    });
}

Post.update = function (name, day, title, post, callback) {
    mongoDb.open(function (err, db) {
        db.collection('posts', function (err, collection) {
            if (err) {
                mongoDb.close();
                return callback(err);
            }
            collection.update({
                "name": name,
                "time.day": day,
                "title": title
            },{
                $set: {"post": post}
            }, function (err) {
                mongoDb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
            });
        });
    });
}

Post.remove = function (name, day, title, callback) {
    mongoDb.open(function (err, db) {
        if (err) {
            mongoDb.close();
            return callback(err);
        }
        db.collection("posts", function (err, collection) {
            if (err) {
                mongoDb.close();
                return callback(err);
            }
            collection.remove({
                "name": name,
                "time.day": day,
                "title": title
            },{
                w:1
            }, function (err) {
                mongoDb.close();                
                if (err) {
                    req.flash('error', err);
                    return callback(err);
                }
                callback(null);
                // return res.redirect('/');
            });
        });
    });
}

module.exports = Post;