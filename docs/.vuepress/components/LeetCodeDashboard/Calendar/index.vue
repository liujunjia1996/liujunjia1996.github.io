<template>
  <div class="calendar">
    <div class="flex">
      <div class="text-base">
        过去一年一共提交了
        <span class="font-bold text-2xl">{{ amount }}</span>
        次
      </div>
      <div class="flex ml-auto">
        <div>
          累计提交：{{ totalActiveDays }}
        </div>
        <div>
          连续提交：{{ streak }}
        </div>
      </div>
    </div>
    <div class="flex mt-4">
      <Month
        v-for="(item, idx) in timeline"
        class="mr-4"
        :key="idx"
        :showMonth="idx >= 1"
        :indent="item.indent"
        :startTime="item.startTime"
        :endTime="item.endTime"
        :days="item.days"
        :submitList="submitList"
      />
    </div>
  </div>
</template>

<script>
import { fetchWithLeetCodeToken } from "../../utils";
import dayjs from "dayjs";
import Month from "./Month.vue";

export default {
  components: {
    Month,
  },
  data() {
    return {
      loading: false,
      streak: 0,
      totalActiveDays: 0,
      submitList: [],
      timeline: [],
    };
  },
  computed: {
    amount() {
      return this.submitList.reduce((sum, curr) => {
        return sum + curr.count
      }, 0)
    }
  },
  methods: {
    initMonths() {
      let minus = 0;
      const months = [];
      const now = dayjs();
      while (minus <= 12) {
        const month = now.subtract(minus, "month");
        let days = month.daysInMonth();
        let startTime = month.startOf('month')
        let endTime = month.endOf('month')
        if (minus === 0) {
          endTime = month
        }
        if (minus === 12) {
          startTime = month
        }
        months.unshift({
          startTime,
          endTime
        });
        minus++;
      }
      const reverseMonths = [...months].reverse();
      const result = [];
      reverseMonths.reduce((prev, curr) => {
        const { startTime, endTime } = curr;
        const days = endTime.date() - startTime.date() + 1
        const over = (days + prev) % 7;
        result.push({
          startTime: startTime.valueOf(),
          endTime: endTime.valueOf(),
          indent: 7 - over,
        });
        return over;
      }, 0);
      this.timeline = result.reverse();
    },
    initRecentData(data) {
      // console.log("recent", data);
    },
    initCalendarData(data) {
      // console.log("calendar", data);
      const { userCalendar } = data;
      const { streak, totalActiveDays, submissionCalendar } = userCalendar;
      this.streak = streak;
      this.totalActiveDays = totalActiveDays;
      const parseSubmission = JSON.parse(submissionCalendar);
      
      this.submitList = Object.keys(parseSubmission).map((time) => {
        return {
          time,
          count: parseSubmission[time],
        };
      });
      // console.log('submissionCalendar', JSON.parse(submissionCalendar))
    },
  },
  mounted() {
    this.initMonths();
    Promise.all([
      fetchWithLeetCodeToken("http://138.2.9.115:8080/recentSubmit/renlindong"),
      fetchWithLeetCodeToken("http://138.2.9.115:8080/calendar/renlindong"),
    ]).then(([recent, calendar]) => {
      this.initRecentData(recent);
      this.initCalendarData(calendar);
    });
  },
};
</script>

<style lang="scss">
.calendar {
  background-color: #fff;
  padding: 16px 12px;
  border-radius: 10px;
}
</style>
