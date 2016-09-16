/**
 * Created by NetCenter-305 on 2016/7/20.
 */
var React = require('react');
var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var tableData;
var username;
var days;           //表格显示的天数
const products = [];

export default React.createClass({
    getInitialState: function () {
        username = sessionStorage.getItem('username');
        days = sessionStorage.getItem('days');
        return null;
    },
    componentWillMount: function () {
        this.tableDataGet();
    },
    shouldComponentUpdate: function () {
        //判断天数是否改变，若改变则重新赋值
        if(sessionStorage.getItem('days') != days){
            days = sessionStorage.getItem('days');
            return true;
        }
        else return false;
    },
    //重新渲染
    componentWillUpdate: function () {
        this.componentWillMount();
    },
    tableDataGet: function () {
        $.ajax({
            url:'http://202.196.96.79:1500/api/Single/GetDataForTable',
            data:{username: username, queryDays: days},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                products.length = 0;
                tableData = data;
                for (var i = 0; i < tableData.length; i++) {
                    products.push({
                        version: tableData[i]["version"].substring(0,8),
                        projectName: tableData[i]["projectname"],
                        date: tableData[i]["committime"],
                        result: tableData[i]["projectResult"],
                        timeSpent: tableData[i]["spendtime"]
                    });
                }
            },
            error : function() {
                alert("tableDataGet异常！");
            }
        });
    },
    render() {
        return(
            <div id="dataTable_all">
                <div id="dataTable_title">
                    <span className="dataTable_text">The detailed information of build</span>
                </div>
                <BootstrapTable data={products} striped={true} hover={true} pagination={true} search={true}>
                    <TableHeaderColumn isKey={true} dataField="version">Version</TableHeaderColumn>
                    <TableHeaderColumn dataField="projectName">ProjectName</TableHeaderColumn>
                    <TableHeaderColumn dataField="date">Date</TableHeaderColumn>
                    <TableHeaderColumn dataField="result">Result</TableHeaderColumn>
                    <TableHeaderColumn dataField="timeSpent">TimeSpent</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
})