// Require the module
var clapDetector = require('clap-detector');
var sys = require('sys')
var exec = require('child_process').exec;
var child;

 
// Define configuration
var CONFIG = {
        AUDIO_SOURCE: 'alsa hw:1,0', // this is your microphone input. If you don't know it you can refer to this thread (http://www.voxforge.org/home/docs/faq/faq/linux-how-to-determine-your-audio-cards-or-usb-mics-maximum-sampling-rate)
        DETECTION_PERCENTAGE_START : '5%', // minimum noise percentage threshold necessary to start recording sound
        DETECTION_PERCENTAGE_END: '5%',  // minimum noise percentage threshold necessary to stop recording sound
        CLAP_AMPLITUDE_THRESHOLD: 0.7, // minimum amplitude threshold to be considered as clap
        CLAP_ENERGY_THRESHOLD: 0.3,  // maximum energy threshold to be considered as clap
        MAX_HISTORY_LENGTH: 10 // all claps are stored in history, this is its max length
    };
var clapConfig = {
   AUDIO_SOURCE: 'alsa hw:1,0'// default for linux
};
 
// Start clap detection
clapDetector.start(CONFIG);
console.log("test");
// Register on clap event
clapDetector.onClap(function(history) {
    var d = new Date()
    //console.log(typeof d.getHours())
    //console.log(d.getMinutes())
    var h = d.getHours()

if (d.getDate() == 24 && d.getMonth() == 11){
	var num = Math.floor(Math.random()*5+1)
	cmd = 'mplayer -endpos 20 sounds/'+num+'.wav'
	child = exec(cmd, function (error, stdout, stderr) {
  		sys.print('stdout: ' + stdout);
  		sys.print('stderr: ' + stderr);
  		if (error !== null) {
    			console.log('exec error: ' + error);
  			}
		});
	}
else if (h < 19 && h > 5){
			var m = d.getMinutes()
			if (m == 0){m=''}
			if (h > 5 && h < 12){
				var text = ' Guten Morgen!'
			}
			else {
				var text = ''
			}
    	cmd = 'espeak "Es ist '+d.getHours()+' Uhr '+m+'!'+text+'" -v mb-de2 --stdout | aplay -D "plughw:Device,0"'
    	child = exec(cmd, function (error, stdout, stderr) {
  		sys.print('stdout: ' + stdout);
  		sys.print('stderr: ' + stderr);
  		if (error !== null) {
    			console.log('exec error: ' + error);
  			}
		});
	}    //console.log('your callback code here AAA ', history);
else {
	console.log('there was a clap')
	}

});


 
