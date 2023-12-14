import React from "react";
import Navbar from "../navigation/Navbar";
import { Card, Container, Paper, Table, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import './profile.css'

function Profile(){
    const currentUser = useSelector(state => state.currentUser.value)
    const dateTime = currentUser.created_at.split('T')
    const date = dateTime[0].split('-')
    const [year, month, day] = date
    date[0] = month
    date[1] = day
    date[2] = year
    const joinDate = date.join('-')
return(
    <div className="main">
        <Navbar/>

        <Container>
            <Card elevation={10} id="profileCard">
                <Typography variant="h4" className="profileCardData"><u>{currentUser.username}</u></Typography>
                <br/>
                <Typography variant="h5" className="profileCardData">Joined:{joinDate}</Typography>
                <br/>
                <br/>
                <Typography variant="h5" className="profileCardData">Total Orders:</Typography>
            </Card>

            <Paper elevation={6} className="dataContainer" sx={{bgcolor:'antiquewhite'}}>
                <div className="containerHeader">
                    <Typography variant="body1" className="containerTitle" sx={{fontFamily:'monospace'}}>Items Ordered</Typography>
                </div>
                <Table id='itemsTable'></Table>
            </Paper>

            <Paper elevation={6} className="dataContainer" sx={{bgcolor:'antiquewhite'}}>
                <div className="containerHeader">
                    <Typography variant="body1" className="containerTitle" sx={{fontFamily:'monospace'}}>All Orders</Typography>
                </div>  
                <Table id='ordersTable'></Table>
            </Paper>
        </Container>
    </div>
)
}

export default Profile;