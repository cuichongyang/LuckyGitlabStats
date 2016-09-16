/**
 * Created by DELL on 2016/8/22.
 */
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
import NavLink from '../NavLink';
/**/


export default React.createClass({


    propTypes: {
        label: React.PropTypes.string,
    },
    getInitialState: function () {
        return {
            projectMembers: [],
            groupMonitor:[],groupMembers:[],
            projectMonitor:[],
            newProject: false, newGroup:false,
            newUser:false,projectname:null,
            member:null,
            username:null,
        };
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
        this.setState({username: event.target.value});
    },
    handleSex:function () {
        var value="";
        var radio=document.getElementsByName("sex");
        for(var i=0;i<radio.length;i++){
            if(radio[i].checked){
                value=radio[i].value;
                break;
            }
        }
        return value;

    },
    handleRank:function () {
        var value="";
        var radio=document.getElementsByName("rank");
        for(var i=0;i<radio.length;i++){
            if(radio[i].checked){
                value=radio[i].value;
                break;
            }
        }
        return value;

    },

    handlePost:function(){
        var user={
            username:this.state.username,
            sex:this.handleSex(),
            rank:this.handleRank(),
        };
        $.ajax({
            url:"http://202.196.96.79:1500/api/Root/PostRegister",
            data: JSON.stringify(user),
            contentType:"application/json",
            type:"post",
            async:false,
            dataType:"json",
            success:function(){
                alert("add a user successfully!");
                sessionStorage.setItem('result',"success");

            },
            error: function () {
                alert("Error in PostRegister!");
            }
        });
        this.handleClose();

    },

    render() {
        const actions = [
            <NavLink to="/userlist">
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handlePost}
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
                <a id="Dialog_btn" onClick={this.handleOpenForUser} >New User</a>
                {/*new User*/}
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.newUser}
                    onRequestClose={this.handleClose} >
                    <div id="Dialog_Title">
                        <p id="title">Add a new user</p><br/>
                    </div>
                    <div id="textField">
                        <TextField id="textFieldOne"
                                   hintText="UserName"
                                   onChange={this.handleChange}
                        /><br/><br/>
                        <div id="userDia_sex">
                        Sex:  <input id="male" type="radio"  name="sex" value="male" />Male
                        <input id="female" type="radio" name="sex" value="female" />Female
                        </div>
                        <div id="userDia_rank">
                            Rank:  <input id="admin" type="radio"  name="rank" value="Root" />Root
                            <input id="mon" type="radio" name="rank" value="Monitor" />Monitor
                            <input id="mem" type="radio" name="rank" value="Member" />Member
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