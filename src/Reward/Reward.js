import React from 'react'
import Grid from '@material-ui/core/Grid';
import RewardCard from './RewardCard'
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'


export default function Reward(props) {


    const [rewards, setRewards] = React.useState([]);
    const [cost, setCost] = React.useState([]);

    const [rewardItems, setRewardItems] = React.useState([]);

    const API_URL = window.API_URL;

    React.useEffect(() => {
        getTodoData()
        getCoins()
        getCosts()
    }, []);

    const getTodoData = () => {
        fetch(API_URL + "/api/reward/active", {
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
                setRewards(data)
            })
    }

    const getCosts = () => {
        fetch(API_URL + "/api/shop/costs", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cookie: props.cookie
            })
        })
            .then(response => response.json())
            .then(data => {
                setCost(data.costs)
            })

    }
    const removeReward = (rewardid) => {

        const filteredRewards = rewards.filter(reward => {
            return reward.id !== rewardid
        })
        fetch(API_URL + '/api/reward/remove', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: rewardid,
                cookie: props.cookie
            })
        })
        setRewards(filteredRewards)
    }

    const getCoins = () => {
        fetch(API_URL + "/api/shop/getcoins", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cookie: props.cookie
            })

        }).then(response => response.json())
            .then(data => {
                props.setCoins(data.coins)
            })
    }



    const buy = (name) => {
        fetch(API_URL + '/api/shop/purchase', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: name,
                cookie: props.cookie
            })
        })
            .then(response => response.json())
            .then(data => {
                props.setCoins(data.coin)
                var newRewards = rewards.slice();
                newRewards.push(data.reward)
                setRewards(newRewards)
            })


    }
        const buttons = cost.map(item =>
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => buy(item.name)}
                >
                    {item.name}  ({item.cost})
            </Button>
            </Grid>)

  
    React.useEffect(() => {
        setRewardItems(rewards.map(item =>
            <RewardCard
                removeReward={removeReward}
                key={item.id}
                item={item}
            />
        ))
    }, [rewards]);


    return (
        <div>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
                align="center"
            >

                {rewardItems}
                <Grid item xs={5}>
                    <Grid container>
                        <Typography variant="h3">Coins {props.coins} </Typography>
                        {buttons}
                    </Grid>

                </Grid>
            </Grid>
        </div>
    )

}
