<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->
<script lang="ts" setup>
import { UserAvatar } from "@/layouts/common/GlobalHeader/components";
import { ref } from "vue";
import { StandardErrorProcessor } from "@/service/request";
import { localStg } from "@/utils";
import { chatGptProxy } from "@/service";
import { useAuthStore } from "@/store";
import { marked } from "marked";

const user = useAuthStore();

defineOptions({ name: "Home" });

//问题
const problem = ref();

//回答
const answer = ref();

const list: any = ref([]);

const loading = ref(false);

const isLogin = Boolean(localStg.get("token"));

const error = ref(false);

function setInterval() {
  setTimeout(() => {
     const element = document.documentElement;
  // 检查是否有新内容添加
  if (element.scrollHeight > element.scrollTop + element.clientHeight) {
    // 将页面定位到滚动条底部
    element.scrollTop = element.scrollHeight;
  }
  }, 0);

}

//获取回答
async function getdata() {
  const { data } = await chatGptProxy({
    text: problem.value,
    account: "hkk", //账户别名
    contextId: user.userInfo._id, //用户ID
  });
  answer.value = marked.parse(data.text);

  console.log(data);

  answerdata();
  setInterval();
}

//创建对话框
function displayText() {
  if (problem.value === undefined) return;
  const data = {
    avatar: "/avatar.png",
    text: problem.value,
    type: 0,
  };
  setInterval();
  if (isLogin) {
    list.value.push(data);
    loading.value = true;
    getdata()
      .catch(StandardErrorProcessor)
      .finally(() => (loading.value = false));
    problem.value = "";
  } else {
    problem.value = "";
    return (error.value = true);
  }
}

//创建回复内容
function answerdata() {
  const data = {
    avatar: "/log.png",
    text: answer.value,
    type: 1,
  };
  list.value.push(data);
}

//清空内容
function emptyBut() {
  list.value = [];
}
</script>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->

<template>
  <div class="page">
    <UserAvatar />

    <n-alert v-show="error" type="error"> 请点击体验登录 </n-alert>

    <div class="begintitle">
      <h1 v-show="!list.length">ChatGPT</h1>
    </div>

    <div id="myList">
      <div :class="item.type === 0 ? 'problemList' : 'answerList'" v-for="item in list">
        <img class="listImg" :src="item.avatar" alt="" />
        <div v-highlight v-html="item.text" class="listText"></div>
      </div>
      <div v-show="loading" class="answerList">
        <img class="listImg" src="/log.png" alt="" />
        <img class="addin" src="/loading.gif" alt="" />
      </div>
    </div>

    <div v-show="!list.length" class="exhibition">
      <div class="witem">
        <svg
          class="w-6 h-6 m-auto"
          fill="none"
          height="1em"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" x2="12" y1="1" y2="3"></line>
          <line x1="12" x2="12" y1="21" y2="23"></line>
          <line x1="4.22" x2="5.64" y1="4.22" y2="5.64"></line>
          <line x1="18.36" x2="19.78" y1="18.36" y2="19.78"></line>
          <line x1="1" x2="3" y1="12" y2="12"></line>
          <line x1="21" x2="23" y1="12" y2="12"></line>
          <line x1="4.22" x2="5.64" y1="19.78" y2="18.36"></line>
          <line x1="18.36" x2="19.78" y1="5.64" y2="4.22"></line>
        </svg>
        <h3 class="title">实例</h3>
        <p>"用简单的术语解释量子计算"</p>
        <p>"10岁的生日有什么创意吗？"</p>
        <p>"如何在Javascript中提出HTTP请求？"</p>
      </div>

      <div class="witem">
        <svg
          aria-hidden="true"
          class="w-6 h-6 m-auto"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <h3 class="title">功能</h3>
        <p>还记得用户在对话中早些时候说的话</p>
        <p>允许用户提供后续更正</p>
        <p>接受过拒绝不当请求的培训</p>
      </div>

      <div class="witem">
        <svg
          class="w-6 h-6 m-auto"
          fill="none"
          height="1em"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
          ></path>
          <line x1="12" x2="12" y1="9" y2="13"></line>
          <line x1="12" x2="12.01" y1="17" y2="17"></line>
        </svg>
        <h3 class="title">限制</h3>
        <p>偶尔可能会生成错误的信息</p>
        <p>偶尔可能会产生有害的指令或有偏见的内容</p>
        <p>对2021年后的世界和事件的了解有限</p>
      </div>
    </div>
    <div class="steppingstone"></div>

    <n-button @click="emptyBut" v-show="list.length" class="defbut">
      <svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1024 1024"
      >
        <path
          d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
          fill="currentColor"
        ></path></svg
      >清空内容</n-button
    >

    <div class="inputbox">
      <div class="relative flex h-full flex-1 md:flex-col">
        <div
          class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
        >
          <n-spin :show="loading">
            <textarea
              v-show="!loading"
              @keyup.enter="displayText"
              tabindex="0"
              data-id="root"
              rows="1"
              v-model="problem"
              id="message"
              class="text m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
            ></textarea>
            <textarea
              v-show="loading"
              readonly
              tabindex="0"
              data-id="root"
              rows="1"
              v-model="problem"
              id="message"
              class="text m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
            ></textarea>
          </n-spin>

          <n-spin :show="loading">
            <button
              id="submit-btn"
              @click="displayText"
              class="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-5 md:bottom-0 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
            >
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4 mr-1"
                height="1.5em"
                width="1.5em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </n-spin>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  position: relative;
  height: 100vh;
}
.inputbox {
  position: fixed;
  width: 100%;
  height: 150px;
  bottom: 0px;
  z-index: 9;
}
.defbut {
  position: fixed;
  right: 2px;
  bottom: 152px;
}
#submit-btn {
  position: fixed;
  right: 15px;
  bottom: 56px;
  background-color: #fff;
}
.text {
  position: absolute;
  top: 50px;
  border: 1px solid #e5e5e5;
  height: 40px;
  padding: 10px;
}

#myList {
  width: 100%;
  margin: auto;
  overflow-x: hidden;
  overflow-y: auto;
}

.problemList {
  display: flex;
  padding: 0px 10%;
}

.answerList {
  display: flex;
  padding: 0px 10%;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}

.listImg {
  margin-top: 5px;
  width: 40px;
  height: 40px;
}

.listText {
  line-height: 50px;
  margin-left: 20px;
}

.addin {
  margin: 10px 20px;
  width: 30px;
  height: 30px;
}

.steppingstone {
  width: 100%;
  height: 160px;
}

.begintitle {
  width: 100%;
  padding: 50px 50px 30px 50px;
}
.begintitle h1 {
  padding: 50px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}

.exhibition {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-around;
}

.witem p {
  margin: auto;
  padding: 10px;
  margin-top: 15px;
  font-size: 16px;
  border-radius: 5px;
  text-align: center;
}

.witem h3 {
  padding: 15px;
  font-size: 20px;
  color: #606266;
  text-align: center;
}

textarea {
  border: none;
  resize: none;
  cursor: pointer;
  outline: none;
  overflow-y: hidden;
}
</style>
