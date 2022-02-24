<template>
    <div class="reader">
        <video id="js-video" class="reader-video" autoplay playsinline></video>
        <div class="ql-controller">
            <div class="ql-back">
                <div class="ql-title"><fontAwesome icon="xmark" class="ql-back-btn" @click="back" />QRコードの読み取り</div>
            </div>
            <div class="ql-pointer"></div>
        </div>
        <div style="display:none;">
            <canvas id="js-canvas"></canvas>
        </div>
        <div id="js-modal" class="modal-overlay">
            <div class="modal">
                <div class="modal-cnt">
                    <span class="modal-title">読み取り結果</span>
                    <span id="js-result" class="modal-result"></span>
                </div>
                <a href="" id="js-link" class="modal-btn">開く</a>
                <button type="button" id="js-modal-close" class="modal-btn">閉じる</button>
            </div>
        </div>
    </div>
</template>

<script>
    import jsQR from "jsqr";

    export default {
        data() {
            return{
                video: null
            }
        },
        mounted() {
            this.video = document.querySelector('#js-video')
            const video = this.video

            navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: {
                        facingMode: 'environment'
                    }
                })
                .then(function(stream) {
                    console.log(video)
                    video.srcObject = stream
                    video.onloadedmetadata = function(e) {
                        video.play()
                    }
                })
                .catch(function(err) {
                    alert('Error!!')
                })
            
            const canvas = document.querySelector('#js-canvas')
            canvas.width = window.innerWidth 
            canvas.height = window.innerHeight 
            const ctx = canvas.getContext('2d')

            const checkImage = () => {
                
                ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height)

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

                const code = jsQR(imageData.data, canvas.width, canvas.height)
                
                if (code) {
                    const checkURL = new URL(code.data)
                    if(checkURL.origin == location.origin){
                        openModal(code.data)
                    }
                    else{
                        setTimeout(() => { checkImage() }, 200)
                    }
                } else {
                    setTimeout(() => { checkImage() }, 200)
                }
            }
            checkImage()

            const openModal = function(url) {
                document.querySelector('#js-result').innerText = url
                if(url.indexOf("?") != -1){
                    url += "&source=app"
                }
                else{
                    url += "?source=app"
                }
                document.querySelector('#js-link').setAttribute('href', url)
                document.querySelector('#js-link').addEventListener('click',() => {
                    video.srcObject.getVideoTracks().forEach((track) => {
                        track.stop();
                    });
                    video.srcObject.getAudioTracks().forEach((track) => {
                        track.stop();
                    });
                });
                document.querySelector('#js-modal').classList.add('is-show')
            }

            document.querySelector('#js-modal-close').addEventListener('click', () => {
                document.querySelector('#js-modal').classList.remove('is-show')
                checkImage()
            })
        },
        methods: {
            back(){
                const video = this.video
                video.srcObject.getVideoTracks().forEach((track) => {
                    track.stop();
                });
                video.srcObject.getAudioTracks().forEach((track) => {
                    track.stop();
                });
                window.location.href = "/?source=app"
            }
        }
    }
    
</script>

<style scoped>
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: sans-serif;
    }

    .reader {
        width: 100vw;
        position: relative;
        background-color: #000;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .reader-video {
        background-color: #000;
        width: 100%;
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
        object-fit: cover;
    }

    .ql-controller{
        position: absolute;
        width: 100vw;
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .ql-title{
        position: relative;
        text-align: center;
        line-height: 50px;
        color: #FFF;
        font-size: 20px;
        font-weight: bold;
    }

    .ql-back{
        width: 100%;
        height: 50px;
        align-self: flex-start;
    }

    .ql-back-btn{
        position: absolute;
        left: 0;
        width: 40px;
        height: 40px;
        margin: 5px 10px;
        cursor: pointer;
    }

    .ql-pointer{
        width: 50vw;
        max-width: 150px;
        height: 50vw;
        max-height: 150px;
        align-self: flex-start;
        border: solid 4px #4caf50;
    }

    .modal-overlay {
        display: none;
        position: fixed;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
    }

    .modal-overlay.is-show {
        display: flex;
    }

    .modal {
        width: 80%;
        background: #fff;
        border-radius: 10px;
    }

    .modal-cnt {
        padding: 30px 15px;
    }

    .modal-title {
        display: block;
        margin-bottom: 15px;
        text-align: center;
    }

    .modal-result {
        resize: none;
        word-break: break-all;
        border: none;
        width: 100%;
        height: auto;
        font-size: 16px;
    }

    .modal-btn {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: block;
        background: none;
        border: none;
        border-top: 1px solid #ddd;
        width: 100%;
        color: #333;
        padding: 20px;
        text-align: center;
        font-size: 18px;
        text-decoration: none;
    }

    .unsupported {
        display: none;
        flex-direction: column;
        position: fixed;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        background: #000;
        color: #fff;
        z-index: 999;
    }

    .unsupported.is-show {
        display: flex;
    }

    .unsupported-title {
        font-weight: bold;
        font-size: 2em;
    }
</style>
