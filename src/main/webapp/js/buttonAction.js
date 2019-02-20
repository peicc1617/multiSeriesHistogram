var projectId = 0;//项目Id
var projectName;//项目名
var appResult = null;//word报告
var appNameChinese = '创新方法APP';//app中文名（必填）
var USER_NAME = '';//当前登录用户名

// 添加项目后，自定义操作
function addSelfDefine(result) {
    //上一层函数查看basicAction.js中addProject()函数
    /*
    * your code.....
    **/
    console.log("add project successful");
}

// 查看项目后，自定义操作
function checkSelfDefine(node, result) {
    // 上一层函数查看basicAction.js中checkProject()函数
    /*
    * your code.....
    **/
    console.log("check project successful");
}

//删除项目后，自定义操作
function removeSelfDefine(result) {
    // 上一层函数查看basicAction.js中removeProject()函数
    /*
    * your code.....
    **/
    console.log("remove project successful");
}

//定制初始化内容
function setCustomContext() {
    // canvas图片获取方式
    var img = $("#canvas")[0];  //选择页面中的img元素
    var image = new Image();
    if (img != null) {
        image.src = img.toDataURL("image/png");
    }
    var img1 = image;
    // 其他示例
    var img2 = $("#image2Id");  //选择页面中的img元素
    var wordImgArr = [img1, img2];//定义图片数组
    var customText = {//word编辑区自定义文本内容
        'title': "<h2>1 **App分析结果 </h2>",
        'chap1': "<h3>1.1 *******</h3>",
        'img1': wordImgArr[0],
        'chap2': "<h3>1.2 *******</h3>",
        'img2': wordImgArr[1],
        'chap3': "<h3>1.3 结论****</h3>"
    };
    for (var variable in customText) {//遍历自定义文本对象
        $("#WYeditor").append(customText[variable]);//插入元素
    }
}