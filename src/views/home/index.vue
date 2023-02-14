<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->
<script lang="ts" setup>
import { VITE_ROUTE_HOME_PATH } from "@/config";
import { getToken } from "@/store/modules/auth/helpers";
import { useRouter } from "vue-router";
import { UserAvatar } from "@/layouts/common/GlobalHeader/components";

defineOptions({ name: "Home" });
const router = useRouter();

// 已登录直接跳转到管理首页
if (getToken()) {
  router.push(VITE_ROUTE_HOME_PATH);
}

// function displayText() {
//   const input = document.getElementById("inputText").value;
//   document.getElementById("display").innerHTML = input;
// }
</script>
<!-- --------------------------------------------------------------------------------------------------------------------------------------------- -->

<template>
  <div class="page">
    <UserAvatar  />
    <div class="title">
      <h1>ChatGPT</h1>
    </div>

    <p id="display"></p> 

    <div class="exhibition">
      <div class="witem" data-v-8a83588a="">
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
          data-v-8a83588a=""
        >
          <circle cx="12" cy="12" r="5" data-v-8a83588a=""></circle>
          <line x1="12" x2="12" y1="1" y2="3" data-v-8a83588a=""></line>
          <line x1="12" x2="12" y1="21" y2="23" data-v-8a83588a=""></line>
          <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" data-v-8a83588a=""></line>
          <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" data-v-8a83588a=""></line>
          <line x1="1" x2="3" y1="12" y2="12" data-v-8a83588a=""></line>
          <line x1="21" x2="23" y1="12" y2="12" data-v-8a83588a=""></line>
          <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" data-v-8a83588a=""></line>
          <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" data-v-8a83588a=""></line>
        </svg>
        <h3 class="title" data-v-8a83588a="">实例</h3>
        <p data-v-8a83588a="">"用简单的术语解释量子计算"</p>
        <p data-v-8a83588a="">"10岁的生日有什么创意吗？"</p>
        <p data-v-8a83588a="">"如何在Javascript中提出HTTP请求？"</p>
      </div>

      <div class="witem" data-v-8a83588a="">
        <svg
          aria-hidden="true"
          class="w-6 h-6 m-auto"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          data-v-8a83588a=""
        >
          <path
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            stroke-linecap="round"
            stroke-linejoin="round"
            data-v-8a83588a=""
          ></path>
        </svg>
        <h3 class="title" data-v-8a83588a="">功能</h3>
        <p data-v-8a83588a="">还记得用户在对话中早些时候说的话</p>
        <p data-v-8a83588a="">允许用户提供后续更正</p>
        <p data-v-8a83588a="">接受过拒绝不当请求的培训</p>
      </div>

      <div class="witem" data-v-8a83588a="">
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
          data-v-8a83588a=""
        >
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            data-v-8a83588a=""
          ></path>
          <line x1="12" x2="12" y1="9" y2="13" data-v-8a83588a=""></line>
          <line x1="12" x2="12.01" y1="17" y2="17" data-v-8a83588a=""></line>
        </svg>
        <h3 class="title" data-v-8a83588a="">限制</h3>
        <p data-v-8a83588a="">偶尔可能会生成错误的信息</p>
        <p data-v-8a83588a="">偶尔可能会产生有害的指令或有偏见的内容</p>
        <p data-v-8a83588a="">对2021年后的世界和事件的了解有限</p>
      </div>
    </div>
    <div class="el-input__wrapper">
      <input
        class="el-input__inner"
        type="text"
        autocomplete="off"
        tabindex="0"
        id="el-id-3892-3"
      /><span class="el-input__suffix"
        ><span class="el-input__suffix-inner"><a class="" data-v-8a83588a=""></a></span
      ></span>
    </div>

    <div class="w-full h-32 md:h-68 flex-shrink-0"></div>

    <div class="relative flex h-full flex-1 md:flex-col">
      <div
        class="flex ml-1 mt-1.5 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center"
      ></div>
      <div
        class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]"
      >
        <textarea
        id="inputText"
          tabindex="0"
          data-id="root"
          style="max-height: 200px; height: 24px; overflow-y: hidden"
          rows="1"
          class="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
        ></textarea
        ><button
          class="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
        >
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-4 w-4 mr-1"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title h1 {
  padding: 50px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
}

.inputbox {
  width: 100%;
  margin: auto;
  display: flex;
}

.exhibition {
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-around;
}
#display{
  width: 80%;
  margin: auto;
}

.witem p {
  margin: auto;
  padding: 10px;
  margin-top: 15px;
  font-size: 16px;
  background-color: #f7f7f8;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.witem h3 {
  padding: 15px;
  font-size: 20px;
  color: #606266;
  text-align: center;
}


.witem p:hover {
  background-color: #d9d9e3;
}
textarea {
  border: none;
  resize: none;
  cursor: pointer;
  outline: none;
}
:deep(.hover-con) {
 display: flex;
 justify-content: end;
  }

</style>
