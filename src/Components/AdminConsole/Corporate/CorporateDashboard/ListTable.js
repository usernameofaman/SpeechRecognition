import React, { useState, useEffect } from "react";
import { CamelCaseToString } from "../../../../managers/utility";
import { CorporateService } from "../../../../services";
import CorporateModal from "./CorporateModal";

const DataTable = ({ data, openAddModal }) => {
  
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = () => {
    // Handle the submitted value, e.g., update the license
    console.log('Submitted value:', inputValue);

    // Reset the state
    setShowInput(false);
    setInputValue('');
  };
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
            <th>Name</th>
            <th>Email</th>
            <th>Number Of License</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.numberOfLicense}</td>

              <td>
              <div style={{ display: 'flex', alignItems: 'center' }}>
      <button
        style={{
          padding: '8px',
          backgroundColor: '#3f51b5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginRight: '8px',
        }}
        onClick={handleButtonClick}
      >
        Increase License
      </button>

      {showInput && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter value"
            style={{ marginRight: '8px' }}
          />
          <button onClick={handleInputSubmit}>Submit</button>
        </div>
      )}
    </div>

              </td>
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
    getCorporateData();
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
