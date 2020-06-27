import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Clock from './Clock'
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  card: {
    maxWidth: 405,
  },
  media: {
    height: 200,
  },

  paper: {
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
    boxShadow: 3,
    padding: 4,
  },

});

const sounds = [
  "https://mynoise.net/superGenerator.php?g1=finnishSaunaSoundscapeGenerator.php%3Fc%3D1%26l%3D30623040303000603030%26m%3D%26d%3D0&g2=isochronicBrainwaveGenerator.php%3Fc%3D1%26l%3D00504030200000000000%26m%3D%26d%3D0&g3=&g4=&g5=&yt=",
  "https://mynoise.net/superGenerator.php?g1=pureBinauralBrainwaveGenerator.php%3Fc%3D1%26l%3D50502500000000000000%26m%3D%26d%3D0&g2=squeakingSailboatSoundscapeGenerator.php%3Fc%3D1%26l%3D25252525132525251525%26m%3D%26d%3D0&g3=&g4=&g5=&yt=",
  "https://mynoise.net/NoiseMachines/paulNagleSequenceGenerator.php",
  "https://mynoise.net/NoiseMachines/sleepingDragonToneGenerator.php",
  "https://www.youtube.com/watch?v=gTXHw_Wl2f0",
  "https://www.youtube.com/watch?v=nH5o0wG2Vqc"
]

export default function TodoCard(props) {


  const classes = useStyles();
  const API_URL = window.API_URL;


  const [start, setStart] = React.useState(0);
  const [time, setTime] = React.useState(30);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [sound,setSound] = React.useState(false);
  const [num, setNum] = React.useState(0);
  const [windowHand,setWindow] = React.useState();
  const [timing,setTiming] = React.useState(false);

  const posts = [1]
  var i;
  for (i = 5; i <= 80; i += 5) {
    posts.push(i)
  }

  const mark = posts.map(num => {
    const label = num % 15 ? "" : num.toString(10);
    return {
      value: num,
      label: label
    }

  })
  const marks = mark


  const handleSliderChange = (event, newValue) => {
    setTime(newValue);
  };

  const zfill = (num, padlen, padchar) => {
    var pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    var pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
  }


  const toggleTiming = (done) => {
    if (done) {

      setStart(Date.now() + (time * 60 * 1000));
      if(sound) {
        var index = Math.floor(Math.random() * sounds.length);
        setWindow(window.open(sounds[index]))
      }
      if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {

        });
      }
    } else {
      if(sound) {
        windowHand.close();
      }
    }
 }


  const updateTodo = (time, id) => {
    fetch(API_URL + '/api/todo/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cookie: props.cookie,
        time: time,
        id: id
      })
    })
      .then(response => response.json())
      .then(data => {
        const severity = data.actual > 0 ? "success" : "info";
        var minutes = Math.floor((data.time % 60));
        var seconds = Math.floor((data.time / 60));
        new Notification("Finished " + props.title, {
          "icon": "https://todo.alicereuter.com/favicon.ico",
          "body": "Got " + data.coin + " thought coins"
        });
        props.setCoins(props.coins+data.coin);
        props.updateMsg("got coins:" + data.coin + " time " + zfill(minutes, 2) + ":" + zfill(seconds, 2), severity);
      })
      console.log(sounds)
  }

 
  const updateTime = () => {
    fetch(API_URL + '/api/todo/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cookie: props.cookie,
        time: num,
        id: props.item.id
      })
    })
      .then(response => response.json())
      .then(data => {
        const severity = data.actual > 0 ? "success" : "info";
        var minutes = Math.floor((data.time % 60));
        var seconds = Math.floor((data.time / 60));
        new Notification("Finished " + props.title, {
          "icon": "https://todo.alicereuter.com/favicon.ico",
          "body": "Got " + data.coin + " thought coins"
        });
        props.setCoins(props.coins+data.coin);
        props.updateMsg("got coins: " + data.coin + " time " + zfill(minutes, 2) + ":" + zfill(seconds, 2), severity);
      })

    setOpen(false);

  }


  const subject = props.item.subject;

  const imgUrl = "/img/" + subject + ".jpg"
  const dispTime = zfill(Math.floor(time / 60), 2) + ":" + zfill(time % 60, 2)

  const stopClock = () => {
    updateTodo(time, props.item.id);
    toggleTiming(false);
    setTiming(false);
  }

  const startClock = () => {
    toggleTiming(true);
    setTiming(true);
  }

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const finishedTask = () => {
    setAnchorEl(null);
    props.removeMainTodo(props.item.id,props.title);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTime = () => {
    setOpen(true);
    setAnchorEl(null);

  }


  function valuetext(value) {
    return `${value}°C`;
  }


  function valueLabelFormat(x) {
    var coin
    if (x < 25) {
      coin = 3 * x + 15;
    } else if (x < 55) {
      coin = 2 * x + 40;
    } else {
      coin = x + 95;
    }
    return `${coin} `;
  }

  const incrementNum = (e) => {
    setNum(e.target.value)
  }


  return (
    <Card className={classes.card}
      raised={true}>
     
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update time for </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.title}
          </DialogContentText>
          <TextField
            autoFocus
            id="standard-number"
            label="Time"
            type="number"
            value={num}
            onChange={incrementNum}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updateTime} color="primary">
            UpdateTime
          </Button>
        </DialogActions>
      </Dialog>
      <CardHeader

        action={
          <div>
            <FormControlLabel
              control={<Checkbox icon={<VolumeMuteIcon />} 
              checkedIcon={<VolumeUpIcon />} name="checkedH" />}
              label=""
              onChange={e => setSound(e.target.checked)}
              checked={sound}
            />
            <IconButton aria-label="settings"
              onClick={handleClick}>
              <MoreVertIcon />

            </IconButton>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={finishedTask}>Finished</MenuItem>
              <MenuItem onClick={addTime}>Update</MenuItem>
            </Menu>
          </div>

        }
        title={props.title}
        subheader={props.description}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          image={imgUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography variant="h1">
            {timing ?
              <Clock
                stopClock={stopClock}
                disp={dispTime}
                start={start} />
              : dispTime
            }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>

        <Grid container>
          <Grid item xs={12}>
            <Slider
              min={1}
              max={80}
              defaultValue={20}
              aria-labelledby="discrete-slider-custom"
              step={null}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              valueLabelFormat={valueLabelFormat}
              value={typeof time === 'number' ? time : 30}
              marks={marks}
              disabled={timing}
              onChange={handleSliderChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="small"
              color="primary"
              onClick={startClock}
            >
              {timing ? "Stop" : "Start"}
            </Button>
          </Grid>
        </Grid>

      </CardActions>
    </Card>
  );
}