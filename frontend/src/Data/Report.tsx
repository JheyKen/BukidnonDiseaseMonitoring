import "./ReportStyles.css";
import { PieChart } from 'amazing-react-charts'
import DOHLogo from "../Images/doh-logo.png"
import DOHCHONM from "../Images/doh-chonm.png"
import { AxiosResponse } from "axios";
import Service from "../Service/Service";
import { Municipality } from "./municipality";
import { useEffect, useState } from "react";

const genderData = [
  { name: "Below 14", value: 2 },
  { name: "15 - 47", value: 3 },
  { name: "48 - 63", value: 1 },
  { name: "Above 64", value: 4 }
]

interface Props {
  diseaseForReport: string,
  dateFromForReport: string,
  dateToForReport: string
}

function Report(props: Props) {
  const { diseaseForReport, dateFromForReport, dateToForReport } = props

  // const yearFrom = new Date(dateFromForReport).getFullYear()
  // const yearTo = new Date(dateToForReport).getFullYear()

  const yearFrom = '2022'
  const yearTo = '2023'

  const [cases, setCases] = useState([])

  useEffect(() => {
    handleGetNewCases();
  }, [])

  const handleGetNewCases = async () => {
    try {
      let x = 0;
      const returnData = []
      while (x < Municipality.length) {
        let municipalityData = Municipality[x]
        const old_date_from = new Date(Number(yearFrom), 0, 1).valueOf();
        const old_date_to = new Date(Number(yearFrom), 11, 31).valueOf();
        const new_date_from = new Date(Number(yearTo), 0, 1).valueOf();
        const new_date_to = new Date(Number(yearTo), 11, 31).valueOf();

        const oldCaseResult: AxiosResponse = await Service.getVictimsCountPerMunicipality("dengue", municipalityData.name, old_date_from, old_date_to);
        const { data: newData } = oldCaseResult

        const newCaseResult: AxiosResponse = await Service.getVictimsCountPerMunicipality("dengue", municipalityData.name, new_date_from, new_date_to);
        const { data: oldData } = newCaseResult
        returnData.push({ city: municipalityData.name, new: newData, old: oldData })
        x++;
      }
      //@ts-ignore
      setCases(returnData)
    } catch (error) {
      alert("fjsdk")
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
            {new Date(dateFromForReport).toLocaleDateString()} - {new Date(dateToForReport).toLocaleDateString()}
          </fieldset>

          <fieldset style={{ width: '200px', padding: '20px', borderRadius: '5px', backgroundColor: '#f1f1f1', marginLeft: '1.5pc', border: "none" }}>
            <p style={{ fontWeight: "bold", textAlign: "center", color: "#333" }}>No. of Reported {diseaseForReport} Cases for the Current Date</p>
            <h1 style={{ textAlign: "center", color: "#ff5f5f", fontSize: "48px", marginTop: "50px" }}>168</h1>
          </fieldset>

          <fieldset style={{ width: '200px', padding: '20px', borderRadius: '5px', backgroundColor: '#f1f1f1', marginLeft: '1.5pc', border: "none" }}>
            <p style={{ fontWeight: "bold", textAlign: "center", color: "#333" }}>Total No. of Reported {diseaseForReport} Cases</p>
            <h1 style={{ textAlign: "center", color: "#47a447", fontSize: "48px", marginTop: "50px" }}>9,230</h1>
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
              data={genderData}
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
              Case counts reported here DO NOT represent the final number and are subject to change after inclusions of delayed reports and review cases.
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
              <th>Municipality</th>
              <th>{yearTo} Cases</th>
              <th>{yearFrom} Cases</th>
              <th>Percentage Change</th>
            </thead>
            <tbody>
              {
                cases.map((row: any) => {
                  return (
                    <tr>
                      <td>{row.city}</td>
                      <td>{row.old}</td>
                      <td>{row.new}</td>
                      <td>
                        {
                          ((Number(row.old) - Number(row.new)) / Number(row.old)) * 100
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
              <tr>
                <td>Baungon</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Cabanglasan</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Damulog</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Dangcagan</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Don Carlos</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Impasug-Ong</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Kadingilan</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Kalilangan</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Kibawe</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Kitaotao</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Lantapan</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Libona</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Malaybalay</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Malitbog</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Manolo Fortich</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Maramag</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Pangantucan</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Quezon</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>San Fernando</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Sumilao</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Talakag</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Valencia</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;