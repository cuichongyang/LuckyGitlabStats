import React from 'react'
import NavLink from './NavLink'
import { Lifecycle } from 'react-router'
import TextField from 'material-ui/lib/TextField/TextField';
import RaisedButton from 'material-ui/lib/raised-button';

const style = {
    margin: 12
};
var result="inital";

export default React.createClass({
    mixins: [ Lifecycle ],
    routerWillLeave(nextlocation) {
        this.handlePost();
        if(document.getElementById("register_nav").name=="noCheck") return true;
        else if(result=="no"){
            return false;
        }
        else{

            if(result==true)
                return "Registration success! Go to login?";
            else {
                alert("The username has been registered !");
                return false;
            }
        }
    },
    getInitialState: function() {
        return {password:null,repassword:null,email:null,username:null,test_email:null,test_repassword:null,test_password:null,test_name:null,test_sex:null};
    },
    handlePast:function () {
        if(!this.state.username||!this.state.password||this.state.password.length<6
            ||!this.state.repassword||this.state.password!=this.state.repassword||!this.state.email
            ||!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(this.state.email)
            ||!document.getElementById("male").checked&&!document.getElementById("female").checked)
        {
            result="no";
            return false;
        }
        else
            return true;
    },
    handleChange_username:function(event){
        this.setState({username: event.target.value});
    },
    handleChange_testname: function() {
        if(!this.state.username){
            this.setState({test_name: "*Username cannot be empty!"})
        }
        else{
            this.setState({test_name: ""})
        }
    },
    handleChange_testPassword: function() {
        if(!this.state.password){
            this.setState({test_password: "*Password can not be empty!"})
        }
        else if(this.state.password.length<6){
            this.setState({test_password: "*Password not less than 6!"})
        }
        else{
            this.setState({test_password: ""})
        }
    },
    handleChange_password: function(event) {
        this.setState({password: event.target.value});
    },
    handleChange_repassword: function(event) {
        this.setState({repassword: event.target.value});
    },
    handleChange_email: function(event) {
        this.setState({email: event.target.value});
    },
    handleChange_testRepassword: function() {
        if(!this.state.repassword){
            this.setState({test_repassword: "*Please enter your password again!"})
        }
        else if(this.state.password!=this.state.repassword){
            this.setState({test_repassword: "*passwords are not consistent!"})
        }
        else{
            this.setState({test_repassword: ""})
        }
    },
    handleChange_testEmail: function() {
        var reg =/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if(!this.state.email){
            this.setState({test_email: "*Address can not be empty!"})
        }
        else if(!reg.test(this.state.email)){
            this.setState({test_email: "*Mailbox format is not correct!"})
        }
        else{
            this.setState({test_email: ""})
        }
    },
    handleChange_sex: function() {
        if(!document.getElementById("male").checked&&!document.getElementById("female").checked){
            this.setState({test_sex: "*Please select the gender!"})
        }
        else{
            this.setState({test_sex: ""})
        }
    },
    handleChange_testAll: function() {
        this.handleChange_testname();
        this.handleChange_sex();
        this.handleChange_testPassword();
        this.handleChange_testRepassword();
        this.handleChange_testEmail();
    },
    toLogin: function () {
        document.getElementById("register_nav").name="noCheck";
    },
    handleCheck:function () {
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
    handlePost:function(){
        this.handleChange_testAll();
        if(this.handlePast()){
            var user={
                username:this.state.username,
                password:this.state.password,
                sex:this.handleCheck(),
                email:this.state.email
            };
            $.ajax({
                url:"http://202.196.96.79:1500/api/Common/PostRegister",

                data: JSON.stringify(user),
                contentType:"application/json",
                type:"post",
                async:false,
                dataType:"json",
                success:function(data){
                    result=data;

                },
                error: function () {
                    alert("Error in program operation!");
                }
            })}

    },


    render() {
        return (
            <div id="register_img">
                <div id="register_outer">
                    <div id="register_head">Register</div>
                    <hr id="register_hr"/>
                    <div id="register_text"  >
                        <TextField
                            hintText=""
                            floatingLabelText="Username"
                            onChange={this.handleChange_username}
                            onBlur={this.handleChange_testname}

                        /><br />
                        <div id="register_name" dangerouslySetInnerHTML={{__html: this.state.test_name}}></div>
                        <form  id="register_sex">
                            Sex:  <input id="male" type="radio"  name="sex" value="male" />Male
                            <input id="female" type="radio" name="sex" value="female" />Female
                        </form>
                        <div id="register_testSex" dangerouslySetInnerHTML={{__html: this.state.test_sex}}></div>
                        <TextField
                            hintText=""
                            floatingLabelText="Password(Not less than 6)"
                            type="password"
                            ref="input1"
                            onChange={this.handleChange_password}
                            onBlur={this.handleChange_testPassword}
                            onFocus={this.handleChange_sex}

                        /><br />
                        <div id="register_password" dangerouslySetInnerHTML={{__html: this.state.test_password}}></div>
                        <TextField
                            hintText=""
                            floatingLabelText="Enter password again"
                            type="password"
                            ref="input2"
                            onBlur={this.handleChange_testRepassword}
                            onChange={this.handleChange_repassword}
                        /><br />
                        <div id="register_repassword" dangerouslySetInnerHTML={{__html: this.state.test_repassword}}></div>
                        <TextField
                            hintText=""
                            floatingLabelText="E-mail"
                            floatingLabelFixed={true}
                            email={this.state.value}
                            onChange={this.handleChange_email}
                            onBlur={this.handleChange_testEmail}

                        /><br />
                        <div id="register_email" dangerouslySetInnerHTML={{__html: this.state.test_email}}></div>
                    </div>
                    <div id="register_submit">
                        <NavLink to="/login" >
                            <RaisedButton label="Register" secondary={true} style={style}  />
                        </NavLink>
                    </div>
                    <div id="register_nav" name="toLogin">
                        <NavLink to="/login" id="register_link" onClick={this.toLogin}>>>Registered! Login?</NavLink>
                    </div>
                </div>
            </div>
        )
    }
})
