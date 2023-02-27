<template>
  <n-grid :x-gap="16" :y-gap="16" cols="s:1 m:2 l:4" responsive="screen">
    <n-grid-item v-for="item in cardData" :key="item.id">
      <gradient-bg
        :end-color="item.colors[1]"
        :start-color="item.colors[0]"
        class="h-100px"
      >
        <h3 class="text-16px">{{ item.title }}</h3>
        <div class="flex justify-between pt-12px">
          <svg-icon :icon="item.icon" class="text-32px" />
          <count-to
            :end-value="item.value"
            :prefix="item.unit"
            :start-value="1"
            class="text-30px text-white dark:text-dark"
          />
        </div>
      </gradient-bg>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { GradientBg } from "./components";
import { BiUserDetailsApi } from "@/service";
import { StandardErrorProcessor } from "@/service/request";

const lineLoading = ref(false);

const dayuse=ref()

/**
 * 查询统计汇总用户调用api次数
 */
const count = () => {
  lineLoading.value = true;
  BiUserDetailsApi.count()
    .then((res) => {
      usable.value = res.data.value.total - res.data.value.used;

      used.value = res.data.value.used;

      total.value = res.data.value.total;
    })
    .catch(StandardErrorProcessor)
    .finally(() => (lineLoading.value = true));
};

count();


const todayuse = () => {
  lineLoading.value = true;
  BiUserDetailsApi.todayuse()
    .then((res) => {
     
        dayuse.value = res.total
    
    })
    .catch(StandardErrorProcessor)
    .finally(() => (lineLoading.value = true));
};

todayuse()


const total = ref(0);

const used = ref(0);

const usable = ref(0);

defineOptions({ name: "DashboardAnalysisDataCard" });

interface CardData {
  id: string;
  title: string;
  value: number;
  unit: string;
  colors: [string, string];
  icon: string;
}

const cardData = computed<CardData[]>(() => [
  {
    id: "visit",
    title: "赠送额度",
    value: total.value,
    unit: "",
    colors: ["#ec4786", "#b955a4"],
    icon: "ant-design:bar-chart-outlined",
  },
  {
    id: "amount",
    title: "累计使用",
    value: used.value,
    unit: "",
    colors: ["#865ec0", "#5144b4"],
    icon: "ant-design:bar-chart-outlined",
  },
  {
    id: "download",
    title: "可用次数",
    value: usable.value,
    unit: "",
    colors: ["#56cdf3", "#719de3"],
    icon: "ant-design:bar-chart-outlined",
  },
  {
    id: "trade",
    title: "今日使用",
    value: dayuse.value,
    unit: "",
    colors: ["#fcbc25", "#f68057"],
    icon: "ant-design:bar-chart-outlined",
  },
]);
</script>

<style scoped></style>
