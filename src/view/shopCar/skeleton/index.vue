<script>
  import { ContentLoader } from "vue-content-loader"

  export default {
    components: { ContentLoader }
  }
</script>

<template>
  <content-loader
    :width="380"
    :height="550"
    :speed="2"
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <rect x="8" y="5" rx="2" ry="2" width="358" height="235" />
    <rect x="8" y="245" rx="2" ry="2" width="175" height="175" /> 
    <rect x="10" y="432" rx="0" ry="0" width="120" height="15" /> 
    <rect x="10" y="475" rx="0" ry="0" width="35" height="10" /> 
    <rect x="10" y="453" rx="0" ry="0" width="120" height="15" /> 
    <rect x="54" y="475" rx="0" ry="0" width="35" height="10" /> 
    <circle cx="172" cy="466" r="12" /> 
    <rect x="192" y="245" rx="2" ry="2" width="175" height="175" /> 
    <rect x="192" y="432" rx="0" ry="0" width="120" height="15" /> 
    <rect x="192" y="453" rx="0" ry="0" width="120" height="15" /> 
    <rect x="192" y="475" rx="0" ry="0" width="35" height="10" /> 
    <rect x="238" y="475" rx="0" ry="0" width="35" height="10" /> 
    <circle cx="352" cy="466" r="12" />
  </content-loader>
</template>
