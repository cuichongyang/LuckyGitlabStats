using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace LuckyGitlabStatWebAPI.Models
{
    public class Group
    {
        //public Group()
        //{
        //    GroupName = "";
        //    GroupMonitor= "";
        //    GroupMembers ="";
        //}
            /// <summary>
            /// 组名
            /// </summary>
            public string GroupName { set; get; }
            /// <summary>
            /// 组长
            /// </summary>
            public string GroupMonitor { set; get; }
            /// <summary>
            /// 小组成员
            /// </summary>
            public string GroupMembers { set; get; }     
    }
}