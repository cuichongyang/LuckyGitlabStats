using LuckyGitlabStatWebAPI.DAO;
using LuckyGitlabStatWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace LuckyGitlabStatWebAPI.Controllers
{
    public class ProjectController : ApiController
    {
        //临时储存读取数据
        string[] sArray;
        //姓名去重
        IList<string> distinctNameList;
        //小组名
        string groupName;
        /// <summary>
        /// 用户级别，默认最高
        /// </summary>
        int rank=1;
        bool flag=false;
        CommonController common = new CommonController();
        //用于项目名查重
        IList<string> nlist= new List<string>();
        //小组项目名
        List<string> projectName = new List<string>();
        //项目成员
        List<string> projectMember = new List<string>();
        //项目成员提交量
        Dictionary<string, int> MembersPushMember = new Dictionary<string, int>();
        SingleController single = new SingleController();
         //连接本地数据库
         ConnectLocalSQL connectLocaldb = new ConnectLocalSQL();
        public ProjectController()
        {
            /*
             Empty
             */
        }
        /// <summary>
        /// 获取小组所有项目
        /// </summary>
        /// <param name="groupname"></param>
        /// <returns></returns>
        public List<string> GetProjectNameGrouply(string groupname)
        {
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "select distinct projectname from MemberCommitBeforeCompiling,member where  member.UserName=MemberCommitBeforeCompiling.UserName and member.Groupname="+"'"+groupname+ "'";
            SqlDataReader getTotalCommitTimesReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (getTotalCommitTimesReader.Read())
            {
                groupName = getTotalCommitTimesReader["projectname"].ToString().Trim();
                projectName.Add(groupName);
            }
            /*Android组LucidDreamAlarm项目有编译记录，但无提交记录*/
            if (groupname.ToLower().Contains("android"))
            {
                projectName.Add("LucidDreamAlarm");
            }
            //关闭查询
            getTotalCommitTimesReader.Close();
            //关闭数据库连接
            conn.Close();
            return projectName;
        }
        /// <summary>
        /// 获取所有项目
        /// </summary>
        /// <param name="groupname"></param>
        /// <returns></returns>
        public IList<string> GetAllProjectName()
        {
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            conn.Open();
            //创建查询语句
            SqlCommand querySingleInfo = conn.CreateCommand();
            querySingleInfo.CommandText = "select distinct projectname , Committime  from MemberProject  where isdelete =0 order by CommitTime desc ";
            SqlDataReader getTotalCommitTimesReader = querySingleInfo.ExecuteReader();
            //有多行数据，用while循环
            while (getTotalCommitTimesReader.Read())
            {
                groupName = getTotalCommitTimesReader["projectname"].ToString().Trim();
                projectName.Add(groupName);
            }
            ///*Android组LucidDreamAlarm项目有编译记录，但无提交记录*/
            //projectName.Add("LucidDreamAlarm");
            nlist = projectName.Distinct().ToList();
            //关闭查询
            getTotalCommitTimesReader.Close();
            //关闭数据库连接
            conn.Close();
            return nlist;
        }
        /// <summary>
        /// 获取项目的任务人
        /// </summary>
        /// <param name="projectname">项目名</param>
        /// <returns></returns>
        public IList<string> GetProjectMembersName(string projectname)
        {
            FileStream fs = new FileStream("c:\\text\\log.txt", FileMode.Append, FileAccess.Write);
            StreamWriter sw = new StreamWriter(fs); // 创建写入流
            sw.WriteLine("11111111111111111111"); // 写入
            List<string> nameList = new List<string>();
            try
            {
                SqlConnection conn = connectLocaldb.ConnectDataBase();
                conn.Open();
                //创建查询语句
                SqlCommand querySingleInfo = conn.CreateCommand();
                querySingleInfo.CommandText = "SELECT  ProjectMonitor,ProjectMembers FROM MemberProject where ProjectName=" + "'" + projectname + "' and isdelete=0";
                SqlDataReader getTotalCommitTimesReader = querySingleInfo.ExecuteReader();
                //有多行数据，用while循环
                while (getTotalCommitTimesReader.Read())
                {
                    string members = getTotalCommitTimesReader["ProjectMonitor"].ToString().Trim();

                    if (members!="")
                        members += ',';
                    members += getTotalCommitTimesReader["ProjectMembers"].ToString().Trim();
                    sArray = members.Split(',');
                    //sw.WriteLine("sArray.Length=" + sArray.Length); // 写入
                    for (int i = 0; i < sArray.Length; i++)
                        nameList.Add(sArray[i]);
                    //sw.WriteLine("sArray.Length="); // 写入
                    //nameList.Add(members);
                }
                distinctNameList = nameList.Distinct().ToList();
                //关闭查询
                getTotalCommitTimesReader.Close();
                //关闭数据库连接
                conn.Close();
            }
            catch (SqlException e)
            {
                sw.WriteLine(e.ToString());
            }
            sw.Close();
            return distinctNameList;
            //SqlConnection conn = connectLocaldb.ConnectDataBase();
            //conn.Open();
            //SqlCommand querySingleInfo = conn.CreateCommand();
            //querySingleInfo.CommandText = "select distinct  UserName from MemberCommitBeforeCompiling where  ProjectName="+"'"+ projectname + "'";
            //SqlDataReader getTotalCommitTimesReader = querySingleInfo.ExecuteReader();
            ////有多行数据，用while循环
            //while (getTotalCommitTimesReader.Read())
            //{
            //    projectMember.Add(getTotalCommitTimesReader["UserName"].ToString().Trim());
            //}
            ////关闭查询
            //getTotalCommitTimesReader.Close();
            //if(projectMember.Count>0)
            //{
            //    string name = ",";
            //    foreach (var i in projectMember)
            //    {
            //        name += i;
            //    }
            //    name = name.Substring(1);
            //    string sql = "update MemberProject set ProjectMembers="+"'" + name+ "' where ProjectName="+"'"+ projectname + "'";
            //    SqlCommand cmd = new SqlCommand(sql, conn);
            //    int result = cmd.ExecuteNonQuery();
            //    conn.Close();
            //    return projectMember;
            //}
            //else
            //{
            //    //关闭数据库连接
            //    conn.Close();
            //    return projectMember;
            //}

        }
        /// <summary>
        /// 获取项目成员提交数量
        /// </summary>
        /// <param name="projectname"></param>
        /// <param name="querydays"></param>
        /// <returns></returns>
        public Dictionary<string,int> GetMembersPushNumberOfProject(string projectname,int querydays )
        {
            IList<string> projectMember = new List<string>();
            projectMember = GetProjectMembersName(projectname);
            for (int i=0; i<projectMember.Count(); i++)
            {
                MembersPushMember.Add(projectMember[i],single.GetPushNumberOfProjectByLongTime(projectMember[i], projectname, querydays));
            }
            return MembersPushMember;
        }
        /// <summary>
        /// 获取项目成员编译数量
        /// </summary>
        /// <param name="projectname"></param>
        /// <param name="querydays"></param>
        /// <returns></returns>
        public Dictionary<string, int> GetMembersBuildNumberOfProject(string projectname, int querydays)
        {
            IList<string> projectMember = new List<string>();
            projectMember = GetProjectMembersName(projectname);
            for (int i = 0; i < projectMember.Count(); i++)
            {
                MembersPushMember.Add(projectMember[i], single.GetBuildNumberOfProjectByLongTime(projectMember[i], projectname, querydays));
            }
            return MembersPushMember;
        }
        /// <summary>
        /// 获取项目成员编译成功数量
        /// </summary>
        /// <param name="projectname"></param>
        /// <param name="querydays"></param>
        /// <returns></returns>
        public Dictionary<string, int> GetMembersBuildSuccessNumberOfProject(string projectname, int querydays)
        {
            IList<string> projectMember = new List<string>();
            projectMember = GetProjectMembersName(projectname);
            for (int i = 0; i < projectMember.Count(); i++)
            {
                MembersPushMember.Add(projectMember[i], single.GetBuildSuccessNumberOfProjectByLongTime(projectMember[i], projectname, querydays));
            }
            return MembersPushMember;
        }
        /// <summary>
        /// 获取项目管理级别
        /// </summary>
        /// <param name="username"></param>
        /// <param name="projectname"></param>
        /// <returns></returns>
        public int  GetProjectRank(string username,string projectname)
        {
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            conn.Open();
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = "select monitor,projectMembers from Project where projectName=" + "'" + projectname + "'";
            SqlDataReader read = cmd.ExecuteReader();
            while(read.Read())
            {
                string monitor = read["monitor"].ToString().Trim();
                if (monitor.Contains(username))
                    rank= 2;
                string projectMember = read["projectMembers"].ToString().Trim();
                if (projectMember.Contains(username))
                    rank= 3;
            }
            conn.Close();
            return rank;
        }
        /// <summary>
        /// 更新项目管理员级别（若无记录，则写入）
        /// </summary>
        /// <param name="project"></param>
        /// <returns></returns>
        public bool GetUpdateProjectRank(Project project)
        {
            string monitorname="";
            foreach(var i in project.monitor)
            {
                monitorname += i;
            }
            string membername = "";
            foreach (var i in project.projectMembers)
            {
                membername += i;
            }
            SqlConnection conn = connectLocaldb.ConnectDataBase();
            conn.Open();
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = "select * from project where projectname="+"'"+project.projectName+"'";
            SqlDataReader read= cmd.ExecuteReader();
            while(read.Read())
            {
                string projectname = read["projectname"].ToString().Trim();
                if(projectname=="")
                {
                    try
                    {
                        cmd.CommandText = "insert into project(projectname,monitor,projectmembers) values('" + project.projectName + "','" + monitorname + "','" + membername + "')";
                        cmd.ExecuteReader();
                        flag = true;
                    }
                    catch(SqlException e)
                    {
                        flag = false;
                    }
                  
                }
                else
                {
                    try
                    {
                        cmd.CommandText = "update project set monitor=" + "'" + monitorname + "',',projectmembers=" + "," + membername + "' where projectname=" + "'" + project.projectName + "'";
                        cmd.ExecuteReader();
                        flag = true;
                    }
                    catch(SqlException e)
                    {
                        flag = false;
                    }
                   
                }
            }
            return flag;
        }
        /// <summary>
        /// 删除项目
        /// </summary>
        /// <param name="groupname">项目名</param>
        /// <returns></returns>
        public string GetDeleteProject(string projectname)
        {
            string returnInfo;
            try
            {
                SqlConnection conn = connectLocaldb.ConnectDataBase();
                //打开数据库
                conn.Open();
                //创建查询语句
                SqlCommand querySingleInfo = conn.CreateCommand();
                querySingleInfo.CommandText = "update memberproject  Set IsDelete=1 where projectname=" + "'" + projectname + "'";
                int result = querySingleInfo.ExecuteNonQuery();
                //关闭数据库连接
                conn.Close();
                returnInfo = "删除成功";
            }
            catch (SqlException e)
            {
                returnInfo = "删除失败";
            }
            return returnInfo;
        }
    }
}
/*      //连接本地数据库
        ConnectLocalSQL connectLocaldb = new ConnectLocalSQL();
        Member member = new Member();
        List<Member> members = new List<Member>();
        /// <summary>
        /// 获取所有用户信息
        /// </summary>
        /// <returns></returns>
        public List<Member> GetAllUserInfo()
        {
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
            bool flag = false;
            if (common.GetCheckUser(member.username) == false)
            {
                member.sex = (member.sex == "male" ? "true" : "false");
                try
                {
                    SqlConnection conn = connectLocaldb.ConnectDataBase();
                    conn.Open();
                    string sql = "INSERT INTO Member(username,password,email,sex) VALUES ('" + member.username + "','" + member.password + "','" + member.email + "','" + member.sex + "')";
                    SqlCommand cmd = new SqlCommand(sql, conn);
                    int result = cmd.ExecuteNonQuery();
                    conn.Close();
                    flag = true;
                }
                catch { flag = false; }
            }
            else
                flag = false;// return false;
            return flag;
        }
        /// <summary>
        /// 更新用户级别
        /// </summary>
        /// <param name="username"></param>
        /// <returns></returns>
        public bool PostUpdateUserRank(string username, int rank)
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
*/
