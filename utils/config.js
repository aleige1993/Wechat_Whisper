const API_ENVIRONMENT = ({
  env: 'https://whisper.dsqqh.com/api',
  prod: 'https://whisper.dsqqh.com/api',
})['env'] || '';

const API = {
    API_HOST: API_ENVIRONMENT, //  用户授权登录注册新用户
    API_LOGIN:`/login`, // 用户授权登录注册新用户
    API_USER_INFO:`/userInfo`, // 获取用户登录信息
    API_BIND_FRIEND:`/bindFriend`, // 绑定好友关系
    API_DEL_FRIEND:`/friend/deleteFriend`, // 删除好友
    API_UPDATE_FRIEND:`/friend/updateFriend`, // 更新好友
    API_FIND_FRIEND:'/friend/findFriend', // 获取好友列表
    API_FRIEND_QUERYFRIENDS:'/friend/queryFriends',//查询好友列表类型
    API_UPLOAD_FILE:'/uploadFile', // 上传文件
    API_UPDATA_FRIENDLAB:'/updateFriendLab', // 修改标签
    API_INSTER_MESSAGE:'/insterMessage', // 新增消息
    API_DEL_MESSAGE:'/deleteMessage', // 删除消息
    API_NEAR_FRIEND:'/nearFriend', // 最近好友聊天列表
    API_INCREASE_FRIEND_COHESION:'/increaseFriendCohesion', // 标记已读,提升亲密度
    API_QUERY_USER_MESSAGE:'/queryUserMessage', // 查询消息列表
    API_QUERY_MESSAGE_LIST:'/queryMessageList', // 查询聊天记录
    API_QUERY_NOTICE:'/queryNotice', // 查询通知
    API_MESSAGE_REMAIN_NUM:'/messageRemainNum', // 根据用户id查询用户剩余的次数
    API_QUERY_UN_SEND_LIST:'/queryUnSendList', // 查询未送达的
    API_FEEDBACK_ADDFEED:'/feedback/addFeed', // 意见反馈
    API_VIP_LIST :'/viplist',//会员列表
    API_CUSTOM_LIST:'/customlist',//定制列表
    API_EDIT_RENAME:'/friend/updateFriendRemark', // 修改备注
    API_MODIFY_VOICE:'/modifyVoiceStatus'//修改语音状态    
};

module.exports = API
