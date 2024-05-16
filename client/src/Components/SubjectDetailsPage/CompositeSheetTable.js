import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CompositeSheetTable() {
    const [marksData, setMarksData] = useState([]);

    useEffect(() => {
        const fetchMarksData = async () => {
            try {
                const [icamarksResponse, finalmarksResponse,student] = await Promise.all([
                    axios.get('http://localhost:5000/api/icamarks'),
                    axios.get('http://localhost:5000/api/finalmarks/view'),
                    axios.get('http://localhost:5000/api/students')
                ]);

                if (icamarksResponse.status !== 200 || finalmarksResponse.status !== 200) {
                    throw new Error('Failed to fetch data');
                }

                const [icamarks, finalmarks] = await Promise.all([
                    icamarksResponse.data,
                    finalmarksResponse.data
                ]);

                // Merge data from both models and calculate final marks
                const mergedData = icamarks.map(icamark => {
                    const correspondingFinalMark = finalmarks.find(finalmark => finalmark.regNo === icamark.regNo);
                    const finalMarks = correspondingFinalMark ? correspondingFinalMark.averageMarks + icamark.averageMarks : null;
                    
                    return {
                        regNo: icamark.regNo,
                        indexNo: icamark.indexNo,
                        ica01: icamark.ica01,
                        ica02: icamark.ica02,
                        ica03: icamark.ica03,
                        averageICAMarks: icamark.averageMarks,
                        firstFinalMarks: correspondingFinalMark ? correspondingFinalMark.averageMarks : null,
                        finalMarks: finalMarks
                    };
                });

                setMarksData(mergedData);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error
            }
        };

        fetchMarksData();
    }, []);

    return (
        <div>
            <h1>Final Marks Table</h1>
            <table border="1px solid">
                <thead>
                    <tr>
                        <th>Reg No</th>
                        <th>Index No</th>
                        <th>ICA 01</th>
                        <th>ICA 02</th>
                        <th>ICA 03</th>
                        <th>Average ICA Marks</th>
                        <th>First Final Marks</th>
                        <th>Final Marks</th>
                    </tr>
                </thead>
                <tbody>
                    {marksData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.regNo}</td>
                            <td>{data.indexNo}</td>
                            <td>{data.ica01}</td>
                            <td>{data.ica02}</td>
                            <td>{data.ica03}</td>
                            <td>{data.averageICAMarks}</td>
                            <td>{data.firstFinalMarks}</td>
                            <td>{data.finalMarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompositeSheetTable;
