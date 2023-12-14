import React, { useEffect, useState } from "react";

import DataTable from "./dataTable";
import SetQuestions from "./SetQuestions/setQuestion";
import LlmAnswer from "./LLMAnswers/llMAnswer";
import FreeUsers from "./freeUsers/freeUsers";
import { QuestionsService } from "../../../services";
import ChiefComplaint from "./Models/ChiefComplaint";

import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HealingIcon from '@mui/icons-material/Healing';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

export default function CrudIndex() {
    const [allQuestionsData, setAllQuestionsData] = useState([]);
    const [allLots, setAllLots] = useState([]);
    const [allDisorderData, setAllDisorderData] = useState([]);
    const [activeTab, setActiveTab] = useState("Questions"); // Initial active tab

    const fetchData = async () => {
        try {
            let response;
            switch (activeTab) {
                case "Questions":
                    const allQuestionsDataRes =
                        await QuestionsService.getAllQuestionsData();
                    response = allQuestionsDataRes; // Assign the correct response variable
                    break;
                case "LOTS":
                    const allLotsRes = await QuestionsService.getAllLots();
                    response = allLotsRes; // Assign the correct response variable
                    break;
                case "Disorder":
                    const allDisorderRes = await QuestionsService.getAllDisorderData();
                    response = allDisorderRes; // Assign the correct response variable
                    break;
                default:
                    response = null;
            }

            if (response) {
                const data = await response;
                switch (activeTab) {
                    case "Questions":
                        setAllQuestionsData(data);
                        ;
                        break;
                    case "LOTS":
                        setAllLots(data); // Check if this function name is correct
                        break;
                    case "Disorder":
                        let newData = data.sort((a, b) => a.lotId - b.lotId)
                        setAllDisorderData(newData);
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    let content;

    switch (activeTab) {
        case "SetQuestions":
            content = <SetQuestions />;
            break;
        case "FreeUsers":
            content = <FreeUsers />;
            break;
        case "Chief Complaint":
            content = <ChiefComplaint />;
            break;
        case "LlmAnswer":
            content = <LlmAnswer />;
            break;
        default:
            content = (
                <DataTable
                    activeTab={activeTab}
                    allQuestionsData={allQuestionsData}
                    allLots={allLots}
                    allDisorderData={allDisorderData}
                />
            );
    }


    useEffect(() => {
        fetchData();
    }, [activeTab]);




    return (
        <>
            <BottomNavigation
                sx={{ mt: 6, mb: 3, borderBottom: "1px solid grey", flex: "0 0 auto", }}
                showLabels
                value={activeTab}
                onChange={(event, newValue) => {
                    console.log(newValue)
                    setActiveTab(newValue);
                }}
            >
                <BottomNavigationAction value="Disorder" label="Disorders" icon={<HealingIcon />} />
                <BottomNavigationAction value="Questions" label="Questions" icon={<QuestionMarkIcon />} />
                <BottomNavigationAction value="LOTS" label="LOTS" icon={<ListAltIcon />} />
                <BottomNavigationAction value="SetQuestions" label="Set Questions" icon={<ListAltIcon />} />
                <BottomNavigationAction value="LlmAnswer" label="LLM Answers" icon={<ListAltIcon />} />
                <BottomNavigationAction value="FreeUsers" label="Free User" icon={<MoneyOffIcon />} />
                <BottomNavigationAction value="Chief Complaint" label="Chief Complaint" icon={<DriveFileRenameOutlineIcon />} />
            </BottomNavigation>
            <div style={{ overflowY: "auto", flex: 1 }}>
                {content}
            </div>
        </>

    )
}
