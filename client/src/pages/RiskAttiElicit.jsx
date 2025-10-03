// This .jsx is designed for Risk Attitudes Elicitation Game.

// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import React from "react";
// import { userAPI } from '../services/api'; 
import './RiskAttiElicit.css'; // 导入外部样式
import Navbar from '../components/Navbar.jsx';  // 导入 Navbar


const RiskAttiElicit = () => {
  // const navigate = useNavigate();

  // 表格数据
  const seqNumber = [
    { order: "1" },
    { order: "2" },
    { order: "3" },
    { order: "4" },
    { order: "5" },
    { order: "6" },
    { order: "7" },
    { order: "8" },
    { order: "9" },
    { order: "10" },
  ];

  const optionAData = [
    { part1: "1/10", value1: "$2.00", part2: "9/10", value2: "$1.60" },
    { part1: "2/10", value1: "$2.00", part2: "8/10", value2: "$1.60" },
    { part1: "3/10", value1: "$2.00", part2: "7/10", value2: "$1.60" },
    { part1: "4/10", value1: "$2.00", part2: "6/10", value2: "$1.60" },
    { part1: "5/10", value1: "$2.00", part2: "5/10", value2: "$1.60" },
    { part1: "6/10", value1: "$2.00", part2: "4/10", value2: "$1.60" },
    { part1: "7/10", value1: "$2.00", part2: "3/10", value2: "$1.60" },
    { part1: "8/10", value1: "$2.00", part2: "2/10", value2: "$1.60" },
    { part1: "9/10", value1: "$2.00", part2: "1/10", value2: "$1.60" },
    { part1: "10/10", value1: "$2.00", part2: "0/10", value2: "$1.60" },
  ];

  const optionBData = [
    { part1: "1/10", value1: "$3.85", part2: "9/10", value2: "$0.10" },
    { part1: "2/10", value1: "$3.85", part2: "8/10", value2: "$0.10" },
    { part1: "3/10", value1: "$3.85", part2: "7/10", value2: "$0.10" },
    { part1: "4/10", value1: "$3.85", part2: "6/10", value2: "$0.10" },
    { part1: "5/10", value1: "$3.85", part2: "5/10", value2: "$0.10" },
    { part1: "6/10", value1: "$3.85", part2: "4/10", value2: "$0.10" },
    { part1: "7/10", value1: "$3.85", part2: "3/10", value2: "$0.10" },
    { part1: "8/10", value1: "$3.85", part2: "2/10", value2: "$0.10" },
    { part1: "9/10", value1: "$3.85", part2: "1/10", value2: "$0.10" },
    { part1: "10/10", value1: "$3.85", part2: "0/10", value2: "$0.10" },
  ];

  return (
    <div>
       <Navbar />
      <h1>Risk Elicitation Game</h1>
      <div className="table-container">
          <h2>选项对比表</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>序号</th>
                <th>Option A</th>
                <th>Option B</th>
              </tr>
            </thead>
            <tbody>
              {optionAData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                  <td>{seqNumber[index].order}</td>
                  <td>
                    {item.part1} of {item.value1},&nbsp;&nbsp;&nbsp;&nbsp;
                    {item.part2} of {item.value2}
                  </td>
                  <td>
                    {optionBData[index].part1} of {optionBData[index].value1},&nbsp;&nbsp;&nbsp;&nbsp;
                    {optionBData[index].part2} of {optionBData[index].value2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default RiskAttiElicit;