/**
 * Created by DELL on 2016/8/22.
 */
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
import UserDialog from './UserDialog'
import Select from 'react-select';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import NavLink from '../NavLink';


var resultAll = [];
var resultSearch = [];
var resultUsername=[];
var resultNum;
const iconStyles = {
    marginRight: 10,

};
const tooltipDelete = (
    <Tooltip id="tooltip">Delete</Tooltip>

);
const tooltipEdit = (
    <Tooltip id="tooltip">Edit</Tooltip>

);


const testStyle={
    fontSize: "17px",
    fontcolor:"#5c5c5c"

};

export default React.createClass({
    propTypes: {
        label: React.PropTypes.string,
    },
    getInitialState: function () {
        return {
            options:[], projectMembers: [],
            groupMonitor:[],groupMembers:[],
            projectMonitor:[],
            newProject: false, newGroup:false,
            newUser:false,projectname:null,
            member:null,
            deleteOpen:false,
            select:true,
        };
    },
    componentWillMount: function () {
        this.userListGet();
        this.username();
        this.searchforeach();
        this.setState({select:true});
        this.setState({result:resultUsername});
        this.setState({options:resultSearch});

    },
    componentWillUpdate:function(){

        if(sessionStorage.getItem('result')!="unknown"){
            console.log("result:"+sessionStorage.getItem('result'));
            this.componentWillMount();
            sessionStorage.setItem('result',"unknown");
        }
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

    handleSelectUserMonitor :function(userMonitor) {
        this.setState({ userMonitor });
        if(userMonitor.value){
            this.setState({result:userMonitor.value});
        }
        else{
            this.setState({result:resultUsername});
        }
    },
    deleteOpen:function (i) {
        resultNum=i;
        this.setState({deleteOpen:true});
    },
    deleteClose:function () {
        this.setState({deleteOpen:false});
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
    userDelete: function () {
        $.ajax({
            url:'http://202.196.96.79:1500/api/Root/GetDeleteUser',
            data:{username:resultUsername[resultNum]},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function () {
                alert("delete the user successfully!");
                sessionStorage.setItem('result',"success");
            },
            error : function() {
                alert("Eorror in userDelete");
            }
        });
        this.deleteClose();
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
    click: function (name) {
        sessionStorage.setItem('username', name);
        sessionStorage.setItem('days', "7");
    },
    render() {

        var self=this;
        const actions = [
            <FlatButton
                label="Yes"
                primary={true}
                onTouchTap={this.userDelete}
            />,
            <FlatButton
                label="No"
                primary={true}
                onTouchTap={this.deleteClose}
            />
        ];
        return(
            <div id="userList_user">
                <div id="userList_header">
                    <div id="userList_left">
                        <p className="userList_title">User List</p>
                    </div>
                    <div id="userList_right">
                        <div className="projectList_section">
                            <Select  value={this.state.userMonitor} resetValue="reset" options={this.state.options} placeholder="Search" autoBlur={this.state.select} onChange={this.handleSelectUserMonitor} />
                        </div>

                    </div>
                    <div id="userList_new">
                        <UserDialog/>
                    </div>
                </div>
                <div id="userList_right">


                </div>
                <div id="userList_list">

                    <List id="userList_realList">
                        {
                            React.Children.map(this.state.result, function (child,i) {
                                return<ListItem
                                    style={testStyle}
                                    primaryText={<NavLink to="/app" onClick={()=>{self.click(child)}}>{child}</NavLink>}
                                    rightAvatar={<div><OverlayTrigger placement="bottom"  overlay={tooltipDelete} ><Delete style={iconStyles} color={grey600} className="delete" onClick={()=>{self.deleteOpen(i)}}/></OverlayTrigger></div>}
                                    leftAvatar={ <Avatar color={grey800} backgroundColor={pink100} style={{left: 8}}
                                    >{child.substring(0,1)}</Avatar>}
                                >
                                    <div><OverlayTrigger placement="bottom"  overlay={tooltipEdit} ><Edit style={iconStyles} color={grey600} className="edit"/></OverlayTrigger></div>
                                </ListItem>;

                            })
                        }
                    </List>
                </div>

                <div>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.deleteOpen}
                        onRequestClose={this.handleClose}
                    >
                        Ready to delete the user?
                    </Dialog>
                </div>

            </div>

        )
    }
})