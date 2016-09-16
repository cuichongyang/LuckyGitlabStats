using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LuckyGitlabStatWebAPI.Models
{
    public class IssueEvent
    {
        public string issueid { set; get; }
        public string object_kind { set; get; }
        public user user=new user();
        public project project=new project();
        public repository repository=new repository();
        public object_attributes object_attributes=new object_attributes();
        public assignee assignee=new assignee();
        public IssueEvent()
        {
            object_kind = "";
            user = new user();
            project = new project();
            repository = new repository();
            object_attributes = new object_attributes();
            assignee = new assignee();
        }
    }
    public class user
    {
        public string name { set; get; }
        public string username { set; get; }
        public string avatar_url { set; get; }
    }
    
    public class object_attributes
    {
        public string id { set; get; }
        public string title { set; get; }
        public string assignee_id { set; get; }
        public string author_id { set; get; }
        public string project_id { set; get; }
        public string created_at { set; get; }
        public string updated_at { set; get; }
        public string position { set; get; }
        public string branch_name { set; get; }
        public string description { set; get; }
        public string milestone_id { set; get; }
        public string state { set; get; }
        public string iid { set; get; }
        public string url { set; get; }
        public string  action { set; get; }
    }
    public class assignee
    {
        public string name { set; get; }
        public string username { set; get; }
        public string avatar_url { set; get; }
    }
    //public class project
    //{
    //    public string name { set; get; }
    //    public string description { set; get; }
    //    public string web_url { set; get; }
    //    public string avatar_url { set; get; }
    //    public string git_ssh_url { set; get; }
    //    public string git_http_url { set; get; }
    //    public string @namespace { set; get; }
    //    public string visibility_level { set; get; }
    //    public string path_with_namespace { set; get; }
    //    public string default_branch { set; get; }
    //    public string homepage { set; get; }
    //    public string url { set; get; }
    //    public string ssh_url { set; get; }
    //    public string http_url { set; get; }
    //}
    //public class repository
    //{
    //    public string name { set; get; }
    //    public string url { set; get; }
    //    public string description { set; get; }
    //    public string homepage { set; get; }
    //}
}