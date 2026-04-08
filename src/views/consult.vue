<template>
  <div>
    <PageHead title="咨询记录" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="会话ID" width="100">
        <template #default="scope">
          <el-avatar>{{ scope.row.userNickname }} </el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="情绪日志">
        <template #default="scope">
          <div class="session-title">{{ scope.row.sessionTitle }}</div>
          <div class="session-preview">{{ scope.row.lastMessageContent }}</div>
        </template>
      </el-table-column>

      <el-table-column prop="messageCount" label="消息数" width="100" />
      <el-table-column prop="lastMessageTime" label="时间" width="100" />
      <el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" text @click="viewSessionDetail(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 25px"
      :page-size="pagination.size"
      :total="pagination.total"
      layout="prev, pager, next"
      @change="handleChange"
    ></el-pagination>
    <el-dialog
      v-model="showDetailDialog"
      title="咨询记录详情"
      width="70%"
      :close-on-click-modal="false"
    >
      <div class="session-detail">
        <div class="detail-header">
          <div class="detail-row">
            <div class="detail-label">用户：</div>
            <div class="detail-value">{{ sessionDetail.userNickname }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">开始时间：</div>
            <div class="detail-value">{{ sessionDetail.startedAt }}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">消息数：</div>
            <div class="detail-value">{{ sessionDetail.messageCount }}</div>
          </div>
        </div>
        <div class="messages-container">
          <div class="messages-header">
            <h4>对话记录</h4>
          </div>
          <div class="messages-list" v-loading="loadingMessages">
            <div
              v-for="message in sessionMessages"
              :key="message.id"
              class="message-item"
              :class="message.senderType === 1 ? 'user-message' : 'ai-message'"
            >
              <div class="message-header">
                <span class="sender">{{
                  message.senderType === 1 ? "用户" : "ai助手"
                }}</span>
                <span class="time">{{ message.createdAt }}</span>
              </div>
              <div class="message-content">{{ message.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="showDetailDialog = false">关闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { getConsultPage, getSessionDetail } from "@/api/admin";

import PageHead from "@/components/pageHead.vue";

//默认空数组
const tableData = ref([]);

//定义参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0,
});
//会话详情
const sessionDetail = ref({});
const sessionMessages = ref([]);
const loadingMessages = ref(false);

const viewSessionDetail = (row) => {
  loadingMessages.value = true;
  showDetailDialog.value = true;
  //点击详情按钮的时候调用接口
  getSessionDetail(row.id).then((res) => {
    console.log(res, "会话详情");
    loadingMessages.value = false;
    //详情当前行的数据，定义字段传进来
    sessionMessages.value = res; //赋值数组结构
    sessionDetail.value = row;
  });

  console.log(row);
};

const handleChange = (page) => {
  pagination.currentPage = page;
  handleSearch(); //分页之后调用列表的接口
};

const handleSearch = () => {
  //把方法进行封装
  getConsultPage(pagination).then((res) => {
    //解构赋值给tableData
    const { records, total } = res;
    console.log(records);
    console.log(total);
    pagination.total = total;
    tableData.value = records;
  });
};

onMounted(() => {
  handleSearch();
});

//定义详情弹窗
const showDetailDialog = ref(false);
const session = ref({});
</script>
