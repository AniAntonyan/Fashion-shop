import React from 'react'
import { Tab } from 'semantic-ui-react'
import DataTable from '../dataTable/DataTable'
import PendingTable from '../dataTable/PandingTable';


function Tabs({uploadImg, pendingOrders, sentOrders, paidOrders, unpaidOrders, allOrders, allDoneOrders, allProducts, changeStatus}){
  
  const panes = [
    {
      menuItem: "All Products",     
      render: () => (
        <Tab.Pane>
          <DataTable list = {allProducts} uploadImg={uploadImg}/>
        </Tab.Pane>
      )
    },
    { 
        menuItem: "All Orders", 
        render: () =>(
          <Tab.Pane>
          <PendingTable list = {allOrders} changeStatus = {changeStatus} />
          </Tab.Pane> 
        ) 
    },
    { 
      menuItem: "Pending", 
      render: () =>(
        <Tab.Pane>
        <PendingTable list = {pendingOrders} changeStatus = {changeStatus} />
        </Tab.Pane> 
      ) 
  },
    { 
      menuItem: "UNPAID orders", 
      render: () =>(
        <Tab.Pane>
        <PendingTable list = {unpaidOrders} changeStatus = {changeStatus} />
        </Tab.Pane> 
      ) 
    },
    { 
      menuItem: "SENT", 
      render: () =>(
        <Tab.Pane>
        <PendingTable list = {sentOrders} changeStatus = {changeStatus} />
        </Tab.Pane> 
      ) 
    },
    { 
      menuItem: "PAID", 
      render: () =>(
        <Tab.Pane>
        <PendingTable list = {paidOrders} changeStatus = {changeStatus} />
        </Tab.Pane> 
      ) 
    },
    { 
      menuItem: "DONE", 
      render: () =>(
        <Tab.Pane>
        <PendingTable list = {allDoneOrders} changeStatus = {changeStatus} tabName={"DONE"} />
        </Tab.Pane> 
      ) 
    },
  ];
  return (
<> 
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
</>
  );
};
export default Tabs;