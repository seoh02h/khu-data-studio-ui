<template>
  <div class="statictic-content-root">
    <div class="stat-container">
      <div class="stat-container-header"></div>
      <div v-if="isLoadingStat" class="loading">
        <Spinner class="spinner" />
      </div>

      <div
        class="stat-table-container"
        v-if="!isLoadingStat"
      >
        <table>
          <thead>
            <th></th>
            <th
              v-for="(key, i) in Object.keys(stdList)"
              :key="i"
            >
              {{ key }}
            </th>
          </thead>
          <tbody>
            <tr>
              <td class="th-style">표본표준편차</td>
              <td
                v-for="(col, i) in Object.keys(stdList)"
                :key="i"
              >
                {{ stdList[col] }}
              </td>
            </tr>
            <tr>
              <td class="th-style">평균</td>
              <td
                v-for="(col, i) in Object.keys(meanList)"
                :key="i"
              >
                {{ meanList[col] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pearson-container">
      <div class="pearson-container-header">
        <div class="sub-title">피어슨 상관계수</div>
        <div class="pearson-threshold-input-container">
          <div class="pearson-threshold-label">
            임계값을 입력하세요 (0~1)
          </div>
          <input
            type="number"
            class="pearson-threshold-input"
            v-model="inputThreshod"
          />
          <button
            class="pearson-threshold-btn"
            @click="updateThreshold"
          >
            확인
          </button>
        </div>
      </div>
      <div v-if="isLoadingPearson" class="loading">
        <Spinner class="spinner" />
      </div>

      <div
        class="pearson-table-container"
        v-if="!isLoadingPearson"
      >
        <table>
          <thead>
            <th></th>
            <th
              v-for="(key, i) in Object.keys(pearson)"
              :key="i"
            >
              {{ key }}
            </th>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in Object.keys(pearson)"
              :key="i"
            >
              <td class="th-style">{{ row }}</td>
              <td
                v-for="(col, j) in Object.keys(pearson)"
                :key="j"
                :class="{
                  highlight: highlight(pearson[row][col]),
                }"
              >
                {{ pearson[row][col] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Spinner from "@/components/common/Spinner";
export default {
  props: ["dataset", "changeDate"],
  components: {
    Spinner,
  },
  computed: {
    ...mapGetters("dataset", ["getSt", "getEt"]),
    isLoadingStat() {
      return this.isLoadingMean && this.isLoadingStd;
    },
  },

  data() {
    return {
      data: [],
      pearson: [],
      isLoadingPearson: true,
      isLoadingMean: true,
      isLoadingStd: true,
      threshod: 0.5,
      inputThreshod: 0.5,
      stdList: [],
      meanList: [],
    };
  },
  methods: {
    ...mapActions("dataset", ["FETCH_DATA"]),
    ...mapActions("cleaning", [
      "PEARSON_CORRELATION",
      "STD",
      "MEAN",
    ]),
    getData() {
      return this.FETCH_DATA({
        datasetId: this.dataset.id,
        st: this.getSt,
        et: this.getEt,
      }).then((res) => {
        this.data = res;
      });
    },
    getPearsonCorrelation() {
      this.isLoadingPearson = true;
      this.PEARSON_CORRELATION({
        request: this.data,
      }).then((res) => {
        console.log(res);
        this.pearson = res;
        this.isLoadingPearson = false;
      });
    },
    getStd() {
      this.isLoadingStd = true;
      this.STD({
        request: this.data,
      }).then((res) => {
        this.stdList = res;
        this.isLoadingStd = false;
      });
    },
    getMean() {
      this.isLoadingMean = true;
      this.MEAN({
        request: this.data,
      }).then((res) => {
        this.meanList = res;
        this.isLoadingMean = false;
      });
    },
    highlight(val) {
      if (Math.abs(val) >= this.threshod) {
        return true;
      } else {
        return false;
      }
    },
    updateThreshold() {
      if (this.inputThreshod === null) {
        this.inputThreshod = 0.5;
      }
      this.threshod = this.inputThreshod;
    },
  },
  created() {
    this.getData().then(() => {
      this.getMean();
      this.getStd();
      this.getPearsonCorrelation();
    });
  },
  watch: {
    changeDate: function () {
      this.getData().then(() => {
        this.getMean();
        this.getStd();
        this.getPearsonCorrelation();
      });
    },
  },
};
</script>

<style scoped>
.statictic-content-root {
  height: 100%;
  overflow: auto;
}
.pearson-container-header {
  display: flex;
  justify-content: space-between;
}

.pearson-threshold-label {
  color: #e8e8e8;
}
.pearson-threshold-input {
  margin: auto;
  height: 18px;
  width: 100px;
  background-color: #1f1f1f;
  border: none;
  color: #e8e8e8;
  padding: 3px 20px;
  outline: 1px #676767a6 solid;
}
.pearson-threshold-btn {
  width: 60px;
  height: 27px;
  font-size: 16px;
  margin: 0 5px;
  border-radius: 5px;
  color: #e8e8e8;
  font-weight: 400;
  border: 1px #676767a6 solid;
  cursor: pointer;
  transition: all 0.5s;
  background-color: #3f8ae2;
  margin-right: 30px;
}
.pearson-threshold-btn:hover {
  background-color: #2f6cb1;
}
.sub-title {
  color: #e8e8e8;
  font-weight: 400;
  font-size: 22px;
  margin: 5px;
}
.stat-table-container,
.pearson-table-container {
  padding-top: 10px;
  overflow: auto;
  display: flex;
}

table {
  color: #e8e8e8;
  font-weight: 300;
  text-align: center;
  font-size: 16px;
  border: 1.5px solid #545454;
  border-collapse: separate;
  border-spacing: 0;
  display: block;
}
th {
  border: 1.5px solid #545454;
  height: 35px;
  font-size: 17px;
  font-weight: 400;
  background-color: #2c2c2c;
  padding: 0px 30px;
}
td {
  border: 0.5px solid #353535;
  height: 30px;
  padding: 0px 30px;
}
.stat-table-container td:first-child {
  min-width: 100px;
}

.th-style {
  border: 1.5px solid #545454;
  background-color: #2c2c2c;
  height: 35px;
  font-size: 17px;
  font-weight: 400;
}
.highlight {
  color: #3f8ae2;
  font-weight: 400;
}
.stat-container {
  margin-bottom: 30px;
}
.spinner {
  margin-top: 40px;
}
</style>
