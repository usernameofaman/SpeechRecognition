import React, { useState, useEffect } from "react";
import { CamelCaseToString, showSuccessMessage } from "../../../../managers/utility";
import { CorporateService } from "../../../../services";
import CorporateModal from "./CorporateModal";

const DataTable = ({ data, openAddModal, getCorporateData }) => {

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editableLicense, setEditableLicense] = useState('');



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

  const handleCheckClick = async () => {
    if (isNaN(inputValue)) {
      console.log("Number should be numeric")
      return
    }
    const saved = await CorporateService.addCorporateLicense({ corporateId: editableLicense, numberOfLicense: parseInt(inputValue) })
    if (saved && saved._id) {
      showSuccessMessage("Updates successfully")
      getCorporateData()
      setShowInput(false);
    }
  };

  const handleButtonClick = (buttonId) => {
    setEditableLicense(buttonId);
    setShowInput(true);

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


                <div>
                  {showInput && editableLicense === row._id ? (
                    <div style={{ display: 'flex' }}>
                      <input
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const numericValue = inputValue.replace(/[^0-9]/g, '');
                          setInputValue(numericValue);
                        }}
                        type="text"
                        style={{
                          width: "101px",
                          padding: '8px',
                          borderRadius: '4px',
                          marginRight: '8px',
                        }}
                      />
                      <button
                        style={{
                          padding: '8px',
                          backgroundColor: '#4caf50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                        onClick={handleCheckClick}
                      >
                        &#10003;
                      </button>
                    </div>
                  ) : (
                    <button
                      id={row._id}
                      style={{
                        padding: '8px',
                        backgroundColor: '#3f51b5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleButtonClick(row._id)
                      }
                    >
                      Increase License
                    </button>
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
      if (response && response.length) {
        setApiData(response);
      }
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
      <DataTable data={apiData} openAddModal={openAddModal}  getCorporateData={getCorporateData}/>
      <CorporateModal isOpen={isModalOpen} onClose={closeAddModal} />
    </div>
  );
};

export default App;
