using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LuckyGitlabStatWebAPI.Models
{
    public class Project
    {
        /// <summary>
        /// 项目名
        /// </summary>
        public string projectName { set; get; }
        /// <summary>
        /// 项目组长
        /// </summary>
        public string monitor { set; get; }
        /// <summary>
        /// 项目成员
        /// </summary>
        public string[] projectMembers { set; get; }
    }
}