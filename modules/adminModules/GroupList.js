/**
 * Created by DELL on 2016/8/18.
 */
import React from 'react'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import Divider from 'material-ui/lib/divider';
import Avatar from 'material-ui/lib/avatar';
import {pinkA200, transparent,grey600,pink100,grey800} from 'material-ui/lib/styles/colors';
import Edit from 'material-ui/lib/svg-icons/editor/mode-edit';
import Delete from 'material-ui/lib/svg-icons/action/delete';
import Search from 'material-ui/lib/svg-icons/action/search';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Select from 'react-select';
import GroupDialog from './GroupDialog'
import TextField from 'material-ui/lib/text-field';
import NavLink from '../NavLink'


var resultAll = [];
var resultSearch = [];
var resultNew = [];
var resultNum;
var resultSearchUser=[];
var monitorname = [];
var membername=[];
var resultUsername=[];
var groupNum;
var groupInfo;
var resultMon=[];
var resultMem=[];

const iconStyles = {
    marginRight: 10,
};
const testStyle={
    fontSize: "17px",
    fontcolor:"#5c5c5c"

};
const tooltipDelete = (
    <Tooltip id="tooltip">Delete</Tooltip>

);
const tooltipEdit = (
    <Tooltip id="tooltip">Edit</Tooltip>

);



export default React.createClass({
    propTypes: {
        label: React.PropTypes.string,
    },
    getInitialState: function () {

        return {
            options: [], projectMembers: [],
            groupMonitor:[],groupMembers:[],
            projectMonitor:[],
            optionEdit:[],
            newProject: false, newGroup:false,
            newUser:false,projectname:null,
            member:null,
            result:[],
            select:true,
            value:null,
            deleteOpen:false,
            clear:true,
            groupEdit:null,
        };
    },
    componentWillMount: function () {
        this.userListGet();
        this.username();
        this.searchuser();
        this.setState({optionEdit:resultSearchUser});
        this.groupListGet();
        this.searchforeach();
        this.setState({select:true});
        this.setState({clear:true});
        this.setState({result:resultNew});
        this.setState({options:resultSearch});
    },
    componentWillUpdate:function(){

        if(sessionStorage.getItem('result')!="unknown"){
            this.componentWillMount();
            sessionStorage.setItem('result',"unknown");
        }
    },

    handleOpenForGroup :function (i){
        // sessionStorage.setItem('newGroup',"true");
        this.setState({newGroup:true});
        this.setState({groupEdit: resultNew[i]});
        groupNum=i;
        this.searchMem();
        this.setState({groupMonitor:resultMon});
        this.setState({groupMembers:resultMem});

    },

    handleClose :function (){
        /*if判断*/
        if(this.state.newProject==true)
        {
            this.setState({newProject:false});
            this.setState({projectMonitor:null});
            this.setState({projectMembers:null});
        }
        if(this.state.newGroup==true)
        {
            this.setState({newGroup:false});
            this.setState({groupMonitor:null});
            this.setState({groupMembers:null});
        }
        if(this.state.newUser==true)
        {
            this.setState({newUser:false});
            this.setState({value:null});
        }
    },
    //输入框
    handleChange: function (event) {
        this.setState({value: event.target.value});
    },
    handleSelectGroupMonitor :function(groupMonitor) {
        this.setState({ groupMonitor });
        if(groupMonitor.value){
            this.setState({result:groupMonitor.value});
        }
        else{
            this.setState({result:resultAll});
        }
    },
    handleChangeEdit: function (event) {
        this.setState({groupname: event.target.value});
    },

    handleEditGroupMonitor :function(groupMonitor) {
        this.setState({ groupMonitor });
        monitorname=groupMonitor;


    }
    ,
    handleSelectGroupMembers :function(groupMembers) {
        this.setState({ groupMembers });
        membername=groupMembers;

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
    searchuser:function () {
        var i = 0;
        for(;i<resultAll.length;i++){
            resultSearchUser[i] = {label:resultUsername[i],value:resultUsername[i]}
        }
    },

    // postGroupInfo:function () {
    //     var group={
    //         groupname:this.state.groupname,
    //         groupmonitor:monitorname,
    //         groupmembers:membername
    //     };
    //     $.ajax({
    //         url:"http://202.196.96.79:1500/api/Root/PostNewGroup",
    //         data: JSON.stringify(group),
    //         contentType:"application/json",
    //         type:"post",
    //         cache:false,
    //         async:false,
    //         dataType:"json",
    //         success:function(data){
    //             alert(data);
    //             sessionStorage.setItem('result',"success");
    //         },
    //         error: function () {
    //             alert("Error in program operation!");
    //         }
    //     });
    //     this.handleClose();
    // },


    deleteOpen:function (i) {
        resultNum=i;
        this.setState({deleteOpen:true});
    },
    deleteClose:function () {
        this.setState({deleteOpen:false});
    },
    groupListGet: function () {
        $.ajax({
            url:'http://202.196.96.79:1500/api/Group/GetGroupInfo',
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                resultAll = data;
            },
            error : function() {
                alert("groupListGet failed to get data!");
            }
        });
    },

    groupDelete: function () {
        $.ajax({
            url:'http://202.196.96.79:1500/api/Group/GetDeleteGroup',
            data:{groupname:resultNew[resultNum]},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function () {
                alert("delete successfully!");
                sessionStorage.setItem('result',"success");
            },
            error : function() {
                alert("Eorror in groupDelete");
            }
        });
        this.deleteClose();
    },
    postUpdateGroupInfo:function () {
        alert("11");
        var group={
            GroupName:resultNew[i],
            GroupMonitor:monitorname,
            GroupMembers:membername
        };
        $.ajax({
            url:"http://10.12.51.110:1500/api/Root/GetUpdateGroup",
            data: JSON.stringify(group),
            contentType:"application/json",
            type:"get",
            cache:false,
            async:false,
            dataType:"json",
            success:function(data){
                alert(data);
                sessionStorage.setItem('result',"success");
            },
            error: function () {
                alert("Error in program postUpdateGroupInfo!");
            }
        });
        this.handleClose();
    },
    searchforeach:function () {
        var i = 0;
        resultNew=[];
        for(;i<resultAll.length;i++){
            resultNew[i]=resultAll[i].GroupName;
            resultSearch[i] = {label:resultAll[i].GroupName,value:resultAll[i].GroupName}
        }
    },
    searchMem:function () {
        var i=0;
        for(;i<resultAll.length;i++){
            if(resultAll[i].GroupName==resultNew[groupNum]){
                resultMon=resultAll[i].GroupMonitor;
                resultMem=resultAll[i].GroupMembers;
                break;
            }
        }

    },
    delete:function () {
        this.setState({deleteOpen:true});
    },
    render() {
        var self=this;
        const actionsEdit = [
            <NavLink to="/grouplist">
                <FlatButton
                    label="Submit"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.postUpdateGroupInfo}
                />
            </NavLink>,
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];
        const actions = [
            <NavLink to="/grouplist">
                <FlatButton
                    label="Yes"
                    primary={true}
                    onTouchTap={this.groupDelete}
                />
            </NavLink>,
            <FlatButton
                label="No"
                primary={true}
                onTouchTap={this.deleteClose}
            />
        ];
        return(
            <div id="groupList_group">
                <div id="groupList_header">
                    <div id="groupList_left">
                        <p className="groupList_title">Group List</p>
                    </div>
                    <div id="groupList_right">
                        <div className="groupList_section">
                            <Select value={this.state.groupMonitor} resetValue="reset" options={this.state.options} placeholder="Search" autoBlur={this.state.select} onChange={this.handleSelectGroupMonitor} clearable={this.state.clear}/>
                        </div>

                    </div>
                    <div id="groupList_new">
                        <GroupDialog/>
                    </div>
                    <div>
                        <Dialog
                            actions={actionsEdit}
                            modal={false}
                            open={this.state.newGroup}
                            onRequestClose={this.handleClose} >
                            <div id="Dialog_Title">
                                <h2 id="title">Edit the group</h2><br/>

                            </div>
                            <div id="textField">
                                GroupName:  <TextField id="textFieldOne"
                                                       hintText="GroupName"
                                                       value={this.state.groupEdit}
                                                       onChange={this.handleChangeEdit}
                                                       disabled={true}
                            /><br/><br/>
                                <div className="section">
                                    <Select multi simpleValue  value={this.state.groupMonitor}  options={this.state.optionEdit} placeholder="Select Monitor" onChange={this.handleEditGroupMonitor} valueArray={this.state.result}/>
                                </div>
                                <div className="section">
                                    <Select multi simpleValue  value={this.state.groupMembers}  options={this.state.optionEdit} placeholder="Select Members"  onChange={this.handleSelectGroupMembers} />
                                </div>
                            </div>
                        </Dialog>
                    </div>

                </div>
                <div id="groupList_list">
                    <List id="groupList_realList">
                        {
                            React.Children.map(this.state.result, function (child,i) {
                                return <ListItem
                                    id="group_listItem"
                                    style={testStyle}
                                    primaryText={<NavLink to="/group">{child}</NavLink>}
                                    rightAvatar={ <div ><OverlayTrigger placement="bottom" overlay={tooltipDelete} ><Delete style={iconStyles} color={grey600} className="delete"onClick={()=>{self.deleteOpen(i)}} /></OverlayTrigger></div>}
                                    leftAvatar={ <Avatar color={grey800} backgroundColor={pink100} style={{left: 8}} >{child.substring(0,1)}</Avatar>}
                                >
                                    <div><OverlayTrigger placement="bottom"  overlay={tooltipEdit} ><Edit style={iconStyles} color={grey600} className="edit"onClick={()=>{self.handleOpenForGroup(i)}}/></OverlayTrigger></div>

                                </ListItem>;
                            })

                        }
                    </List>
                </div>
                <Dialog

                    actions={actions}
                    modal={false}
                    open={this.state.deleteOpen}
                    onRequestClose={this.handleClose}
                >
                    Ready to delete the group?
                </Dialog>
            </div>


        )
    }
})