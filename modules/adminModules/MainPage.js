/**
 * Created by Xin on 2016/8/18.
 */
import React from 'react';
//import MobileTearSheet from '../../../MobileTearSheet';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Divider from 'material-ui/lib/divider';
import NavLink from '../NavLink'
import User from './UserDialog'
import Layer from './layer/layer'
import FlatButton from 'material-ui/lib/flat-button';
import AppBar from 'material-ui/lib/app-bar';

var groupAll = [], userAll=[], userCommit;
var resultProject = [], resultGroup = [], resultUsername = [];
var groupProject;
var order=[];
var newArray=[];
var projectMember,projectMembersCommit;
var projectAll = [];
var projectNumber, groupNumber, userNumber;
var projectCommitChange;

export default React.createClass({
    getInitialState: function() {
        this.projectCommitChange();
        return {project: null, group: null, user: null};
    },
    projectMouseOver: function (i) {
        this.projectMembersCommit(resultProject[i]);
        var htmlProject = "";
        htmlProject = "<div class='mainPage_tips'>"+"<div class='mainPage_first'>"+resultProject[i]+"</div>"
            +"Monitor:"+projectAll[i].projectMonitor+"<br/>"
            +"Members:"+projectAll[i].projectMembers+"<br/>"
            +"Commit:"+projectMembersCommit+"</div>";
        $('#project_'+i).mouseover(function()
        {
            layer.tips(htmlProject, '#project_'+i, {time: 900000});
        });
        projectMembersCommit = "";
    },
    groupMouseOver: function (i) {
        this.groupProject(resultGroup[i]);
        var htmlGroup = "";
        htmlGroup = "<div class='mainPage_tips'><div class='mainPage_first'>"+resultGroup[i]+"</div>"
            +"Monitor:"+groupAll[i].GroupMonitor+"<br/>"
            +"Members:"+groupAll[i].GroupMembers+"<br/>"
            +"Project:"+groupProject+"</div>";
        $('#group_'+i).mouseover(function()
        {
            layer.tips(htmlGroup, '#group_'+i, {time: 900000});
        });
    },
    userMouseOver: function (i) {
        var htmlUser = "";
        var sex = "";
        userCommit = "";
        this.userCommit(resultUsername[i]);
        if(userAll[i].sex == "False") {
            sex = 'female';
        }
        else
            sex = 'male';
        htmlUser = "<div class='mainPage_tips'><div class='mainPage_first'>"+resultUsername[i]+"</div>"
            +"sex:"+sex+"<br/>"
            +"group:"+userAll[i].groupName+"<br/>"
          //  +"project:"+"fundbook&nbsp;12"+"<br/>"+"<div class='mainPage_project'>"+"LuckyGitlabStats&nbsp;17"+"</div>"+"</div>";
            +"Commit:"+userCommit;
        /*  setTimeout((i)=>{this.output(i)},2000);
           function output(i) {
            $('#user_'+i).mouseover(function()
            {
                layer.tips(html, '#user_'+i, {time: 900000});
            });
        }*/
        $('#user_'+i).mouseover(function()
        {
            layer.tips(htmlUser, '#user_'+i, {time: 900000});
        });
    },
    output: function (i) {
        $('#user_'+i).mouseover(function()
        {
            layer.tips(html, '#user_'+i, {time: 900000});
        });
    },
    mouseLeave: function (i) {
        $('#project_'+i).mouseleave(function()
        {
            layer.tips('', '#project_'+i);
        });
        $('#group_'+i).mouseleave(function()
        {
            layer.tips('', '#group_'+i);
        });
        $('#user_'+i).mouseleave(function()
        {
            layer.tips('', '#user_'+i);
        });
    },
    componentWillMount: function () {
        this.listGet();
        this.set();
    },
    set: function () {
        this.setState({project: resultProject});
        this.setState({group: resultGroup});
        this.setState({user: resultUsername});
    },
    projectCommitChange: function () {
        $.ajax({
            url:'http://10.12.51.142:1500/api/AllMembers/GetCommitAddThanYesday',
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                projectCommitChange = data;
                console.log("projectCommitChange");
                console.log(projectCommitChange)
            },
            error : function() {
                alert("projectCommitChange failed to get data!");
            }
        });
    },
    listGet: function () {
        //get project list
        $.ajax({
            url:'http://202.196.96.79:1500/api/project/GetAllProjectInfo',
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                projectNumber = data.length;
                console.log("projectlist");
                console.log(data);
                if(data.length > 5) {
                    for (var i = 0; i < 5; i++) {
                        projectAll[i] = data[i];
                        resultProject[i] = data[i].projectName;
                    }
                }
                else{
                    for (var i = 0; i < data.length; i++) {
                        projectAll[i] = data[i];
                        resultProject[i] = data[i].projectName;
                    }
                }
            },
            error : function() {
                alert("projectListGet failed to get data!");
            }
        });
        //get group list
        $.ajax({
            url:'http://202.196.96.79:1500/api/Group/GetGroupInfo',
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                groupNumber = data.length;
                console.log("grouplist");
                console.log(data);
                if(data.length > 5) {
                    for (var i = 0; i < 5; i++) {
                        groupAll[i] = data[i];
                        resultGroup[i] = data[i].GroupName;
                    }
                }
                else{
                    for (var i = 0; i < data.length; i++) {
                        groupAll[i] = data[i];
                        resultGroup[i] = data[i].GroupName;
                    }
                }
            },
            error : function() {
                alert("groupListGet failed to get data!");
            }
        });
        //get user list
        $.ajax({
            url:'http://202.196.96.79:1500/api/Root/GetAllUserInfo',
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                userNumber = data.length;
                if(data.length > 5) {
                    for (var i = 0; i < 5; i++) {
                        userAll[i] = data[i];
                        resultUsername[i] = data[i].username;
                    }
                }
                else{
                    for (var i = 0; i < data.length; i++) {
                        userAll[i] = data[i];
                        resultUsername[i] = data[i].username;
                    }
                }
                console.log("userInfo");
                console.log(data);
            },
            error : function() {
                alert("userListGet failed to get data!");
            }
        });
    },
    projectMembersCommit: function (project) {
        $.ajax({
            url:'http://202.196.96.79:1500/api/project/GetMembersPushNumberOfProject',
            type:"get",
            data:{projectname: project, querydays: 7},
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                var projectCommit = data.m_Item1;
                console.log('projectMembersCommit');
                console.log(data);
                for (var i in projectCommit) {
                    projectMembersCommit += i+'  '+projectCommit[i]+'<br />';
                }
            },
            error : function() {
                alert("ProjectMembersCommit failed to get data!");
            }
        });
    },
    groupProject: function (group) {
        $.ajax({
            url:'http://10.12.51.142:1500/api/Group/GetProjectOfGroup',
            type:"get",
            data:{groupname: group},
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                groupProject = data;
                console.log('groupproject');
                console.log(data);
            },
            error: function() {
                alert("groupProject failed to get data!");
            }
        });
    },
    userCommit: function (user) {
        $.ajax({
            url:'http://202.196.96.79:1500/api/Single/GetMembersProjectsPushNumber',
            type:"get",
            data:{username: user, queryDays: 30},
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
             //   userCommit = data;
                console.log('userCommit');
                console.log(data);
                for (var i in data) {
                    userCommit += i + " " + data[i] + "<br/>";
                }
                console.log(userCommit);
            },
            error : function() {
                alert("userCommit failed to get data!");
            }
        });
    },
    alert: function (i) {
        setInterval(this.userMouseOver(i),5000);
    },
    render(){
        var self = this;
        var projectList = React.Children.map(this.state.project, function (child,i) {
            return <li id={'project_'+i} onMouseOver={()=>{self.projectMouseOver(i)}} onMouseLeave={()=>{self.mouseLeave(i)}}>{child}</li>;
        });
        var groupList = React.Children.map(this.state.group, function (child,i) {
            return <li id={'group_'+i} onMouseOver={()=>{self.groupMouseOver(i)}} onMouseLeave={()=>{self.mouseLeave(i)}}>{child}</li>;
        });
        var userList = React.Children.map(this.state.user, function (child,i) {
            return <li id={'user_'+i} onMouseOver={()=>{self.userMouseOver(i)}} onMouseLeave={()=>{self.mouseLeave(i)}}>{child}</li>;
        });
        return(
            <div>
                <div id="mainPage_left">
                    <p className="mainPage_title">Admin Area</p>
                </div>
                <div id="mainPage_main">
                    <div className="mainPage_paper">
                    
                        <div className="mainPage_number">{projectNumber}</div>
                        <div className="mainPage_paperInfo">
                            commit:+3<br/>
                            buildTotal:+12<br/>
                            buildSuccess:-3<br/>
                            issueStart:+3<br/>
                            issueEnd:+2<br/>
                        </div>
                        <NavLink to="/projectlist" className="mainPage_nav" ><div className="mainPage_new">Project List</div></NavLink>
                        <div className="mainPage_ul">
                            <ul id="ul">
                                {projectList}
                            </ul>
                        </div>
                    </div>
                    <div className="mainPage_paper">
                  
                        <div className="mainPage_number">{groupNumber}</div>
                        <div className="mainPage_paperInfo">
                            commit:+6<br/>
                            buildTotal:+7<br/>
                            buildSuccess:-5<br/>
                            issueStart:+2<br/>
                            issueEnd:+1<br/>
                        </div>
                        <NavLink to="/grouplist" className="mainPage_nav" ><div className="mainPage_new">Group List</div></NavLink>
                        <div className="mainPage_ul">
                            <ul id="ul1">
                                {groupList}
                            </ul>
                        </div>
                    </div>
                    <div className="mainPage_paper">
                    
                        <div className="mainPage_number">{userNumber}</div>
                        <div className="mainPage_paperInfo">
                            commit:+3<br/>
                            buildTotal:-2<br/>
                            buildSuccess:+6<br/>
                            issueStart:-4<br/>
                            issueEnd:-1<br/>
                        </div>
                        <NavLink to="/userlist" className="mainPage_nav" ><div className="mainPage_new">User List</div></NavLink>
                        <div className="mainPage_ul">
                            <ul>
                                {userList}
                            </ul>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
})



                                                                                                                                                                                     