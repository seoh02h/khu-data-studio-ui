<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">데이터셋 열람</div>
          <div class="description">
            상위 20행의 데이터를 열람할 수 있습니다.
          </div>
        </div>
        <div class="modal-body">
          <div class="name">{{ dataset.name }}</div>
          <Spinner v-if="isLoading" class="spinner" />
          <div
            class="preview-table-container"
            v-if="!isLoading"
          >
            <table
              v-if="Object.keys(this.data).length !== 0"
            >
              <thead>
                <th>
                  {{ this.data.dateTimeColumn }}
                </th>
                <th
                  v-for="(col, i) in data.column"
                  :key="i"
                >
                  {{ col.name }}
                </th>
              </thead>
              <tbody>
                <tr v-for="(row, i) in data.data" :key="i">
                  <td class="datetime-td">
                    {{ row.date }}
                  </td>
                  <td
                    v-for="(col, j) in data.column"
                    :key="j"
                  >
                    {{ row.value[col.name] }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button class="close-btn" @click="close">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/common/Spinner";

import { mapActions } from "vuex";
export default {
  props: ["dataset"],
  components: {
    Spinner,
  },
  data() {
    return {
      data: {},
      isLoading: true,
    };
  },
  methods: {
    ...mapActions("dataset", ["PREVIEW_DATA"]),
    close() {
      this.$emit("close");
    },
    getData() {
      this.PREVIEW_DATA({
        datasetId: this.dataset.id,
      }).then((res) => {
        console.log(res);
        this.isLoading = false;
        this.data = res;
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  height: 420px;
  margin: 0px auto;
  color: #e8e8e8;
  background-color: #252525;
  border-radius: 7px;
  position: relative;
}

.modal-header {
  background-color: #2c2c2c;
  border-radius: 10px 10px 0 0;
  padding: 15px;
  border-bottom: 0.2px #969696 solid;
  font-size: 18px;
}

.description {
  font-size: 15px;
  color: #e8e8e8c2;
  font-weight: 300;
}

.modal-body {
  padding: 15px 20px;
}
.name {
  font-size: 17px;
  padding-left: 10px;
  color: #3f8ae2;
}
.preview-table-container {
  display: flex;
  justify-content: center;
  height: 230px;
}
table {
  margin-top: 10px;
  color: #e8e8e8;
  font-weight: 300;
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  font-size: 16px;
  border: 2px solid #545454;
  display: block;
  overflow: auto;
}
th {
  height: 35px;
  padding: 0 10px;
  border: 1.5px solid #545454;
  font-size: 15px;
  font-weight: 400;
  background-color: #2c2c2c;
  border-top: none;
}
th:first-child {
  border-right: none;
}
td {
  border: 1px solid #353535;
  height: 30px;
}
.datetime-td {
  width: 180px;
  background-color: #2c2c2c;
  border-top: none;
}

.modal-footer {
  display: flex;
  justify-content: right;
  align-items: center;
  position: absolute;
  padding: 0px 20px;
  bottom: 0px;
  right: 0px;
  width: 100%;
  border-top: 0.2px #969696 solid;
  box-sizing: border-box;
  height: 50px;
}

.modal-footer button {
  width: 60px;
  height: 30px;
  font-size: 17px;
  margin: 0 5px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
}

.delete-btn {
  background-color: #3f8ae2;
}
.delete-btn:hover {
  background-color: #2f6cb1;
}

.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
.spinner {
  margin-top: 20px;
}
</style>
