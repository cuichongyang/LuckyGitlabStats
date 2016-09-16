/**
 * Created by Alvis on 2016/8/18.
 */

import React from 'react';
import Dialog from 'material-ui/lib/Dialog';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Select from 'react-select';
import MenuItem from 'material-ui/lib/menu';
import FlatButton from 'material-ui/lib/flat-button';
import NavLink from '../NavLink'
/**/
var resultAll = [];
var resultSearch = [];
var monitorname = [];
var membername=[];
var resultUsername=[];
var result="false";


export default React.createClass({


    propTypes: {
        label: React.PropTypes.string,
    },
    getInitialState: function () {
        return {
            options: [], projectMembers: [],
            groupMonitor:[],groupMembers:[],
            projectMonitor:[],
            newProject: false, newGroup:false,
            newUser:false,projectname:null,
            monitor:[],
            member:[],
            groupname:null,
        };
    },

    componentWillMount: function () {
        this.userListGet();
        this.username();
        this.searchforeach();
        this.setState({options:resultSearch});
    },

   
    handleOpenForProject :function (){
        this.setState({newProject:true});
    },
    handleOpenForGroup :function (){
        this.setState({newGroup:true});
    },
    handleOpenForUser :function (){
        this.setState({newUser:true});
    },
    handleClose :function (){
        /*if判断*/

        if(this.state.newGroup==true)
        {
            this.setState({newGroup:false});
            this.setState({groupMonitor:null});
            this.setState({groupMembers:null});
        }

    },
    //输入框
    handleChange: function (event) {
        this.setState({groupname: event.target.value});
    },
   
    handleSelectGroupMonitor :function(groupMonitor) {
        this.setState({ groupMonitor });
        monitorname=groupMonitor.split(",");

    }
    ,
    handleSelectGroupMembers :function(groupMembers) {
        this.setState({ groupMembers });
        membername=groupMembers.split(",");
    },

    userListGet: function () {
        $.ajax({
            url:'http://202.196.96.79:1500/api/Root/GetAllUserInfo',
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                resultAll = data;
            },
            error : function() {
                alert("userListGet failed to get data!");
            }
        });
    },
    username:function () {
        var i=0;
        for(;i<resultAll.length;i++){
            resultUsername[i]=resultAll[i].username;
        }
    },
    searchforeach:function () {
        var i = 0;
        for(;i<resultAll.length;i++){
            resultSearch[i] = {label:resultUsername[i],value:resultUsername[i]}
        }
    },

    postGroupInfo:function () {
        var group={
            groupname:this.state.groupname,
            groupmonitor:monitorname,
            groupmembers:membername
        };
        $.ajax({
            url:"http:///10.12.51.110:1500/api/Root/PostNewGroup",
            data: JSON.stringify(group),
            contentType:"application/json",
            type:"post",
            cache:false,
            async:false,
            dataType:"json",
            success:function(data){
                alert(data);
                sessionStorage.setItem('result',"success");
            },
            error: function () {
                alert("Error in program operation!");
            }
        });
        this.handleClose();
    },
    render() {
        const actions = [
           <NavLink to="grouplist">
               <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.postGroupInfo}
            />
           </NavLink>,
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];
        return (
            <div >
                <a id="Dialog_btn" onClick={this.handleOpenForGroup} >New Group</a>



                {/*new Group*/}
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.newGroup}
                    onRequestClose={this.handleClose} >
                    <div id="Dialog_Title">
                        <h2 id="title">Add a new group</h2><br/>

                    </div>
                    <div id="textField">
                        <TextField id="textFieldOne"
                                   hintText="GroupName"
                                   onChange={this.handleChange}
                        /><br/><br/>
                        <div className="section">
                            <h3 className="section-heading">{this.props.label}</h3>
                            <Select multi simpleValue  value={this.state.groupMonitor}  options={this.state.options} placeholder="Select Monitor" onChange={this.handleSelectGroupMonitor} />
                        </div>
                        <div className="section">
                            <h3 className="section-heading">{this.props.label}</h3>
                            <Select multi simpleValue  value={this.state.groupMembers}  options={this.state.options} placeholder="Select Members"  onChange={this.handleSelectGroupMembers} />
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
})
{/*   propTypes: {
 React.PropTypes 提供很多验证器 (validator) 来验证传入数据的有效性。
 当向 props 传入无效数据时，JavaScript 控制台会抛出警告。
 注意为了性能考虑，只在开发环境验证 propTypes*/}