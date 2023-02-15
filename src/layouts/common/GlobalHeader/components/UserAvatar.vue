<template>
    <n-dropdown :options="options" @select="handleDropdown" class="n-dropdown"  placement="top-end">
        <hover-container :inverted="theme.header.inverted" class="hover-con" style="px-12px display: flex; justify-content: end;">
            <n-avatar
                :size="32"
                :src="auth.userInfo.avatar"
            >
                <template #fallback>
                    <icon-local-avatar class="text-32px" />
                </template>
            </n-avatar>
            <span class="pl-8px text-16px font-medium">{{ auth.userInfo.username }}</span>
        </hover-container>
    </n-dropdown>
</template>

<script lang="ts" setup>
import { useIconRender } from '@/composables'
import { useAuthStore, useThemeStore } from '@/store'
import type { DropdownOption } from 'naive-ui'

defineOptions({ name: "UserAvatar" });

const auth = useAuthStore();
const theme = useThemeStore();
const { iconRender } = useIconRender();

const options: DropdownOption[] = [
  {
    label: "退出登录",
    key: "logout",
    icon: iconRender({ icon: "carbon:logout" }),
  },
];

type DropdownKey = "user-center" | "logout";

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  if (key === "logout") {
    window.$dialog?.info({
      title: "提示",
      content: "您确定要退出登录吗？",
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick: () => {
        auth.resetAuthStore();
      },
    });
  }
}
</script>

<style scoped></style>
