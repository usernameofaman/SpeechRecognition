// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Button from '@mui/material/Button';
// import { QuestionsService } from "../services";


// // Define columns for your DataGrid
// const questionColumns = [
//   { field: 'id', headerName: 'S No.', width: 90 },
//   { field: 'text', headerName: 'Text', width: 200 },
//   { field: 'code', headerName: 'Code', width: 150 },
//   { field: 'color', headerName: 'Color', width: 150 },
// ];

// // Define columns for LOTs
// const lotColumns = [
//   { field: 'id', headerName: 'S.No', width: 90 },
//   { field: 'lotNumber', headerName: 'LOT Number', width: 150 },
//   { field: 'name', headerName: 'Name', width: 150 },
// ];

// // Define columns for Disorders
// const disorderColumns = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   { field: 'name', headerName: 'Name', width: 200 },
//   { field: 'redRequired', headerName: 'Red Required', width: 150 },
//   // Add other fields/columns as needed
// ];

// function transformQuestionData(allQuestionsData) {
//   // Transform your questions data to match the DataGrid rows format
//   return allQuestionsData.map((item, index) => ({
//     id: index + 1,
//     text: item.text,
//     code: item.code,
//     color: item.color,
//   }));
// }

// function transformLotData(allLots) {
//   // Transform your LOTs data to match the DataGrid rows format
//   return allLots.map((item, index) => ({
//     id: index + 1,
//     lotNumber: item.lotNumber,
//     name: item.name,
//   }));
// }

// function transformDisorderData(allDisorderData) {
//   // Transform your disorder data to match the DataGrid rows format
//   return allDisorderData.map((item, index) => ({
//     id: index + 1,
//     name: item.name,
//     redRequired: item.redRequired,
//     // Map other fields here
//   }));
// }

// export default function DataTable({ activeTab, allQuestionsData, allLots, allDisorderData }) {
//   let data = [];
//   let columns = [];
  
//   if (activeTab === 'Questions') {
//     data = transformQuestionData(allQuestionsData);
//     columns = questionColumns;
//   } else if (activeTab === 'LOTS') {
//     data = transformLotData(allLots);
//     columns = lotColumns;
//   } else if (activeTab === 'Disorder') {
//     data = transformDisorderData(allDisorderData);
//     columns = disorderColumns;
//   }

//   // Add a custom button in the "Actions" column
//   if (activeTab === 'Questions') {
//     columns.push({
//       field: 'actions',
//       headerName: 'Actions',
//       width: 150,
//       renderCell: (params) => (
//         <div>
//           <Button onClick={() => handleButtonClick(params.row.id)}>
//             <DeleteIcon />
//           </Button>
//         </div>
//       ),
//     });
//   }

//   const handleButtonClick = (id) => {
//     // Handle button click logic here
//     console.log(`Button clicked for row ID: ${id}`);
//   };

//   return (
//     <Box sx={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={data}
//         columns={columns}
//         pageSize={5}
//         checkboxSelection
//         disableRowSelectionOnClick
//       />
//     </Box>
//   );
// }
