
// userModel.get({}, function(err, persone) {
//     var i = 0

//     function test() {
//         var myfile = '';
//         var datanow = String(Date.now());
//         var avatar = 'avatar-' + datanow + '.jpg';
//         fs.readdir(path.join(__dirname, './public/test'), (err, files) => {
//             var myfile = files[Math.floor(Math.random() * files.length)];
//             fs.createReadStream(path.join(__dirname, '/public/test/' + myfile)).pipe(fs.createWriteStream(path.join(__dirname, '/public/avatar/' + avatar)));
//             userModel.change(persone[i]['_id'], { avatar: avatar, uploadAvatar: datanow }, function(err, person) {
//                 console.log(err, "err")
//                 if (i < persone.length) {
//                     i++;
//                     test();
//                 }
//             })
//         })
//     }
//     test();
// })
