function nameFn() {
    var name = '';
    this.setName = function (newName) {
        name = newName;
    }
    this.getName = function () {
        console.log('Hello' + name + '!');
    }
}

module.exports = nameFn;