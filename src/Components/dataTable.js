import React from "react";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";

function DataTable({ activeTab, allQuestionsData, allLots, allDisorderData }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {activeTab === "Questions" && (
            <TableRow>
              <TableCell>Text</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Color</TableCell>
            </TableRow>
          )}

          {activeTab === "LOTS" && (
            <TableRow>
              <TableCell>LOT Number</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          )}

          {activeTab === "Disorder" && (
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Red Required</TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {activeTab === "Questions" &&
            allQuestionsData.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell>{item?.text}</TableCell>
                  <TableCell>{item?.code}</TableCell>
                  <TableCell>{item?.color}</TableCell>
                </TableRow>
              );
            })}
          {activeTab === "LOTS" &&
            allLots.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item?.lotNumber}</TableCell>
                <TableCell>{item?.name}</TableCell>
              </TableRow>
            ))}
          {activeTab === "Disorder" &&
            allDisorderData.map((item) => (
              <TableRow key={item}>
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item?.redRequired}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
