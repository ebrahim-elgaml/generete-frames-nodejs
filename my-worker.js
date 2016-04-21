var fs = require("fs"),
    Jimp = require("jimp"),
    async = require("async");
function decode(req, logger, res){
        var array = new Array();
        for(var i = 1 ; i <= 166 ; ++i){
                if(Math.floor(i/10) == 0){
                  array.push("00"+i);
                }else if(Math.floor(i/100) == 0){
                  array.push("0"+i);
                }else if(Math.floor(i/1000) == 0){
                  array.push(""+i);
                }
        }
        logger.debug("%s: ARRAY " + array );
        async.each(array, function(file, callback) {
            var image1 = addOneToString(file);
            var image2 = addNToString(image1, 14);
            var image3 = addNToString(image2, 14);
            copy3(file, logger);
            // if(parseInt(file) % 15 == 0 && parseInt(file) <= 150 || file == "001"){
            //     logger.debug("%s: KEYS " + file + " " + image1 + " " + image2 + " " + " " + image3 );
            //     //generateKeys(file, image1, image2, image3, logger);
            //     copy3(file, logger);
            // }
            // if(parseInt(file) % 15 != 0){
            //     logger.debug('IN BETWEEN' + file);
            //     var n = (Math.floor(parseInt(file) / 15)) * 15;
            //     var u = nToString3(n + 1);
            //     logger.debug('IN BETWEEN' + file + " " + u) ;
            //     generateBetween(u, file, logger);
            // }



            callback();
          }, function(err){
              if( err ) {
                console.log('A file failed to process');
                logger.debug('A file failed to process' );
              } else {
                  // logger.debug('IN BETWEEN');
                  // async.each(array, function(file, callback) {
                  //   if(parseInt(file) % 15 != 0){
                  //       logger.debug('IN BETWEEN' + file);
                  //       var n = (Math.floor(parseInt(file) / 15)) * 15;
                  //       generateBetween(nToString3(n), file, logger);
                  //   }
                  //   callback();
                  // }, function(err){
                  //     logger.debug(err);
                  // });
                  logger.debug('All files have been processed successfully');
              }
          });
}
// Generate another three jpg black white frames.
// Generate 3 colored frames corresponding to these frames.
function generateKeys(imageReadPath, image1, image2, image3, logger){
      Jimp.read("black-white/" + imageReadPath + ".png", function(err, frame){
          logger.debug("IMAGE PATH " + "black-white/" + imageReadPath + ".png");
          frame.write("generated-frames/black/" + image1 + ".jpg")
               .write("generated-frames/black/" + image2+ ".jpg")
               .write("generated-frames/black/" + image3+ ".jpg")
               .scan(0, 0, frame.bitmap.width, frame.bitmap.height, function (x, y, idx) {
                    var red   = this.bitmap.data[ idx + 0 ];
                    var green = this.bitmap.data[ idx + 1 ];
                    var blue  = this.bitmap.data[ idx + 2 ];
                    if(red == 0 && green == 0 && blue == 0){
                        // replace with random
                        this.bitmap.data[ idx + 0 ] = Math.floor((Math.random() * 255) + 0);
                        this.bitmap.data[ idx + 1 ] = Math.floor((Math.random() * 255) + 0);
                        this.bitmap.data[ idx + 2 ] = Math.floor((Math.random() * 255) + 0);
                    }else{
                        // replace with yellow
                        this.bitmap.data[ idx + 0 ] = 255;
                        this.bitmap.data[ idx + 1 ] = 255;
                        this.bitmap.data[ idx + 2 ] = 0;
                    }
                 })
                 .write("generated-frames/colored/" + image1 + ".jpg")
                 .write("generated-frames/colored/" + image2+ ".jpg")
                 .write("generated-frames/colored/" + image3+ ".jpg");
      }).catch(function (err){
          logger.debug(err);
      });
}
function copy3(file, logger){
  Jimp.read("generated-frames/black/" + file + ".jpg", function(err, frame){
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 166) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 166 + 166) + ".jpg");
  }).catch(function (err){
      logger.debug(err);
  });
}
function copyImage(file, logger){
  Jimp.read("generated-frames/black/" + file + ".jpg", function(err, frame){
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 1) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 2) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 3) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 4) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 5) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 6) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 7) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 8) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 9) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 10) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 11) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 12) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 13) + ".jpg")
      frame.write("generated-frames/black/" + nToString3(parseInt(file) + 14) + ".jpg");
  }).catch(function (err){
      logger.debug(err);
  });
}
function generateBetween(imageReadPath, file, logger){
      Jimp.read("generated-frames/colored/" + imageReadPath + ".jpg", function(err, frame){
          frame.write("generated-frames/colored/" + file + ".jpg");
      }).catch(function (err){
          logger.debug(err);
      });
      Jimp.read("generated-frames/black/" + imageReadPath + ".jpg", function(err, frame){
          frame.write("generated-frames/black/" + file + ".jpg");
      }).catch(function (err){
          logger.debug(err);
      });
}
function addOneToString(s){
    var n = "" + (parseInt(s) + 1);
    while(n.length < 3){
      n = "0" + n;
    }
    return n;
}
function addNToString(s, x){
    var n = "" + (parseInt(s) + x);
    while(n.length < 3){
      n = "0" + n;
    }
    return n;
}
function nToString3(s){
  var n = "" + s;
  while(n.length < 3){
    n = "0" + n;
  }
  return n;
}
module.exports = decode;
