using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LuckyGitlabStatWebAPI.Models
{
    public class MemberCommit
    {
        /// <summary>
        /// 提交ID
        /// </summary>
        public string commitId { set; get; }
        /// <summary>
        /// 用户名
        /// </summary>
        public string username { set; get; }
        /// <summary>
        /// 项目运行时间
        /// </summary>
        public string spendtime { set; get; }
        /// <summary>
        /// 项目开始时间
        /// </summary>
        public string starttime { set; get; }
        /// <summary>
        /// 项目结束时间
        /// </summary>
        public string endtime { set; get; }
        /// <summary>
        /// 项目运行结果
        /// </summary>
        public string projectResult { set; get; }
        /// <summary>
        /// 小组名
        /// </summary>
        public string groupname { set; get; }
        /// <summary>
        /// 项目版本号
        /// </summary>
        public string version { set; get; }
        /// <summary>
        /// 提交时间
        /// </summary>
        public string committime { set; get; }
        /// <summary>
        /// 提交次数
        /// </summary>
        public string times { set; get; }
        /// <summary>
        /// 项目名字
        /// </summary>
        public string projectname { set; get; }
        /// <summary>
        /// 查询前的提交次数
        /// </summary>
        public string projectTotal { set; get; }
        /// <summary>
        /// 个人成功率
        /// </summary>
        public string personalRate { set; get; }
        /// <summary>
        /// 组内个人成功率
        /// </summary>
        public string groupRate { set; get; }
        /// <summary>
        /// 分支
        /// </summary>
        public string branch { set; get; }
    }
}