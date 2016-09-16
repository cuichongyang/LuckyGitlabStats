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
/**/
const FLAVOURS = [
    { label: 'cuichongyang', value: 'cuichongyang' },
    { label: 'dongyu', value: 'strawberry' },
    { label: 'xiehongguang', value: 'xiehongguang' },
    { label: 'chenchen', value: 'chenchen' },
    { label: 'ningjunming', value: 'ningjunming' },
    { label: 'fuying', value: 'fuying' },
    { label: 'fuyiman', value: 'fuyiman' },
    { label: 'xuyurong', value: 'xuyurong' },
    { label: 'cuichongyang', value: 'cuichongyang' },
    { label: 'dongyu', value: 'strawberry' },
    { label: 'xiehongguang', value: 'xiehongguang' },
    { label: 'chenchen', value: 'chenchen' },
    { label: 'ningjunming', value: 'ningjunming' },
    { label: 'fuying', value: 'fuying' },
    { label: 'fuyiman', value: 'fuyiman' },
    { label: 'xuyurong', value: 'xuyurong' },
];


export default React.createClass({


        propTypes: {
            label: React.PropTypes.string,
        },
        getInitialState: function () {
            return {
                options: FLAVOURS, projectMembers: [],
                groupMonitor:[],groupMembers:[],
                projectMonitor:[],
                newProject: false, newGroup:false,
                newUser:false,projectname:null,
                member:null,
            };
        },
        handleOpenForProject :function (){
            this.setState({newProject:true});
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
    handleSelectProjectMember :function(projectMembers) {
        this.setState({ projectMembers });
    },
    handleSelectProjectMonitor :function(projectMonitor) {
    this.setState({ projectMonitor });
},

    postProjectInfo:function () {
        let project={
            projectname:this.state.projectname,
            Member:this.state.member
        }
        $.ajax({
            url:"http://202.196.96.79:1500/api/Common/PostRegister",
            data: JSON.stringify(project),
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
        })

    },
    render() {
        const actions = [
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];
        return (
         <div >
             
             <a id="Dialog_btn" onClick={this.handleOpenForProject} >New Project</a>

             {/*new Project*/}
             <Dialog
             actions={actions}
             modal={false}
             open={this.state.newProject}
             onRequestClose={this.handleClose} >
             <div id="Dialog_Title">
                 <p id="title">Add a new project</p><br/>
             </div>

                 <div id="textField">
                     <div id="dialog_text">
                     <TextField  id="textFieldOne"
                             hintText=" ProjectName"
                             hintStyle={{color:"lightgrey"}}
                     />
                       </div>  
                     <div className="section">
                         <Select multi simpleValue value={this.state.projectMonitor}  options={this.state.options}  placeholder="Select Monitor"  onChange={this.handleSelectProjectMonitor} />
                     </div>
                     <div className="section">
                       <Select multi simpleValue value={this.state.projectMembers} options={this.state.options} placeholder="Select Members"  onChange={this.handleSelectProjectMember} />
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