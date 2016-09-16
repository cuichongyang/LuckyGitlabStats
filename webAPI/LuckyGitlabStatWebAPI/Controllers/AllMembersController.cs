using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LuckyGitlabStatWebAPI.DAO;
using LuckyGitlabStatWebAPI.Models;
using System.Data.SqlClient;

namespace LuckyGitlabStatWebAPI.Controllers
{
    public class AllMemberController : ApiController
    {
        //所有成员的数据
        string returndata;
        //成员提交总量
        int pushNumber = 0;
        //成员编译总量
        int buildNumber;
        //编译成功总量
        int buildSuccess;
        //编译成功率
        double successRate = 0.00;
        RootController root = new RootController();
        SingleController single = new SingleController();
        //连接本地数据库
        ConnectLocalSQL connectLocaldb = new ConnectLocalSQL();

        /// <summary>
        /// 查询所有人一段时间内总提交次数
        /// </summary>
        /// <param name="queryDays">查询天数</param>
        /// <returns>总次数</returns>
        public int GetPushTotal_AllMember_ByLongTime(int queryDays)
        {
            int total = 0;//提交总次数
            MemberCommit memberCommit = new MemberCommit();
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT  COUNT(Commitid) as result FROM MemberCommitBeforeCompiling where  DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111)  ";
            SqlDataReader getTotalCommitTimesReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (getTotalCommitTimesReader.Read())
            {
                memberCommit.projectTotal = getTotalCommitTimesReader["result"].ToString().Trim();
                total = int.Parse(memberCommit.projectTotal);
            }
            //关闭查询
            getTotalCommitTimesReader.Close();
            //关闭数据库连接
            conn.Close();

            return total;
        }
       
        /// <summary>
        /// 查询所有人一段时间内总编译次数
        /// </summary>
        /// <param name="queryDays">查询天数</param>
        /// <returns>总次数</returns>
        public int GetBuildTotal_AllMember_ByLongTime(int queryDays)
        {
            int total = 0;//提交总次数
            MemberCommit memberCommit = new MemberCommit();
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT  COUNT(Commitid) as result FROM MemberCommit where AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111)  ";
            SqlDataReader getTotalCommitTimesReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (getTotalCommitTimesReader.Read())
            {
                memberCommit.projectTotal = getTotalCommitTimesReader["result"].ToString().Trim();
                total = int.Parse(memberCommit.projectTotal);
            }
            //关闭查询
            getTotalCommitTimesReader.Close();
            //关闭数据库连接
            conn.Close();

            return total;
        }
       
        /// <summary>
        /// 查询所有人一段时间内总编译成功次数
        /// </summary>
        /// <param name="queryDays">查询天数</param>
        /// <returns>总次数</returns>
        public int GetBuildSuccess_AllMember_ByLongTime(int queryDays)
        {
            int total = 0;//提交总次数
            MemberCommit memberCommit = new MemberCommit();
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT  COUNT(Commitid) as result FROM MemberCommit where AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111) and result=1";
            SqlDataReader getTotalCommitTimesReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (getTotalCommitTimesReader.Read())
            {
                memberCommit.projectTotal = getTotalCommitTimesReader["result"].ToString().Trim();
                total = int.Parse(memberCommit.projectTotal);
            }
            //关闭查询
            getTotalCommitTimesReader.Close();
            //关闭数据库连接
            conn.Close();

            return total;
        }
       
        /// <summary>
        /// 返回提交数据分析
        /// </summary>
        /// <returns></returns>
        public string GetAllData()
        {
            //成员提交量
            pushNumber = GetPushTotal_AllMember_ByLongTime(7);
            //成员编译量
            buildNumber = GetBuildTotal_AllMember_ByLongTime(7);
            //成员编译成功量
            buildSuccess = GetBuildSuccess_AllMember_ByLongTime(7);
            //编译成功率
            if (pushNumber == 0 || buildNumber == 0 || buildSuccess == 0)
                successRate = 0.00;
            else
            {
                successRate = Convert.ToDouble(buildSuccess) / Convert.ToDouble(buildNumber);
                //保留4位小数
                successRate = Math.Round(successRate, 4) * 100;
            }
            returndata = "一周内,共提交" + pushNumber + "次、编译" + buildNumber + "次、成功" + buildSuccess + "次，成功率为" + successRate + "%。";
            return returndata;
        }
       
        /// <summary>
        /// 获取所有人员一段时间每天提交的次数
        /// </summary>
        /// <param name="queryDays">查询天数</param>
        /// <returns>每天提交次数,以日期为天数，日期从小到大排列</returns>
        public List<int> GetCommitTotal_Personally_ByDay(int queryDays)
        {
            int[] num = new int[181];
            MemberCommit memberCommit = new MemberCommit();
            List<int> list = new List<int>();
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();

            for (int i = 0; i < queryDays; i++)
            {
                querySingleInfo.CommandText = "SELECT COUNT(*) as times FROM MemberCommitBeforeCompiling where  DATEADD(d,-" + i + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111)  ";

                using (SqlDataReader reader = querySingleInfo.ExecuteReader())
                {
                    // Loop over the results 
                    while (reader.Read())
                    {
                        memberCommit.times = reader["times"].ToString().Trim();
                        num[i] = int.Parse(memberCommit.times);
                    }
                }
            }
            list.Add(num[0]);
            for (int i = 1; i < queryDays; i++)
            {
                list.Add(num[i] - num[i - 1]);
            }
            list.Reverse();
            //关闭数据库连接
            conn.Close();
            return list;
        }

        /// <summary>
        /// 获取所有成员每人提交量
        /// </summary>
        /// <param name = "groupname" > 组名 </ param >
        /// < param name="queryday">查询日期</param>
        /// <returns>返回字典树类型(用户名，次数)的列表</returns>
        public Dictionary<string, int> GetMembersPushNumberByDays( int queryday)
        {
            //成员姓名，次数
            Dictionary<string, int> membersNumber = new Dictionary<string, int>();
            //成员姓名列表
            List<Member> memberList = root.GetAllUserInfo();
            for (int i = 0; i < memberList.Count(); i++)
            {
                //调用Single方法，赋值给num
                int num = single.GetPushTotal_personally_ByLongTime(memberList[i].username, queryday);
                //结果加入字典树
                string name = memberList[i].username;
                membersNumber.Add(name, num);
            }
            return membersNumber;
        }

        /// <summary>
        /// 获取小组成员每人编译量
        /// </summary>
        /// <param name = "groupname" > 组名 </ param >
        /// < param name="queryday">查询日期</param>
        /// <returns>返回字典树类型(用户名，次数)的列表</returns>
        public Dictionary<string, int> GetMembersBuildNumberByLongtime( int queryday)
        {
            //成员姓名，次数
            Dictionary<string, int> membersNumber = new Dictionary<string, int>();
            //成员姓名列表
            List<Member> memberList = root.GetAllUserInfo();
            for (int i = 0; i < memberList.Count(); i++)
            {
                //调用Single方法，赋值给num
                int num = single.GetBuildTotal_personally_ByLongTime(memberList[i].username, queryday);
                //结果加入字典树
                string name = memberList[i].username;
                membersNumber.Add(name, num);
            }
            return membersNumber;
        }
 
        /// <summary>
        /// 获取小组成员每人编译成功量
        /// </summary>
        /// <param name = "groupname" > 组名 </ param >
        /// < param name="queryday">查询日期</param>
        /// <returns>返回字典树类型(用户名，次数)的列表</returns>
        public Dictionary<string, int> GetMembersBuildSuccessNumberByDays( int queryday)
        {
            //成员姓名，次数
            Dictionary<string, int> membersNumber = new Dictionary<string, int>();
            //成员姓名列表
            List<Member> memberList = root.GetAllUserInfo();
            for (int i = 0; i < memberList.Count(); i++)
            {
                //调用Single方法，赋值给num
                int num = single.GetSuccessTotal_Personally_ByLongTime(memberList[i].username, queryday);
                //结果加入字典树
                string name = memberList[i].username;
                membersNumber.Add(name, num);
            }
            return membersNumber;
        }

    }
}

/*
  /// <summary>
        /// 个人一段时间内提交总次数
        /// </summary>
        /// <param name="username"></param>
        /// <param name="queryDays"></param>
        /// <returns></returns>
       public int CommitTimes_ByLongTime(string username, int queryDays)
        {
            int commitTimes = 0;
            MemberCommit memberCommit = new MemberCommit();
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT  COUNT(Version) as result FROM MemberCommitBeforeCompiling where UserName=" + "'" + username + "'AND AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111)  ";
            SqlDataReader getTotalCommitTimesReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (getTotalCommitTimesReader.Read())
            {
                memberCommit.projectTotal = getTotalCommitTimesReader["result"].ToString().Trim();
                commitTimes = int.Parse(memberCommit.projectTotal);
            }
            //关闭查询
            getTotalCommitTimesReader.Close();
            //关闭数据库连接
            conn.Close();
            return commitTimes;
        }
         /// <summary>
        /// 查询个人一段时间内编译总次数
        /// </summary>
        /// <param name="username">用户</param>
        /// <param name="queryDate">查询天数</param>
        /// <returns>memberCommit</returns> 
        public int BuildTimes_ByLongTime(string username, int queryDays)
        {
            int BuildTimes = 0;
            MemberCommit memberCommit = new MemberCommit();

            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT  COUNT(Result) as result FROM MemberCommit where UserName=" + "'" + username + "'AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111) ";
            SqlDataReader getTotalCommitTimesReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (getTotalCommitTimesReader.Read())
            {
                memberCommit.projectTotal = getTotalCommitTimesReader["result"].ToString().Trim();
                BuildTimes = int.Parse(memberCommit.projectTotal);
            }
            //关闭查询
            getTotalCommitTimesReader.Close();
            //关闭数据库连接
            conn.Close();

            return BuildTimes;
        }
       
        /// <summary>
        /// 查询个人一段时间内编译成功总次数
        /// </summary>
        /// <param name="username">用户</param>
        /// <param name="queryDate">查询天数</param>
        /// <returns>memberCommit</returns>
        public int BuildSuccessTimes_ByLongTime(string username, int queryDays)
        {

            int buildSuccessTimes = 0;
            MemberCommit memberCommit = new MemberCommit();

            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT  COUNT(Result) as result FROM MemberCommit where UserName=" + "'" + username + "'AND AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111)  AND  Result=1 ";
            SqlDataReader getTotalCommitTimesReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (getTotalCommitTimesReader.Read())
            {
                memberCommit.projectTotal = getTotalCommitTimesReader["result"].ToString().Trim();
                buildSuccessTimes = int.Parse(memberCommit.projectTotal);
            }
            //关闭查询
            getTotalCommitTimesReader.Close();
            //关闭数据库连接
            conn.Close();

            return buildSuccessTimes;
        }
   
     */
