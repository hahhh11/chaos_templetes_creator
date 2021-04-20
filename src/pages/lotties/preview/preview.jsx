import "./preview.less"
// import "./preview.js"
export const PreviewLottie = () => {

    var URL = window.webkitURL || window.URL;
    var container = document.getElementById("lottie");
    /*拖拽的目标对象------ document 监听drop 并防止浏览器打开客户端的图片*/
    document.ondragover = function (e) {
        e.preventDefault();  //只有在ondragover中阻止默认行为才能触发 ondrop 而不是 ondragleave
    };
    document.ondrop = function (e) {
        e.preventDefault();  //阻止 document.ondrop的默认行为  *** 在新窗口中打开拖进的图片
    };
    /*拖拽的源对象----- 客户端的一张图片 */
    /*拖拽目标对象-----div#container  若图片释放在此元素上方，则需要在其中显示*/
    container.ondragover = function (e) {
        e.preventDefault();
    };
    container.ondrop = function (e) {

        var files = [];
        [].forEach.call(e.dataTransfer.files, function (file) {
            files.push(file);
        }, false);
        name = files[0].name;
        console.log(name)
        var src = URL.createObjectURL(files[0]);
        // console.log(files)

        var anim;
        var elem = document.getElementById('lottie');
        elem.innerHTML = ""
        var animData = {
            container: elem,
            renderer: 'canvas',
            loop: true,
            autoplay: true,
            rendererSettings: {
                progressiveLoad: true,
                preserveAspectRatio: 'xMidYMid meet',
                imagePreserveAspectRatio: 'xMidYMid meet',
                title: 'TEST TITLE',
                description: 'TEST DESCRIPTION',
            },
            // path: 'exports/render/data.json'
            path: src//'loading_animal.json'
        };
        // lottie.setQuality('low');
        anim = lottie.loadAnimation(animData);
    }

    return (<div id="lottie"></div>)
}



