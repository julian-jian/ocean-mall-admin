<template> 
  <company-addr-detail :is-edit='false'></company-addr-detail>
</template>
<script>
  import CompanyAddrDetail from './components/CompanyAddrDetail'
  export default {
    name: 'addCompanyAddr',
    components: { CompanyAddrDetail }
  }
</script>
<style>
</style>


