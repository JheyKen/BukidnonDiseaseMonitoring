import "./ReportStyles.css";
import { PieChart } from 'amazing-react-charts'
import DOHLogo from "../Images/doh-logo.png"
import DOHCHONM from "../Images/doh-chonm.png"
import { AxiosResponse } from "axios";
import Service from "../Service/Service";
import { Municipality } from "./municipality";
import { useEffect, useState } from "react";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

interface Props {
  diseaseForReport: string,
  dateFromForReport: string,
  dateToForReport: string
}

function Report(props: Props) {
  // const { diseaseForReport, dateFromForReport, dateToForReport } = props
  const diseaseForReport = "Dengue"
  const dateFromForReport = "2023-01-01"
  const dateToForReport = "2023-10-15"

  const yearFrom = new Date(dateFromForReport).getFullYear() - 1;
  const yearTo = new Date(dateToForReport).getFullYear();

  const [tableOneData, setTableOneData] = useState([])
  const [tableTwoData, setTableTwoData] = useState([])
  const [overallCaseCount, setOverallCaseCount] = useState(0)
  const [caseCountCurrentDate, setCaseCountCurrentDate] = useState(0)
  const [genderData, setGenderData] = useState([])
  const [ageData, setAgeData] = useState([])

  useEffect(() => {
    handleOverallCaseCount();
    handleGetTableOneData();
    handlGetTableTwoData();
    handleCaseCountCurrentDate();
    handleGenderData();
    handleAgeData();
  }, [])

  const handleGetTableOneData = async () => {
    try {
      let x = 0;
      const returnData = []
      while (x < Municipality.length) {
        let municipalityData = Municipality[x]
        const old_date_from = new Date(Number(yearFrom), 0, 1).valueOf();
        const old_date_to = new Date(Number(yearFrom), 11, 31).valueOf();
        const new_date_from = new Date(Number(yearTo), 0, 1).valueOf();
        const new_date_to = new Date(Number(yearTo), 11, 31).valueOf();

        const oldCaseResult: AxiosResponse = await Service.getVictimsCountPerMunicipality(diseaseForReport.toLowerCase(), municipalityData.name, old_date_from, old_date_to);
        const { data: newData } = oldCaseResult

        const newCaseResult: AxiosResponse = await Service.getVictimsCountPerMunicipality(diseaseForReport.toLowerCase(), municipalityData.name, new_date_from, new_date_to);
        const { data: oldData } = newCaseResult

        const percentageChange = ((Number(oldData) - Number(newData)) / Number(oldData)) * 100
        const percentage = isNaN(percentageChange) ? 0 : percentageChange.toFixed(2)

        const status = newData > oldData ? "up" : newData === oldData ? "equal" : "down"
        returnData.push({ city: municipalityData.name, new: newData, old: oldData, percent: percentage, status })
        x++;
      }
      //@ts-ignore
      setTableOneData(returnData)
    } catch (error) {
      alert("Error fetching data for Table 1.")
    }
  }

  const handlGetTableTwoData = async () => {
    try {
      let x = 0;
      const returnData = []
      while (x < Municipality.length) {
        let municipalityData = Municipality[x]

        const caseCountResult: AxiosResponse = await Service.getAllVictimsCountPerMunicipality(diseaseForReport.toLowerCase(), municipalityData.name);
        const { data: caseCount } = caseCountResult

        const overAllCount = await handleOverallCaseCount();
        const percent = (Number(caseCount) / overAllCount!) * 100;
        const caseRate = isNaN(percent) ? 0 : percent.toFixed(2)

        const deathCountResult: AxiosResponse = await Service.getAllDeathCountPerMunicipality(diseaseForReport.toLowerCase(), municipalityData.name);
        const { data: deathCount } = deathCountResult

        const fitality = (Number(deathCount) / Number(caseCount)) * 100;
        const fitalityRateCheck = isNaN(fitality) ? 0 : fitality.toFixed(2)

        const positiveCountResult: AxiosResponse = await Service.getAllPositiveCountPerMunicipality(diseaseForReport.toLowerCase(), municipalityData.name);
        const { data: positiveCount } = positiveCountResult

        const positivityRate = (Number(positiveCount) / Number(caseCount)) * 100;
        const positivityRateCheck = isNaN(positivityRate) ? 0 : positivityRate.toFixed(2)

        returnData.push({ city: municipalityData.name, cases: caseCount, percentageRate: caseRate, death: deathCount, fitalityRate: fitalityRateCheck, positive: positiveCount, positiveRate: positivityRateCheck })
        x++;
      }
      //@ts-ignore
      setTableTwoData(returnData)
    } catch (error) {
      alert("Error fetching data for Table 2.")
    }
  }

  const handleOverallCaseCount = async () => {
    try {
      const result: AxiosResponse = await Service.getOverallCaseCount(diseaseForReport.toLowerCase())
      const { data } = result
      setOverallCaseCount(Number(data))
      return Number(data)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  const handleCaseCountCurrentDate = async () => {
    try {
      const result: AxiosResponse = await Service.getCaseCountCustomDate(diseaseForReport.toLowerCase(), new Date(dateFromForReport).valueOf(), new Date(dateToForReport).valueOf())
      const { data } = result
      setCaseCountCurrentDate(Number(data))
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  const handleGenderData = async () => {
    try {
      const result: AxiosResponse = await Service.getAllGenderCountPerCase(diseaseForReport.toLowerCase())
      const { data } = result
      setGenderData(data)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  const handleAgeData = async () => {
    try {
      const result: AxiosResponse = await Service.getAllAgePerCase(diseaseForReport.toLowerCase())
      const { data } = result
      setAgeData(data)
    } catch (error) {
      alert("Error fetching record.")
    }
  }

  return (
    <div>
      <div style={{ width: '290px', float: 'left', alignItems: 'center', justifyContent: 'center' }}>
        <div className="fieldset-container">
          <div className="smiley">
            <center>
              <img src={DOHLogo} width={'130px'} height={'130px'} />
              &emsp;
              <img src={DOHCHONM} width={'130px'} height={'130px'} />
            </center>
          </div>

          <fieldset style={{ width: '200px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f1f1f1', marginLeft: '1.5pc' }}>
            <legend style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Morbidity Name</legend>
            <center>{diseaseForReport}</center>
          </fieldset>

          <fieldset style={{ width: '200px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f1f1f1', marginLeft: '1.5pc' }}>
            <legend style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Morbidity Schedule</legend>
            <center>
              {new Date(dateFromForReport).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} - {new Date(dateToForReport).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </center>
          </fieldset>

          <fieldset style={{ width: '200px', padding: '20px', borderRadius: '5px', backgroundColor: '#f1f1f1', marginLeft: '1.5pc', border: "none" }}>
            <p style={{ fontWeight: "bold", textAlign: "center", color: "#333" }}>No. of Reported {diseaseForReport} Cases for the Current Date</p>
            <h1 style={{ textAlign: "center", color: "#ff5f5f", fontSize: "48px", marginTop: "50px" }}>{caseCountCurrentDate}</h1>
          </fieldset>

          <fieldset style={{ width: '200px', padding: '20px', borderRadius: '5px', backgroundColor: '#f1f1f1', marginLeft: '1.5pc', border: "none" }}>
            <p style={{ fontWeight: "bold", textAlign: "center", color: "#333" }}>Total No. of Reported {diseaseForReport} Cases</p>
            <h1 style={{ textAlign: "center", color: "#47a447", fontSize: "48px", marginTop: "50px" }}>{overallCaseCount}</h1>
          </fieldset>

          <fieldset style={{ width: '200px', padding: '20px', borderRadius: '5px', backgroundColor: '#f1f1f1', marginLeft: '1.5pc', border: "none" }}>
            <legend style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Figure 1</legend>
            <p style={{ fontWeight: "bold", textAlign: "center", color: "#333" }}>Distribution of Cases by Age</p>
            <PieChart
              colors={['#378AFF', '#F54F52', '#FFA32F', '#93F03B']}
              legendPosition="inside"
              labelFontColor="black"
              radius="75%"
              center={['50%', '50%']}
              data={ageData}
            />
          </fieldset>

          <fieldset style={{ width: '200px', padding: '20px', borderRadius: '5px', backgroundColor: '#f1f1f1', marginLeft: '1.5pc', border: "none" }}>
            <legend style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Figure 2</legend>
            <p style={{ fontWeight: "bold", textAlign: "center", color: "#333" }}>Distribution of Cases by Gender</p>
            <PieChart
              colors={['#378AFF', '#F54F52']}
              legendPosition="inside"
              labelFontColor="black"
              radius="75%"
              center={['50%', '50%']}
              data={genderData}
            />
          </fieldset>

          <fieldset style={{ width: '200px', padding: '20px', borderRadius: '5px', backgroundColor: '#f1f1f1', marginLeft: '1.5pc', border: "none" }}>
            <legend style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>DISCLAIMER</legend>
            <p>
              Case counts reported here <b>DO NOT</b> represent the final number and are subject to change after inclusions of delayed reports and review cases.
              All data reflects partial data only of all DRUs in the province.
            </p>
            <p>
              The DOH CHD-NM shall not be held responsible for errors, nor liable for damages resulting from use or reliance upon this material.
            </p>
          </fieldset>
        </div>
      </div>

      <div className="grid">
        <div style={{ textAlign: 'center' }}>
          <span className="subheading">Department of Health</span><br></br>
          <span className="subheading">Center for Health Development Northern Mindanao Regional</span><br></br>
          <span className="subheading">Epidemiology, Surveillance & Disaster Response Unit</span><br></br>
          <span className="subheading">Provincial Health Office - Bukidnon</span><br></br>
          <p className="description">
            Vicente Neri Street, Malaybalay City, Bukidnon <br></br>
            Contact Number: +639123456789 | Email Address: sample@gmail.com<br></br>
          </p>
        </div>

        <div className="heading1">
          <h2 style={{ color: 'white', fontWeight: 'bold', flexGrow: 1, margin: 0, padding: '5px', textAlign: 'center' }}>Disease Surveillance Report Analysis</h2>
        </div>

        <div>
          <p style={{ fontWeight: "bold" }}>Table 1: Distribution of {diseaseForReport} Cases by Municipality {yearFrom} vs {yearTo}</p>

          <table border={1} className="report-table" style={{ width: '100%', minWidth: 'max-content', borderCollapse: 'separate', borderSpacing: '0px', overflow: 'hidden' }}>
            <thead>
              <th style={{ width: '20pc' }}>Municipality</th>
              <th style={{ width: '12pc' }}>{yearTo} Cases</th>
              <th style={{ width: '12pc' }}>{yearFrom} Cases</th>
              <th style={{ width: '10pc' }}>Percentage Change</th>
            </thead>
            <tbody>
              {
                tableOneData.map((row: any) => {
                  return (
                    <tr>
                      <td>{row.city}</td>
                      <td>{row.old}</td>
                      <td>{row.new}</td>
                      <td style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ paddingTop: '4px' }}>{row.percent}%</span>
                        {
                          row.status === "up" ?
                            <span><ArrowUpward /></span>
                            :
                            row.status === "equal" ?
                              <span style={{ fontWeight: 'bold', fontSize: '20px' }}>=</span>
                              :
                              <span><ArrowDownward /></span>
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

        <div>
          <p style={{ fontWeight: "bold" }}>Table 2: Detailed Distribution of {diseaseForReport} Cases by Municipality</p>

          <table border={1} className="report-table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0px', overflow: 'hidden' }}>
            <thead>
              <th>Municipality</th>
              <th>No. of Cases</th>
              <th>%</th>
              <th>Deaths</th>
              <th>CFR</th>
              <th>Probable</th>
              <th>Confirmed</th>
              <th>Positivity Rate</th>
            </thead>
            <tbody>
              {
                tableTwoData.map((row: any) => {
                  return (
                    <tr>
                      <td>{row.city}</td>
                      <td>{row.cases}</td>
                      <td>{row.percentageRate}%</td>
                      <td>{row.death}</td>
                      <td>{row.fitalityRate}%</td>
                      <td></td>
                      <td>{row.positive}</td>
                      <td>{row.positiveRate}%</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;