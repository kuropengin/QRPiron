<template>
  <div class="column">
    <div class="main">
      <attendance />
    </div>
    <div class="sub" v-bind:class="{ nonScroll: this.$store.state.appAlert }">
      <history />
      <appalert v-if="this.$store.state.appAlert"/>
    </div>
    <div class="back-icon"></div>
    <div class="sub-qr-btn" @click="$router.push('/qr')">
      <fontAwesome icon="qrcode" class="sub-qr-btn-img"/>
    </div>
  </div>
</template>


<script>
	export default {
    mounted() {
      const setFillHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
      window.addEventListener('resize', setFillHeight);
      setFillHeight();

      if(!this.$route.query.source){
        this.$store.commit('onAlert')
      }
    }
	};
</script>

<style scoped>
  .back-icon{
    position: absolute;
    top: 10px;
    left: 10px;
    width: 60px;
    height: 60px;
    background-image: url(~assets/img/QRPiron-w.svg);
    background-size: cover;
  }
  .sub-qr-btn{
    position: absolute;
    bottom: 30px;
    right: 20px;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
    background: #60ac63;
    cursor: pointer;
  }

  .sub-qr-btn-img{
    width: 50px;
    height: 50px;
    margin: 15px;
    color: #FFF;
  }

  .nonScroll{
    overflow: hidden;
  }
</style>