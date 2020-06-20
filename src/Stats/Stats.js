import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box'
import RewardAdd from '../Reward/RewardAdd'

import MUIDataTable from "mui-datatables";

const columns = ["id", "reward", "type"];


const options = {
  filterType: 'checkbox',
};




const useStyles = makeStyles({

});

function createData(title, subject, time, coin) {
  return { title, subject, time, coin };
}

function createJob(id, description, time) {
  return { id, description, time }
}

export default function Stat(props) {
  const classes = useStyles();
  const [daily, setDaily] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [smol, setSmol] = React.useState([]);
  const [chonk, setChonk] = React.useState([]);
  const [absUnit, setAbsUnit] = React.useState([]);
  const [sum,setSum] = React.useState(0)

  const API_URL = window.API_URL;


  const handleSubmit = () => {

    fetch(API_URL + '/api/key/elastic', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cookie: props.cookie
      })
    }).then(response => response.json())
      .then(data => {
        fetch('https://14eec777e85e4773ae860ef6803a7198.eastus2.azure.elastic-cloud.com:9243/_search', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa("elastic:" + data.key),
          },
          body: JSON.stringify({
            "version": true,
            "size": 500,
            "sort": [
              {
                "_score": {
                  "order": "desc"
                }
              }
            ],
            "_source": {
              "excludes": []
            },
            "stored_fields": [
              "*"
            ],
            "script_fields": {},
            "docvalue_fields": [
              {
                "field": "timestamp",
                "format": "date_time"
              }
            ],
            "query": {
              "bool": {
                "must": [],
                "filter": [
                  {
                    "match_all": {}
                  },
                  {
                    "range": {
                      "timestamp": {
                        "gte": "now/d",
                        "time_zone": "America/Chicago"
                      }
                    }
                  },
                  {
                    "match_phrase": {
                      "type": {
                        "query": "update"
                      }
                    }
                  }
                ],
                "should": [],
                "must_not": []
              }
            },
            "highlight": {
              "pre_tags": [
                "@kibana-highlighted-field@"
              ],
              "post_tags": [
                "@/kibana-highlighted-field@"
              ],
              "fields": {
                "*": {}
              },
              "fragment_size": 2147483647
            }
          }
          )
        })
          .then(response => response.json())
          .then(data => {
            setDaily(data.hits.hits.map(item => {
              return createData(item._source.Title, item._source.Subject, item._source.time, item._source.coins)
            }))
            var localsum = 0;
             for(var i = 0; i < data.hits.hits.length; i++ ){
               localsum += data.hits.hits[i]._source.coins;
             }
             setSum(localsum);
          })
      })
  }

  const getJobs = () => {
    fetch(API_URL + '/api/jobs/recent', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cookie: props.cookie
      })
    })
      .then(response => response.json())
      .then(data => {
        setJobs(data.map(x => createJob(x[0], x[1], x[2])))
      })
  }

  const getRewards = () => {
    fetch(API_URL + '/api/reward/all', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cookie: props.cookie
      })
    })
      .then(response => response.json())
      .then(data => {
        setSmol(data.filter(x => x.type === "smol"))
        setChonk(data.filter(x => x.type === "chonk"))
        setAbsUnit(data.filter(x => x.type === "Absolute Unit" || x.type === "Absolute Unit\n"))
      })

  }

  React.useEffect(() => {
    handleSubmit();
    getJobs();
    getRewards();
  }, []);



  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
      align="center"
    >
      <Grid item>
        <h1>Stats</h1>
      </Grid>
      <Grid item xs={2}>

      </Grid>
      <Grid item xs={6}>
        <Box maxWidth={600}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell >Subject</TableCell>
                  <TableCell >Time</TableCell>
                  <TableCell >Coin </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {daily.map(row => (
                  <TableRow key={row.name}>
                    <TableCell >{row.title}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell >{row.time}</TableCell>
                    <TableCell >{row.coin}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={4}/>
                  <TableCell></TableCell>
                  <TableCell >Total:</TableCell>
                  <TableCell> {sum}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>


      <Grid item>
        <h1>Smol</h1>
      </Grid>
      <Grid item xs={6}>
        <Box maxWidth={600}>
          <MUIDataTable
            title={""}
            data={smol}
            columns={columns}
            options={options}
          />
        </Box>
      </Grid>
      <Grid item>
        <h1>Chonk</h1>
      </Grid>
      <Grid item xs={6}>
        <Box maxWidth={600}>
          <MUIDataTable
            title={""}
            data={chonk}
            columns={columns}
            options={options}
          />
        </Box>
      </Grid>
      <Grid item>
        <h1>Absolute Unit</h1>
      </Grid>
      <Grid item xs={6}>
        <Box maxWidth={600}>
          <MUIDataTable
            title={""}
            data={absUnit}
            columns={columns}
            options={options}
          />
        </Box>
      </Grid>
      <RewardAdd
        cookie={props.cookie}
      />
      <Grid item>
        <h1>Logs</h1>
      </Grid>
      <Grid item xs={6}>
        <Box maxWidth={600}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Log</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jobs.map(row => (
                  <TableRow key={row.id}>
                    <TableCell >{row.id}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell >{row.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>

  )
}
