<style>
    /*阅览工具*/
    
    .common-image-viewer {
        position: fixed;
        z-index: 10000;
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.7);
        overflow: hidden;
        display: none;
    }
    
    .common-image-viewer.fullScreen {}
    
    .common-image-viewer.fullScreen .fullScreen-btn {
        background-color: #46A6DB;
    }
    
    .common-image-viewer.fullScreen .image-viewer-tool-fullScreen {
        background: url('./icon/toNonFullscreen.png') no-repeat;
    }
    /*主图*/
    
    .image-viewer-img {
        position: absolute;
        z-index: 10;
        border: none;
        cursor: move;
    }
    /*縮略圖*/
    
    .common-viewer-thumbnails {
        display: none;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        text-align: center;
        z-index: 20;
    }
    
    .common-viewer-thumbnails li {
        list-style: none;
        display: inline-block;
        width: 80px;
        height: 60px;
        border: 1px solid #dbdbdb;
        margin: 5px 2px;
        background: YellowGreen;
        cursor: pointer;
        -webkit-transition: all 100ms ease-in;
    }
    
    .common-viewer-thumbnails li.active {
        border: 2px solid #FF8D33;
        width: 85px;
        height: 62px;
    }
    
    .common-viewer-thumbnails li img {
        width: 100%;
        height: 100%;
    }
    
    .common-viewer-thumbnails li:hover {
        width: 85px;
        height: 62px;
    }
    /*关闭*/
    
    .image-viewer-close {
        width: 28px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        font-weight: bolder;
        color: #FFF;
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 20;
        background-color: #ababab;
        border-radius: 16px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        -moz-transition: background-color 0.2s ease;
        -o-transition: background-color 0.2s ease;
        -webkit-transition: background-color 0.2s ease;
    }
    
    .image-viewer-close:hover {
        background-color: #E15F4A;
    }
    /*工具栏*/
    
    .image-viewer-tools {
        height: 35px;
        line-height: 30px;
        font-weight: bolder;
        position: absolute;
        left: 50%;
        z-index: 20;
        bottom: 0px;
        margin-left: -112.5px;
        background-color: #7F7F7F;
        border-radius: 5px 5px 0px 0px;
        overflow: hidden;
        cursor: pointer;
    }
    
    .image-viewer-tools>div {
        width: 45px;
        height: 35px;
        float: left;
        text-align: center;
        transition: background-color 0.2s ease;
        -moz-transition: background-color 0.2s ease;
        -o-transition: background-color 0.2s ease;
        -webkit-transition: background-color 0.2s ease;
    }
    
    .image-viewer-tools>div:hover {
        background-color: #46A6DB;
    }
    
    .image-viewer-tools span {
        width: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: middle;
    }
    
    .image-viewer-tools .image-viewer-tool-realsize {
        background: url('./icon/realSize.png') no-repeat;
    }
    
    .image-viewer-tools .image-viewer-tool-fullScreen {
        background: url('./icon/toFullScreen.png') no-repeat;
    }
    
    .image-viewer-tools .image-viewer-tool-rotate {
        background: url('./icon/rotateRight.png') no-repeat;
    }
    
    .image-viewer-tools .image-viewer-tool-horizontalturn {
        background: url('./icon/horizontalTurn.png') no-repeat;
    }
    
    .image-viewer-tools .image-viewer-tool-verticalturn {
        background: url('./icon/verticalTurn.png') no-repeat;
    }
    /*缩略区*/
    
    .image-viewer-browse {
        width: 200px;
        height: 120px;
        position: absolute;
        right: 0px;
        bottom: 0px;
        border: 1px solid #333;
        background-color: #cdcdcd;
        display: none;
    }
    
    .image-viewer-browse-thumbnail {
        position: absolute;
    }
    
    .image-viewer-browse-aperture {
        position: absolute;
        width: 40px;
        height: 30px;
        border: 1px solid #000;
    }
    
    .common-image-viewer-prev {
        position: absolute;
        top: 45%;
        left: 20px;
        z-index: 10;
        width: 50px;
        height: 50px;
        font-size: 80px;
        color: #016688;
        cursor: pointer;
        font-weight: bolder;
    }
    
    .common-image-viewer-next {
        position: absolute;
        top: 45%;
        right: 20px;
        z-index: 10;
        width: 50px;
        height: 50px;
        font-size: 80px;
        color: #016688;
        cursor: pointer;
        font-weight: bolder;
    }
    
    .common-image-viewer-prev:hover,
    .common-image-viewer-next:hover {
        color: #09c;
    }
</style>
<script>
    import commonImageViewer from './commonImageViewer.js';
</script>