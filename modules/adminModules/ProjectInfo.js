import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import NavLink from '../NavLink'
import AllMembers from '../App/AllMembers'
import SingleMember from '../App/SingleMember'
import AreaChart from '../App/Charts/AreaChart'
import PieChart from '../App/Charts/PieChart'
import IssueTable from '../App/IssueTable'

var projectName;
export default React.createClass({
    getInitialState: function () {
        projectName = sessionStorage.getItem('projectName');
        return null;
    },
    render() {
        return(
            <div className="projectInfo">
                <div id="projectInfo_header">
                    <div id="projectInfo_left">
                        <p className="projectInfo_title">{projectName}</p>
                    </div>
                    <div id="projectInfo_menu">
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <NavLink to="/singleproinfo" id="projectInfo_mem1"><MenuItem primaryText="Member1" /></NavLink>
                            <NavLink to="/singleproinfo"  id="projectInfo_mem2"><MenuItem primaryText="Member2" /></NavLink>
                        </IconMenu>
                    </div>
                </div>
                <SingleMember/>
                <div className="projectInfo_areaChart">
                    <div className="projectInfo_canvasLeft"><AreaChart/></div>
                    <div className="projectInfo_canvasRight"><AreaChart/></div>
                </div>
                <div className="projectInfo_pieChart">
                    <div className="projectInfo_canvasLeft"></div>
                    <div className="projectInfo_canvasRight"></div>
                </div>
                <div className="projectInfo_table"></div>
            </div>
        )
    }
})