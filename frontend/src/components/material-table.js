import React from "react"
import Table from "@material-ui/core/Table"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableBody from "@material-ui/core/TableBody"
import abbreviateNumber from "../utils/abbreviateNumber"
import Avatar from "@material-ui/core/Avatar"
import { Link } from "gatsby"
import VerifiedIcon from "../images/verified.svg"

const MaterialTable = (props) => {
  return (
    <TableContainer style={{ marginBottom: "70px" }}>
      <Table aria-label="simple table" style={{ minWidth: "340" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <span style={{ fontSize: "1.5rem" }}>Pozycja</span>
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <span style={{ fontSize: "1.5rem" }}>Nazwa</span>
            </TableCell>
            <TableCell>
              <span style={{ fontSize: "1.5rem" }}>Obserwujacy</span>
            </TableCell>
            <TableCell>
              <span style={{ fontSize: "1.5rem" }}>Suma polubień</span>
            </TableCell>
            <TableCell>
              <span style={{ fontSize: "1.5rem" }}>Suma komentarzy</span>
            </TableCell>
            <TableCell>
              <span style={{ fontSize: "1.5rem" }}>Zaangażowanie</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.users
            .sort((a, b) => (a.fans > b.fans ? -1 : 1))
            .map((row, i) => (
              <TableRow key={row.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>
                  <Avatar src={row.covers[0]} />
                </TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>{abbreviateNumber(row.fans)}</TableCell>
                <TableCell>{abbreviateNumber(row.heart)}</TableCell>
                <TableCell>
                  {row.totalComments[0] == undefined
                    ? "null"
                    : abbreviateNumber(row.totalComments[0].Total)}
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MaterialTable
