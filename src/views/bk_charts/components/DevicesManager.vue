<template>
  <device-conecctions :chart-options="chartOptions" />
</template>

<script lang="ts" setup>
import type { IAnalyticsAudienceGenResponse } from "@/views/charts/models/IAudienceTypes";
import DeviceConecctions from "@/views/charts/components/usersViews/components/deviceConecctions.vue";
import { reactive } from "vue";

const props = defineProps<{
  chartInformation: IAnalyticsAudienceGenResponse;
}>();

//TODO: REFACTOR DATA TO MAKE CHART INFORMATION

const chartData = reactive(
  props.chartInformation.data.map(e => {
    return {
      name: e.name,
      y: e.users,
    }
  })
)
console.log({chartData});

const chartOptions = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: "Devices",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  plotOptions: {
    pie: {
      innerSize: "80%",
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f} %",
      },
      showInLegend: true,
    },
  },
  series: [
    {
      name: "Percentage",
      colorByPoint: true,
      data: chartData,
      // data: [
      //   {
      //     name: "Mobile",
      //     y: 30.0,
      //     sliced: true,
      //     selected: true,
      //     iconURL: "https://freesvg.org/img/1527145993.png",
      //     dif: -50,
      //   },
      //   {
      //     name: "Web",
      //     y: 70.0,
      //     iconURL:
      //       "https://www.creativefabrica.com/wp-content/uploads/2020/12/07/PC-Icon-Office-Graphics-7051486-1.jpg",
      //     dif: 80.7,
      //   },
      // ],
    },
  ],
  credits: {
    enabled: false,
  },
  legend: {
    //LINK: https://stackoverflow.com/questions/45788558/highcarts-custom-legend
    //LINK: http://jsfiddle.net/deep3015/ghqea1z4/
    //LINK: https://jsfiddle.net/BlackLabel/qbpLfmx0/
    useHTML: true,
    enabled: true,
    maxHeight: 90,
    labelFormatter: function (): any {
      //const color = this.dif > 0 ? "green" : "red";
      //const icon = this.dif > 0 ? "fa fal-arrow-up" : "fa fa-arrow-down";
      const iconName = this.name.toUpperCase() == 'MOBILE' ? 'fa fa-mobile-alt' : 'fa fa-desktop'
      return `
			<div class="container" style="">
        <div class="card">
          <div style="margin-left:7px; " class="front">${this.name}</div>
        <div class="back">
        <span style="float:left; margin-left:10px">
         <!-- <img src = "../assets/phone.png" width = "40px" height = "40px" /> -->
          <i class="${iconName}" style="width: 40px; min-height: 40px"></i>
         </span>
        </div>

        </div>
      </div>
			`;
    },
  },
};
</script>

<style scoped></style>
