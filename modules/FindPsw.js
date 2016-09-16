/**
 * Created by Xin on 2016/7/30.
 */
import React from 'react'
import { Lifecycle } from 'react-router'
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import NavLink from './NavLink'

const textField1 = {
    height: 40
};

const textField2 = {
    height: 40,
    width: 150
};

const button = {
    margin: 12,
    width: 150
};
var code = "";
var result;             //后台返回信息
var inputCode;

export default React.createClass({
    mixins: [Lifecycle ],
    routerWillLeave(nextLocation) {
        if(document.getElementById("findPsw_right").name == "noCheck"){
            return true;
        }
        else{
            this.checkUsername();
            this.checkEmail();
            this.validate();
            if(this.checkUsername() == true && this.checkEmail() == true && this.validate() == true){
                this.forgetGet();
                //对后台返回信息进行判断
                if(result == "发送成功"){
                    return "the password has has been sent to your mailbox, go login now?";
                }
                else if(result == "用户名不存在"){
                    alert("the username does not exist!");
                    code="";
                    this.createCode();
                    return false;
                }
                else if(result == "邮箱错误"){
                    alert("the email and username do not match!");
                    code="";
                    this.createCode();
                    return false;
                }
                else if(result == "发送失败"){
                    alert("the password failed to send to your mailbox!");
                    code="";
                    this.createCode();
                    return false;
                }
                else if(result == "查询错误"){
                    alert("abnormity!");
                    code="";
                    this.createCode();
                    return false;
                }
            }
            else{
                return false;
            }
        }
    },
    getInitialState: function() {
        return {name: null, html: null, value:null, vode:null, email:null, userEmail: null};
    },
    componentWillMount: function () {
        code = "";
        this.createCode();
    },
    userName: function(event) {
        this.setState({name: event.target.value});
    },
    email: function(event) {
        this.setState({userEmail: event.target.value});
    },
    checkUsername: function () {
        if(!this.state.name){
            this.setState({html: "<span class='findPsw_error'>Please input username!</span>"});
            return false;
        }
        else{
            this.setState({html: ""});
            return true;
        }
    },
    checkEmail: function () {
        var reg =/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if(!this.state.userEmail){
            this.setState({email: "<span class='findPsw_error'>Please input the email address!</span>"});
            return false;
        }
        else if(!reg.test(this.state.userEmail)){
            this.setState({email: "<span class='findPsw_error'>Mailbox format is not correct!</span>"})
        }
        else{
            this.setState({email: ""});
            return true;
        }
    },
    createCode:function (){
        var codeLength = 4;
        var random = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','M','N','P','Q','R',
            'S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','j','k','m','n','p','q','r','s','t',
            'u','v','w','x','y','z');               //随机数
        for(var i = 0; i < codeLength; i++) {
            var index = Math.floor(Math.random() * 52);
            code += random[index];
        }
        this.setState({value: code});
    },
    validate:function (){
        inputCode = document.getElementById("input").value.toUpperCase();
        if(inputCode.length <= 0) {
            this.setState({vcode: "<span class='findPsw_error'>Please input verification code!</span>"});
            return false;
        }
        else if(inputCode != code.toUpperCase() ) {
            this.setState({vcode: "<span class='findPsw_error'>Verification code is wrong!</span>"});
            code="";
            this.createCode();
            this.setState({input: ""});
            return false;
        }
        else {
            this.setState({vcode: "<span class='findPsw_error'></span>"});
            return true;
        }
    },
    codeChange: function () {
        code = "";
        this.createCode();
    },
    handleChange_input: function(event) {
        this.setState({input: event.target.value});
    },
    toLogin: function () {
        document.getElementById("findPsw_right").name = "noCheck";
    },
    forgetGet: function () {
        $.ajax({
            url:'http://202.196.96.79:1500/api/Common/GetSendpassrord',
            data:{username: this.state.name, email: this.state.userEmail},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                result = data;
            },
            error : function() {
                alert("异常！");
            }
        });
    },
    render() {
        return(
            <div>
                <div id="findPsw">
                    <div id="findPsw_left">
                        <p className="findPsw_title">HDDevTeam LuckyGitlabStat</p>
                    </div>
                    <div id="findPsw_right" name="toLogin"><NavLink to="/login" onClick={this.toLogin}>Go login?</NavLink></div>
                </div>
                <div id="findPsw_form">
                    <p className="findPsw_inform">Please input the information:</p>
                    <div id="findPsw_usmInput">
                        <div className="findPsw_username">Username:</div>
                        <div className="findPsw_textField1">
                            <TextField
                                onChange={this.userName}
                                style={textField1}
                                onBlur={this.checkUsername}
                            />
                            <div dangerouslySetInnerHTML={{__html:this.state.html}}></div>
                        </div>
                    </div>
                    <div id="findPsw_emailInput">
                        <div className="findPsw_emailText">Email:</div>
                        <div className="findPsw_textField3">
                            <TextField
                                style={textField1}
                                onChange={this.email}
                                onBlur={this.checkEmail}
                            />
                            <div dangerouslySetInnerHTML={{__html:this.state.email}}></div>
                        </div>
                    </div>
                    <div id="findPsw_check">
                        <div className="findPsw_vcode">Verification code:</div>
                        <div className="findPsw_textField2">
                            <TextField
                                style={textField2}
                                id="input"
                                onChange={this.handleChange_input}
                                onBlur={this.validate}
                            />
                            <div dangerouslySetInnerHTML={{__html:this.state.vcode}}></div>
                        </div>
                    </div>
                    <div>
                        <input type = "button" id="code" onClick={this.codeChange} value={this.state.value}  />
                    </div>
                    <div id="findPsw_button">
                        <NavLink to="/login">
                            <RaisedButton
                                label="SUBMIT"
                                labelPosition="before"
                                primary={true}
                                style={button}
                        />
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
})