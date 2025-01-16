<template>
  <!-- <div v-if="isFetching === true"
    class="absolute top-0 left-0 w-full h-full bg-black/75 overflow-hidden">
    <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <Loading/>
    </div>
  </div> -->
  <div class="min-h-dvh w-full bg-blue-100 space-y-5 p-2 lg:p-5 ">
    <div class="flex items-center justify-between h-12 rounded shadow-md shadow-blue-200 bg-white p-2 lg:p-5">
      <div class="invisible">Export</div>
      <h1 class="text-xl font-bold">
        {{ this.$route.params.appName }}
      </h1>
      <div class="relative innline-block text-left">
        <button @click="isDropdownHidden = !isDropdownHidden"
          class="text-sm rounded text-white font-semibold bg-blue-500 px-2 py-1 hover:bg-blue-600">
          Export
        </button>
        <div class="absolute right-0 w-max origin-top-right rounded bg-blue-500 z-10 mt-2 focus:outline-none"
          :class="{ 'hidden': isDropdownHidden }">
          <div class="py-1">
            <button @click="isOpenPreview = true, isDropdownHidden = true, resetFilters(), handleFilterChange()"
              class="block text-xs text-white bg-blue-500 px-2 py-1 hover:bg-blue-600">
              Export as PDF
            </button>
            <hr>
            <button @click="exportToSCV()"
              class="block text-xs text-white bg-blue-500 px-2 py-1 hover:bg-blue-600">
              Export as CSV
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-y-5 lg:gap-5">
      <div class="rounded shadow-md shadow-blue-200 bg-white p-5">
        <h1 class="text-center text-xl font-semibold p-2">Current Active</h1>
        <hr class="my-2">
        <h1 class="text-center text-2xl font-semibold mb-2">
          {{ currentActive ? currentActive : 'N/A' }}
        </h1>
        <h2 class="text-center text-xs text-slate-500">
          {{ currentActive === 'DCI' ? 'Data Center' : (currentActive === 'BSD' ? 'Disaster Recovery Center' : 'N/A') }}
        </h2>
      </div>
      <div class="col-span-3 space-y-2">
        <h1 class="text-center text-xl font-semibold rounded shadow-md shadow-blue-200 bg-white p-2">
          Switchover Readiness
        </h1>
        <div class="flex h-28 space-x-2">
          <div class="flex-1 h-full font-bold text-white rounded shadow-md shadow-blue-200 bg-white p-2">
            <div class="flex flex-col h-full justify-center">
              <div class="flex items-center justify-between p-2">
                <span class="flex flex-col">
                  <h1 class="text-xs font-medium text-slate-500">Readiness {{ this.$route.params.appName }} BSD:</h1>
                  <h2 class="text-sm font-semibold text-black">
                    {{ readiness.BSD.status ? readiness.BSD.status : 'N/A' }}
                  </h2>
                </span>
                <span class="flex flex-col">
                  <h1 class="text-xs font-medium text-slate-500 text-end">Last Execution:</h1>
                  <h2 class="text-sm font-semibold text-black text-end">
                    {{ readiness.BSD.lastExecution ? formatDate(readiness.BSD.lastExecution) : 'N/A' }}
                  </h2>
                </span>
              </div>
              <hr class="border-gray-200">
              <div class="flex items-center justify-between p-2">
                <span class="flex flex-col">
                  <h1 class="text-xs font-medium text-slate-500">PreImplement {{ this.$route.params.appName }} to BSD:</h1>
                  <h2 class="text-sm font-semibold text-black">
                    {{ preImplement.BSD.status ? preImplement.BSD.status : 'N/A' }}
                  </h2>
                </span>
                <span class="flex flex-col">
                  <h1 class="text-xs font-medium text-slate-500 text-end">Last Execution:</h1>
                  <h2 class="text-sm font-semibold text-black text-end">
                    {{ preImplement.BSD.lastExecution ? formatDate(preImplement.BSD.lastExecution) : 'N/A' }}
                  </h2>
                </span>
              </div>
            </div>
          </div>
          <div class="flex-1 h-full font-bold text-white rounded shadow-md shadow-blue-200 bg-white p-2">
            <div class="flex flex-col h-full justify-center">
              <div class="flex items-center justify-between p-2">
                <span class="flex flex-col">
                  <h1 class="text-xs font-medium text-slate-500">Readiness {{ this.$route.params.appName }} DCI:</h1>
                  <h2 class="text-sm font-semibold text-black">
                    {{ readiness.DCI.status ? readiness.DCI.status : 'N/A' }}
                  </h2>
                </span>
                <span class="flex flex-col">
                  <h1 class="text-xs font-medium text-slate-500 text-end">Last Execution:</h1>
                  <h2 class="text-sm font-semibold text-black text-end">
                    {{ readiness.DCI.lastExecution ? formatDate(readiness.DCI.lastExecution) : 'N/A' }}
                  </h2>
                </span>
              </div>
              <hr class="border-gray-200">
              <div class="flex items-center justify-between p-2">
                <span class="flex flex-col">
                  <h1 class="text-xs font-medium text-slate-500">PreImplement {{ this.$route.params.appName }} to DCI:</h1>
                  <h2 class="text-sm font-semibold text-black">
                    {{ preImplement.DCI.status ? preImplement.DCI.status : 'N/A' }}
                  </h2>
                </span>
                <span class="flex flex-col">
                  <h1 class="text-xs font-medium text-slate-500 text-end">Last Execution:</h1>
                  <h2 class="text-sm font-semibold text-black text-end">
                    {{ preImplement.DCI.lastExecution ? formatDate(preImplement.DCI.lastExecution) : 'N/A' }}
                  </h2>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
      <div class="col-span-2 space-y-2">
        <div class="flex items-center justify-center text-center text-xl font-semibold rounded shadow-md shadow-blue-200 bg-white p-2">
          <h1 class="me-2">DCI</h1> 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
          <h1 class="ms-2">BSD Runbook</h1>
        </div>
        <div class="flex space-x-2">
          <div class="flex-grow space-y-2">
            <div @click="this.filter.runbook = this.filter.runbook ? '' : `BDISOA_Switch_Over_${this.$route.params.appName}_To_BSD`"
              :class="{ 'border border-blue-500': this.filter.runbook === `BDISOA_Switch_Over_${this.$route.params.appName}_To_BSD` }"
              class="rounded shadow-md shadow-blue-200 bg-white space-y-3 p-2 md:p-5 cursor-pointer hover:bg-blue-50">
              <div class="flex flex-wrap items-center justify-between">
                <h2 class="text-base font-semibold">Switchover to BSD</h2>
                <div>
                  <h3 class="text-xs text-slate-500 text-end">Progress</h3>
                  <h1 class="text-xl font-semibold text-end">
                    {{ 
                      runbook.totalJobs.DCIToBSD.switchOver > 0 
                        ? ((runbook.totalJobsDone.DCIToBSD.switchOver / runbook.totalJobs.DCIToBSD.switchOver) * 100).toFixed(1) + ' %'
                        : 'N/A'
                    }}
                  </h1>
                  <h2 class="text-sm text-end">
                    {{ runbook.DCIToBSD.switchOver.status ? runbook.DCIToBSD.switchOver.status : 'N/A' }}
                  </h2>
                </div>
              </div>
              <hr>
              <div class="flex flex-wrap justify-between">
                <div v-if="runbook.DCIToBSD.switchOver.start_time && runbook.DCIToBSD.switchOver.end_time">
                  <h2 class="text-xs text-slate-500">Duration</h2>
                  <h1 class="text-sm">
                    {{ formatDuration(runbook.DCIToBSD.switchOver.start_time, runbook.DCIToBSD.switchOver.end_time) }}
                  </h1>
                </div>
                <div v-else>
                  <h2 class="text-xs text-slate-500">Est. Duration</h2>
                  <h1 class="text-sm">
                    {{ runbook.DCIToBSD.switchOver.estimatedDuration ? runbook.DCIToBSD.switchOver.estimatedDuration : 'N/A' }}
                  </h1>
                </div>
                <div>
                  <h2 class="text-xs text-slate-500 text-end">Last Execution</h2>
                  <h1 class="text-sm text-end">
                    {{ runbook.DCIToBSD.switchOver.lastExecution ? formatDate(runbook.DCIToBSD.switchOver.lastExecution) : 'N/A' }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-grow space-y-2">
            <div @click="() => { 
                this.filter.runbook = this.filter.runbook ? '' : `BDISOA_Rollback_${this.$route.params.appName}_To_DCI`
                this.calculateTotalJobsPerDay();
                this.calculateTotalStatuses();
              }"
              :class="{ 'border border-blue-500': this.filter.runbook === `BDISOA_Rollback_${this.$route.params.appName}_To_DCI` }"
              class="rounded shadow-md shadow-blue-200 bg-white space-y-3 p-2 md:p-5 cursor-pointer hover:bg-blue-50">
              <div class="flex flex-wrap items-center justify-between">
                <h2 class="text-base font-semibold">Fallback to DCI</h2>
                <div>
                  <h3 class="text-xs text-slate-500 text-end">Progress</h3>
                  <h1 class="text-xl font-semibold text-end">
                    {{ 
                      runbook.totalJobs.DCIToBSD.rollback > 0 
                        ? ((runbook.totalJobsDone.DCIToBSD.rollback / runbook.totalJobs.DCIToBSD.rollback) * 100).toFixed(1) + ' %'
                        : 'N/A'
                    }}
                  </h1>
                  <h2 class="text-sm text-end">
                    {{ runbook.DCIToBSD.rollback.status ? runbook.DCIToBSD.rollback.status : 'N/A' }}
                  </h2>
                </div>
              </div>
              <hr>
              <div class="flex flex-wrap justify-between">
                <div v-if="runbook.DCIToBSD.rollback.start_time && runbook.DCIToBSD.rollback.end_time">
                  <h2 class="text-xs text-slate-500">Duration</h2>
                  <h1 class="text-sm">
                    {{ formatDuration(runbook.DCIToBSD.rollback.start_time, runbook.DCIToBSD.rollback.end_time) }}
                  </h1>
                </div>
                <div v-else>
                  <h2 class="text-xs text-slate-500">Est. Duration</h2>
                  <h1 class="text-sm">
                    {{ runbook.DCIToBSD.rollback.estimatedDuration ? runbook.DCIToBSD.rollback.estimatedDuration : 'N/A' }}
                  </h1>
                </div>
                <div>
                  <h2 class="text-xs text-slate-500 text-end">Last Execution</h2>
                  <h1 class="text-sm text-end">
                    {{ runbook.DCIToBSD.rollback.lastExecution ? formatDate(runbook.DCIToBSD.rollback.lastExecution) : 'N/A' }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-2 space-y-2">
        <div class="flex items-center justify-center text-center text-xl font-semibold rounded shadow-md shadow-blue-200 bg-white p-2">
          <h1 class="me-2">BSD</h1>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
          <h1 class="ms-2">DCI Runbook</h1> 
        </div>
        <div class="flex space-x-2">
          <div class="flex-grow space-y-2">
            <div @click="() => { 
                this.filter.runbook = this.filter.runbook ? '' : `BDISOA_Switch_Over_${this.$route.params.appName}_To_DCI`
                this.calculateTotalJobsPerDay();
                this.calculateTotalStatuses();
              }"
              :class="{ 'border border-blue-500': this.filter.runbook === `BDISOA_Switch_Over_${this.$route.params.appName}_To_DCI` }"
              class="rounded shadow-md shadow-blue-200 bg-white space-y-3 p-2 md:p-5 cursor-pointer hover:bg-blue-50">
              <div class="flex flex-wrap items-center justify-between">
                <h2 class="text-base font-semibold">Switchover to DCI</h2>
                <div>
                  <h3 class="text-xs text-slate-500 text-end">Progress</h3>
                  <h1 class="text-xl font-semibold text-end">
                    {{ 
                      runbook.totalJobs.BSDToDCI.switchOver > 0 
                        ? ((runbook.totalJobsDone.BSDToDCI.switchOver / runbook.totalJobs.BSDToDCI.switchOver) * 100).toFixed(1) + ' %'
                        : 'N/A'
                    }}
                  </h1>
                  <h2 class="text-sm text-end">
                    {{ runbook.BSDToDCI.switchOver.status ? runbook.BSDToDCI.switchOver.status : 'N/A' }}
                  </h2>
                </div>
              </div>
              <hr>
              <div class="flex flex-wrap justify-between">
                <div v-if="runbook.BSDToDCI.switchOver.start_time && runbook.BSDToDCI.switchOver.end_time">
                  <h2 class="text-xs text-slate-500">Duration</h2>
                  <h1 class="text-sm">
                    {{ formatDuration(runbook.BSDToDCI.switchOver.start_time, runbook.BSDToDCI.switchOver.end_time) }}
                  </h1>
                </div>
                <div v-else>
                  <h2 class="text-xs text-slate-500">Est. Duration</h2>
                  <h1 class="text-sm">
                    {{ runbook.BSDToDCI.switchOver.estimatedDuration ? runbook.BSDToDCI.switchOver.estimatedDuration : 'N/A' }}
                  </h1>
                </div>
                <div>
                  <h2 class="text-xs text-slate-500 text-end">Last Execution</h2>
                  <h1 class="text-sm text-end">
                    {{ runbook.BSDToDCI.switchOver.lastExecution ? formatDate(runbook.BSDToDCI.switchOver.lastExecution) : 'N/A' }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-grow space-y-2">
            <div @click="() => { 
                this.filter.runbook = this.filter.runbook ? '' : `BDISOA_Rollback_${this.$route.params.appName}_To_BSD`
                this.calculateTotalJobsPerDay();
                this.calculateTotalStatuses();
              }"
              :class="{ 'border border-blue-500': this.filter.runbook === `BDISOA_Rollback_${this.$route.params.appName}_To_BSD` }"
              class="rounded shadow-md shadow-blue-200 bg-white space-y-3 p-2 md:p-5 cursor-pointer hover:bg-blue-50">
              <div class="flex flex-wrap items-center justify-between">
                <h2 class="text-base font-semibold">Fallback to BSD</h2>
                <div>
                  <h3 class="text-xs text-slate-500 text-end">Progress</h3>
                  <h1 class="text-xl font-semibold text-end">
                    {{ 
                      runbook.totalJobs.BSDToDCI.rollback > 0 
                        ? ((runbook.totalJobsDone.BSDToDCI.rollback / runbook.totalJobs.BSDToDCI.rollback) * 100).toFixed(1) + ' %'
                        : 'N/A'
                    }}
                  </h1>
                  <h2 class="text-sm text-end">
                    {{ runbook.BSDToDCI.rollback.status ? runbook.BSDToDCI.rollback.status : 'N/A' }}
                  </h2>
                </div>
              </div>
              <hr>
              <div class="flex flex-wrap justify-between">
                <div v-if="runbook.BSDToDCI.rollback.start_time && runbook.BSDToDCI.rollback.end_time">
                  <h2 class="text-xs text-slate-500">Duration</h2>
                  <h1 class="text-sm">
                    {{ formatDuration(runbook.BSDToDCI.rollback.start_time, runbook.BSDToDCI.rollback.end_time) }}
                  </h1>
                </div>
                <div v-else>
                  <h2 class="text-xs text-slate-500">Est. Duration</h2>
                  <h1 class="text-sm">
                    {{ runbook.BSDToDCI.rollback.estimatedDuration ? runbook.BSDToDCI.rollback.estimatedDuration : 'N/A' }}
                  </h1>
                </div>
                <div>
                  <h2 class="text-xs text-slate-500 text-end">Last Execution</h2>
                  <h1 class="text-sm text-end">
                    {{ runbook.BSDToDCI.rollback.lastExecution ? formatDate(runbook.BSDToDCI.rollback.lastExecution) : 'N/A' }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
      <div class="lg:col-span-1 h-96 rounded shadow-md shadow-blue-200 bg-white p-2 md:p-5">
        <h1 class="text-xl font-semibold mb-3">Workflow</h1>
        <div class="h-72 overflow-y-auto space-y-2">
          <div v-for="(item, index) of workflow" :key="index"
            class="rounded border p-2 md:p-5">
            <div class="flex justify-between">
              <h3 class="text-sm font-semibold my-auto">{{ item.name }}</h3>
              <div>
                <h3 class="text-xs text-slate-500 text-end">SRT</h3>
                <h3 class="text-sm text-end">{{ item.srt_end_time ? formatDuration(item.srt_end_time, item.srt_start_time) : 'N/A' }}</h3>
              </div>
            </div>
            <hr class="my-2">
            <div class="flex justify-between">
              <div>
                <h2 class="text-xs text-slate-500">Start Time</h2>
                <h3 class="text-sm">{{ item.start_time ? formatDate(item.start_time) : 'N/A' }}</h3>
              </div>
              <div>
                <h2 class="text-xs text-slate-500 text-end">End Time</h2>
                <h3 class="text-sm text-end">{{ item.end_time ? formatDate(item.end_time) : 'N/A' }}</h3>
              </div>
            </div>
          </div>
          <div v-if="workflow.length === 0"
            class="rounded border p-2 md:p-5">
            <div class="flex justify-between">
              <h3 class="text-sm font-semibold my-auto">N/A</h3>
              <div>
                <h3 class="text-xs text-slate-500 text-end">SRT</h3>
                <h3 class="text-sm text-end">N/A</h3>
              </div>
            </div>
            <hr class="my-2">
            <div class="flex justify-between">
              <div>
                <h2 class="text-xs text-slate-500">Start Time</h2>
                <h3 class="text-sm">N/A</h3>
              </div>
              <div>
                <h2 class="text-xs text-slate-500 text-end">End Time</h2>
                <h3 class="text-sm text-end">N/A</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-1 h-96 rounded shadow-md shadow-blue-200 bg-white p-2 md:p-5">
        <h1 class="text-xl font-semibold">Status Summary {{ this.$route.params.appName }}</h1>
        <div class="h-80">
          <DoughnutChart ref="summaryStatusChart" :chartDataProps="SummaryStatusChartData" />
        </div>
      </div>
      <div class="col-span-2 lg:col-span-2 h-96 rounded shadow-md shadow-blue-200 bg-white p-2 md:p-5">
        <h1 class="text-xl font-semibold">Jobs Overview {{ this.$route.params.appName }}</h1>
        <div class="h-80">
          <LineChart ref="overviewChart" :chartDataProps="OverviewChartData" /> 
        </div>
      </div>
    </div>
    <!-- h-[40rem] -->
    <div class="w-full h-auto rounded shadow-md shadow-blue-200 bg-white p-2 md:p-5">
      <div class="flex justify-between flex-col md:flex-row mb-3 md:mb-5 space-y-3 md:space-y-0">
        <div class="flex flex-col md:flex-row md:items-center gap-3">
          <span class="text-sm font-semibold">Filter: </span>
          <select v-model="filter.type" @change="handleFilterChange()"
            class="border border-blue-500 rounded text-sm cursor-pointer px-1 py-1">
            <option value="">All Type</option>
            <option value="Job">Job</option>
            <option value="Command">Command</option>
          </select>
          <select v-model="filter.status" @change="handleFilterChange()"
            class="border border-blue-500 rounded text-sm cursor-pointer px-1 py-1">
            <option value="">All Status</option>
            <option value="Executing">Executing</option>
            <option value="Wait">Waiting</option>
            <option value="Ended Not OK">Ended Not OK</option>
            <option value="Ended OK">Ended OK</option>
          </select>
          <select v-model="filter.runbook" @change="handleFilterChange()"
            class="border border-blue-500 rounded text-sm cursor-pointer px-1 py-1">
            <option value="">All Runbook</option>
            <option :value="`BDISOA_Readiness_${this.$route.params.appName}_To_BSD`">Readiness BSD</option>
            <option :value="`BDISOA_Readiness_${this.$route.params.appName}_To_DCI`">Readiness DCI</option>
            <option :value="`BDISOA_Switch_Over_${this.$route.params.appName}_To_BSD`">Switch Over DCI To BSD</option>
            <option :value="`BDISOA_Rollback_${this.$route.params.appName}_To_DCI`">Fallback BSD To DCI</option>
            <option :value="`BDISOA_Switch_Over_${this.$route.params.appName}_To_DCI`">Switch Over BSD To DCI</option>
            <option :value="`BDISOA_Rollback_${this.$route.params.appName}_To_BSD`">Fallback DCI To BSD</option>
          </select>
          <input type="date" v-model="filter.selectedDay"
            :min="minSelectedDay"
            :max="maxSelectedDay"
            @change="() => { convertSelectedDay(); handleFilterChange(); }" 
            class="border border-blue-500 rounded text-sm cursor-pointer px-1 py-[2px]">
          <button @click="() => { resetFilters(), handleFilterChange() }" class="border border-blue-500 text-blue-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white text-sm font-semibold rounded-md px-3 py-1">Reset</button>
        </div>
        <div class="flex flex-col md:flex-row md:items-center gap-3">
          <span class="text-sm font-semibold">Search: </span>
          <div class="flex">
            <input v-model="searchQuery" @input="applySearch" type="text" placeholder="Search By Job Name" class="w-full md:w-auto border border-blue-500 rounded-s text-sm px-2 py-1">
            <button id="search-button" class="border-y border-e border-blue-500 hover:bg-blue-500 hover:text-white rounded-e text-sm cursor-pointer px-2 py-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="16"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="overflow-x-scroll">
        <table id="table-dataset" class="table-auto xl:text-xs 2xl:text-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Application</th>
              <th>Sub-App</th>
              <th>Order Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration</th>
              <!-- <th>Job</th> -->
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(job, index) in paginatedItems" :key="index">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td>{{ job.name }}</td>
              <td>{{ job.type }}</td>
              <td>{{ job.application ? job.application : 'N/A' }}</td>
              <td>{{ job.sub_application ? job.sub_application : 'N/A' }}</td>
              <td>{{ formatDate(job.order_date).split(' ')[1] }}</td>
              <td>{{ job.start_time ? formatDate(job.start_time) : 'N/A' }}</td>
              <td>{{ job.end_time ? formatDate(job.end_time) : 'N/A' }}</td>
              <td>{{ job.start_time ? (job.end_time ? formatDuration(job.start_time, job.end_time) : 'N/A') : 'N/A' }}</td>
              <!-- <td>{{ job.held ? 'Held' : (job.deleted ? 'Deleted' : (job.cyclic ? 'Cyclic' : 'N/A')) }}</td> -->
              <td>{{ job.status }}</td>
            </tr>
            <tr v-if="paginatedItems.length == 0">
              <th colspan="10" class="text-center p-2">No data found</th>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination 
        class="mt-2 md:mt-5"
        :totalItems="filteredJobs.length" 
        :itemsPerPage="itemsPerPage" 
        :currentPage="currentPage" 
        @page-changed="handlePageChange"
        @items-per-page-changed="handleItemsPerPageChange"
      />
    </div>    
  </div>

  <!-- report preview  -->
  <div v-if="isOpenPreview"
    class="absolute top-0 left-1/2 translate-x-[-50%] p-2">
    <div class="flex w-full min-h-dvh h-full items-center justify-center">
      <div class="rounded bg-white border shadow-lg p-4">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-lg font-semibold">Report Preview</h1>
          <div class="flex items-center gap-4">
            <button @click="exportToPDF"
              class="text-white text-semibold rounded bg-blue-500 px-2 py-1">Export</button>
            <button @click="isOpenPreview = false">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            </button>
          </div>
        </div>
        <div id="report-preview-container">
          <div id="report-preview" ref="reportContent" class="bg-blue-100">
            
            <h1 class="ms-5 py-5">
              {{ 'Report created at ' + new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) }}</h1>
            <div class="min-h-dvh w-full space-y-4 p-2">
              <div class="flex items-center justify-center h-12 rounded shadow-md shadow-blue-200 bg-white p-2 md:p-5">
                <h1 class="text-lg font-bold">
                  {{ this.$route.params.appName }}
                </h1>
              </div>
              <div class="grid grid-cols-5 gap-4">
                <div class="rounded shadow-md shadow-blue-200 bg-white p-2">
                  <h1 class="text-center text-lg font-semibold p-2">Current Active</h1>
                  <hr class="mb-2">
                  <h1 class="text-center text-sm font-semibold mb-1">
                    {{ currentActive ? currentActive : 'N/A' }}
                  </h1>
                  <h2 class="text-center text-xs text-slate-500">
                    {{ currentActive === 'DCI' ? 'Data Center' : (currentActive === 'BSD' ? 'Disaster Recovery Center' : 'N/A') }}
                  </h2>
                </div>
                <div class="col-span-4 space-y-2">
                  <h1 class="text-center text-xl font-semibold rounded shadow-md shadow-blue-200 bg-white p-2">
                    Switchover Readiness
                  </h1>
                  <div class="flex h-28 space-x-2">
                    <div class="flex-1 h-full font-bold text-white rounded shadow-md shadow-blue-200 bg-white p-2">
                      <div class="flex flex-col h-full justify-center">
                        <div class="flex items-center justify-between p-2">
                          <span class="flex flex-col">
                            <h1 class="text-xs font-medium text-slate-500">Readiness {{ this.$route.params.appName }} BSD:</h1>
                            <h2 class="text-sm font-semibold text-black">
                              {{ readiness.BSD.status ? readiness.BSD.status : 'N/A' }}
                            </h2>
                          </span>
                          <span class="flex flex-col">
                            <h1 class="text-xs font-medium text-slate-500 text-end">Last Execution:</h1>
                            <h2 class="text-sm font-semibold text-black text-end">
                              {{ readiness.BSD.lastExecution ? formatDate(readiness.BSD.lastExecution) : 'N/A' }}
                            </h2>
                          </span>
                        </div>
                        <hr class="border-gray-200">
                        <div class="flex items-center justify-between p-2">
                          <span class="flex flex-col">
                            <h1 class="text-xs font-medium text-slate-500">PreImplement {{ this.$route.params.appName }} to BSD:</h1>
                            <h2 class="text-sm font-semibold text-black">
                              {{ preImplement.BSD.status ? preImplement.BSD.status : 'N/A' }}
                            </h2>
                          </span>
                          <span class="flex flex-col">
                            <h1 class="text-xs font-medium text-slate-500 text-end">Last Execution:</h1>
                            <h2 class="text-sm font-semibold text-black text-end">
                              {{ preImplement.BSD.lastExecution ? formatDate(preImplement.BSD.lastExecution) : 'N/A' }}
                            </h2>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="flex-1 h-full font-bold text-white rounded shadow-md shadow-blue-200 bg-white p-2">
                      <div class="flex flex-col h-full justify-center">
                        <div class="flex items-center justify-between p-2">
                          <span class="flex flex-col">
                            <h1 class="text-xs font-medium text-slate-500">Readiness {{ this.$route.params.appName }} DCI:</h1>
                            <h2 class="text-sm font-semibold text-black">
                              {{ readiness.DCI.status ? readiness.DCI.status : 'N/A' }}
                            </h2>
                          </span>
                          <span class="flex flex-col">
                            <h1 class="text-xs font-medium text-slate-500 text-end">Last Execution:</h1>
                            <h2 class="text-sm font-semibold text-black text-end">
                              {{ readiness.DCI.lastExecution ? formatDate(readiness.DCI.lastExecution) : 'N/A' }}
                            </h2>
                          </span>
                        </div>
                        <hr class="border-gray-200">
                        <div class="flex items-center justify-between p-2">
                          <span class="flex flex-col">
                            <h1 class="text-xs font-medium text-slate-500">PreImplement {{ this.$route.params.appName }} to DCI:</h1>
                            <h2 class="text-sm font-semibold text-black">
                              {{ preImplement.DCI.status ? preImplement.DCI.status : 'N/A' }}
                            </h2>
                          </span>
                          <span class="flex flex-col">
                            <h1 class="text-xs font-medium text-slate-500 text-end">Last Execution:</h1>
                            <h2 class="text-sm font-semibold text-black text-end">
                              {{ preImplement.DCI.lastExecution ? formatDate(preImplement.DCI.lastExecution) : 'N/A' }}
                            </h2>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2 space-y-2">
                  <div class="flex items-center justify-center text-center text-lg font-semibold rounded shadow-md shadow-blue-200 bg-white p-2">
                    <h1 class="me-2">DCI</h1> 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                    <h1 class="ms-2">BSD Runbook</h1>
                  </div>
                  <div class="flex space-x-2">
                    <div class="flex-grow space-y-2">
                      <div @click="this.filter.runbook = this.filter.runbook ? '' : `BDISOA_Switch_Over_${this.$route.params.appName}_To_BSD`"
                        :class="{ 'border border-blue-500': this.filter.runbook === `BDISOA_Switch_Over_${this.$route.params.appName}_To_BSD` }"
                        class="rounded shadow-md shadow-blue-200 bg-white space-y-3 p-2 cursor-pointer hover:bg-blue-50">
                        <div class="flex flex-wrap items-center justify-between">
                          <h2 class="text-base font-semibold">Switchover to BSD</h2>
                          <div>
                            <h3 class="text-xs text-slate-500 text-end">Progress</h3>
                            <h1 class="text-xl font-semibold text-end">
                              {{ 
                                runbook.totalJobs.DCIToBSD.switchOver > 0 
                                  ? ((runbook.totalJobsDone.DCIToBSD.switchOver / runbook.totalJobs.DCIToBSD.switchOver) * 100).toFixed(1) + ' %'
                                  : 'N/A'
                              }}
                            </h1>
                            <h2 class="text-sm text-end">
                              {{ runbook.DCIToBSD.switchOver.status ? runbook.DCIToBSD.switchOver.status : 'N/A' }}
                            </h2>
                          </div>
                        </div>
                        <hr>
                        <div class="flex flex-wrap justify-between">
                          <div v-if="runbook.DCIToBSD.switchOver.start_time && runbook.DCIToBSD.switchOver.end_time">
                            <h2 class="text-xs text-slate-500">Duration</h2>
                            <h1 class="text-sm">
                              {{ formatDuration(runbook.DCIToBSD.switchOver.start_time, runbook.DCIToBSD.switchOver.end_time) }}
                            </h1>
                          </div>
                          <div v-else>
                            <h2 class="text-xs text-slate-500">Est. Duration</h2>
                            <h1 class="text-sm">
                              {{ runbook.DCIToBSD.switchOver.estimatedDuration ? runbook.DCIToBSD.switchOver.estimatedDuration : 'N/A' }}
                            </h1>
                          </div>
                          <div>
                            <h2 class="text-xs text-slate-500 text-end">Last Execution</h2>
                            <h1 class="text-sm text-end">
                              {{ runbook.DCIToBSD.switchOver.lastExecution ? formatDate(runbook.DCIToBSD.switchOver.lastExecution) : 'N/A' }}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex-grow space-y-2">
                      <div @click="() => { 
                          this.filter.runbook = this.filter.runbook ? '' : `BDISOA_Rollback_${this.$route.params.appName}_To_DCI`
                          this.calculateTotalJobsPerDay();
                          this.calculateTotalStatuses();
                        }"
                        :class="{ 'border border-blue-500': this.filter.runbook === `BDISOA_Rollback_${this.$route.params.appName}_To_DCI` }"
                        class="rounded shadow-md shadow-blue-200 bg-white space-y-3 p-2 cursor-pointer hover:bg-blue-50">
                        <div class="flex flex-wrap items-center justify-between">
                          <h2 class="text-base font-semibold">Fallback to DCI</h2>
                          <div>
                            <h3 class="text-xs text-slate-500 text-end">Progress</h3>
                            <h1 class="text-xl font-semibold text-end">
                              {{ 
                                runbook.totalJobs.DCIToBSD.rollback > 0 
                                  ? ((runbook.totalJobsDone.DCIToBSD.rollback / runbook.totalJobs.DCIToBSD.rollback) * 100).toFixed(1) + ' %'
                                  : 'N/A'
                              }}
                            </h1>
                            <h2 class="text-sm text-end">
                              {{ runbook.DCIToBSD.rollback.status ? runbook.DCIToBSD.rollback.status : 'N/A' }}
                            </h2>
                          </div>
                        </div>
                        <hr>
                        <div class="flex flex-wrap justify-between">
                          <div v-if="runbook.DCIToBSD.rollback.start_time && runbook.DCIToBSD.rollback.end_time">
                            <h2 class="text-xs text-slate-500">Duration</h2>
                            <h1 class="text-sm">
                              {{ formatDuration(runbook.DCIToBSD.rollback.start_time, runbook.DCIToBSD.rollback.end_time) }}
                            </h1>
                          </div>
                          <div v-else>
                            <h2 class="text-xs text-slate-500">Est. Duration</h2>
                            <h1 class="text-sm">
                              {{ runbook.DCIToBSD.rollback.estimatedDuration ? runbook.DCIToBSD.rollback.estimatedDuration : 'N/A' }}
                            </h1>
                          </div>
                          <div>
                            <h2 class="text-xs text-slate-500 text-end">Last Execution</h2>
                            <h1 class="text-sm text-end">
                              {{ runbook.DCIToBSD.rollback.lastExecution ? formatDate(runbook.DCIToBSD.rollback.lastExecution) : 'N/A' }}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-span-2 space-y-2">
                  <div class="flex items-center justify-center text-center text-lg font-semibold rounded shadow-md shadow-blue-200 bg-white p-2">
                    <h1 class="me-2">BSD</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="16"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                    <h1 class="ms-2">DCI Runbook</h1> 
                  </div>
                  <div class="flex space-x-2">
                    <div class="flex-grow space-y-2">
                      <div @click="() => { 
                          this.filter.runbook = this.filter.runbook ? '' : `BDISOA_Switch_Over_${this.$route.params.appName}_To_DCI`
                          this.calculateTotalJobsPerDay();
                          this.calculateTotalStatuses();
                        }"
                        :class="{ 'border border-blue-500': this.filter.runbook === `BDISOA_Switch_Over_${this.$route.params.appName}_To_DCI` }"
                        class="rounded shadow-md shadow-blue-200 bg-white space-y-3 p-2 cursor-pointer hover:bg-blue-50">
                        <div class="flex flex-wrap items-center justify-between">
                          <h2 class="text-base font-semibold">Switchover to DCI</h2>
                          <div>
                            <h3 class="text-xs text-slate-500 text-end">Progress</h3>
                            <h1 class="text-xl font-semibold text-end">
                              {{ 
                                runbook.totalJobs.BSDToDCI.switchOver > 0 
                                  ? ((runbook.totalJobsDone.BSDToDCI.switchOver / runbook.totalJobs.BSDToDCI.switchOver) * 100).toFixed(1) + ' %'
                                  : 'N/A'
                              }}
                            </h1>
                            <h2 class="text-sm text-end">
                              {{ runbook.BSDToDCI.switchOver.status ? runbook.BSDToDCI.switchOver.status : 'N/A' }}
                            </h2>
                          </div>
                        </div>
                        <hr>
                        <div class="flex flex-wrap justify-between">
                          <div v-if="runbook.BSDToDCI.switchOver.start_time && runbook.BSDToDCI.switchOver.end_time">
                            <h2 class="text-xs text-slate-500">Duration</h2>
                            <h1 class="text-sm">
                              {{ formatDuration(runbook.BSDToDCI.switchOver.start_time, runbook.BSDToDCI.switchOver.end_time) }}
                            </h1>
                          </div>
                          <div v-else>
                            <h2 class="text-xs text-slate-500">Est. Duration</h2>
                            <h1 class="text-sm">
                              {{ runbook.BSDToDCI.switchOver.estimatedDuration ? runbook.BSDToDCI.switchOver.estimatedDuration : 'N/A' }}
                            </h1>
                          </div>
                          <div>
                            <h2 class="text-xs text-slate-500 text-end">Last Execution</h2>
                            <h1 class="text-sm text-end">
                              {{ runbook.BSDToDCI.switchOver.lastExecution ? formatDate(runbook.BSDToDCI.switchOver.lastExecution) : 'N/A' }}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex-grow space-y-2">
                      <div @click="() => { 
                          this.filter.runbook = this.filter.runbook ? '' : `BDISOA_Rollback_${this.$route.params.appName}_To_BSD`
                          this.calculateTotalJobsPerDay();
                          this.calculateTotalStatuses();
                        }"
                        :class="{ 'border border-blue-500': this.filter.runbook === `BDISOA_Rollback_${this.$route.params.appName}_To_BSD` }"
                        class="rounded shadow-md shadow-blue-200 bg-white space-y-3 p-2 cursor-pointer hover:bg-blue-50">
                        <div class="flex flex-wrap items-center justify-between">
                          <h2 class="text-base font-semibold">Fallback to BSD</h2>
                          <div>
                            <h3 class="text-xs text-slate-500 text-end">Progress</h3>
                            <h1 class="text-xl font-semibold text-end">
                              {{ 
                                runbook.totalJobs.BSDToDCI.rollback > 0 
                                  ? ((runbook.totalJobsDone.BSDToDCI.rollback / runbook.totalJobs.BSDToDCI.rollback) * 100).toFixed(1) + ' %'
                                  : 'N/A'
                              }}
                            </h1>
                            <h2 class="text-sm text-end">
                              {{ runbook.BSDToDCI.rollback.status ? runbook.BSDToDCI.rollback.status : 'N/A' }}
                            </h2>
                          </div>
                        </div>
                        <hr>
                        <div class="flex flex-wrap justify-between">
                          <div v-if="runbook.BSDToDCI.rollback.start_time && runbook.BSDToDCI.rollback.end_time">
                            <h2 class="text-xs text-slate-500">Duration</h2>
                            <h1 class="text-sm">
                              {{ formatDuration(runbook.BSDToDCI.rollback.start_time, runbook.BSDToDCI.rollback.end_time) }}
                            </h1>
                          </div>
                          <div v-else>
                            <h2 class="text-xs text-slate-500">Est. Duration</h2>
                            <h1 class="text-sm">
                              {{ runbook.BSDToDCI.rollback.estimatedDuration ? runbook.BSDToDCI.rollback.estimatedDuration : 'N/A' }}
                            </h1>
                          </div>
                          <div>
                            <h2 class="text-xs text-slate-500 text-end">Last Execution</h2>
                            <h1 class="text-sm text-end">
                              {{ runbook.BSDToDCI.rollback.lastExecution ? formatDate(runbook.BSDToDCI.rollback.lastExecution) : 'N/A' }}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div class="h-96 rounded shadow-md shadow-blue-200 bg-white p-2">
                  <h1 class="text-lg font-semibold my-2">Workflow</h1>
                  <div class="h-72 overflow-y-auto space-y-2">
                    <div v-for="(item, index) of workflow" :key="index"
                      class="rounded border p-2">
                      <div class="flex justify-between">
                        <h3 class="text-sm font-semibold my-auto">{{ item.name }}</h3>
                        <div>
                          <h3 class="text-xs text-slate-500 text-end">SRT</h3>
                          <h3 class="text-sm text-end">{{ item.srt_end_time ? formatDuration(item.srt_start_time, item.srt_end_time) : 'N/A' }}</h3>
                        </div>
                      </div>
                      <hr class="my-2">
                      <div class="flex justify-between">
                        <div>
                          <h2 class="text-xs text-slate-500">Start Time</h2>
                          <h3 class="text-sm">{{ item.start_time ? formatDate(item.start_time) : 'N/A' }}</h3>
                        </div>
                        <div>
                          <h2 class="text-xs text-slate-500 text-end">End Time</h2>
                          <h3 class="text-sm text-end">{{ item.end_time ? formatDate(item.end_time) : 'N/A' }}</h3>
                        </div>
                      </div>
                    </div>
                    <div v-if="workflow.length === 0"
                      class="rounded border p-2">
                      <div class="flex justify-between">
                        <h3 class="text-sm font-semibold my-auto">N/A</h3>
                        <div>
                          <h3 class="text-xs text-slate-500 text-end">SRT</h3>
                          <h3 class="text-sm text-end">N/A</h3>
                        </div>
                      </div>
                      <hr class="my-2">
                      <div class="flex justify-between">
                        <div>
                          <h2 class="text-xs text-slate-500">Start Time</h2>
                          <h3 class="text-sm">N/A</h3>
                        </div>
                        <div>
                          <h2 class="text-xs text-slate-500 text-end">End Time</h2>
                          <h3 class="text-sm text-end">N/A</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="h-96 rounded shadow-md shadow-blue-200 bg-white p-2 md:p-5">
                    <h1 class="text-lg font-semibold">Status Summary {{ this.$route.params.appName }}</h1>
                    <div class="h-80">
                      <DoughnutChart ref="summaryStatusChart" :chartDataProps="SummaryStatusChartData" />
                    </div>
                </div>
              </div>
              <div class="md:col-span-2 h-96 rounded shadow-md shadow-blue-200 bg-white p-2 md:p-5">
                  <h1 class="text-lg font-semibold">Jobs Overview {{ this.$route.params.appName }}</h1>
                  <div class="h-80">
                    <LineChart ref="overviewChart" :chartDataProps="OverviewChartData" /> 
                  </div>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#table-dataset {
  width: 100%;
  border-collapse: collapse; /* ensures the borders don't add extra space */
}
#table-dataset thead > tr > th:nth-child(1) {
  text-align: center;
}
#table-dataset  thead > tr > th {
  text-align: left;
}
#table-dataset  tbody > tr > td {
  text-align: left;
}
#table-dataset thead > tr > th:nth-child(1) {
  border-top-left-radius: 0.25rem;
}
#table-dataset thead > tr > th:nth-child(16) {
  border-top-right-radius: 0.25rem;
}
#table-dataset thead > tr > th {
  text-align: left;
  padding: 8px;
  border-bottom: 2px solid rgb(191 219 254); /* blue 300 */
  background-color: rgb(219 234 254); /* blue 200 */
}
#table-dataset tbody > tr > td:nth-child(1) {
  font-weight: 600;
}
#table-dataset tbody > tr:nth-child(even) {
  background-color: rgb(239 246 255); /* Light gray background for even rows */
}
#table-dataset tbody > tr:nth-child(odd) {
  background-color: rgb(255 255 255); /* White background for odd rows */
}
#table-dataset tbody > tr > td {
  padding: 8px;
  border-bottom: 1px solid #ddd; /* Optional: border for rows */
}
#search-button > svg > path {
  fill: #3B82F6;
}
#search-button:hover > svg > path {
  fill: #ffffff;
}
#report-preview-container {
  width: 800px
}
#report-preview {
  width: 100%;
}
</style>

<script>
import Tooltip from '@/components/Tooltip.vue'
import BarChart from '@/components/charts/BarChart.vue';
import DoughnutChart from '../components/charts/DoughnutChart.vue';
import LineChart from '../components/charts/LineChart.vue';
import CardCategory from '../components/cards/CategoryContainer.vue';
import CardSummary from '../components/cards/Summary.vue';
import Pagination from '../components/Pagination.vue';
import Loading from '@/components/Loading.vue';

import { useConfigStore } from '@/store/config';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default {
  components: { Tooltip, BarChart, DoughnutChart, LineChart, CardCategory, CardSummary, Pagination, Loading },
  data() {
    return {
      jobs: [],
      workflow: [],
      isFetching: false,
      currentActive: '',
      readiness: {
        DCI: {
          status: '',
          lastExecution: ''
        },
        BSD: {
          status: '',
          lastExecution: ''
        }
      },
      preImplement: {
        DCI: {
          status: '',
          lastExecution: ''
        },
        BSD: {
          status: '',
          lastExecution: ''
        }
      },
      runbook: {
        DCIToBSD: {
          switchOver: {
            status: '',
            estimatedDuration: '',
            lastExecution: '',
            end_time: ''
          },
          rollback: {
            status: '',
            estimatedDuration: '',
            lastExecution: '',
            end_time: ''
          }
        },
        BSDToDCI: {
          switchOver: {
            status: '',
            estimatedDuration: '',
            lastExecution: '',
            end_time: ''
          },
          rollback: {
            status: '',
            estimatedDuration: '',
            lastExecution: '',
            end_time: ''
          }
        },
        totalJobsDone: {
          DCIToBSD: {
            switchOver: 0,
            rollback: 0
          },
          BSDToDCI: {
            switchOver: 0,
            rollback: 0
          }
        },
        totalJobs: {
          DCIToBSD: {
            switchOver: 0,
            rollback: 0
          },
          BSDToDCI: {
            switchOver: 0,
            rollback: 0
          }
        },
      },
      itemsPerPage: 10,
      currentPage: 1,
      searchQuery: '',
      filter: {
        type: '',
        status: '',
        runbook: '',
        selectedDay: this.getToday(),
        selectedDayISO: ''
      },
      minSelectedDay: this.getStartOfMonth(),
      maxSelectedDay: this.getToday(),
      isDropdownHidden: true,
      isOpenPreview: false,
      OverviewChartData: {
        labels: [],
        datasets: [
          {
            label: 'Total Jobs', // Optional: Add a label for your dataset
            data: [],
            borderColor: 'rgb(168, 85, 247)', // Line color
            backgroundColor: 'rgb(168, 85, 247, 0.2)', // Fill under the line (optional)
            fill: 'origin',
            tension: 0.4 // Smoothness of the curve (0 for straight lines)
          }
        ]
      },
      SummaryStatusChartData: {
        labels: ['Ended OK', 'Ended not OK', 'Waiting', 'Executing' ],
        datasets: [
          {
            label: 'Total Jobs',
            data: [],
            backgroundColor: [
              'rgba(124,178,56,255)',
              'rgba(223,45,0,255)',
              'rgba(153,153,153,255)',
              'rgba(241,181,33,255)',
            ]
          }
        ]
      }
    }
  },
  computed: {
    filteredJobs() {
      // Filter jobs based on search query and other filters
      let filteredJobs = this.jobs.filter(job => {
        // Check if each job matches the search query
        const nameMatch = job.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        // Check if each job matches the filter criteria
        const typeMatch = this.filter.type === '' || job.type === this.filter.type;
        const statusMatch = this.filter.status === '' || job.status.includes(this.filter.status);
        const runbookMatch = this.filter.runbook === '' || job.folder.includes(this.filter.runbook);
        const dayMatch = this.filter.selectedDay === '' || 
          this.formatDate(job.order_date).split(' ')[1] == this.formatDate(this.filter.selectedDay).split(' ')[1];

        // Return true only if all criteria match
        return nameMatch && typeMatch && statusMatch && runbookMatch && dayMatch;
      });

      return filteredJobs;
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredJobs.slice(start, end);
    },
    config() {
      return useConfigStore().config;
    }
  },
  beforeMount() {
    this.fetchJobsandFolders();
  },
  mounted() {
    this.interval = setInterval(() => {
      this.fetchJobsandFolders();
    }, 5000); // Fetch data every 5 seconds
  },
  beforeDestroy() {
    clearInterval(this.interval); // Clear the interval when the component is destroyed
  },
  watch: {
    itemsPerPage() {
      this.currentPage = 1; // Reset to first page if items per page changes
    }
  },
  methods: {
    async fetchJobsandFolders() {
      if (this.isFetching === true) {
        return;
      }
      // console.log('fetching:', this.$route.params.appName)
      this.isFetching = true;

      const currentDate = new Date();
      currentDate.setHours(0, 0, 1, 0);  // Set the time to 00:00:01
      const today = currentDate.toISOString();
      
      try {
        const BASE_URL = `${this.config.isProtocolBackendSecure ? 'https://' : 'http://'}` + `${this.config.backendBaseUrl}`;
        const currentApplication = this.$route.params.appName;
        
        const response = await axios.get(`${BASE_URL}/api/jobs-folders/${currentApplication}`);
        this.jobs = response.data.jobs ?? [];

        this.calculateTotalStatuses();
        this.calculateTotalJobsPerDay();

        //current active
        const currentActiveApp = response.data.jobs?.filter(item => 
          item.name.includes(`APP_CHK_${currentApplication}`)
        );

        if (currentActiveApp.length > 0) {
          if (currentActiveApp[0]?.name.includes('DCI') || currentActiveApp[0]?.name.includes('BSD')) {
            this.currentActive = currentActiveApp?.filter(item => 
              item.status === 'Ended OK'
            )[0]?.name.replace(`APP_CHK_${currentApplication}_`, '')
          } else {
            this.currentActive = currentActiveApp?.some(item => item.status === 'Ended OK') ? 'DCI' : 'BSD'
          }
        } else {
          this.currentActive = 'N/A'
        }
        
        //readiness
        const readinessApp = response.data.folders?.filter(item => 
          item.name.includes(`BDISOA_Readiness_${currentApplication}`) &&
          !item.name.includes('/') &&
          item.start_time
        );

        console.log('readinessApp', readinessApp);
        this.readiness.DCI.status = readinessApp?.filter(item => item.name.includes('DCI'))[0]?.status || ''
        this.readiness.DCI.lastExecution = readinessApp?.filter(item => item.name.includes('DCI'))[0]?.start_time || ''
        this.readiness.BSD.status = readinessApp?.filter(item => item.name.includes('BSD'))[0]?.status || ''
        this.readiness.BSD.lastExecution = readinessApp?.filter(item => item.name.includes('BSD'))[0]?.start_time || ''

        //preimplement
        const preImplementApp = response.data.folders.filter(item => 
          item.name.includes(`BDISOA_PreImplement_${currentApplication}`) && 
          !item.name.includes('/') &&
          item.start_time
        );

        this.preImplement.DCI.status = preImplementApp?.filter(item => item.name.includes('DCI'))[0]?.status || ''
        this.preImplement.DCI.lastExecution = preImplementApp?.filter(item => item.name.includes('DCI'))[0]?.start_time || ''
        this.preImplement.BSD.status = preImplementApp?.filter(item => item.name.includes('BSD'))[0]?.status || ''
        this.preImplement.BSD.lastExecution = preImplementApp?.filter(item => item.name.includes('BSD'))[0]?.start_time || ''

        //runbook
        //TODO: check why not get the latest
          // update dont get the index 0. TODO: why its reorder to asc -> its desc
            // based on code and tracking, its all good
        //DONE - need review

        const latestDCIToBSDSwitchOver = response.data.folders.filter(item => 
          item.name === `BDISOA_Switch_Over_${currentApplication}_To_BSD` && item.start_time
        )[0];
        this.runbook.DCIToBSD.switchOver.status = latestDCIToBSDSwitchOver?.status;
        this.runbook.DCIToBSD.switchOver.estimatedDuration = latestDCIToBSDSwitchOver?.estimated_end_time 
          ? this.formatDuration(latestDCIToBSDSwitchOver?.estimated_end_time, latestDCIToBSDSwitchOver?.estimated_start_time) 
          : 'N/A';
        this.runbook.DCIToBSD.switchOver.lastExecution = latestDCIToBSDSwitchOver?.start_time;
        this.runbook.DCIToBSD.switchOver.end_time = latestDCIToBSDSwitchOver?.end_time;
        
        const latestDCIToBSDRollback = response.data.folders.filter(item => 
          item.name === `BDISOA_Rollback_${currentApplication}_To_DCI` && item.start_time
        )[0];
        this.runbook.DCIToBSD.rollback.status = latestDCIToBSDRollback?.status;
        this.runbook.DCIToBSD.rollback.estimatedDuration = latestDCIToBSDRollback?.estimated_end_time 
          ? this.formatDuration(latestDCIToBSDRollback?.estimated_end_time, latestDCIToBSDRollback?.estimated_start_time) 
          : 'N/A';
        this.runbook.DCIToBSD.rollback.lastExecution = latestDCIToBSDRollback?.start_time;
        this.runbook.DCIToBSD.rollback.end_time = latestDCIToBSDRollback?.end_time;
        
        const latestBSDToDCISwitchOver = response.data.folders.filter(item => 
          item.name === `BDISOA_Switch_Over_${currentApplication}_To_DCI` && item.start_time
        )[0];
        this.runbook.BSDToDCI.switchOver.status = latestBSDToDCISwitchOver?.status;
        this.runbook.BSDToDCI.switchOver.estimatedDuration = latestBSDToDCISwitchOver?.estimated_end_time 
          ? this.formatDuration(latestBSDToDCISwitchOver?.estimated_end_time, latestBSDToDCISwitchOver?.estimated_start_time) 
          : 'N/A';
        this.runbook.BSDToDCI.switchOver.lastExecution = latestBSDToDCISwitchOver?.start_time;
        this.runbook.BSDToDCI.switchOver.end_time = latestBSDToDCISwitchOver?.end_time;
        
        const latestBSDToDCIRollback = response.data.folders.filter(item => 
          item.name === `BDISOA_Rollback_${currentApplication}_To_BSD` && item.start_time
        )[0];
        this.runbook.BSDToDCI.rollback.status = latestBSDToDCIRollback?.status;
        this.runbook.BSDToDCI.rollback.estimatedDuration = latestBSDToDCIRollback?.estimated_end_time 
          ? this.formatDuration(latestBSDToDCIRollback?.estimated_end_time, latestBSDToDCIRollback?.estimated_start_time) 
          : 'N/A';
        this.runbook.BSDToDCI.rollback.lastExecution = latestBSDToDCIRollback?.start_time;
        this.runbook.BSDToDCI.rollback.end_time = latestBSDToDCIRollback?.end_time;

        //total jobs done
        const totalJobsDoneRunbook = response.data.totalJobsDoneRunbook[currentApplication];
        this.runbook.totalJobsDone.DCIToBSD.switchOver = totalJobsDoneRunbook?.DCI.switchOver
        this.runbook.totalJobsDone.DCIToBSD.rollback = totalJobsDoneRunbook?.DCI.rollback
        this.runbook.totalJobsDone.BSDToDCI.switchOver = totalJobsDoneRunbook?.BSD.switchOver
        this.runbook.totalJobsDone.BSDToDCI.rollback = totalJobsDoneRunbook?.BSD.rollback

        //total jobs 
        const totalJobsRunbook = response.data.totalJobsRunbook[currentApplication];
        this.runbook.totalJobs.DCIToBSD.switchOver = totalJobsRunbook?.DCI.switchOver;
        this.runbook.totalJobs.DCIToBSD.rollback = totalJobsRunbook?.DCI.rollback;
        this.runbook.totalJobs.BSDToDCI.switchOver = totalJobsRunbook?.BSD.switchOver;
        this.runbook.totalJobs.BSDToDCI.rollback = totalJobsRunbook?.BSD.rollback;
        
        // workflow 
        this.workflow = response.data.folders.filter(item => 
          item.name.includes(`Switch_Over_${currentApplication}`) && !item.name.includes('/') && item.start_time
        ).map(item => ({
          ...item,
          name: item.name.replace(/_/g, ' ').replace('BDISOA', '')
        }));

        const isTimeInRange = (srt_start_time, start_time, end_time) => {
          const SRTStartTime = new Date(srt_start_time);
          const startTime = new Date(start_time);
          
          if (!end_time) {
            return SRTStartTime >= startTime
          }

          const endTime = new Date(end_time);
          return SRTStartTime >= startTime && SRTStartTime <= endTime;
        }

          //add srt job
        const countSrt = (folder, start_time, end_time) => {
          const folderName = `BDISOA${folder.replace(/ /g, '_')}`
          // const minuteStartTime = start_time.slice(0, 16);
          const srtJobs = response.data.jobs.filter(item => 
            item.name.includes('#SRT_') && item.folder === folderName && isTimeInRange(item.start_time, start_time, end_time)
          )

          if (srtJobs.length > 0) {
            return { 
              srt_start_time: srtJobs[srtJobs.length - 1].start_time,  // Corrected index for the last item
              srt_end_time: srtJobs[0].end_time
            };
          } else {
            return { srt_start_time: null, srt_end_time: null };  // Handle no SRT jobs case
          }
        } 

        this.workflow = this.workflow.map(item => {
          const srtResult = countSrt(item.name, item.start_time, item.end_time);
          return {
            ...item,
            ...srtResult
          }
        });

        // logging
        console.log('runbook', this.runbook);
        // console.log('filter', this.filter);
        // console.log('workflow', this.workflow);
        // console.log('DCI -> BSD Runbook SO Job Done:', this.runbook.totalJobsDone.DCIToBSD.switchOver);
        // console.log('DCI -> BSD Runbook SO Job Total:', this.runbook.totalJobs.DCIToBSD.switchOver);

        // console.log('DCI -> BSD Runbook FB Job Done:', this.runbook.totalJobsDone.DCIToBSD.rollback);
        // console.log('DCI -> BSD Runbook FB Job Total:', this.runbook.totalJobs.DCIToBSD.rollback);

        // console.log('BSD -> DCI Runbook SO Job Done:', this.runbook.totalJobsDone.BSDToDCI.switchOver);
        // console.log('BSD -> DCI Runbook SO Job Total:', this.runbook.totalJobs.BSDToDCI.switchOver);

        // console.log('BSD -> DCI Runbook FB Job Done:', this.runbook.totalJobsDone.BSDToDCI.rollback);
        // console.log('BSD -> DCI Runbook FB Job Total:', this.runbook.totalJobs.BSDToDCI.rollback);

        // console.log('preImplement DCI: ', this.preImplement.DCI.status);
        // console.log('preImplement DCI: ', this.preImplement.DCI.lastExecution);
        // console.log('preImplement BSD: ', this.preImplement.BSD.status);
        // console.log('preImplement BSD: ', this.preImplement.BSD.lastExecution);
        
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetching = false;
      }
    },
    calculateTotalJobsPerDay() {
      this.OverviewChartData.labels.length = 0;
      this.OverviewChartData.datasets[0].data.length = 0;
      let daysArray = []

      const date = new Date(this.jobs[0].start_time);
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth();
      const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
      let totalDays = lastDayOfMonth.getUTCDate()

      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      
      for (let i = 1; i <= totalDays; i++) {
        this.OverviewChartData.labels.push(`${i} ${monthNames[month]}`)
      }

      // Initialize an array with day of month with value zeros (for days 1 to 31)
      daysArray = Array(totalDays).fill(0);
      // Loop through the jobs data
      this.jobs.forEach(job => {
        if (job.start_time) { // Ensure startTime exists (not null)
          let day = new Date(job.start_time).getUTCDate(); // Extract the day part from startTime
          if (day >= 1 && day <= totalDays) { // Ensure the day is within the range 1-31
            daysArray[day - 1]++; // Increment the count for the corresponding day (0-based index)
          }
        }
      });

      this.OverviewChartData.datasets[0].data = [...daysArray];
      this.$refs.lineChart?.chart.update()
    },
    calculateTotalStatuses() {
      const executingTotal = this.filteredJobs.filter(job => job.status === 'Executing').length;
      const waitingTotal = this.filteredJobs.filter(job => job.status === 'Wait Condition').length;
      const endedNotOkTotal = this.filteredJobs.filter(job => job.status === 'Ended Not OK').length;
      const endedOkTotal = this.filteredJobs.filter(job => job.status === 'Ended OK').length;

      // update SummaryStatusChartData with calculated totals
      this.SummaryStatusChartData.datasets[0].data = [endedOkTotal, endedNotOkTotal, waitingTotal, executingTotal];
    },
    parseDateTime(dateTimeStr) {
      // Extract parts from the string
      const year = parseInt(dateTimeStr.substring(0, 4), 10);
      const month = parseInt(dateTimeStr.substring(4, 6), 10) - 1; // JS months are 0-indexed
      const day = parseInt(dateTimeStr.substring(6, 8), 10);
      const hour = parseInt(dateTimeStr.substring(8, 10), 10);
      const minute = parseInt(dateTimeStr.substring(10, 12), 10);
      const second = parseInt(dateTimeStr.substring(12, 14), 10);

      // Create a new Date object
      return new Date(year, month, day, hour, minute, second);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
  
      date.setUTCHours(date.getUTCHours() + Number(`${import.meta.env.VITE_TIME_ZONE_OFFSET}`));

      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getUTCDate()).padStart(2, '0');
      const hours = String(date.getUTCHours()).padStart(2, '0');
      const minutes = String(date.getUTCMinutes()).padStart(2, '0');
      const seconds = String(date.getUTCSeconds()).padStart(2, '0');

      return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
    },
    formatDuration(start, end) {
      // Parse the ISO 8601 formatted date strings into Date objects
      const startTime = new Date(start);
      const endTime = new Date(end);

      // Calculate the duration in milliseconds
      const durationMs = endTime - startTime;
      const durationSeconds = Math.abs(durationMs / 1000);

      // Calculate hours, minutes, and seconds
      const hours = Math.floor(durationSeconds / 3600);
      const minutes = Math.floor((durationSeconds % 3600) / 60);
      const seconds = Math.floor(durationSeconds % 60);

      // Format each part to ensure two digits
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      // Return the formatted duration string
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    },
    getStartOfMonth() {
      const date = new Date();
      date.setDate(1);
      return date.toISOString().split('T')[0];
    },
    getToday() {
      const date = new Date();
      return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())).toISOString().split('T')[0];
    },
    convertSelectedDay() {
      const date = new Date(this.filter.selectedDay);
      date.setHours(0, 0, 1, 0);
      this.filter.selectedDayISO = date.toISOString();
    },
    resetFilters() {
      this.filter.type = '';
      this.filter.status = '';
      this.filter.runbook = '';
      this.filter.selectedDay = '';
      this.currentPage = 1;
      // this.applyFilters();
    },
    handleFilterChange() {
      this.calculateTotalJobsPerDay();
      this.calculateTotalStatuses();
    },
    applySearch() {
      // trigger reevaluation of filteredJobs computed property by updating the search query and back to top
      this.searchQuery = this.searchQuery.trim(); //anti space
      this.currentPage = 1;
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    handleItemsPerPageChange(newItemsPerPage) {
      this.itemsPerPage = newItemsPerPage;
      this.currentPage = 1; // reset to the first page
    },
    async exportToPDF() {
      const element = this.$refs.reportContent;

      // Capture the entire element as a high-quality canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality, adjust as needed
        useCORS: true,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width; // Proportionally scale the height

      // Height of the canvas slice to fit each PDF page
      const pageHeight = (canvas.width * pdfHeight) / pdfWidth;
      
      let position = 0;

      // Loop through each page height until we've covered the entire canvas height
      while (position < canvas.height) {
        // Create a temporary canvas for the current page slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = pageHeight;

        const pageCtx = pageCanvas.getContext("2d");

        // Draw the specific part of the main canvas on the page canvas
        pageCtx.drawImage(
          canvas,
          0, position, // Start at the current position on the main canvas
          canvas.width, pageHeight, // Crop area on the main canvas
          0, 0, // Start at top left of page canvas
          canvas.width, pageHeight // Fill the page canvas
        );

        // Convert the page canvas to an image and add to the PDF
        const imgData = pageCanvas.toDataURL("image/png");
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, pdfHeight);

        // Update position for the next slice
        position += pageHeight;

        // Add a new page in the PDF if there’s more content to add
        if (position < canvas.height) {
          pdf.addPage();
        }
      }

      pdf.save("download.pdf");
    },
    async exportToSCV() {
      try {
        const BASE_URL = `${this.config.isProtocolBackendSecure ? 'https://' : 'http://'}` + `${this.config.backendBaseUrl}`;
        const currentApplication = this.$route.params.appName;

        const response = await axios.get(`${BASE_URL}/api/jobs-folders/export/${currentApplication}
          ?type=${this.filter.type}
          &runbook=${this.filter.runbook}
          &status=${this.filter.status}
          &date=${this.filter.selectedDay}`, {
          responseType: 'blob'  // This tells Axios to expect a binary blob (the Excel file)
        });

        const selectedDay = this.filter.selectedDay
          ? new Date(this.filter.selectedDay).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })
          : new Date().toLocaleString('en-GB', {
              month: 'long',
              year: 'numeric',
            });

        const filename = [
          this.filter.type,
          this.filter.runbook.replace(/_/g, ' ') || currentApplication,
          this.filter.status,
          selectedDay
        ].filter(Boolean).join(' - ');
        
        const url = window.URL.createObjectURL(response.data);  // response.data is the blob
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.xlsx`;  // Make sure to use the correct extension (.xlsx)
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>