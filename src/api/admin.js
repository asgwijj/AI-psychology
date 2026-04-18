import service from "@/assets/utils/request";

export function login(data) {
  return service.post("/user/login", data);
}

export function categoryTree() {
  return service.get("/knowledge/category/tree");
}

export function articlePage(params) {
  return service.get("/knowledge/article/page", { params });
}

export function uploadFile(file, businessInfo) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("businessType", "ARTICLE");
  formData.append("businessId", businessInfo.businessId);
  formData.append("businessField", "cover");

  return service.post("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//文章新增/更新
export function createArticle(data) {
  return service.post("/knowledge/article", data);
}

export function getArticleDetail(id) {
  return service.get(`/knowledge/article/${id}`);
}

export function updateArticle(id, data) {
  return service.put(`/knowledge/article/${id}`, data);
}

//删除文章
export function deleteArticle(id) {
  return service.delete(`/knowledge/article/${id}`);
}

export function updateArticleStatus(id, data) {
  return service.put(`/knowledge/article/${id}/status`, data);
}

///psychological-chat/sessions

//分页查询咨询会话
export function getConsultPage(params) {
  return service.get("/psychological-chat/sessions", { params });
}

//查询咨询会话详情

///psychological-chat/sessions/{sessionId}/messages
export function getSessionDetail(sessionId) {
  return service.get(`/psychological-chat/sessions/${sessionId}/messages`);
}

//分页查询情绪日记
///emotion-diary/admin/page
export function getEmotionDiaryPage(params) {
  return service.get("/emotion-diary/admin/page", { params });
}
//删除情绪日记
///emotion-diary/admin/{id}
export function deleteEmotionDiary(id) {
  return service.delete(`/emotion-diary/admin/${id}`);
}
//获取综合数据分析
///data-analytics/overview
export function getOverview() {
  return service.get("/data-analytics/overview");
}

///user/logout
export function logout() {
  return service.post("/user/logout");
}

///psychological-chat/session/${sessionId}/emotion
//获取会话情绪分析结果
export function getSessionEmotion(sessionId) {
  return service.get(`/psychological-chat/session/${sessionId}/emotion`);
}
