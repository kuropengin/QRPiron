<template>
	<div class="history-area">
        <div class="history-area-title">打刻履歴</div>
		<ul v-for="(historyData, title) in historyDate">
            <p>{{ title }}</p>
		 	<li v-for="(history, index) in historyData" :key="index">
                <fontAwesome :icon="{prefix: 'far',iconName: 'circle-check'}" class="history-info-img"/>
                <div class="history-info">
                    <div class="history-info-data">{{ history.stamp }}</div>
                    <div class="history-info-code">{{ history.arg }}</div>
                </div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
        data(){
            return {
                historyDate : {},
            }
        },
        mounted() {
            /* [/api/search-for-student]の出力に合わせたダミー */
            const dummyApi = {
                "result":"success",
                "punchData":[
                    {"arg":"1_UU2Ap************34tVw==","uid":"00w0000a","stamp":"2022-02-22 18:14:12"},
                    {"arg":"1_UU2Ap************34tVw==","uid":"00w0000a","stamp":"2022-02-20 19:37:29"},
                    {"arg":"1_UU2Ap************34tVw==","uid":"00w0000a","stamp":"2022-02-20 19:23:52"},
                    {"arg":"1_UU2Ap7*****7****734tVw==","uid":"00w0000a","stamp":"2022-01-15 10:37:54"},
                    {"arg":"1_UU2Ap7*****7****734tVw==","uid":"00w0000a","stamp":"2022-01-15 01:38:35"}
                ]
            }

            if(dummyApi.result == "success"){
                this.toViewData(dummyApi.punchData)
            }  
        },
        methods: {
            toViewData(apidata) {
                const resultDict = {}
                for (let onedata of apidata) {
                    try{
                        const time = onedata.stamp.split(" ");
                        if(time[0] in resultDict){
                            resultDict[time[0]].push({
                                "arg" : onedata.arg,
                                "stamp" : onedata.stamp,
                            })
                        }
                        else{
                            resultDict[time[0]] = [{
                                "arg" : onedata.arg,
                                "stamp" : onedata.stamp,
                            }]
                        }
                    }
                    catch(err){
                        console.log(err)
                    }
                }
                this.historyDate = resultDict;
            }
        }
	};
</script>

<style scoped>
    .history-area{
        margin-bottom: 50px;
    }

    .history-area-title{
        margin: 20px;
        font-size: 20px;
        font-weight: bold;
        color: #258f28;
    }

    .history-area ul{
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .history-area ul p{
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        font-weight: bold;
        margin: 0;
        padding: 0 20px;
        background: #f5f5f5;
        color: #616161;
    }

    .history-area ul li{
        display: flex;
        align-items: center;
        padding: 10px 20px;
        border-bottom: solid 1px #e0e0e0;
    }

    .history-info-img{
        width: 35px;
        height: 35px;
        color: #499e4c;
    }

    .history-info{
        padding: 0 10px;
    }

    .history-info-data{
        font-size: 10px;
        color: #616161;
    }

    .history-info-code{
        font-size: 16px;
        font-weight: bold;
    }
</style>