//添加计算指标
function addInputElement(){
    var num=$("#inputs").children().length+1;
    console.log("添加输入因素"+num);
    var title="指标"+num;
    var html="<li class=\"item-blue clearfix ui-sortable-handle\" style=\"position: relative; opacity: 1; left: 0px; top: 0px; z-index: auto;\">"+
                "<label class=\"inline\">"+
                "<span class=\"editable editable-click editable-open\">"+ title + "</span>" +
                "</label>"+
                "<div class=\"pull-right action-buttons\">" +
                "<a href=\"#\" class=\"red\" onclick=\"deleteElement(this)\">" +
                "<i class=\"ace-icon fa fa-trash-o bigger-130\">" +
                "</i></a><span class=\"vbar\">" + "</span>" +
                "</div>" +
                "</li>";
    $("#inputs").append(html);
    $("span.editable").editable({
        type: "text",                //编辑框的类型。支持text|textarea|select|date|checklist等
        title: "输入变量",              //编辑框的标题
        disabled: false,             //是否禁用编辑
        validate: function (value) { //字段验证
            if (!$.trim(value)) {
                return '不能为空';
            }
        }
    });
}
//删除元素
function deleteElement(e) {
    $(e).parents("li")[0].remove();
}
//功能：未点击"添加计算指标"也能修改指标名称
$(function() {

    $("span.editable").editable({
        type: "text",                //编辑框的类型。支持text|textarea|select|date|checklist等
        title: "输入变量",              //编辑框的标题
        disabled: false,             //是否禁用编辑
        validate: function (value) { //字段验证
            if (!$.trim(value)) {
                return '不能为空';
            }
        }
    });

});
//生成bootstrap-table表格
function generateTable() {
    alert("生成表格");

}