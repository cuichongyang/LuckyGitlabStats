/**
 * Created by NetCenter-305 on 2016/5/29.
 */
import React from 'react'
import Type from '../App/Type'

export default React.createClass({

    render() {
        return(<div id="header_title">
            <div className="header_local">HDDevTeam LuckyGitlabStat</div>
            <div id="header_menu">
                <Type/>
            </div>
        </div>)
    }
})

