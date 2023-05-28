import "./ReportStyles.css";
import { PieChart } from 'amazing-react-charts'
import DOHLogo from "../Images/doh-logo.png"
import DOHCHONM from "../Images/doh-chonm.png"

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
          <span className="subheading">Epidemiology, Surveillance & Disaster Response Unit</span>
          <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit tortor ac dolor eleifend aliquam. Aenean pellentesque velit vitae augue tempor hendrerit.</p>
        </div>

        <div className="heading1">
          <h2 style={{ color: 'white', fontWeight: 'bold', flexGrow: 1, margin: 0, padding: '5px', textAlign: 'center' }}>Disease Surveillance Report Analysis</h2>
        </div>

        <div>
          <p style={{ fontWeight: "bold" }}>Table 1: Distribution of {diseaseForReport} Cases by Municipality 2022 vs 2023</p>

          <table border={1} className="report-table" style={{ width: '100%', minWidth: 'max-content', borderCollapse: 'separate', borderSpacing: '0px', overflow: 'hidden' }}>
            <thead>
              <th>Municipality</th>
              <th>2022 Cases</th>
              <th>2023 Cases</th>
              <th>Percentage Change</th>
            </thead>
            <tbody>
              <tr>
                <td>Baungon</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Cabanglasan</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Damulog</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Dangcagan</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Don Carlos</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Impasug-Ong</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Kadingilan</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Kalilangan</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Kibawe</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Kitaotao</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Lantapan</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Libona</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Libona</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Malaybalay</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Malitbog</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Manolo Fortich</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Maramag</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Pangantucan</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Quezon</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>San Fernando</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Sumilao</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Talakag</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Valencia</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
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