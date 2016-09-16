/**
 * Created by Xin on 2016/8/5.
 */
import React from 'react';
import rd3 from 'react-d3-components';

var AreaChart = rd3.AreaChart;
var data = [];              //面积图数据
var returnSingleData=[];    //个人一段时间内每天的提交量
var returnAllData=[];       //所有人一段时间内每天的提交量
var username;               //登录用户名
var oldDays;                //一段时间的天数
var projectName;
var projectDays;
var temporaryDays;
var inverseDate=[];         //反序的一段时间的时间戳
var single=[];              //个人的数据
var all=[];                 //所有人的数据
var projectCommit=[];

export default React.createClass({
    getInitialState: function() {
        username = sessionStorage.getItem('username');
        oldDays = sessionStorage.getItem('days');
        projectName = sessionStorage.getItem('projectName');
        projectDays = sessionStorage.getItem('projectDays');
        return null;
    },
    componentWillMount: function () {
      /*  if(projectDays != sessionStorage.getItem('projectDays')){
            projectDays = sessionStorage.getItem('projectDays');
            alert('projectName: '+projectName+"   projectDays"+projectDays);
            this.projectDataGet();
        }
        else{*/
         //   oldDays=sessionStorage.getItem('days');
        
            this.userDataGet();
            this.forEach();
     //   }
    },
    componentWillUpdate:function(){
        //判断天数是否改变，若改变则重新赋值,且重新渲染
        if(sessionStorage.getItem('days')!=oldDays){
            this.componentWillMount();
        }
        if(sessionStorage.getItem('projectDays')!=projectDays){
            projectName = sessionStorage.getItem('projectName');
            oldDays = projectDays;
            this.componentWillMount();
        }
    },
    projectDataGet: function () {
        //获取某项目一段时间内每天的提交量
        $.ajax({
            url:'http://10.12.51.142:1500/api/Project/GetPushTotalOfProject_ByLongTime',
            data:{projectname: projectName, queryDays: projectDays},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                projectCommit = data;
                console.log('projectCommitDataGet:');
                console.log(projectCommit);
            },
            error : function() {
                alert("projectCommitDataGet异常！");
            }
        });
    },
    userDataGet: function () {
        //获取个人提交量
        $.ajax({
            url:'http://202.196.96.79:1500/api/Single/GetCommitTotal_Personally_ByDay',
            data:{username: username, queryDays: oldDays},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                returnSingleData = data;
            },
            error : function() {
                alert("areaSingleCommitDataGet异常！");
            }
        });
        //获取所有人提交量
        $.ajax({
            url:'http://202.196.96.79:1500/api/AllMember/GetCommitTotal_Personally_ByDay',
            data:{queryDays: oldDays},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                returnAllData = data;
            },
            error : function() {
                alert("areaAllCommitDataGet异常！");
            }
        });
    },
    forEach: function () {
        var now = new Date();                       //获取当前时间
        var date = now.toLocaleDateString();        //将当前时间保留到日
        var timestamp = Date.parse(new Date(date)); //将当前时间转换为时间戳
        //根据当前时间戳计算一段时间内每天的时间戳
        for(var i = 0; i < oldDays; i++){
            if (i == 0) {
                inverseDate[i] = timestamp;
            }
            else {
                inverseDate[i] = inverseDate[i - 1] - 1000 * 60 * 60 * 24;
            }
        }
        //将数据与时间对应
        for(var j = 0; j < oldDays; j++){
            single[j] = {x: new Date(inverseDate[oldDays-j-1]), y: returnSingleData[j]};
            all[j] = {x: new Date(inverseDate[oldDays-j-1]), y: returnAllData[j]};
        }
        data = [
            {label: 'single',values: single},
            {label: 'all',values: all}
        ];
        single = [];
        all = [];
    },
    render() {
        if(projectName != 'none'){
            projectName = 'none';
            return(
                <div>
                    <AreaChart id="AreaChart_chart"
                        data={data} 
                        width={500}
                        height={350}
                        margin={{top: 55, bottom: 50, left: 50, right: 30}}
                        xAxis={{innerTickSize: 0,tickPadding: 6, tickArguments: [7],tickFormat: d3.time.format("%b %d"),outerTickSize: 0,className: "axis"}}
                        yAxis={{label: "times"}}
                    />
                </div>
            )
        }
        else {
            //如果天数为7，限制横轴刻度数为7，否则默认刻度显示个数
            if (oldDays == 7) {
                for (var i = 0; i < oldDays; i++) {
                    single[i] = {x: new Date(inverseDate[oldDays - i - 1]), y: returnSingleData[i]};
                    all[i] = {x: new Date(inverseDate[oldDays - i - 1]), y: returnAllData[i]};
                }
                data = [
                    {label: 'single', values: single},
                    {label: 'all', values: all}
                ];
                oldDays = 0;
                single = [];
                all = [];
                return (
                    <div id="AreaChart_outer">
                        <div className="AreaChart_title"><span className="Area_text">Times of commitment per day</span>
                        </div>
                        <div>
                            <div className="AreaChart_single">
                                <div className="AreaChart_allLabel">person:</div>
                                <div className="AreaChart_saturated"></div>
                            </div>
                            <br/>
                            <div className="AreaChart_all">
                                <div className="AreaChart_singleLabel">all:</div>
                                <div className="AreaChart_shallow"></div>
                            </div>
                        </div>
                        <AreaChart id="AreaChart_chart"
                                   data={data}
                                   width={850}
                                   height={390}
                                   margin={{top: 10, bottom: 50, left: 50, right: 30}}
                                   xAxis={{innerTickSize: 0,tickPadding: 6, tickArguments: [7],tickFormat: d3.time.format("%b %d"),outerTickSize: 0,className: "axis"}}
                                   yAxis={{label: "times"}}
                        />
                    </div>
                )
            }
            else {
                return (
                    <div id="AreaChart_outer">
                        <div className="AreaChart_title"><span className="Area_text">Times of commitment per day</span>
                        </div>
                        <div>
                            <div className="AreaChart_single">
                                <div className="AreaChart_allLabel">person:</div>
                                <div className="AreaChart_saturated"></div>
                            </div>
                            <br/>
                            <div className="AreaChart_all">
                                <div className="AreaChart_singleLabel">all:</div>
                                <div className="AreaChart_shallow"></div>
                            </div>
                        </div>
                        <AreaChart id="AreaChart_chart"
                                   data={data}
                                   width={850}
                                   height={390}
                                   margin={{top: 10, bottom: 50, left: 50, right: 30}}
                                   xAxis={{innerTickSize: 0,tickPadding: 6,tickFormat: d3.time.format("%b %d"),outerTickSize: 0,className: "axis"}}
                                   yAxis={{label: "times"}}
                        />
                    </div>
                )
            }
        }
    }
})

