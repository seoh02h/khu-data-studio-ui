<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div class="title">데이터셋 삭제</div>
        </div>
        <div class="modal-body">
          <span>{{ dataset.name }}</span> 데이터셋을
          삭제하시겠습니까?
        </div>
        <div class="modal-footer">
          <div class="msg" v-if="msg.length !== 0">
            {{ msg }}
          </div>
          <button class="delete-btn" @click="deleteData">
            삭제
          </button>
          <button class="close-btn" @click="close">
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["dataset"],
  data() {
    return {
      msg: "",
    };
  },
  methods: {
    ...mapActions("dataset", [
      "FETCH_DATASETS",
      "DELETE_DATASET",
    ]),
    close() {
      this.$emit("close");
    },
    deleteData() {
      this.msg = "데이터셋을 삭제하고 있습니다.";
      this.DELETE_DATASET({
        datasetId: this.dataset.id,
      }).then(() => {
        this.FETCH_DATASETS().then(() => {
          this.$emit("close");
        });
      });
    },
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
  width: 500px;
  margin: 0px auto;
  color: #e8e8e8;
  background-color: #252525;
  border-radius: 7px;
}

.modal-header {
  background-color: #2c2c2c;
  border-radius: 10px 10px 0 0;
  padding: 15px;
  border-bottom: 0.2px #969696 solid;
  font-size: 18px;
}

.modal-body {
  text-align: center;
  padding: 30px 20px;
  font-size: 17px;
}

.modal-footer {
  display: flex;
  justify-content: right;
  padding: 15px 20px;
  border-top: 0.2px #969696 solid;
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
  background-color: rgb(213, 65, 65);
}
.delete-btn:hover {
  background-color: rgb(234, 98, 98);
}

.close-btn {
  background-color: #373737;
}
.close-btn:hover {
  background-color: #464646;
}
.msg {
  background-color: #2f6cb143;
  border-radius: 5px;
  padding: 2px 8px;
  font-size: 13px;
  color: white;
  margin-right: 5px;
}
span {
  color: rgb(234, 98, 98);
  font-weight: 400;
  font-size: 20px;
  margin-right: 3px;
}
</style>
