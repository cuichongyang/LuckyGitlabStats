using LuckyGitlabStatWebAPI.DAO;
using LuckyGitlabStatWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LuckyGitlabStatWebAPI.Controllers
{
    public class SingleController : ApiController
    {
        //连接azure数据库
        ConnectDB conncetdb = new ConnectDB();

        //连接本地数据库
        ConnectLocalSQL connectLocaldb = new ConnectLocalSQL();

        MemberCommit memberCommit = new MemberCommit();
        Member member = new Member();
        List<Member> members = new List<Member>();

        //项目提交总量
        int pushTotalOfProject;
        int[] num = new int[181];
        int total;//提交总次数
        double rate;//正确率
        public SingleController()
        {
            /* Empty */
        }
        /// <summary>
        /// 查询获取个人信息
        /// </summary>
        /// <param name="username">用户名</param>
        /// <returns></returns>
        public Member GetSingleInfo(string username)
        {
            //连接本地数据库
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT * FROM Member where UserName=" + "'" + username + "'"; 
            SqlDataReader singleInfoReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (singleInfoReader.Read())
            {
                member.username = singleInfoReader["UserName"].ToString().Trim();
                member.password = singleInfoReader["Password"].ToString().Trim();
                member.email = singleInfoReader["Email"].ToString().Trim();
                member.sex = singleInfoReader["Sex"].ToString().Trim();
            }
            //关闭查询
            singleInfoReader.Close();
            //关闭数据库连接
            conn.Close();
            //try
            //{
            //    SqlConnectionStringBuilder connString2Builder = conncetdb.ConnectDataBase();
            //    using (SqlConnection conn = new SqlConnection(connString2Builder.ToString()))
            //    {
            //        using (SqlCommand command = conn.CreateCommand())
            //        {
            //            conn.Open();
            //            //查询语句
            //            command.CommandText = "SELECT * FROM Member where UserName=" + "'" + username + "'";
            //            using (SqlDataReader reader = command.ExecuteReader())
            //            {
            //                // 若是查询数据有多行，循环读取输出 
            //                while (reader.Read())
            //                {
            //                    member.username = reader["UserName"].ToString().Trim();
            //                    member.password = reader["Password"].ToString().Trim();
            //                    member.email = reader["Email"].ToString().Trim();
            //                    member.sex = bool.Parse(reader["Sex"].ToString().Trim());
            //                    members.Add(member);
            //                }
            //            }
            //            conn.Close();
            //        }
            //    }
            //    return member;
            //}
            //catch (SqlException e)
            //{
            //    Console.WriteLine("查询异常");
            //    // MessageBox.Show("查询异常");
            //}
            return member;
        }
        /// <summary>
        /// 查询个人一段时间内编译成功总次数
        /// </summary>
        /// <param name="username">用户</param>
        /// <param name="queryDate">查询天数</param>
        /// <returns>memberCommit</returns>
        public int GetSuccessTotal_Personally_ByLongTime(string username, int queryDays)
        {
            //以当前日作第一天，0代表今天
            queryDays--;

            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT  COUNT(Result) as result FROM MemberCommit where UserName=" + "'" + username + "'AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111)  AND  Result=1 ";
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
            //SqlConnectionStringBuilder connString2Builder = conncetdb.ConnectDataBase();
            //using (SqlConnection conn = new SqlConnection(connString2Builder.ToString()))
            //{
            //    using (SqlCommand command = conn.CreateCommand())
            //    {
            //        conn.Open();
            //        command.CommandText = "SELECT  COUNT(Result) as result FROM MemberCommit where UserName=" + "'" + username + "'AND getdate()-" + queryDays + "<=CommitTime AND  Result=1 ";
            //        using (SqlDataReader reader = command.ExecuteReader())
            //        {
            //            // Loop over the results 
            //            while (reader.Read())
            //            {
            //                memberCommit.projectTotal = reader["result"].ToString().Trim();
            //                total = int.Parse(memberCommit.projectTotal);
            //            }
            //        }
            //        conn.Close();
            //    }
            //}
            return total;
        }
        /// <summary>
        /// 查询个人一段时间内编译总次数
        /// </summary>
        /// <param name="username">用户</param>
        /// <param name="queryDate">查询天数</param>
        /// <returns>memberCommit</returns>
        public int GetBuildTotal_personally_ByLongTime(string username, int queryDays)
        {
            //以当前日作第一天，0代表今天
            queryDays--;

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
                total = int.Parse(memberCommit.projectTotal);
            }
            //关闭查询
            getTotalCommitTimesReader.Close();
            //关闭数据库连接
            conn.Close();
            //SqlConnectionStringBuilder connString2Builder = conncetdb.ConnectDataBase();
            //using (SqlConnection conn = new SqlConnection(connString2Builder.ToString()))
            //{
            //    using (SqlCommand command = conn.CreateCommand())
            //    {
            //        conn.Open();
            //        command.CommandText = "SELECT  COUNT(Result) as result FROM MemberCommit where UserName=" + "'" + username + "'AND getdate()-" + queryDays + "<=CommitTime AND  Result=1 ";
            //        using (SqlDataReader reader = command.ExecuteReader())
            //        {
            //            // Loop over the results 
            //            while (reader.Read())
            //            {
            //                memberCommit.projectTotal = reader["result"].ToString().Trim();
            //                total = int.Parse(memberCommit.projectTotal);
            //            }
            //        }
            //        conn.Close();
            //    }
            //}
            return total;
        }
        /// <summary>
        /// 查询个人一段时间内总提交次数
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="queryDays">查询天数</param>
        /// <returns>总次数</returns>
        public int GetPushTotal_personally_ByLongTime(string username, int queryDays)
        {
            //以当前日作第一天，0代表今天
            queryDays--;
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT  COUNT(Version) as result FROM MemberCommitBeforeCompiling where UserName=" + "'" + username + "'AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111)  ";
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
            //try
            //{
            //    SqlConnectionStringBuilder connString2Builder = conncetdb.ConnectDataBase();
            //    using (SqlConnection conn = new SqlConnection(connString2Builder.ToString()))
            //    {
            //        using (SqlCommand command = conn.CreateCommand())
            //        {
            //            conn.Open();
            //            command.CommandText = "SELECT  COUNT(Result) as result FROM MemberCommit where UserName=" + "'" + username + "'AND getdate()-" + queryDays + "<=CommitTime ";

            //            using (SqlDataReader reader = command.ExecuteReader())
            //            {
            //                // Loop over the results 
            //                while (reader.Read())
            //                {
            //                    //string s = reader.ToString();
            //                    total = int.Parse(memberCommit.projectTotal = reader["Result"].ToString().Trim());
            //                }
            //            }
            //            conn.Close();
            //        }
            //    }
            //}
            //catch (SqlException e)
            //{
            //    Console.WriteLine("查询异常");
            //}
            return total;
        }
        /// <summary>
        /// 获取个人每天提交的次数
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="queryDays">查询天数</param>
        /// <returns>每天提交次数,以日期为天数，日期从小到大排列</returns>
        public List<int> GetCommitTotal_Personally_ByDay(string username, int queryDays)
        {
            List<int> list = new List<int>();
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();

            for (int i = 0; i < queryDays; i++)
            {
                querySingleInfo.CommandText = "SELECT COUNT(*) as times FROM MemberCommitBeforeCompiling where UserName=" + "'" + username + "'AND DATEADD(d,-" + i + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111) ";

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
            if (queryDays > 1)
            {
                for (int i = 1; i < queryDays; i++)
                {
                    list.Add(num[i] - num[i - 1]);
                }
            }
            list.Reverse();
            //关闭数据库连接
            conn.Close();
            return list;
        }
        /// <summary>
        /// 获取个人每天编译的次数
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="queryDays">查询天数</param>
        /// <returns>每天编译次数,以日期为天数，日期从小到大排列</returns>
        public List<int> GetBuildTotal_Personally_ByDay(string username, int queryDays)
        {
            List<int> list = new List<int>();
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();

            for (int i = 0; i < queryDays; i++)
            {
                querySingleInfo.CommandText = "SELECT COUNT(*) as times FROM MemberCommit where UserName=" + "'" + username + "'AND DATEADD(d,-" + i + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111)  ";

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
            if (queryDays > 1)
            {
                for (int i = 1; i < queryDays; i++)
                {
                    list.Add(num[i] - num[i - 1]);
                }
            }
            list.Reverse();
            //关闭数据库连接
            conn.Close();
            return list;
        }
        /// <summary>
        /// 获取个人每天编译成功次数
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="queryDays">查询天数</param>
        /// <returns>数组list,每天编译成功次数,以日期为天数，日期从小到大排列</returns>
        public List<int> GetSuccessTotal_Personally_ByDay(string username, int queryDays)
        {

            List<int> list = new List<int>();
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();

            for (int i = 0; i < queryDays; i++)
            {
                querySingleInfo.CommandText = "SELECT COUNT(*) as times FROM MemberCommit where UserName=" + "'" + username + "'AND DATEADD(d,-" + i + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111)  and result=1";

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
            if (queryDays > 1)
            {
                for (int i = 1; i < queryDays; i++)
                {
                    list.Add(num[i] - num[i - 1]);
                }
            }
            list.Reverse();
            //关闭数据库连接
            conn.Close();
            return list;
        }
        /// <summary>
        /// 查询个人每天提交成功率     //需修改  小数取整错误
        /// </summary>s
        /// <param name="username">用户</param>
        /// <param name="queryDays">查询天数</param>
        /// <returns>正确率</returns>
        public List<double> GetRate_Personlly(string username, int queryDays)
        {
            List<int> successList = new List<int>();//编译成功次数
            List<int> totalList = new List<int>();//编译总次数
            List<double> listrate = new List<double>();
            double success, total;

            try
            {  //获取每个人一段时间内的每天编译成功总次数
                successList = GetSuccessTotal_Personally_ByDay(username, queryDays);
                //获取每个人一段时间内每天编译总次数
                totalList = GetBuildTotal_Personally_ByDay(username, queryDays);
                //计算成功率
                for (int i = 0; i < queryDays; i++)
                {
                    if (totalList[i] == 0 || successList[i] == 0)
                        rate = 0.0;
                    else
                    {
                        success = Convert.ToDouble(successList[i]);
                        total = Convert.ToDouble(totalList[i]);
                        rate = success / total;
                        rate = Convert.ToDouble(rate.ToString("0.00"));
                    }
                    listrate.Add(rate);//按照时间排序
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("查询异常");
            }
            return listrate;
        }
        /// <summary>
        /// 获取一段时间内编译数据详细信息
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="queryDays">查询日期</param>
        /// <returns>返回版本号，项目名，编译时间，编译结果，编译时间</returns>
        public List<MemberCommit> GetDataForTable(string username, int queryDays)
        {
            //以当前日作第一天，0代表今天
            queryDays--;
            List<MemberCommit> memberCommits = new List<MemberCommit>();
            try
            {
                //连接本地数据库
                SqlConnection conn = connectLocaldb.ConnectDataBase();
                //打开数据库
                conn.Open();
                //创建查询语句
                SqlCommand querySingleInfo = conn.CreateCommand();
                querySingleInfo.CommandText = "SELECT Version, ProjectName, committime, Result, spendtime,branch FROM MemberCommit  where UserName=" + "'" + username + "'AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), CommitTime, 111)  order by committime desc";
                SqlDataReader singleInfoReader = querySingleInfo.ExecuteReader();
                //有多行数据，用while循环
                while (singleInfoReader.Read())
                {
                    MemberCommit memberCommitInfo = new MemberCommit();
                    memberCommitInfo.version = singleInfoReader["Version"].ToString().Trim();
                    memberCommitInfo.projectname = singleInfoReader["ProjectName"].ToString().Trim();
                    memberCommitInfo.committime = singleInfoReader["committime"].ToString().Trim();
                    memberCommitInfo.projectResult = singleInfoReader["Result"].ToString().Trim();
                    memberCommitInfo.spendtime = singleInfoReader["spendtime"].ToString().Trim();
                    memberCommitInfo.branch=singleInfoReader["spendtime"].ToString().Trim();
                    memberCommitInfo.branch= singleInfoReader["branch"].ToString().Trim();
                    memberCommits.Add(memberCommitInfo);
                }
                //关闭查询
                singleInfoReader.Close();
                //关闭数据库连接
                conn.Close();
            }
            catch { return memberCommits; }
            //try
            //{
            //    SqlConnectionStringBuilder connString2Builder = conncetdb.ConnectDataBase();
            //    using (SqlConnection conn = new SqlConnection(connString2Builder.ToString()))
            //    {
            //        using (SqlCommand command = conn.CreateCommand())
            //        {
            //            conn.Open();
            //            command.CommandText = "SELECT Version, ProjectName, committime, Result, spendtime FROM MemberCommit  where UserName=" + "'" + username + "'AND getdate()+'8:00:00'-" + queryDays + "<=CommitTime order by committime desc";
            //            //ExecuteReader()：将 CommandText 发送到 Connection，并生成 SqlDataReader。
            //            using (SqlDataReader reader = command.ExecuteReader())
            //            {
            //                // Loop over the results 
            //                while (reader.Read())//SqlDataReader到下一个记录
            //                {
            //                    MemberCommit memberCommitInfo = new MemberCommit();
            //                    memberCommitInfo.version = reader["Version"].ToString().Trim();
            //                    memberCommitInfo.projectname = reader["ProjectName"].ToString().Trim();
            //                    memberCommitInfo.committime = reader["committime"].ToString().Trim();
            //                    memberCommitInfo.projectResult = reader["Result"].ToString().Trim();
            //                    memberCommitInfo.spendtime = reader["spendtime"].ToString().Trim();
            //                    memberCommits.Add(memberCommitInfo);
            //                }
            //            }
            //            conn.Close();
            //        }
            //    }
            //}
            //catch (SqlException e)
            //{
            //    Console.WriteLine("查找异常");
            //}
            return memberCommits;
        }
        /// <summary>
        /// 获取个人issue信息
        /// </summary>
        /// <param name="username"></param>
        /// <param name="queryDays"></param>
        /// <returns></returns>
        public List<IssueEvent> getDataForIssueTable(string username,int queryDays)
        {
            //以当前日作第一天，0代表今天
            queryDays--;
            List<IssueEvent> memberIssues = new List<IssueEvent>();
            try
            {
                //连接本地数据库
                SqlConnection conn = connectLocaldb.ConnectDataBase();
                //打开数据库
                conn.Open();
                //创建查询语句
                SqlCommand querySingleInfo = conn.CreateCommand();
                querySingleInfo.CommandText = "SELECT issueid, Issue, ProjectName, Initiator, Assignee, Starttime,Updatetime,state FROM MemberIssue  where Assignee=" + "'" + username + "'AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <= CONVERT(varchar(12), starttime, 111)  group by  issueid, Issue, ProjectName, Initiator, Assignee, Starttime,Updatetime,state order by  Issue desc";
                SqlDataReader singleInfoReader = querySingleInfo.ExecuteReader();
                //有多行数据，用while循环
                while (singleInfoReader.Read())
                {
                    IssueEvent memberIssue = new IssueEvent();
                    memberIssue.issueid = singleInfoReader["issueid"].ToString().Trim();
                    memberIssue.object_attributes.assignee_id = singleInfoReader["Issue"].ToString().Trim();
                    memberIssue.project.name = singleInfoReader["ProjectName"].ToString().Trim();
                    memberIssue.object_attributes.created_at = singleInfoReader["Starttime"].ToString().Trim();
                    memberIssue.object_attributes.updated_at = singleInfoReader["Updatetime"].ToString().Trim();
                    memberIssue.user.username = singleInfoReader["Initiator"].ToString().Trim();
                    memberIssue.assignee.username = singleInfoReader["Assignee"].ToString().Trim();
                    memberIssue.object_attributes.state = singleInfoReader["state"].ToString().Trim();

                    memberIssues.Add(memberIssue);
                }
                //关闭查询
                singleInfoReader.Close();
                //关闭数据库连接
                conn.Close();
            }
            catch(SqlException e)
            {
                return memberIssues;
            }
            return memberIssues;
        }
        /// <summary>
        /// 获取个人指定项目提交总量
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="projectname">项目名</param>
        /// <param name="queryDays">查询日期</param>
        /// <returns></returns>
        public int GetPushNumberOfProjectByLongTime(string username,string projectname,int queryDays)
        {
            queryDays--;
            //连接本地数据库
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT count(commitid) as times  FROM MemberCommitBeforeCompiling,member where MemberCommitBeforeCompiling.UserName="+"'"+username+"'  and MemberCommitBeforeCompiling.ProjectName="+"'"+ projectname + "' and MemberCommitBeforeCompiling.username=Member.Username  AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <=CONVERT(varchar(12), CommitTime, 111)"; 
            SqlDataReader singleInfoReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (singleInfoReader.Read())
            {
                pushTotalOfProject = int.Parse(singleInfoReader["times"].ToString().Trim());
            }
            //关闭查询
            singleInfoReader.Close();
            //关闭数据库连接
            conn.Close();
            return pushTotalOfProject;
        }
        /// <summary>
        /// 获取个人指定项目编译总量
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="projectname">项目名</param>
        /// <param name="queryDays">查询日期</param>
        /// <returns></returns>
        public int GetBuildNumberOfProjectByLongTime(string username, string projectname, int queryDays)
        {
            queryDays--;
            //连接本地数据库
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT count(commitid) as times  FROM MemberCommit,member where MemberCommit.UserName=" + "'" + username + "'  and MemberCommit.ProjectName like " + "'%" + projectname + "%' and MemberCommit.username=Member.Username  AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <=CONVERT(varchar(12), CommitTime, 111)";
            SqlDataReader singleInfoReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (singleInfoReader.Read())
            {
                pushTotalOfProject = int.Parse(singleInfoReader["times"].ToString().Trim());
            }
            //关闭查询
            singleInfoReader.Close();
            //关闭数据库连接
            conn.Close();
            return pushTotalOfProject;
        }
        /// <summary>
        /// 获取个人指定项目编译成功总量
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="projectname">项目名</param>
        /// <param name="queryDays">查询日期</param>
        /// <returns></returns>
        public int GetBuildSuccessNumberOfProjectByLongTime(string username, string projectname, int queryDays)
        {
            queryDays--;
            //连接本地数据库
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT count(commitid) as times  FROM MemberCommit,member where MemberCommit.UserName=" + "'" + username + "'  and MemberCommit.ProjectName like " + "'%" + projectname + "%' and MemberCommit.username=Member.Username  AND DATEADD(d,-" + queryDays + ", CONVERT(varchar(12), getdate(), 111)) <=CONVERT(varchar(12), CommitTime, 111) and result=1";
            SqlDataReader singleInfoReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (singleInfoReader.Read())
            {
                pushTotalOfProject = int.Parse(singleInfoReader["times"].ToString().Trim());
            }
            //关闭查询
            singleInfoReader.Close();
            //关闭数据库连接
            conn.Close();
            return pushTotalOfProject;
        }
    }
}
