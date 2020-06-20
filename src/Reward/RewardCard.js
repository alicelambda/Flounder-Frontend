import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Clock from '../Todo/Clock';
import {
  isMobile
} from "react-device-detect";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  card: {
    maxWidth: 405,
    minWidth: 405
  },
  media: {
    height: 200,
  },
});




export default function RewardCard(props) {
  const classes = useStyles();
  const [isTimed, setTimed] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [buttonText, setButtonText] = React.useState("done");
  const [description, setDescription] = React.useState();
  const [start, setStart] = React.useState();
  const [timing, setTiming] = React.useState(false);
  const [sound, setSound] = React.useState(false);
  const [windowHand, setWindow] = React.useState();


  React.useEffect(() => {
    let lin_reg = /ext\+container:([0-9a-zA-Z=&:/.?-_-]+)/g;
    var splits = props.item.reward.split(lin_reg);

    if (splits.length > 2) {
      let link = "ext+container:" + splits[1]
      if (isMobile) {
        let splitLink = link.split("=")[2] + "=" + link.split("=")[3]
        setDescription(<div> {splits[0]} <a href={splitLink} target="_blank" rel="noopener noreferrer"> {splitLink} </a> </div>)

      } else {
        setDescription(<div> {splits[0]} <a href={link} target="_blank" rel="noopener noreferrer"> {link}</a> </div>)
      }
    } else {
      let http_reg = /https:\/\/([0-9a-zA-Z=&:/.?-_-]+)/g;
      splits = props.item.reward.split(http_reg);
      if (splits.length > 2) {
        let link = "https://" + splits[1]
        setDescription(<div> {splits[0]} <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></div>)

      } else {
        setDescription(<div>{props.item.reward}</div>)

      }
    }
    let min_reg = /([0-9]+ min)/g
    splits = props.item.reward.split(min_reg);
    if (splits.length > 2) {
      setTimed(true);
      setButtonText("start")
      let num_reg = /([0-9]+)/g
      setTime(Number(splits[1].split(num_reg)[1]))

    }
  });

  const stopClock = () => {
    props.removeReward(props.item.id);
    new Notification("Finished Reward", {
      "icon": "https://todo.alicereuter.com/favicon.ico",
      "body": "finished" + props.item.reward
    });
    setTiming(!timing);
  }

  const sounds = [
    "https://mynoise.net/superGenerator.php?g1=finnishSaunaSoundscapeGenerator.php%3Fc%3D1%26l%3D30623040303000603030%26m%3D%26d%3D0&g2=isochronicBrainwaveGenerator.php%3Fc%3D1%26l%3D00504030200000000000%26m%3D%26d%3D0&g3=&g4=&g5=&yt=",
    "https://mynoise.net/superGenerator.php?g1=pureBinauralBrainwaveGenerator.php%3Fc%3D1%26l%3D50502500000000000000%26m%3D%26d%3D0&g2=squeakingSailboatSoundscapeGenerator.php%3Fc%3D1%26l%3D25252525132525251525%26m%3D%26d%3D0&g3=&g4=&g5=&yt=",
    "https://mynoise.net/NoiseMachines/paulNagleSequenceGenerator.php",
    "https://mynoise.net/NoiseMachines/cafeRestaurantNoiseGenerator.php",
    "https://mynoise.net/NoiseMachines/sleepingDragonToneGenerator.php"
  ]

  const handleClick = () => {
    if (isTimed) {
      new Notification("Started Reward", {
        "icon": "https://todo.alicereuter.com/favicon.ico",
        "body": "started" + props.item.reward
      });

      setStart(Date.now() + (time * 60 * 1000));
      setTiming(!timing);
      if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {

        });
      }
      if (sound) {
        var index = Math.floor(Math.random() * sounds.length);
        setWindow(window.open(sounds[index]));
      }
    } else {
      if (windowHand != null) {
        windowHand.close();
      }
      props.removeReward(props.item.id)
    }

  }

  return (
    <Card className={classes.card}
      raised={true}>
      <CardActionArea>

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {timing ?
              <Clock
                stopClock={stopClock}
                disp={0}
                start={start} />
              : null
            }
          </Typography>


        </CardContent>
        <FormControlLabel
          control={<Checkbox icon={<VolumeMuteIcon />}
            checkedIcon={<VolumeUpIcon />} name="checkedH" />}
          label=""
          onChange={e => setSound(e.target.checked)}
          checked={sound}
        />
      </CardActionArea>
      <CardActions>
        {props.removeReward != null ? <Button
          size="small"
          color="primary"
          buttonid={props.item.id}
          onClick={() => handleClick()}
        >
          {buttonText}
        </Button> : ""
        }

      </CardActions>
    </Card>
  );
}
