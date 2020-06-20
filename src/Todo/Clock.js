import React from 'react'

export default function Clock(props) {

  const [disp, setDisp] = React.useState(props.disp);

  const zfill = (num, padlen, padchar) => {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      var distance = props.start - Date.now();
      if (distance < 0) {
        props.stopClock()
      }
      var hours = Math.floor((distance % (1000 * 60 * 60 * 60)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (hours) {
        var title = hours + ":" + zfill(minutes, 2) + ":" + zfill(seconds, 2);
        document.title = "Meow " + title;
      } else {
        title = zfill(minutes, 2) + ":" + zfill(seconds, 2);
        document.title =  "Meow " + title;
      }
      setDisp(title);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div> {disp} </div>
  )
}
