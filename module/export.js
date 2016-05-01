var name;
exports.setName = function (newName) {
    name = newName;
    // console.log('Hello ' + name);
};
exports.readName = function () {
    console.log('Hello ' + name + '!');
}