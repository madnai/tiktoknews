import React, {forwardRef, useEffect, useState} from "react"
import CircularProgress from '@material-ui/core/CircularProgress';
// import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import Th from '@material-ui/core/Th';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Layout from "../components/layout"
// import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'gatsby'
import abbreviateNumber from '../utils/abbreviateNumber';
import Grid from '@material-ui/core/Grid';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import MaterialTable from '../components/material-table';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

function RankingPage(props) {
  var SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];

  const API_URL = 'http://localhost:3000/users'
  const Image =   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />;
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  }
  
  return (
    <Layout>
      {loading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}><CircularProgress /></div> : (
        <>
       <MobileView>
          <TableContainer style={{ marginBottom: '70px' }}>
            <Table  aria-label="simple table" style={{minWidth: '340'}}>
              <Thead>
                <Tr>
                  <Th><span style={{fontSize: '1rem'}}>Pozycja</span></Th>
                  <Th></Th> 
                  <Th><span style={{fontSize: '1rem'}}>Nazwa</span></Th>
                  <Th><span style={{fontSize: '1rem'}}>Obserwujacy</span></Th>
                  <Th><span style={{fontSize: '1rem'}}>Suma polubień</span></Th>
                  <Th><span style={{fontSize: '1rem'}}>Suma komentarzy</span></Th>
                  <Th><span style={{fontSize: '1rem'}}>Zaangażowanie</span></Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.sort((a,b) => (a.fans > b.fans) ? -1 : 1).map((row, i) => (
                  <Tr key={row.id}>
                    <Td >
                    {i + 1}
                    </Td>
                    <Td><Avatar src={row.covers[0]} /></Td>
                    <Td><Link to={`/ranking/${row.uniqueId}`} style={{color: '#fe2c55', fontWeight: 'bold'}}>{row.uniqueId}</Link></Td>
                    <Td>{abbreviateNumber(row.fans)}</Td>
                    <Td>{abbreviateNumber(row.heart)}</Td>
                    <Td>{row.totalComments[0] == undefined ? 'null' : abbreviateNumber(row.totalComments[0].Total)}</Td>
                    <Td>{row.totalComments[0] == undefined ? 'null' : (((row.totalComments[0].Total + row.totalShares[0].Total + parseInt(row.heart)) / parseInt(row.totalViews[0].Total))  * 100).toFixed(2)}%</Td>
                  </Tr>
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
  );
}

export default RankingPage;