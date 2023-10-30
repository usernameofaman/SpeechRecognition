import { Button, responsiveFontSizes, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import { showSuccessMessage } from '../../../managers/utility'
import { SettingsService } from '../../../services'


export default function ChiefComplaint() {

    const [complaint, setComplaint] = React.useState("")

    useEffect(() => {
        getData()
    },[])


    const getData = async () => {
        const response = await SettingsService.getComplaint();
        if(response && response.chiefComplaint){
            setComplaint(response.chiefComplaint)
        }
    }

    const setData = async () => {
        const response = await SettingsService.setComplaint({ chiefComplaint: complaint })
        if (response.modifiedCount) {
            showSuccessMessage("Updated")
        }
    }

    return (
        <>
            <div>ChiefComplaint</div>

            <TextField multiline fullWidth minRows={3} onChange={(e) => setComplaint(e.target.value)} value={complaint} placeholder='Chief Complaint' ></TextField>
            <Button onClick={setData}>Save</Button>
        </>
    )
}
