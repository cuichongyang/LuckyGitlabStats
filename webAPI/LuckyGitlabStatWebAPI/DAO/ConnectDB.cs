using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
namespace LuckyGitlabStatWebAPI.DAO
{
    public class ConnectDB
    {
        //数据库用户名
        private static string userName = "cuichongyang";
        //数据库密码
        private static string password = "Lucky.2016";
        //连接的服务器地址
        private static string dataSource = "luckygitlabstat.database.windows.net";
        //数据库名称
        private static string sampleDatabaseName = "luckygitlabstat";
        /// <summary>
        /// 公共代码，连接数据库
        /// </summary>
        /// <returns></returns>
        public SqlConnectionStringBuilder ConnectDataBase()
        {
            SqlConnectionStringBuilder connString2Builder;
            connString2Builder = new SqlConnectionStringBuilder();
            connString2Builder.DataSource = dataSource;
            connString2Builder.InitialCatalog = sampleDatabaseName;
            connString2Builder.Encrypt = true;
            connString2Builder.TrustServerCertificate = false;
            connString2Builder.UserID = userName;
            connString2Builder.Password = password;
            return connString2Builder;
        }
    }
 }
