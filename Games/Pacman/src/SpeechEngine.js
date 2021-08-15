import {cmds} from './Constants.js'

export default function speechEngine(cmdStk){
    //speech recognition variable
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

    //if speech recognition property in browser window
    if ('SpeechRecognition' in window) {
        console.log('supported speech');
    }else {
        console.error('speech not supported');
        return;
    }

     //create speech recognition object 
    const recognition = new window.SpeechRecognition();
    
    //continous speech recongition
    recognition.continuous = true;

    //on speech recognition event handler
    recognition.onresult = (event) => {
        let res = event.results[event.results.length -1][0].transcript;
        //lower case and remove special charavters
        res = res.toLowerCase().replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'');
        //alert('transScript: ', res);
        console.log("The Hshed Res " + cmds[res]);
        if(cmds[res] !== undefined){
            cmdStk.push(cmds[res]);
        }
    }
    
    recognition.start();
}