import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),

    },
  },
}));


export default function RewardAdd(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState('smol');
  const [reward, setReward] = React.useState("");
  const [isLink, setLink] = React.useState(false);
  const [container, setContainer] = React.useState('sec');

  React.useEffect(() => {
    if (reward.includes("http")) {
      setLink(true);

    } else {
      setLink(false);
    }
  }, [reward]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };






  const onReward = (event) => {
    setReward(event.target.value)
  }


  const handleContainer = (event) => {
    setContainer(event.target.value);
  };

  return (
    <Dialog open={false} aria-labelledby="form-dialog-title">
      <DialogContent>
        <Typography gutterBottom variant="h5" component="h2">
          Create Reward
          </Typography>
        <TextField
          id="outlined-multiline-flexible"
          label="reward"
          multiline
          rowsMax="4"
          value={reward}
          onChange={onReward}
          variant="outlined"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            <FormControlLabel value="smol" control={<Radio />} label="smol" />
            <FormControlLabel value="chonk" control={<Radio />} label="chonk" />
            <FormControlLabel value="Absolute Unit" control={<Radio />} label="Absolute Unit" />
          </RadioGroup>
        </FormControl>
        {isLink ?
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Container</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={container}
              onChange={handleContainer}
            >
              <MenuItem value={"sec"}>Sec</MenuItem>
              <MenuItem value={"roman"}>Roman</MenuItem>
            </Select>
          </FormControl> : null}
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained">Add</Button>
      </DialogActions>
    </Dialog >
  )
}
