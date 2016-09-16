
## dbo.Member  

|    参数    | 介绍 |  
| ---------- | --- |  
| username |  用户注册/登陆时所需要的用户名 |  
| password |  用户注册/登陆时所需要的密码 |  
| Email | 用户邮箱|  
| Sex |用户性别|  
|GroupName|小组名|  
|Rank|成员级别|
## dbo.memberCommit 

|    参数    | 介绍 |  
| ---------- | --- |  
|CommitID| 用户提交记录的唯一ID|  
|username |  用户注册/登陆时所需要的用户名 |  
|ProjectName|用户缩写项目的名字|  
|SpendTime|用户所提交代码的运行时间|  
|BeginTime|用户所提交代码的开始运行时间|  
|EndTime|用户所提交代码的运行结束时间|  
|Version|用户所提交代码的版本号（提取8位）|  
|Result|用户提交代码的运行结果|  
|GroupName|用户所在小组的名字|  
|CommitTime|用户已交代码的时间|  
|Branch|用户在GitLab上的分支名|  

## dbo.MemberCommitBeforeCompiling  

|    参数    | 介绍 |  
| ---------- | --- |  
|Commitid|提交id|  
|UserName|用户名|  
|Version|提交版本号|  
|GroupName|小组名|  
|CommitTime|编译时间|  
|Branch|代码分支|  
|ProjectName|项目名|  
|CommitMessage|提交信息|  

## dbo.MemberIssue 

|    参数    | 介绍 |  
| ---------- | --- |  
|Issueid|数据库产生的唯一标识|  
|Assignee|Issue完成人|  
|ProjectName|项目名|  
|StartTime|Issue创建时间|
|UpdateTime|Issue更新时间|  
|Initiator|Issue创建人|   
|State|Issue状态|
|Issue|项目内Issue编号|
|Message|Issue标题|  

## dbo.Project 

|    参数    | 介绍 |  
| ---------- | --- |  
|id|数据库产生的唯一标识|  
|ProjectName|项目名|  
|Monitor|项目组长|  
|ProjectMembers|项目成员|  
   
 
## 文件中API内容介绍  

|    名字    | 用法 | 备注 |  
| ---------- | --- |  -----|
| Common.bool GetCheckUser(string username) |  检查用户是否已经注册 |  True：已注册 False：未注册|  
| Common.PostRegister([FromBody]Member member) | 用户注册|  True：注册成功 FalseF：注册失败|  
| Common.bool GetLoginCheck(string username, string password)|用户登录验证|  待弃用|  
|Common.int GetLoginCheckWithRank(string username, string password)|用户登录验证|0:失败 1：管理员 2：组长 3：小组成员|  
|Common.string GetcheckEmail(string username,string email)|检测用户邮箱并发送密码|待弃用|  
|Common.string GetSendpassrord(string username,string email)|发送密码|即将使用|  
|Group.List<string> GetGroupName()|获取组名||  
|Group.List<string> GetGroupMembersName(string groupname)|获取小组名单||  
|Group. Dictionary<string, int> GetMembersBuildNumberByLongtime(string groupname, int queryday)|获取小组成员每人编译量||   
|Group. Dictionary<string, int> GetMembersBuildSuccessNumberByDays(string groupname, int queryday)|获取小组成员每人编译成功量||  
|Group.int GetBuildNumberGrouplyBylongTime(int queryday)|查找编译总次数||
|Group.int GetBuildSuccessNumberGrouplyBylongTime(int queryday)|查找编译成功总次数||  
|Group.List<int> GetMembersBuild_ByDays(string groupname, int queryday)|获取小组每天的编译量||
|Group. Dictionary<string, int> GetMembersPushNumberByDays(string groupname, int queryday)|获取小组成员每人提交量||  
|Group. List<int> GetMembersPush_ByDays(string groupname, int queryday)|获取小组每天的提交量||  
|Group.int GetPushNumberGrouplyBylongTime(int queryday)|查找提交总次数||  
| Group.GetMembers_Grouply(string groupname)|查询小组成员|返回小组成员名单| 待弃用| 
| Group.GetSuccessTotal_Grouply_ByLongTime(string groupname, int queryDays)|查询小组成员queryDays时间内成功次数|待弃用|  
| Group.GetTotal_Grouply_ByLongTime(string groupname, int queryDays)|查询小组成员queryDays时间内编译总次数|待弃用|  
| Group.GetRate_Grouply(string groupname, int queryDays)| 查询组内成员queryDays时间内成功率|未使用|  
|Single.GetSingleInfo(string username)|查询个人信息|返回Member对象|  
|Single.GetSuccessTotal_Personally_ByLongTime(string username, int queryDays)|查询个人queryDays时间内成功总次数|返回成功次数|  
|Single.GetTotal_personally_ByLongTime(string username, int queryDays)|查询个人一段时间内编译总次数|待弃用|
|Single. GetBUildTotal_personally_ByLongTime(string username, int queryDays)|查询个人一段时间内编译总次数|即将使用| 
|Single.int GetPushTotal_personally_ByLongTime(string username, int queryDays)|查询个人一段时间内总提交次数||  
|Single.List<int> GetCommitTotal_Personally_ByDay(string username, int queryDays)|获取个人每天提交的次数||
|Single.List<int> GetBuildTotal_Personally_ByDay(string username, int queryDays)|获取个人每天编译的次数||
|Single.List<int> GetSuccessTotal_Personally_ByDay(string username, int queryDays)|获取个人每天编译成功次数||  
|Single. List<IssueEvent> getDataForIssueTable(string username,int queryDays)|获取个人issue信息||
|Single.int GetPushNumberOfProjectByLongTime(string username,string projectname,int queryDays)|获取个人指定项目提交总量||  
|Single.int GetBuildNumberOfProjectByLongTime(string username, string projectname, int queryDays)|获取个人指定项目编译总量||  
|Single.int GetBuildSuccessNumberOfProjectByLongTime(string username, string projectname, int queryDays)|获取个人指定项目编译成功总量||
|Single.GetRate_Personlly(string username, int queryDays)| 查询个人queryDays时间内每天提交成功率|未使用 |   
|Single.GetTotal_Personally_ByDay(string username, int queryDays)|  查询个人queryDays时间内每天提交的次数|待弃用|        
|Single.GetDataForTable(string username, int queryDays)|查询一段时间内提交数据编译后详细信息|返回版本号，项目名，提交时间，编译结果，编译时间|
|All.int GetPushTotal_AllMember_ByLongTime(int queryDays)|查询所有人一段时间内总提交次数||
|All.int GetBuildTotal_AllMember_ByLongTime(int queryDays)|查询所有人一段时间内总编译次数||  
|All.int GetBuildSuccess_AllMember_ByLongTime(int queryDays)|查询所有人一段时间内总编译成功次数||  
|All.List<int> GetCommitTotal_Personally_ByDay(int queryDays)|获取所有人员一段时间每天提交的次数||
|Project.List<string> GetProjectNameGrouply(string groupname)|获取小组所有项目||  
|Project.List<string> GetAllProjectNameGrouply()|获取所有项目||  
|Project.List<string> GetProjectMembersName(string projectname)|获取项目的任务人||  
|Project.Dictionary<string,int> GetMembersPushNumberOfProject(string projectname,int querydays )|获取项目成员提交数量||  
|Project. Dictionary<string, int> GetMembersBuildNumberOfProject(string projectname, int querydays)|获取项目成员编译数量||  
|Project.Dictionary<string, int> GetMembersBuildSuccessNumberOfProject(string projectname, int querydays)|获取项目成员编译成功数量||  
|Project.int  GetProjectRank(string username,string projectname)|获取项目管理级别||
|Project.bool GetUpdateProjectRank(Project project)|更新项目管理级别||
|Project.string GetDeleteProject(string projectname)|删除项目||
|Root.List<Member> GetAllUserInfo()|获取所有用户信息||  
|Root.bool PostRegister([FromBody]Member member)|注册用户||  
|Root.bool PostUpdateUserRank(string username, int rank)|更新用户级别||
|Root.bool PostNewGroup([FromBody] Group group)|新建小组||  
|Root.bool GetDeleteUser(string username)|删除成员||
|Root.bool PostUpdateGroup([FromBody] Group group)|修改小组||
|Root.bool GetDeleteGroup([FromBody] Group group)|删除小组||
