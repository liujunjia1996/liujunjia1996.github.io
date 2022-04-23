<template>
  <div class="card">
    <div class="card-title">解题数量</div>
    <div class="card-content">
      <div class="progress-round-container">
        <Progress>
          <div class="text-xl font-bold">{{ resolvedAmount }}</div>
          <div class="text-sm text-gray-500">解决问题</div>
        </Progress>
      </div>
      <div class="progress-list">
        <div class="progress-item" v-for="item in list" :key="item.type">
          <div class="progress-item-header flex items-center">
            <div class="text-sm">
              {{ textMap[item.type] }}
            </div>
            <div class="ml-8 text-sm">
              {{ item.resolved }} / {{ item.amount }}
            </div>
          </div>
          <div
            :class="['progress-item-bar', `progress-item-bar--${item.type}`]"
          >
            <div
              :class="[
                'progress-item-bar__inner',
                `progress-item-bar__inner--${item.type}`,
              ]"
              :style="{ width: (item.resolved / item.amount) * 100 + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Progress from "./Progress.vue";
import { fetchWithLeetCodeToken } from "../utils"

export default {
  components: {
    Progress,
  },
  data() {
    return {
      textMap: {
        easy: "简单",
        medium: "中等",
        hard: "困难",
      },
      list: [],
    };
  },
  computed: {
    resolvedAmount() {
      return this.list.reduce((sum, curr) => {
        return sum + curr.resolved
      }, 0)
    },
    amount() {
      return this.list.reduce((sum, curr) => {
        return sum + curr.amount
      }, 0)
    }
  },
  methods: {
    initData(questionProgress) {
      const { numAcceptedQuestions, numUntouchedQuestions } = questionProgress
      this.list = numAcceptedQuestions.map((item, idx) => {
        const { difficulty, count } = item
        const unresolvedQuestion = numUntouchedQuestions[idx]
        return {
          type: difficulty.toLowerCase(),
          resolved: count,
          amount: unresolvedQuestion.count
        }
      })
    }
  },
  mounted() {
    fetchWithLeetCodeToken('http://138.2.9.115:8080/progress/renlindong')
      .then(res => {
        this.initData(res.userProfileUserQuestionProgress)
      })
  },
};
</script>

<style scoped>
.card {
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  padding-left: 13px;
  padding-right: 13px;
  padding-top: 16px;
  padding-bottom: 12px;
}
.card-title {
  color: rgba(60, 60, 67, 0.6);
  font-size: 12px;
}
.card-content {
  margin-top: 12px;
  display: flex;
  align-content: center;
}

.progress-round-container {
  position: relative;
  display: flex;
  align-items: center;
}

.progress-list {
  flex: 1;
  margin-left: 20px;
}

.progress-item-header {
  height: 32px;
}

.progress-item-bar {
  height: 4px;
  margin-top: 4px;
}

.progress-item-bar__inner {
  height: 100%;
}

.progress-item-bar--easy {
  background-color: rgba(45, 181, 93, 0.15);
}

.progress-item-bar__inner--easy {
  background-color: rgb(0, 175, 155);
}

.progress-item-bar--medium {
  background-color: rgba(255, 184, 0, 0.15);
}

.progress-item-bar__inner--medium {
  background-color: rgb(255, 184, 0);
}

.progress-item-bar--hard {
  background-color: rgba(239, 71, 67, 0.15);
}

.progress-item-bar__inner--hard {
  background-color: rgba(239, 71, 67);
}
</style>
