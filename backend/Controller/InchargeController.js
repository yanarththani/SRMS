const express = require('express');

const Lecturer = require('../Models/InchargeModel');

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await Lecturer.findOne({ username, password });
  
      if (user) {
        const { academicYear, semester, subject } = user; // Extract lecturerName from user object
        res.status(200).json({ status: "successful", academicYear, semester, subject }); // Return both role and lecturerName
      } else {
        res.status(401).json({ status: "failed" });
      }
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ status: "error", message: error.message });
    }
  };
