import React, { useEffect, useState } from 'react'
import { QuestionsService } from '../../../services'
import DetailsView from './DetailsView'
import TableView from './TableView'

export default function SessionDash() {

    const [data, setData] = useState([])
    const [selectedSession, setSelectedSession] = useState(null)

    useEffect(() => {
        getSessionData()
    }, [])

    const getSessionData = async () => {
        let data = await QuestionsService.getAllSessions(0);
        console.log(data)
        if (data && data.length)
            setData(data)
    }
    return (
        <div style={{ marginTop: 60 }}>
            {selectedSession ? <DetailsView setSelectedSession={setSelectedSession} selectedSession={selectedSession} /> :
                <TableView data={data} setSelectedSession={setSelectedSession} />}
        </div>
    )
}
