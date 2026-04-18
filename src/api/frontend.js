import service from "@/assets/utils/request";

export function register(data) {
  return service.post("/user/add", data);
}
//创建新的会话
///psychological-chat/session/start

export function startSession(data) {
  return service.post("/psychological-chat/session/start", data);
}

///psychological-chat/sessions
//获取会话列表
export function getSessionList(params) {
  return service.get("/psychological-chat/sessions", { params });
}

///psychological-chat/sessions/{sessionId}
//删除会话
export function deleteSession(sessionId) {
  return service.delete(`/psychological-chat/sessions/${sessionId}`);
}

///psychological-chat/sessions/{sessionId}/messages
//获取会话消息
export function getSessionEmotion(sessionId) {
  return service.get(`/psychological-chat/sessions/${sessionId}/messages`);
}

///emotion-diary
//提交情绪日记
export function addEmotionDiary(data) {
  return service.post("/emotion-diary", data);
}

///knowledge/article/page
//查询知识文章列表
export function getKnowledgeList(params) {
  return service.get("/knowledge/article/page", { params });
}

///knowledge/article/{id}
//查询知识文章详情
export function getKnowledgeDetail(activeId) {
  return service.get(`/knowledge/article/${activeId}`);
}
