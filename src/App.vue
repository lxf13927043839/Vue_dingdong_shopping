<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
  @rootRem: 37.5rem;
  #app {
    min-width: 320px;
    max-width: 640px;
    margin: 0 auto;
    padding-bottom: 50/@rootRem;
  }
</style>
