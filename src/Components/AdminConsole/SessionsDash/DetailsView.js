import { Box, Button, Divider, Paper } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function DetailsView({ selectedSession , setSelectedSession}) {
    return (
        <>
            <Button sx={{marginBottom:1}} onClick={()=> setSelectedSession(null)} variant="contained" startIcon={<ArrowBackIcon />}>
                Back
            </Button>
            <Paper sx={{ padding: 4 }} elevation={2}>
                <Paper sx={{ display: "flex" }}>
                    <Box sx={{ width: "100%" }}>
                        <Paper sx={{ padding: 2 }} elevation={1}>
                            Name : {selectedSession.userName}
                        </Paper>
                        <Paper sx={{ padding: 2, marginTop: 1 }} elevation={1}>
                            Given Answers
                            <Divider />
                            <div style={{
                                whiteSpace: 'pre-line',
                                lineHeight: "25px",
                                display: "flex",
                                flexWrap: 'wrap',
                                justifyContent: "center",
                                height: "300px",
                                overflow: "auto"
                            }}>
                                {selectedSession && selectedSession.answerWithString && Object.keys(selectedSession?.answerWithString).map((item) => (
                                    <>{item} -  {selectedSession.answerWithString[item]} <br /></>
                                ))}
                            </div>
                        </Paper>
                    </Box>
                    <Box sx={{ width: "100%", marginLeft: 1 }}>
                        <Paper sx={{ padding: 2 }} elevation={1}>
                            Detected Disorders : {selectedSession.final.join(',')}
                        </Paper>
                        <Paper sx={{ padding: 2, marginTop: 1 }} elevation={1}>
                            Session Logs
                            <Divider />

                            <div style={{
                                whiteSpace: 'pre-line',
                                lineHeight: "25px",
                                display: "flex",
                                flexWrap: 'wrap',
                                justifyContent: "center",
                                height: "300px",
                                overflow: "auto"
                            }}>
                                {selectedSession.log}
                            </div>

                        </Paper>
                    </Box>
                </Paper>
                <Paper sx={{ padding: 2, marginTop: 1 }} elevation={1}>
                <b>Patient Report</b>
                    <Divider />
                    <div style={{
                        whiteSpace: 'pre-line',
                        lineHeight: "25px",
                        display: "flex",
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        height: "300px",
                        overflow: "auto"
                    }}>
                        {selectedSession.patientReport}
                    </div>
                </Paper>
                <Paper sx={{ padding: 2, marginTop: 1 }} elevation={1}>
                    <b>Psycologist Report</b>
                    <Divider />
                    <div style={{
                        whiteSpace: 'pre-line',
                        lineHeight: "25px",
                        display: "flex",
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        height: "300px",
                        overflow: "auto"
                    }}>
                        {selectedSession.psycologistReport}
                    </div>
                </Paper>
            </Paper>
        </>

    )
}
