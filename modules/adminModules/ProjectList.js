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
import ProjectDialog from './ProjectDialog';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Select from 'react-select';
import NavLink from '../NavLink'
import TextField from 'material-ui/lib/text-field';

var resultAll = [];
var resultSearch = [];
var resultNum;
var resultNew=[];
var resultGroupInfo=[];
var resultSearchGroupName=[];
var selectGroup=[];
var members=[];
var group=[];
var resultMon;
var resultMems;
var resultGroup;
var resultProject;
var monitor;
var groupMems;


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
const iconStyles = {
    marginRight: 10,
};



export default React.createClass({

    getInitialState: function () {
        return {
            options:[], projectMembers: [],
            groupMonitor:[],groupMembers:[],
            projectMonitor:[],
            newProject: false, newGroup:false,
            newUser:false,projectname:null,
            member:null,
            result:[],
            searchText:null,
            value:null,
            select:true,
            deleteOpen:false,
            projectEdit:null,
            GroupName:null,
            optionsGroupName:[],
            optionsMembers:[],
            mem:[]

        };
    },
    componentWillMount: function () {
        this.projectListGet();
        this.searchforeach();
        this.groupListGet();
        this.searchforGroupName();
        this.setState({select:true});
        this.setState({result:resultNew});
        this.setState({options:resultSearch});
        this.setState({optionsGroupName:resultSearchGroupName});


        // this.getUpdateProjectInfo();
    },
    componentWillUpdate:function(){

        if(sessionStorage.getItem('result')!="unknown"){
            alert("Update");
            console.log("result:"+sessionStorage.getItem('result'));
            this.componentWillMount();
            sessionStorage.setItem('result',"unknown");
        }
    },

    handleClose :function() {
        this.setState({open: false});
        this.setState({newProject:false});
    },
    handleOpenForProject :function (i){

        resultProject=resultNew[i];
        this.setState({projectEdit:resultNew[i]});
        this.searchEach();
        this.setState({groupMonitor:resultGroup.split(",")});
        this.setState({groupMembers:resultMon.split(",")});
        this.setState({mem:resultMems.split(",")});
        this.setState({newProject:true});
        
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
    },
    deleteOpen:function (i) {
        resultNum=i;
        this.setState({deleteOpen:true});
    },
    deleteClose:function () {
        this.setState({deleteOpen:false});
    },
    handleSelectProjectMonitor :function(projectMonitor) {
        this.setState({ projectMonitor });
        if(projectMonitor.value){
            this.setState({result:projectMonitor.value});
        }
        else{
            this.setState({result:resultAll});
        }
    },
    handleSelectGroupMonitor :function(groupMonitor) {
        this.setState({ groupMonitor });
        selectGroup = groupMonitor.split(",");
        group=groupMonitor;



    },

    handleSelectGroupMembers :function(groupMembers) {
        this.setState({ groupMembers });
        monitor=groupMembers;


    },
    selectGroupMembers:function (mem) {
        this.setState({ mem });
        groupMems=mem;
    },
    projectListGet: function () {
        $.ajax({
            url:'http://10.12.51.142:1500/api/project/GetAllProjectInfo',
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                resultAll = data;

            },
            error : function() {
                alert("projectListGet failed to get data!");
            }
        });
    },
    projectDelete: function () {
        $.ajax({
            url:'http://10.12.51.142:1500/api/Project/GetDeleteProject',
            data:{projectname:resultNew[resultNum]},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                alert(data);
                sessionStorage.setItem('result',"success");
            },
            error : function() {
                alert("Eorror in groupDelete");
            }
        });
        this.deleteClose();
    },
    getUpdateProjectInfo:function () {
        $.ajax({
            url:"http://10.12.51.142:1500/api/Project/GetUpdateProject",
            data:{projectName:this.state.projectEdit,projectMonitor:monitor,projectMembers:groupMems,groupName:group},
            contentType:"application/json",
            type:"get",
            cache:false,
            async:false,
            dataType:"json",
            success:function(data){
                alert("update the group successfully"+data);
                sessionStorage.setItem('result',"success");
            },
            error: function () {
                alert("Error in program getUpdateGroupInfo!");
            }
        });
        this.handleClose();
    },
    groupListGet: function () {
        $.ajax({
            url:'http://10.12.51.142:1500/api/Group/GetGroupInfo',
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                resultGroupInfo = data;
            },
            error : function() {
                alert("groupListGet failed to get data!");
            }
        });
    },
    searchforGroupName:function () {
        var i = 0;

        resultSearchGroupName=[];
        for(;i<resultGroupInfo.length;i++){
            resultSearchGroupName[i] = {label:resultGroupInfo[i].GroupName,value:resultGroupInfo[i].GroupName};

        }
    },
    searchMembers:function () {
        var i;
        var j;
        var k=0;
        members=[];
        var resultMem=[];
        for(i=0;i<selectGroup.length;i++){
            for(j=0;j<resultGroupInfo.length;j++){
                if(selectGroup[i]==resultGroupInfo[j].GroupName){
                    members=resultGroupInfo[j].GroupMembers.split(",");
                        for(;k<members.length;k++){
                            resultMem[k]={label: members[k],value: members[k]};
                        }
                }
            }
        }


        this.setState({optionsMembers:resultMem});
        alert(resultMem);


    },
    searchEach:function () {
        var i=0;

        for(;i<resultAll.length;i++){
            if(resultProject==resultAll[i].projectName){
                resultGroup=resultAll[i].groupName;
                resultMon=resultAll[i].projectMonitor;
                resultMems=resultAll[i].projectMembers;
                alert(resultGroup.split(","));
                alert(resultMon.split(","));
                alert(resultMems.split(","));
                break;
            }
        }
    },

    searchforeach:function () {
        var i = 0;
        var j = 0;
        resultNew=[];
        for(;i<resultAll.length;i++){
            if(!resultAll[i].isDelete){
            resultNew[j]=resultAll[i].projectName;
            resultSearch[j] = {label:resultAll[i].projectName,value:resultAll[i].projectName};
                j++;
            }
        }
    },
    sessionStorage: function (name) {
        sessionStorage.setItem('projectName', name);
        sessionStorage.setItem('projectDays', 7);
    },
    render() {
        var self = this;
        const actionsEdit = [
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.getUpdateProjectInfo}
            />
            ,
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];
        const actions = [
            <NavLink to="/projectlist">
                <FlatButton
                    label="Yes"
                    primary={true}
                    onTouchTap={this.projectDelete}
                />
            </NavLink>,
            <FlatButton
                label="No"
                primary={true}
                onTouchTap={this.deleteClose}
            />
        ];

        return(
            <div id="projectList_project">
                <div id="projectList_header">
                    <div id="projectList_left">
                        <p className="projectList_title">Project List</p>
                    </div>
                    <div id="projectList_right">
                        <div className="projectList_section">
                            <Select  id="select" value={this.state.projectMonitor} resetValue="reset" options={this.state.options}  placeholder="Search" autoBlur={this.state.select} onChange={this.handleSelectProjectMonitor}/>
                        </div>

                    </div>

                </div>
                <div id="projectList_list">

                    <List id="projectList_realList">
                        {
                            React.Children.map(this.state.result, function (child,i) {
                                return  <ListItem

                                    style={testStyle}
                                    primaryText={<NavLink to="projectinfo" onClick={()=>{self.sessionStorage(child)}}>{child}</NavLink>}
                                    rightAvatar={ <div ><OverlayTrigger placement="bottom" overlay={tooltipDelete} ><Delete style={iconStyles} color={grey600} className="delete" onClick={()=>{self.deleteOpen(i)}}/></OverlayTrigger></div>}
                                    leftAvatar={ <Avatar color={grey800} backgroundColor={pink100} style={{left: 8}} >{child.substring(0,1)}</Avatar>}
                                >
                                <div><OverlayTrigger placement="bottom"  overlay={tooltipEdit} ><Edit style={iconStyles} color={grey600} className="edit" onClick={()=>{self.handleOpenForProject(i)}}/></OverlayTrigger></div>

                                </ListItem> ;

                            })
                        }
                    </List>
                </div>
                <div >

                    <Dialog
                        actions={actionsEdit}
                        modal={false}
                        open={this.state.newProject}
                        onRequestClose={this.handleClose} >
                        <div id="Dialog_Title">
                            <h2 id="title">Edit the project</h2><br/>

                        </div>
                        <div id="textField">

                            <div id="textFieldProject">


                                <span id="spanProject">ProjectName:</span>    <TextField
                                       value={this.state.projectEdit}
                                       hintText="GroupName"
                                       onChange={this.handleChange}
                                       disabled={true}
                            /><br/><br/>
                                </div>
                            <div className="section">
                                <div className="section-groupname"><p >GroupName:</p></div>
                                <div className="sectionEdit"><Select multi simpleValue value={this.state.groupMonitor} options={this.state.optionsGroupName} placeholder="Select Group" autoBlur={this.state.select} onChange={this.handleSelectGroupMonitor} />
                                </div>
                            </div>
                            <div className="section">
                                <div className="section-heading"><p >GroupMonitor:</p></div>
                                <div className="sectionEdit"><Select multi simpleValue  value={this.state.groupMembers}  options={this.state.optionsMembers} placeholder="Select Monitor" autoBlur={this.state.select} onChange={this.handleSelectGroupMembers} valueArray={this.state.groupMembers} onFocus={this.searchMembers}/></div>
                            </div>
                            <div className="section">
                                <div className="section-heading"><p >GroupMembers:</p></div>
                                <div className="sectionEdit"><Select multi simpleValue  value={this.state.mem}  options={this.state.optionsMembers} placeholder="Select Members"  autoBlur={this.state.select} onChange={this.selectGroupMembers} valueArray={this.state.mem} onFocus={this.searchMembers}/></div>
                            </div>
                        </div>
                    </Dialog>
                </div>
                <div>
                    <Dialog
                        actions={actions}
                        modal={false}
                        open={this.state.deleteOpen}
                        onRequestClose={this.handleClose}
                    >
                        Ready to delete the project?
                    </Dialog>
                </div>
            </div>


        )
    }
})