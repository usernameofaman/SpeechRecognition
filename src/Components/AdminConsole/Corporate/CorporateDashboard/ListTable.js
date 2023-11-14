import React, { useState, useEffect } from "react";
import { CorporateService } from "../../../../services";
import CorporateModal from "./CorporateModal";

const DataTable = ({ data, openAddModal }) => {
  const excludedColumns = ["_id", "__v"];
  const columns = Object.keys(data[0] || {}).filter(
    (column) => !excludedColumns.includes(column)
  );

  return (
    <div>
      <button
        style={{
          padding: "8px",
          backgroundColor: "#3f51b5",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={openAddModal}
      >
        Add
      </button>
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
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

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCorporateData();
  }, []);

  const getCorporateData = async () => {
    try {
      const response = await CorporateService.getCorporateData();
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
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Data Table</h1>
      <DataTable data={apiData} openAddModal={openAddModal} />
      <CorporateModal isOpen={isModalOpen} onClose={closeAddModal} />
    </div>
  );
};

export default App;
