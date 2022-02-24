<template>
	<div class="attend-info-area">
        <div class="attend-info">
            <div class="attend-status-area" v-bind:class="{ 'attend-status-ok': paramStatus == 2, 'attend-status-ng': paramStatus == 3 }">
                <div class="attend-status"><fontAwesome icon="circle-info" class="attend-status-img"/></div>
                <div class="attend-status-title">{{ statusTitle }}</div>
            </div>
            <div class="attend-info-date" v-if="paramStatus == 2">
                <div class="attend-info-date-title"><fontAwesome icon="clock" class="attend-info-date-img"/>打刻時間</div>
                <div class="attend-info-date-value">{{ attendData }}</div>
                <div class="attend-info-date-title"><fontAwesome icon="barcode" class="attend-info-date-img"/>打刻コード</div>
                <div class="attend-info-date-value">{{ attendCode }}</div>
            </div>
            <div class="attend-request-area" v-if="paramStatus == 1 || paramStatus == 3">
                <div class="qr-btn" @click="$router.push('/qr')"><fontAwesome icon="camera" class="qr-btn-img"/>QRコードの読み取り</div>
            </div>
	    </div>
	</div>
</template>

<script>
	export default {
        data(){
            return {
                paramStatus: 0,
                statusTitle : "読み取り中",
                attendData : "",
                attendCode : ""
            }
        },
        mounted() {
            /* 
                APIの仕様が不明な為、仮設 
                paramStatus:{
                    0: 初回ロード及び、QR読み取り中,
                    1: paramパラメーターなしの場合,
                    2: 打刻に成功,
                    3: 打刻に失敗
                }

            */
            if(!this.$route.query.param){
                this.paramStatus = 1
                this.statusTitle = "打刻してください"
            }
            else{
                this.paramStatus = 2
                this.statusTitle = "打刻に成功しました"

                const now = new Date()
                const Y = now.getFullYear()
                const M = now.getMonth() + 1
                const D = now.getDate()
                const h = now.getHours()
                const m = now.getMinutes()
                const s = now.getSeconds()

                this.attendData = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s
                
                this.attendCode = this.$route.query.param
                
            }
        }
	};
</script>

<style scoped>
    .attend-info-area{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .attend-info{
        width: calc(100% - 40px);
        max-height: 400px;
        background: #FFF;
        border-radius: 20px;
        box-shadow: rgb(0 0 0 / 16%) 0px 6px 12px, rgb(0 0 0 / 23%) 0px 6px 12px;
        background-image: linear-gradient(
            110deg,
            hsl(0deg 0% 90%) 0%,
            hsl(344deg 0% 91%) 1%,
            hsl(344deg 0% 93%) 5%,
            hsl(344deg 0% 95%) 13%,
            hsl(344deg 0% 97%) 25%,
            hsl(344deg 0% 98%) 40%,
            hsl(0deg 0% 100%) 57%,
            hsl(344deg 0% 98%) 72%,
            hsl(344deg 0% 97%) 83%,
            hsl(344deg 0% 95%) 91%,
            hsl(344deg 0% 93%) 96%,
            hsl(344deg 0% 91%) 99%,
            hsl(0deg 0% 90%) 100%
        );
        z-index: 5;
    }

    .attend-status-area{
        position: relative;
        width: calc(100% - 40px);
        margin: 10px 20px;
        margin-top: 20px;
        display: flex;
        background: #9b9b9b;
        border-radius: 5px;
        justify-content: center;
    }

    .attend-status-ok{
        background: #61a5ff;
    }

    .attend-status-ng{
        background: #ff6d6d;
    }

    .attend-status{
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        left: 0;
    }

    .attend-status-img{
        width: 22px;
        height: 22px;
        margin: 9px;
        color: #FFF;
    }

    .attend-status-title{
        height: 40px;
        font-size: 18px;
        font-weight: bold;
        line-height: 40px;
        color: #FFF;
    }

    .attend-info-date{
        margin: 10px 20px;
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;
    }

    .attend-info-date-img{
        weight: 15px;
        height: 15px;
        margin: 0 5px;
    }

    .attend-info-date-title{
        width: 100%;
        font-size: 14px;
        font-weight: bold;
        border-bottom: 1px solid;
        border-bottom: 1px solid #b9b9b9;
        color: #585858;
    }

    .attend-info-date-value{
        width: 100%;
        text-align: center;
        margin: 5px 0;
        font-weight: bold;
        color: #585858;
    }

    .attend-request-area{
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .qr-btn{
        display: flex;
        height: 30px;
        line-height: 30px;
        align-items: center;
        color: #FFF;
        font-weight: bold;
        background: #525252;
        padding: 2px 10px;
        box-shadow: 0px 2px 6px 0px rgb(0 0 0 / 30%);
        cursor: pointer;
    }

    .qr-btn-img{
        width: 22px;
        height: 22px;
        margin-right: 10px;
    }

</style>