<template>
  <div class="gnb">
    <router-link
      :to="{ name: 'manage' }"
      class="title"
      @click.native="openMenu('home')"
    >
      <div class="logo">
        <img src="@/assets/images/logo.png" />
      </div>
      <div>KHU Data Studio</div>
    </router-link>
    <div class="menu-title">
      <font-awesome-icon icon="fa-regular fa-folder-open" />
      학습 데이터
    </div>
    <router-link
      v-for="menu in menus.dataset"
      :key="menu.name"
      :to="{ name: menu.name }"
      class="menu"
    >
      <font-awesome-icon
        icon="fa-solid fa-chevron-right"
        size="xs"
      ></font-awesome-icon>
      {{ menu.title }}
    </router-link>
    <div class="menu-title">
      <font-awesome-icon icon="fa-solid fa-chart-column" />
      데이터 현황
    </div>
    <router-link
      v-for="menu in menus.status"
      :key="menu.name"
      :to="{ name: menu.name }"
      class="menu"
    >
      <font-awesome-icon
        icon="fa-solid fa-chevron-right"
        size="xs"
      ></font-awesome-icon>
      {{ menu.title }}
    </router-link>
    <div class="menu-title">
      <font-awesome-icon icon="fa-solid fa-wrench" />
      데이터 전처리
    </div>
    <router-link
      v-for="menu in menus.cleaning"
      :key="menu.name"
      :to="{ name: menu.name }"
      class="menu"
    >
      <font-awesome-icon
        icon="fa-solid fa-chevron-right"
        size="xs"
      ></font-awesome-icon>
      {{ menu.title }}
    </router-link>
    <!-- <div class="menu-title">
      <font-awesome-icon icon="fa-solid fa-chart-simple" />
      데이터 증강
    </div>
    <router-link
      v-for="menu in menus.augmentation"
      :key="menu.name"
      :to="{ name: menu.name }"
      class="menu"
    >
      <font-awesome-icon
        icon="fa-solid fa-chevron-right"
        size="xs"
      ></font-awesome-icon>
      {{ menu.title }}
    </router-link> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: {
        dataset: [
          {
            name: "manage",
            title: "데이터셋 관리",
          },
        ],
        status: [
          {
            name: "visualize",
            title: "시각화",
          },
          {
            name: "statistic",
            title: "통계",
          },
        ],
        cleaning: [
          {
            name: "missing-value",
            title: "결측치 처리",
          },
          {
            name: "noise",
            title: "노이즈 제거",
          },
          {
            name: "history",
            title: "전처리 이력",
          },
        ],
      },
      currentMenu: "home",
    };
  },
  methods: {
    openMenu(name) {
      this.currentMenu = name;
    },
  },
};
</script>

<style scoped>
.gnb {
  background-color: #2c2c2c;
  width: 220px;
  min-height: 500px;
  height: 100vh;
  box-shadow: 4px 0px 30px 3px rgba(0, 0, 0, 0.26);
  justify-content: center;
}

.title {
  margin-top: 30px;
  text-decoration: none;
  color: #d8d8d8;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-family: "Noto Sans Mono", monospace;
  letter-spacing: -0.5px;
  word-spacing: -4px;
  display: flex;
  margin-bottom: 10px;
}
.logo {
  padding-top: 1.5px;
  padding-right: 5px;
  padding-left: 10px;
}
.logo > img {
  width: 25px;
}
.menu-title {
  color: #7999c3;
  font-size: 16px;
  width: 100%;
  font-weight: 400;
  padding-top: 30px;
  padding-left: 25px;
  padding-bottom: 5px;
}
.menu-title > svg {
  padding-right: 2px;
  padding-bottom: 1px;
}
.menu > svg {
  display: none;
}
.menu {
  display: block;
  text-decoration: none;
  color: #e8e8e8;
  font-size: 15px;
  font-weight: 300;
  width: 100%;
  padding-left: 50px;
  padding-top: 8px;
  cursor: pointer;
  transition: all 0.5s;
}
.menu:hover {
  color: #9e9e9e;
}

.router-link-active svg {
  display: inline-block;
  padding-bottom: 1px;
}
</style>
