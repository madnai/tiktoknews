import React, {forwardRef} from "react"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Layout from "../components/layout"
import MaterialTable from 'material-table';
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

import "../assets/css/main.css"

export default function RankingPage() {
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
  const [state, setState] = React.useState({
    columns: [
      { title: '#', field: 'position', width: '60px'},
      { title: 'Nazwa', field: 'avatar', width: '40px', render: rowData => <Avatar alt="Remy Sharp" src={rowData} /> },
    { title: '', field: 'name'},
      { title: 'Liczba obserwujących', field: 'subscribers', type: 'numeric' },
      { title: 'Zaangażowanie', field: 'engagement'},
     
    ],
    data: [
      { position: 1, avatar: '/image/asdasd.jpg', name: 'Zosia', subscribers: 1987, birthCity: 63, engagement: '3.5%' },
      {
        position: 2,
        name: 'Janusz',
        avatar: 'Baran',
        subscribers: 2017,
        birthCity: 34,
        engagement: '3.5%'
      },
      {
        position: 3,
        avatar: 'asdasd',
        name: 'Baran',
        subscribers: 2017,
        birthCity: 34,
      },
      {
        position: 4,
        name: 'Baran',
        avatar: 'asdasd',
        subscribers: 2017,
        birthCity: 34,
      },
      {
        position: 5,
        name: 'Baran',
        avatar: 'asdasd',
        subscribers: 2017,
        birthCity: 34,
      },
      {
        position: 6,
        name: 'Baran',
        avatar: 'asdasd',
        subscribers: 2017,
        birthCity: 34,
      },
    ],
  });

  return (
    <Layout>
    <MaterialTable
    icons={tableIcons}
      title="Ranking 100 tiktokerów polska"
      columns={state.columns}
      data={state.data}
      style={{marginTop: '100px'}}
    />
    </Layout>
  );
}
