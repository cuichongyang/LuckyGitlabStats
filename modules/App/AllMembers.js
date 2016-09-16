/**
 * Created by NetCenter-305 on 2016/7/8.
 */
import React from 'react';
import NavLink from './../NavLink'

export default React.createClass({
   handleClick:function(event){
       sessionStorage.setItem('days', "7");
   },
   handleClick15:function(event){
       sessionStorage.setItem('days', "15");
   },
   handleClick30:function(event){
       sessionStorage.setItem('days', "30");
   },
    handleClick60:function(event){
        sessionStorage.setItem('days', "60");
    },
    handleClick120:function(event){
        sessionStorage.setItem('days', "120");
    },
    handleClick180:function(event){
        sessionStorage.setItem('days', "180");
    },
   render() {
       return (
            <div className="allMembers">
                <ul>
                    <li onClick={this.handleClick}><NavLink to="/allLastSevenDays">LATEST 7 DAYS</NavLink></li>
                    <li onClick={this.handleClick15}><NavLink to="/allLastFifteenDays" >LATEST 15 DAYS</NavLink></li>
                    <li onClick={this.handleClick30}><NavLink to="/allLastMonth">LATEST 30 DAYS</NavLink></li>
                    <li onClick={this.handleClick60}><NavLink to="/allLastTwoMonths">LATEST 60 DAYS</NavLink></li>
                    <li onClick={this.handleClick120}><NavLink to="/allLastFourMonths">LATEST 120 DAYS</NavLink></li>
                    <li onClick={this.handleClick180}><NavLink to="/allLastSixMonths">LATEST 180 DAYS</NavLink></li>
                </ul>
            </div>
        )
    }
})



