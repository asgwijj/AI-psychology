<template>
  <div>
    <!-- 页面头部：标题 + 操作按钮插槽 -->
    <PageHead title="知识文章">
      <template #buttons>
        <el-button @click="handleEdit({})" type="primary">新增</el-button>
      </template>
    </PageHead>

    <!-- 搜索栏组件：配置搜索项 + 绑定搜索事件 -->
    <TabSearch :formItem="formItem" @search="handleSearch" />
    <el-table :data="tableData" style="width: 400; margin-top: 25px">
      <el-table-column label="文章标题" width="200" fixed="left">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类" width="200">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span>{{ categoryMap[scope.row.categoryId] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="authorName" label="作者" width="150" />
      <el-table-column
        prop="readCount"
        label="阅读量"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="150"
      ></el-table-column>
      <el-table-column label="操作" width="240" fixed="right">
        <template #default="scope">
          <el-button text type="primary" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            @click="handlePublish(scope.row)"
            v-if="scope.row.status === 0 || scope.row.status === 2"
            text
            type="success"
            >发布</el-button
          >
          <el-button
            @click="handleOffline(scope.row)"
            v-if="scope.row.status === 1"
            text
            type="warning"
            >下线</el-button
          >
          <el-button @click="handleDelete(scope.row)" text type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      style="margin-top: 25px"
      :page-size="pagination.size"
      :total="pagination.total"
      layout="prev, pager, next"
      @change="handleChange"
    ></el-pagination>
    <!-- 新增/编辑文章弹窗 -->
    <ArticleDialog
      v-model:modelValue="dialogVisible"
      :article="currentArticle"
      :categoryList="categoryList"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 引入自定义全局组件
import PageHead from "@/components/PageHead.vue";
import TabSearch from "@/components/TabSearch.vue";
import ArticleDialog from "@/components/ArticleDialog.vue";
import {
  categoryTree,
  articlePage,
  getArticleDetail,
  updateArticleStatus,
  deleteArticle,
} from "@/api/admin";
import { ElMessageBox, ElMessage } from "element-plus";

// 搜索栏配置项：定义文章标题搜索输入框
const formItem = [
  {
    comp: "input",
    prop: "title",
    label: "文章标题",
    placeholder: "请输入文章标题",
  },
  {
    comp: "select",
    prop: "categoryId",
    label: "分类",
    placeholder: "请选择分类",
  },
  {
    comp: "select",
    prop: "status",
    label: "状态",
    placeholder: "请输入文章内容",
    options: [
      {
        label: "草稿",
        value: "0",
      },
      {
        label: "已发布",
        value: "1",
      },
      {
        label: "已下线",
        value: "2",
      },
    ],
  },
];

//分页参数
const pagination = ref({
  currentPage: 1,
  size: 10,
  total: 0,
});

// 搜索事件回调(接收子组件传递的搜索参数)
const handleSearch = async (formData) => {
  console.log(formData, "搜索参数");
  const params = {
    ...pagination,
    ...formData,
  };
  const { records, total } = await articlePage(params);
  tableData.value = records;
  pagination.value.total = total;
};

// 分页事件回调
const handleChange = (val) => {
  pagination.currentPage = val;
  handleSearch();
};

//映射关系：将分类数据映射为下拉选项格式
const categoryMap = ref({});
//分类列表
const categoryList = ref([]);

//文章列表
const tableData = ref([]);

// 新增/编辑文章弹窗
const dialogVisible = ref(false);
//创建变量接收文章详情数据
const currentArticle = ref(null);
// 新增/编辑文章弹窗成功事件回调
const handleSuccess = () => {
  //关闭弹窗
  dialogVisible.value = false;
  //刷新列表
  handleSearch();
};
const handleEdit = (row) => {
  console.log(row);
  if (!row.id) {
    //新增文章
    currentArticle.value = {};
    dialogVisible.value = true;
  } else {
    //编辑文章
    getArticleDetail(row.id).then((res) => {
      console.log(res, "文章详情数据");
      currentArticle.value = res;
      dialogVisible.value = true;
    });
  }
};

//发布
const handlePublish = (row) => {
  ElMessageBox.confirm(`确认发布文章${row.title}吗？`, "确认", {
    confirmButtonText: "确定发布",
    cancelButtonText: "取消",
    type: "info",
  }).then(() => {
    // 发布文章
    updateArticleStatus(row.id, { status: 1 }).then((res) => {
      ElMessage.success("发布成功");
      handleSearch();
    });
  });
};

//下线
const handleOffline = (row) => {
  ElMessageBox.confirm(`确认下线文章${row.title}吗？`, "确认", {
    confirmButtonText: "确定下线",
    cancelButtonText: "取消",
    type: "info",
  }).then(() => {
    // 下线文章
    updateArticleStatus(row.id, { status: 2 }).then((res) => {
      ElMessage.success("下线成功");
      handleSearch();
    });
  });
};

//删除
const handleDelete = (row) => {
  ElMessageBox.confirm(`确认删除文章${row.title}吗？`, "确认", {
    confirmButtonText: "确定删除",
    cancelButtonText: "取消",
    type: "danger",
  }).then(() => {
    // 删除文章
    deleteArticle(row.id).then((res) => {
      ElMessage.success("删除成功");
      handleSearch();
    });
  });
};

//页面加载完，拿到分类数据（用同步的写法）
onMounted(async () => {
  const data = await categoryTree();

  categoryList.value = data.map((item) => {
    categoryMap.value[item.id] = item.categoryName;
    return {
      label: item.categoryName,
      value: item.id,
    };
  });
  console.log(categoryList.value);
  formItem[1].options = categoryList.value;

  //获取列表
  handleSearch();
});
</script>
