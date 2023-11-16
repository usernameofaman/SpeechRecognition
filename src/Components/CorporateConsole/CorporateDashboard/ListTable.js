import { Button, capitalize } from "@mui/material";
import React, { useState, useEffect } from "react";
import { CorporateService } from "../../../services";
import CorporateModal from "./CorporateModal";

const DataTable = ({ data, openAddModal }) => {
  const excludedColumns = ["_id", "__v"];
  const columns = Object.keys(data[0] || {}).filter(
    (column) => !excludedColumns.includes(column)
  );

  return (
    <div>
      <Button
      variant="contained"
      sx={{mt : 1, mb:1}}
        onClick={openAddModal}
      >
        Add
      </Button>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{capitalize(column)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = ({ userData }) => {
  const [apiData, setApiData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if(userData.userId)
    getCorporateData();
  }, [userData]);

  const getCorporateData = async () => {
    try {
      console.log(userData)
      const response = await CorporateService.getCorporateEmployees(userData.userId || "");
      console.log("Corporate Data:", response);
      setApiData(response);
    } catch (error) {
      console.error("Error fetching corporate data:", error);
    }
  };

  const openAddModal = () => {
    setIsModalOpen(true);
  };

  const closeAddModal = () => {
    getCorporateData()
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Data Table</h1>
      <div>
        Corporate Name : {userData.name}
      </div>
      <DataTable data={apiData} openAddModal={openAddModal} />
      <CorporateModal isOpen={isModalOpen} onClose={closeAddModal} corporateId={userData.userId}/>
    </div>
  );
};

export default App;
