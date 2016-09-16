/**
 * Created by NetCenter-305 on 2016/7/7.
 */
import React from 'react'
import NavLink from './../NavLink'
export default React.createClass({
    handleClick:function(event){
        sessionStorage.setItem('projectDays', "7");
    },
    handleClick15:function(event){
        sessionStorage.setItem('projectDays', "15");
    },
    handleClick30:function(event){
        sessionStorage.setItem('projectDays', "30");
    },
    handleClick60:function(event){
        sessionStorage.setItem('projectDays', "60");
    },
    handleClick120:function(event){
        sessionStorage.setItem('projectDays', "120");
    },
    handleClick180:function(event){
        sessionStorage.setItem('projectDays', "180");
    },
    render() {
        return (
            <div className="allMembers">
                <ul>
                    <li onClick={this.handleClick}><NavLink to="/lastSevenDays">LATEST 7 DAYS</NavLink></li>
                    <li onClick={this.handleClick15}><NavLink to="/lastFifteenDays" >LATEST 15 DAYS</NavLink></li>
                    <li onClick={this.handleClick30}><NavLink to="/lastMonth">LATEST 30 DAYS</NavLink></li>
                    <li onClick={this.handleClick60}><NavLink to="/lastTwoMonths">LATEST 60 DAYS</NavLink></li>
                    <li onClick={this.handleClick120}><NavLink to="/lastFourMonths">LATEST 120 DAYS</NavLink></li>
                    <li onClick={this.handleClick180}><NavLink to="/lastSixMonths">LATEST 180 DAYS</NavLink></li>
                </ul>
                {this.props.children}
            </div>

        )
    }
})
