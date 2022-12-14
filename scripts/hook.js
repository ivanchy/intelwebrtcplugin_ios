const fs = require('fs');
const util = require('util');
const getSize = require('get-folder-size');
const stat = util.promisify(fs.stat);
var path = require('path');

const admZip = require('adm-zip');
const request = require('superagent');

module.exports = function(ctx) {
    // Make sure android platform is part of build
 //   if (!ctx.opts.platforms.includes('ios')) return;

//    const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/ios');
//    const apkFileLocation = path.join(platformRoot, 'IntelWebrtc/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework');

//    return stat(apkFileLocation).then(stats => {
//      console.log(`Size of ${apkFileLocation} is ${stats.size} bytes`);
//    });
    
//    console.log("----------------OWT---------------");
//
//
//    fs.readdir('./plugins/owt.sample.conference.intelwebrtcplugin/src/ios/libs', (err, files) => {
//      files.forEach(file => {
//        console.log(file);
//      });
//    });
//
//    console.log("----------------WebRTC---------------");
//
//    fs.readdir('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/WebRTC.framework', (err, files) => {
//      files.forEach(file => {
//        console.log(file);
//      });
//    });
    
//   console.log("current path : "+ path.join('./platforms/ios/intelwebrtc_ios'));
    
//    getSize('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework/OWT', (err, size) => {
//        if (err) { throw err; }
//
//          console.log(`The folder is ${size} bytes large`);
//          console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
//      });
    
//    stat('./plugins/owt.sample.conference.intelwebrtcplugin/src/ios/libs/OWT.framework/OWT').then(stats => {
//          console.log(`Size of OWT.framework is ${stats.size} bytes`);
//        });
//
//    stat('./plugins/owt.sample.conference.intelwebrtcplugin/src/ios/libs/WebRTC.framework/WebRTC').then(stats => {
//          console.log(`Size of WebRTC.framework is ${stats.size} bytes`);
//        });
//    getSize('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/WebRTC.framework/WebRTC', (err, size) => {
//        if (err) { throw err; }
//
//          console.log(`The folder is ${size} bytes large`);
//          console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
//      });

//
    
    
    function deleteDirectory(directoryPath) {
        let files = fs.existsSync(directoryPath);

        console.log("---------------------files-----------------");
        console.log("files", files);

        if(files){

            fs.rmSync(directoryPath, { recursive: true, force: true });
        
            console.log("Directory deleted successfully");
        }
    };


//   deleteDirectory('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/WebRTC.framework');
//   deleteDirectory('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework');
    
    
    //const href_webrtc = `https://hkt.softether.net/gitlab/IvanChiu/intelwebrtcplugin_ios/-/raw/main/src/ios/libs/WebRTC.framework.zip`;
    const href_webrtc = `https://hkt.softether.net/gitlab/IvanChiu/intelwebrtcplugin_ios/-/raw/main/src/ios/libs/WebRTC_arm64debug.framework.zip`;
    const zipFile_webrtc = 'WebRTC_arm64debug.framework.zip';
    const source_webrtc = `${href_webrtc}`;
    const outputDir_webrtc = './platforms/ios/TheCloud_Clone_Ivan/Plugins/owt.sample.conference.intelwebrtcplugin';
    console.log('href', href_webrtc);
    console.log('source', source_webrtc);
    console.log('outputDir', outputDir_webrtc);

    request
      .get(source_webrtc)
      .on('error', function(error) {
        console.log(error);
      })
      .pipe(fs.createWriteStream(zipFile_webrtc))
      .on('finish', function() {
        console.log('finished dowloading');
          
      stat('./WebRTC_arm64debug.framework.zip').then(stats => {
                console.log(`Size of WebRTC.framework is ${stats.size} bytes`);
              });
          
        var zip_webrtc = new admZip(zipFile_webrtc);
        console.log('start unzip');
          zip_webrtc.extractAllTo(/*target path*/ outputDir_webrtc, /*overwrite*/ true);
          //zip_webrtc.extractEntryTo(/*entry name*/ "WebRTC.framework/WebRTC", /*target path*/ `${outputDir_webrtc}/WebRTC.framework`, /*maintainEntryPath*/ false, /*overwrite*/ false);
        console.log('finished unzip');
          
          getSize('./platforms/ios/TheCloud_Clone_Ivan/Plugins/owt.sample.conference.intelwebrtcplugin/WebRTC.framework', (err, size) => {
              if (err) { throw err; }

                console.log(`The folder is ${size} bytes large`);
                console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
            });
          
      });
    
    
    //const href = `https://hkt.softether.net/gitlab/IvanChiu/intelwebrtcplugin_ios/-/raw/main/src/ios/libs/OWT.framework.zip`;
        const href = `https://hkt.softether.net/gitlab/IvanChiu/intelwebrtcplugin_ios/-/raw/main/src/ios/libs/OWT_arm64debug.framework.zip`;
        const zipFile = 'OWT_arm64debug.framework.zip';
        const source = `${href}`;
        const outputDir = './platforms/ios/TheCloud_Clone_Ivan/Plugins/owt.sample.conference.intelwebrtcplugin';
        console.log('href', href);
        console.log('source', source);
        console.log('outputDir', outputDir);

        request
          .get(source)
          .on('error', function(error) {
            console.log(error);
          })
          .pipe(fs.createWriteStream(zipFile))
          .on('finish', function() {
            console.log('finished dowloading');
              
              stat('./OWT_arm64debug.framework.zip').then(stats => {
                        console.log(`Size of OWT.framework is ${stats.size} bytes`);
                      });
              
            var zip = new admZip(zipFile);
            console.log('start unzip');
              zip.extractAllTo(/*target path*/ outputDir, /*overwrite*/ true);
              //zip.extractEntryTo(/*entry name*/ "OWT.framework/OWT", /*target path*/ `${outputDir_webrtc}/OWT.framework`, /*maintainEntryPath*/ false, /*overwrite*/ false);
            console.log('finished unzip');
              
              getSize('./platforms/ios/TheCloud_Clone_Ivan/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework', (err, size) => {
                  if (err) { throw err; }
          
                    console.log(`The folder is ${size} bytes large`);
                    console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
                });

              
          });
    
    //----------------------------images-----------------------------------
    
    const href_first_image = `https://hkt.softether.net/gitlab/IvanChiu/intelwebrtcplugin_ios/-/raw/main/src/ios/conference/Images.xcassets/first.imageset.zip`;
    const zipFile_first_image = 'first.imageset.zip';
    const source_first_image = `${href_first_image}`;
    const outputDir_first_image = './platforms/ios/TheCloud_Clone_Ivan/Images.xcassets';
    console.log('href', href_first_image);
    console.log('source', zipFile_first_image);
    console.log('outputDir', source_first_image);

    request
      .get(source_first_image)
      .on('error', function(error) {
        console.log(error);
      })
      .pipe(fs.createWriteStream(zipFile_first_image))
      .on('finish', function() {
        console.log('finished dowloading');
          
      stat('./first.imageset.zip').then(stats => {
                console.log(`Size of first.imageset is ${stats.size} bytes`);
              });
          
        var zip_first_image = new admZip(zipFile_first_image);
        console.log('start unzip');
          zip_first_image.extractAllTo(/*target path*/ outputDir_first_image, /*overwrite*/ true);
          //zip_webrtc.extractEntryTo(/*entry name*/ "WebRTC.framework/WebRTC", /*target path*/ `${outputDir_webrtc}/WebRTC.framework`, /*maintainEntryPath*/ false, /*overwrite*/ false);
        console.log('finished unzip');
          
          getSize('./platforms/ios/TheCloud_Clone_Ivan/Images.xcassets/first.imageset', (err, size) => {
              if (err) { throw err; }

                console.log(`The folder is ${size} bytes large`);
                console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
            });
          
      });
    
    
    
    //const href = `https://hkt.softether.net/gitlab/IvanChiu/intelwebrtcplugin_ios/-/raw/main/src/ios/libs/OWT.framework.zip`;
    const href_second_image = `https://hkt.softether.net/gitlab/IvanChiu/intelwebrtcplugin_ios/-/raw/main/src/ios/conference/Images.xcassets/second.imageset.zip`;
    const zipFile_second_image = 'second.imageset.zip';
    const source_second_image = `${href_second_image}`;
    const outputDir_second_image = './platforms/ios/TheCloud_Clone_Ivan/Images.xcassets';
    console.log('href', href_second_image);
    console.log('source', source_second_image);
    console.log('outputDir', outputDir_second_image);

    request
      .get(source_second_image)
      .on('error', function(error) {
        console.log(error);
      })
      .pipe(fs.createWriteStream(zipFile_second_image))
      .on('finish', function() {
        console.log('finished dowloading');
          
          stat('./second.imageset.zip').then(stats => {
                    console.log(`Size of second.imageset is ${stats.size} bytes`);
                  });
          
        var zip_second_image = new admZip(zipFile_second_image);
        console.log('start unzip');
          zip_second_image.extractAllTo(/*target path*/ outputDir_second_image, /*overwrite*/ true);
          //zip.extractEntryTo(/*entry name*/ "OWT.framework/OWT", /*target path*/ `${outputDir_webrtc}/OWT.framework`, /*maintainEntryPath*/ false, /*overwrite*/ false);
        console.log('finished unzip');
          
          getSize('./platforms/ios/TheCloud_Clone_Ivan/Images.xcassets/second.imageset', (err, size) => {
              if (err) { throw err; }
      
                console.log(`The folder is ${size} bytes large`);
                console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
            });

          
      });
    

};
