import React, { forwardRef, useEffect, useState } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import TableContainer from "@material-ui/core/TableContainer"
import Layout from "../components/layout"
import Avatar from "@material-ui/core/Avatar"
import { Link } from "gatsby"
import abbreviateNumber from "../utils/abbreviateNumber"
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import MaterialTable from "../components/material-table"
import {
  BrowserView,
  MobileView,

} from "react-device-detect"
import { API_URL } from '../config/index';
import VerifiedIcon from "../images/verified.svg"

function RankingPage(props) {
  var SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"]

  const Image = <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const response = await fetch(`${API_URL}/users`)
    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  return (
    <Layout>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <>
            <MobileView>
              
             <TableContainer style={{ marginBottom: "70px" }}>
              <Table aria-label="simple table" style={{ minWidth: "340" }}>
                <Thead>
                  <Tr>
                    <Th>
                      {/* <span style={{ fontSize: "1rem" }}>Pozycja</span> */}
                    </Th>
                    <Th></Th>
                    <Th>
                      <span style={{ fontSize: "1rem" }}>Nazwa</span>
                    </Th>
                    <Th>
                      <span style={{ fontSize: "1rem" }}>Obserwujacy</span>
                    </Th>
                    <Th>
                      <span style={{ fontSize: "1rem" }}>Suma polubień</span>
                    </Th>
                    <Th>
                      <span style={{ fontSize: "1rem" }}>Suma komentarzy</span>
                    </Th>
                    <Th>
                      <span style={{ fontSize: "1rem" }}>Zaangażowanie</span>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users
                    .sort((a, b) => (a.fans > b.fans ? -1 : 1))
                      .map((row, i) => (
                      <>
                      <Tr key={row.id}>
                        <Td style={{fontSize: '35px'}}>{i + 1}</Td>
                        <Td>
                          <Avatar src={row.covers[0]} />
                        </Td>
                        <Td>
                          <Link
                            to={`/ranking/${row.uniqueId}`}
                            style={{ color: "#fe2c55", fontWeight: "bold" }}
                          >
                            {row.uniqueId} 
                          </Link>
                                    {row.verified && (
                            <span style={{ paddingLeft: "10px" }}>
                              <VerifiedIcon />
                            </span>
                          )}
                        </Td>
                        <Td>{abbreviateNumber(row.fans)}</Td>
                        <Td>{abbreviateNumber(row.heart)}</Td>
                        <Td>
                          {row.totalComments[0] == undefined
                            ? "null"
                            : abbreviateNumber(row.totalComments[0].Total)}
                        </Td>
                        <Td>
                          {row.totalComments[0] == undefined
                            ? "null"
                            : (
                                ((row.totalComments[0].Total +
                                  row.totalShares[0].Total +
                                  parseInt(row.heart)) /
                                  parseInt(row.totalViews[0].Total)) *
                                100
                              ).toFixed(2)}
                          %
                        </Td>
                          </Tr>
                          <hr></hr>
                      </>
                    ))}
                </Tbody>
              </Table>
            </TableContainer> 
          </MobileView>
          <BrowserView>
            <MaterialTable users={users} />
          </BrowserView>
        </>
      )}
    </Layout>
  )
}

export default RankingPage
