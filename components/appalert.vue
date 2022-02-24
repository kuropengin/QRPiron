<template>
	<div class="alert-area">
    <fontAwesome icon="xmark" class="alert-close" @click="$store.commit('offAlert')" />
    <h1>専用アプリの利用を推奨しています</h1>
    <div class="app-download-btn" v-if="!iosCheck" @click="installApp">アプリをインストール</div>
    <div class="app-download-ios" v-if="iosCheck">
      <h2>インストール方法</h2>
      <p>1. <fontAwesome icon="arrow-up-from-bracket" />共有ボタンをクリック</p>
      <p>2. ホーム画面に追加をクリック</p>
    </div>
    <div class="alert-message">
      <p>通常のQRコードアプリでは第三者が設置したQRコードによって悪意のあるサイトに誘導される可能性があります。</p>
      <img src="~/assets/img/sampleqr.png">
    </div>
	</div>
</template>

<script>
  export default {
    data() {
      return{
        installPromptEvent: null,
        iosCheck: false,
      }
    },
    mounted() {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault(); 
        this.installPromptEvent = event
      });
      this.isThisDeviceRunningiOS()
    },
    methods: {
      isThisDeviceRunningiOS() {
        if (['iPad Simulator', 'iPhone Simulator','iPod Simulator', 'iPad','iPhone','iPod'].includes(navigator.platform)){
          this.iosCheck = true;
        }
        else if (navigator.userAgent.includes('Mac') && 'ontouchend' in document){
          this.iosCheck = true;
        }   
        else {
          this.iosCheck = false;
        }
      },
      installApp(){
        this.installPromptEvent.prompt();
        event.userChoice.then((choice) => {
          this.installPromptEvent = null;
        });
      }
    }
	};
</script>

<style scoped>
  .alert-area{
    position: absolute;
    top: 0px;
    left: 0px;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    margin: 15px;
    background: #d5d5d5b5;
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-right-color: rgba(255, 255, 255, 0.2);
    border-bottom-color: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(15px);
    box-shadow: 0 5px 20px rgb(166 166 166 / 50%);
    z-index: 2;
    color: #378439;
    overflow: auto;
  }

  .alert-close{
    width: 20px;
    height: 20px;
    margin-left: calc(100% - 40px);
    margin-top: 10px;
    cursor: pointer;
  }

  .alert-area h1{
    margin-top: 5px;
    font-size: 18px;
    text-align: center;
  }

  .alert-message p{
    margin: 0 20px;
    margin-top: 20px;
    width: 100%;
    text-align: center;
  }

  .app-download-ios h2{
    margin-top: 5px;
    padding: 0 20px;
    font-size: 16px;
    text-align: start;
  }

  .app-download-ios p{
    padding: 0 40px;
    text-align: start;
  }

  .app-download-btn{
    width: 200px;
    margin: 0 auto;
    height: 40px;
    background: #499e4c;
    text-align: center;
    line-height: 40px;
    color: #FFF;
    font-weight: bold;
    box-shadow: 0px 2px 6px 0px rgb(0 0 0 / 30%);
    cursor: pointer;
  }

  .alert-message{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .alert-message img{
    width: 150px;
    height: 150px;
  }
</style>