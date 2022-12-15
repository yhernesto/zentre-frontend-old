<template>
  <q-card class="selectedCountry">
    <highcharts :options="chartOptions" ref="lineCharts"></highcharts>

    <q-card-actions align="right">
      <q-btn
        flat
        label="OK"
        color="primary"
        v-close-popup
        @click="closeDialog"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import userViewController from "@/views/charts/chartsController";

userViewController.showLoadingAnimation = false;
const selectedCountryData =
  userViewController.analyticsInformationForSelectedCountry!.data.regions.map(
    (e) => {
      return [e.name, Number(e.pageViews)];
    }
  );

const chartOptions = {
  title: {
    text: userViewController.analyticsInformationForSelectedCountry!.data
      .country,
  },
  chart: {
    type: "bar",
  },
  xAxis: {
    type: "category",
    title: {
      text: null,
    },
    min: 0,
    max: selectedCountryData.length - 1,
    scrollbar: {
      enabled: true,
    },
    tickLength: 0,
  },
  yAxis: {
    min: 0,
    max:
      Number(
        userViewController.analyticsInformationForSelectedCountry!.pageViews
      ) > 5
        ? "5"
        : userViewController.analyticsInformationForSelectedCountry!.pageViews,
    title: {
      text: "Views",
      align: "high",
    },
  },
  plotOptions: {
    bar: {
      dataLabels: {
        enabled: true,
      },
    },
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: "Views",
      data: selectedCountryData,
      colorKey: 15,
    },
  ],
  colors: ["#f28f43", "#77a1e5", "#c42525", "#a6c96a"],
};

const closeDialog = () => {
  userViewController.showDialog = false;
};
</script>

<style scoped>
.selectedCountry {
  width: 80vw;
}
</style>
