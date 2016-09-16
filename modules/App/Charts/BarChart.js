import React from 'react';
import  ReactD3 from 'react-d3-components'


var BarChart = ReactD3.BarChart;

var colorScale = d3.scale.category20();
var resultTotal=[];
var resultSuccess=[];
var dataFail=[];
var dataSuccess=[];
var data=[];
var username,oldDays;

export default React.createClass({
    getInitialState: function () {
        username = sessionStorage.getItem('username');
        oldDays = sessionStorage.getItem('days');
        alert('days: '+oldDays);
        return null;
    },
    componentWillMount: function () {
        this.dataGetTotal();
        this.dataGetSuccess();
        this.dataTotalForeach();
    },
    componentWillUpdate:function(){
        //判断天数是否改变，若改变则重新赋值,且重新渲染
        if(sessionStorage.getItem('days')!=oldDays){
            oldDays=sessionStorage.getItem('days');
            this.componentWillMount();
        }
    },
    //获取个人每天编译总次数
    dataGetTotal: function () {
        $.ajax({
            url:'http://202.196.96.79:1500/api/Single/GetBUildTotal_personally_ByLongTime',
            data:{username: username, queryDays:  oldDays},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                resultTotal = data;
            },
            error : function() {
                alert("dataGetTotal异常！");
            }
        });
    },
    //获取个人每天编译成功次数
    dataGetSuccess: function () {
        $.ajax({
            url:'http://202.196.96.79:1500/api/Single/GetSuccessTotal_Personally_ByDay',
            data:{username: username, queryDays: oldDays},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                resultSuccess=data;
            },
            error : function() {
                alert("dataGetSuccess异常！");
            }
        });
    },
     dataTotalForeach: function () {
        var now = new Date();       //获取当前时间
        var date = now.toLocaleDateString();        //将当前时间保留到日
        var timestamp = Date.parse(new Date(date));     //将当前时间转换为时间戳
        var inverseDate=[];
        for(var i = 0; i < oldDays; i++){
            if (i == 0) {
                inverseDate[i] = timestamp;
            }
            else {
                inverseDate[i] = inverseDate[i - 1] - 1000 * 60 * 60 * 24;
            }
        }
        var positiveDate = inverseDate.reverse();
             //将获取的时间反转
        if(oldDays==7){
            for(var j = 0; j < oldDays; j++){
                dataSuccess[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,10), y: resultSuccess[j]};
                dataFail[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,10), y: resultTotal[j]-resultSuccess[j]};
            }
         }
        if(oldDays==15){

            for(var j = 0; j < oldDays; j++){
                dataSuccess[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,10), y: resultSuccess[j]};
                dataFail[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,10), y: resultTotal[j]-resultSuccess[j]};
            }
         }
        if(oldDays==30){
            var j = 0;
            var str=" ";
            var trim="";
            for(; j < oldDays; j++){
                if((j+1)%2==0){
                    dataSuccess[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,10), y: resultSuccess[j]};
                    dataFail[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,10), y:resultTotal[j]-resultSuccess[j]};
                }
                else{
                    trim=trim+str;

                    dataSuccess[j] = {x:trim, y: resultSuccess[j]};
                    dataFail[j] = {x:trim, y: resultTotal[j]-resultSuccess[j]};

                }
        }
        }
        if(oldDays==60){
             var j = 0;
             var str=" ";
             var trim="";
             for(; j < oldDays; j++){
                 if((j+1)%4==0){
                     dataSuccess[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,10), y: resultSuccess[j]};
                     dataFail[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,10), y:resultTotal[j]-resultSuccess[j]};
                 }
                 else{
                     trim=trim+str;
                     dataSuccess[j] = {x:trim, y: resultSuccess[j]};
                     dataFail[j] = {x:trim, y: resultTotal[j]-resultSuccess[j]};
                 }
             }
         }
        if(oldDays==120){
             var j = 0;
             var str=" ";
             var trim="";
             for(; j < oldDays; j++){
                 if((j+1)%8==0){
                     dataSuccess[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,10), y: resultSuccess[j]};
                     dataFail[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,10), y:resultTotal[j]-resultSuccess[j]};
                 }
                 else{
                     trim=trim+str;

                     dataSuccess[j] = {x:trim, y: resultSuccess[j]};
                     dataFail[j] = {x:trim, y: resultTotal[j]-resultSuccess[j]};

                 }
             }
         }
        if(oldDays==180){
             var j = 0;
             var str=" ";
             var trim="";
             for(; j < oldDays; j++){
                 if(new Date(positiveDate[j]).toDateString().substring(8,10)=="01"){
                     dataSuccess[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,8), y: resultSuccess[j]};
                     dataFail[j] = {x: new Date(positiveDate[j]).toDateString().substring(4,8), y:resultTotal[j]-resultSuccess[j]};
                 }
                 else{
                     trim=trim+str;
                     dataSuccess[j] = {x:trim, y: resultSuccess[j]};
                     dataFail[j] = {x:trim, y: resultTotal[j]-resultSuccess[j]};
                 }
             }
         }
         data=[{label: 'somethingA',values: dataSuccess}, {label: 'somethingB',values: dataFail}];
        dataSuccess=[];
        dataFail=[];
    },

    render(){
        return (
            <div id="outer">
                <div className="ribbon">
                    <span className="ribbon3">Times of build per day</span>
                </div>
                <div id="remind">
                    <div id="textSuccess">Success:</div>
                    <div id="remindSuccess"></div>
                    <div id="textFail">Failure:</div>
                    <div id="remindFail"></div>
                </div>
                <BarChart
                    data={data}
                    width={850}
                    height={390}
                    margin={{top: 10, bottom: 50, left: 50, right: 30}}
                    colorScale={colorScale}
                    xAxis={{innerTickSize: 1,outerTickSize: 0,className: "axis"}}
                    yAxis={{label: "times"}}
                />
            </div>
        )
    }
})

