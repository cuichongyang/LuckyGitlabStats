using LuckyGitlabStatWebAPI.DAO;
using LuckyGitlabStatWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace LuckyGitlabStatWebAPI.Controllers
{
    public class RootController : ApiController
    {
        bool flag ;
        // 当前组名
        string CurrentGroupname;
        //返回信息
        string returnInfo = "异常";
        //连接本地数据库
        ConnectLocalSQL connectLocaldb = new ConnectLocalSQL();
        Member member = new Member();
        CommonController common = new CommonController();
        List<Member> members = new List<Member>();
        /// <summary>
        /// 获取所有用户信息
        /// </summary>
        /// <returns></returns>
        public List<Member> GetAllUserInfo()
        {
            FileStream fs = new FileStream("c:\\text\\log2.txt", FileMode.Append, FileAccess.Write);
            StreamWriter sw = new StreamWriter(fs); // 创建写入流
            sw.WriteLine("11111111111111111111"); // 写入
            sw.WriteLine("++"); // 写入
            sw.Close();
            //连接本地数据库
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT * FROM Member ";
            SqlDataReader userInfoReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (userInfoReader.Read())
            {
                Member member = new Member();
                member.username = userInfoReader["UserName"].ToString().Trim();
                member.password = userInfoReader["Password"].ToString().Trim();
                member.email = userInfoReader["Email"].ToString().Trim();
                member.sex = userInfoReader["Sex"].ToString().Trim();
                member.rank = userInfoReader["Rank"].ToString().Trim();
                members.Add(member);
            }
            //关闭查询
            userInfoReader.Close();
            //关闭数据库连接
            conn.Close();
            return members;
        }
        /// <summary>
        /// 注册用户
        /// </summary>
        /// <param name="member">注册人信息的对象</param>
        /// <returns>true/false</returns>
        public bool PostRegister([FromBody]Member member)
        {
            int rankNumber = 3;
            FileStream fs = new FileStream("c:\\text\\log2.txt", FileMode.Append, FileAccess.Write);
            StreamWriter sw = new StreamWriter(fs); // 创建写入流
            sw.WriteLine("zhuce"); // 写入
            sw.WriteLine("++"); // 写入

            bool flag = false;
            if (common.GetCheckUser(member.username) == false)
            {
                sw.WriteLine("111111111111111111111"); // 写入
                member.sex = (member.sex == "male" ? "true" : "false");
                if (member.rank == "Root")
                    rankNumber = 1;
                else
                     if (member.rank == "Monitor")
                        rankNumber = 2;
                else
                    rankNumber = 3;
                try
                {
                    sw.WriteLine("222222222222222222222"); // 写入
                    SqlConnection conn = connectLocaldb.ConnectDataBase();
                    conn.Open();
                    string sql = "INSERT INTO Member(username,password,sex,rank) VALUES ('" + member.username + "','" + member.username + "'+'_123','" + member.sex + "',"+ rankNumber + ")";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    int result = cmd.ExecuteNonQuery();
                    conn.Close();
                    flag = true;
                    sw.WriteLine("33333333333333333333333"); // 写入
                }
                catch(SqlException e)
                {
                    flag = false;
                    sw.WriteLine(e.ToString()); // 写入
                }
            }
            else
                flag = false;// return false;
            sw.Close();
            return flag;
        }
        /// <summary>
        /// 更新用户级别
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public bool GetUpdateUserRank(string username, int rank)
        {
            bool flag = false;
            try
            {
                //连接本地数据库
                SqlConnection conn = connectLocaldb.ConnectDataBase();
                //打开数据库
                conn.Open();
                //创建查询语句
                SqlCommand querySingleInfo = conn.CreateCommand();
                querySingleInfo.CommandText = "Update Member set Rank=" + "'" + rank + "'where username=" + "'" + username + "' ";
                SqlDataReader userRankInfo = querySingleInfo.ExecuteReader();
                //关闭查询
                userRankInfo.Close();
                //关闭数据库连接
                conn.Close();
                flag = true;
            }
            catch (SqlException e)
            {
                flag = false;
            }
            return flag;
        }     
        /// <summary>
        /// 删除成员
        /// </summary>
        /// <param name="username">用户名</param>
        /// <returns></returns>
        public bool GetDeleteUser(string username)
        {
            bool flag;
            FileStream fs = new FileStream("c:\\text\\log2.txt", FileMode.Append, FileAccess.Write);
            StreamWriter sw = new StreamWriter(fs); // 创建写入流
            sw.WriteLine("删除成员"); // 写入

            try
            {
                //连接本地数据库
                SqlConnection conn = connectLocaldb.ConnectDataBase();
                //打开数据库
                conn.Open();
                //创建查询语句
                SqlCommand querySingleInfo = conn.CreateCommand();

                //删除编译表信息
                querySingleInfo.CommandText = "delete MemberCommit where UserName=" + "'" + username + "'";
                int memberCommitResult = querySingleInfo.ExecuteNonQuery();

                //删除提交表信息
                querySingleInfo.CommandText = "delete MemberCommitBeforeCompiling where UserName=" + "'" + username + "'";
                int memberPushResult = querySingleInfo.ExecuteNonQuery();

                //删除issue表信息
                querySingleInfo.CommandText = "delete MemberIssue where Assignee=" + "'" + username + "'";
                int memberIssueResult = querySingleInfo.ExecuteNonQuery();

                //删除Member表信息
                querySingleInfo.CommandText = "delete Member where UserName=" + "'" + username + "'";
                int memberResult = querySingleInfo.ExecuteNonQuery();

                //关闭数据库连接
                conn.Close();
                flag = true;
            }
           catch(SqlException e)
            {
                sw.WriteLine(e.ToString());
                flag= false;
            }

            sw.Close();
            return flag;
        }
        /// <summary>
        /// 检查组名是否存在
        /// </summary>
        /// <param name="username">用户名（主键）</param>
        /// <returns>true  已注册</returns>
        /// <returns>false 未注册</returns>
        public bool GetCheckGroup(string groupname)
        {

            //连接本地数据库
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            //打开数据库
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "SELECT * FROM MemberGroup where GroupName=" + "'" + groupname + "'";
            SqlDataReader singleInfoReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            string CurrentGroupName;
            while (singleInfoReader.Read())
            {
                CurrentGroupName = singleInfoReader["GroupName"].ToString().Trim();
                if (CurrentGroupName.Equals(groupname))
                {
                    flag = true;
                }
                else
                {
                    flag = false;
                }
            }
            //关闭查询
            singleInfoReader.Close();
            //关闭数据库连接
            conn.Close();
            return flag;
        }
        /// <summary>
        /// 新建小组
        /// </summary>
        /// <param name="group"></param>
        /// <returns></returns>
        public string PostNewGroup([FromBody] Group group)
        {
            FileStream fs = new FileStream("c:\\text\\log.txt", FileMode.Append, FileAccess.Write);
            StreamWriter sw = new StreamWriter(fs); // 创建写入流
            sw.WriteLine("11111111111111111111"); // 写入
            sw.WriteLine(group.GroupName); // 写入
            if (!GetCheckGroup(group.GroupName))
            {   
                try
                {
                    //string groupMembers = null;
                    //string groupMonitor = null;
                    //foreach (var i in group.GroupMembers)
                    //{
                    //    groupMembers += ',';
                    //    groupMembers += i;
                    //}
                    //groupMembers = groupMembers.Substring(1);
                    //foreach (var j in group.GroupMonitor)
                    //{
                    //    groupMonitor += ',';
                    //    groupMonitor += j;
                    //}
                    //groupMonitor = groupMonitor.Substring(1);
                    //sw.WriteLine(groupMonitor); // 写入
                    SqlConnection conn = connectLocaldb.ConnectDataBase();
                    conn.Open();
                    SqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "INSERT INTO MemberGroup (GroupName,GroupMonitor,GroupMembers,IsDelete) VALUES ('" + group.GroupName + "','" + group.GroupMonitor + "','" + group.GroupMembers + "',0)";
                    int result = cmd.ExecuteNonQuery();
                    returnInfo = "成功";
                    conn.Close();
                }
                catch (Exception e)
                {
                    returnInfo = "异常";
                    sw.WriteLine(e.ToString()); // 写入
                }
            }
            else
            {
                sw.WriteLine("2222222222222222"); // 写入
                returnInfo = "组名已存在";
            }
            sw.Close();
            return returnInfo;
        }
        /// <summary>
        /// 修改小组
        /// </summary>
        /// <param name="group"></param>
        /// <returns></returns>
        public bool PostUpdateGroup([FromBody] Group group)
        {
            bool flag = false;
            try
            {
                string groupMembers = null;
                string groupMonitor = null;
                foreach (var i in group.GroupMembers)
                {
                    groupMembers += ',';
                    groupMembers += i;
                }
                foreach (var j in group.GroupMonitor)
                {
                    groupMonitor += ',';
                    groupMonitor += j;
                }
                SqlConnection conn = connectLocaldb.ConnectDataBase();
                conn.Open();
                SqlCommand cmd = conn.CreateCommand();
                //sw.WriteLine("2222222222"); // 写入
                /*之前加过该组*/
                cmd.CommandText = "Update MemberGroup set GroupMembers=" + "'"+groupMembers+ "',GroupMonitor=" + "'" + groupMonitor + "' where GroupName=" + "'" + group.GroupName + "'";
                int result = cmd.ExecuteNonQuery();
                flag = true;
            }catch (SqlException e)
            {
                flag = false;
                FileStream fs = new FileStream("c:\\text\\log.txt", FileMode.Append, FileAccess.Write);
                StreamWriter sw = new StreamWriter(fs); // 创建写入流
                sw.WriteLine(e.ToString()); // 写入
                sw.Close();
            }
            return flag;
        }
        /// <summary>
        /// 删除小组
        /// </summary>
        /// <param name="group">组名</param>
        /// <returns></returns>
        public bool GetDeleteGroup([FromBody] Group group)
        {
            bool flag = false;
            try
            {
                SqlConnection conn = connectLocaldb.ConnectDataBase();
                conn.Open();
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "delete MemberGroup where GroupName=" + "'" + group.GroupName + "";
                int result = cmd.ExecuteNonQuery();  
                flag = true;
                conn.Close();
             }
             catch (Exception e)
             {
                 flag = false;
              }
             return flag;
        }
    }
}
///// <summary>
///// 新建项目
///// </summary>
///// <param name="project">项目名</param>
///// <returns></returns>
//public bool PostNewProject([FromBody] Project project)
//{
//    bool flag = false;
//    try
//    {
//        SqlConnection conn = connectLocaldb.ConnectDataBase();
//        conn.Open();
//        for(int i=0;i<project.projectMembers.Length; i++)
//        {
//            string sql = "INSERT INTO project(projectname,monitor,projectmembers,sex) VALUES ('" + project.projectName + "','" + project.projectMembers[i] + "','" + project.monitor + "')";
//            SqlCommand cmd = new SqlCommand(sql, conn);
//            int result = cmd.ExecuteNonQuery();
//        }
//        conn.Close();
//        flag = true;
//    }
//    catch { flag = false; }
//    return flag;
//}
///// <summary>
///// 修改项目信息（项目名不可改）
///// </summary>
///// <param name="project">项目对象</param>
///// <returns></returns>
//public bool PostUpdateProject([FromBody] Project project)
//{
//    bool flag = false;
//    try
//    {
//        //连接本地数据库
//        SqlConnection conn = connectLocaldb.ConnectDataBase();
//        //打开数据库
//        conn.Open();
//        //创建查询语句
//        SqlCommand querySingleInfo = conn.CreateCommand();
//        querySingleInfo.CommandText = "Update Project set monitor=" + "'" + project.monitor + "' , projectmembers=" + "'" + project.projectMembers + "' where projectname=" + "'" + project.projectName + "' ";
//        SqlDataReader userRankInfo = querySingleInfo.ExecuteReader();
//        //关闭查询
//        userRankInfo.Close();
//        //关闭数据库连接
//        conn.Close();
//        flag = true;
//    }
//    catch (SqlException e)
//    {
//        flag = false;
//    }
//    return flag;
//}