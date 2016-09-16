/**
 * Created by Xin on 2016/7/11.
 */
import React from 'react';
import rd3 from 'react-d3';

//饼图
var PieChart = rd3.PieChart;
var pieData;                  //饼图数据
var resultAll;                //一段时间内所有人提交总次数
var resultSingle;             //一段时间内个人人提交总次数
var singleRate;               //一段时间内个人人提交量占总提交量的比重
var othersRate;               //一段时间内个其他人提交量占总提交量的比重
var username;                 //用户名
var days;                     //一段时间的天数

export default React.createClass({
    getInitialState: function () {
        username = sessionStorage.getItem('username');
        days = sessionStorage.getItem('days');
        return null;
    },
    shouldComponentUpdate: function () {
        //判断天数是否改变，若改变则重新赋值
        if(sessionStorage.getItem('days') != days){
            days = sessionStorage.getItem('days');
            return true;
        }
        else return false;
    },
    //重新渲染
    componentWillUpdate: function () {
        this.componentWillMount();
    },
    componentWillMount: function () {
        this.PieChartSingleGet();
        this.PieChartAllGet();
        singleRate = (resultSingle / resultAll) * 100;
        othersRate = 100 - singleRate;
        pieData = [{label: "singleTimes", value: singleRate.toFixed(2)}, {label: "othersTimes", value: othersRate.toFixed(2)}];
        singleRate = 0;
        othersRate = 0;
    },
    PieChartAllGet: function () {
        $.ajax({
            url:'http://202.196.96.79:1500/api/AllMember/GetPushTotal_AllMember_ByLongTime',
            data:{queryDays: days},
            type:"get",
            cache:false,
            async: false,
            dataType:'json',
            success: function (data) {
                resultAll = data;
            },
            error : function() {
                alert("PieChartAllGet failed to get data!");
            }
        });
    },
    PieChartSingleGet: function () {
        $.ajax({
            url: 'http://202.196.96.79:1500/api/single/GetPushTotal_personally_ByLongTime',
            data: {username: username, queryDays: days},
            type: "get",
            cache: false,
            async: false,
            dataType: 'json',
            success: function (data) {
                resultSingle = data;
            },
            error: function () {
                alert("PieChartSingleGet failed to get data!");
            }
        });
    },
    render(){
        return (
            <div className="pieChart_all">
                <div className="pieChart_title">
                    <span className="pieChart_text">The general information of commitment</span>
                </div>
                <div>
                    <PieChart
                        data={pieData}
                        tooltipOffset={{top: 175, left: 200}}
                        tooltipMode={'fixed'}
                        sort={null}
                        width={450}
                        height={500}
                        radius={120}
                        innerRadius={0}
                        sectorBorderColor="white"
                    />
                </div>
            </div>
        )
    }
})
