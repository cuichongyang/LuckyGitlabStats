using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LuckyGitlabStatWebAPI.Models
{
    public class BuildEvent
    {

        public string object_kind { get; set; }
        public string @ref { get; set; }
        public string tag { get; set; }
        public string before_sha { get; set; }
        public string sha { get; set; }
        public string build_id { get; set; }
        public string build_name { get; set; }
        public string build_stage { get; set; }
        public string build_status { get; set; }
        public string build_started_at { get; set; }
        public string build_finished_at { get; set; }
        public string build_duration { get; set; }
        public string build_allow_failure { get; set; }
        public string project_id { get; set; }
        public string project_name { get; set; }
        public user user;
        public commit commit;
        public repository repository;
    }
    public class commit
    {
        public string id { get; set; }
        public string sha { get; set; }
        public string message { get; set; }
        public string author_name { get; set; }
        public string author_email { get; set; }
        public string status { get; set; }
        public string duration { get; set; }
        public string started_at { get; set; }
        public string finished_at { get; set; }
    }
    //public class repository
    //{
    //    public string name { get; set; }
    //    public string url { get; set; }
    //    public string description { get; set; }
    //    public string homepage { get; set; }
    //    public string git_http_url { get; set; }
    //    public string git_ssh_url { get; set; }
    //    public string visibility_level { get; set; }

    //}
}