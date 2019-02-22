//添加计算指标
function addInputElement(){
    var num=$("#inputs").children().length;//表格第一列不算
    console.log("添加输入因素"+num);
    var title="系列"+num;
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
//初始化生成bootstrap-table表格
function generateTable() {
    console.log("生成表格");
    // $('#myBootstrapTable').bootstrapTable('destroy');
    var inputs=$("#inputs").find("span.editable");
    var tableColumns=new Array();
    //添加选择框字段
    tableColumns.push({
        field:'state',
        checkbox:"true",
    });
    for(var i=0;i<inputs.length;i++){
        var titleName=inputs[i].innerHTML;
        tableColumns.push({
            field:'input'+i,
            title:titleName,
            align:"center",
        });
    }
    //添加编辑
    tableColumns.push(
        { field:'action',
            formatter:"actionFormatter",
            events:"actionEvents",
            title: "编辑",
            align:"center",
        });

    $('#myBootstrapTable').bootstrapTable({
        columns: tableColumns,
    });
}
//添加行模态对话框加载
function addRow() {
    $("#inputItemAdd").empty();
    var allcolumns = $('#myBootstrapTable').bootstrapTable('getVisibleColumns');
    //第一列选择框和最后一列编辑框不需要显示在模态对话框中
    for(var i=1;i<allcolumns.length-1;i++){
        var html="<div class=\"col-lg-6\"> <div class=\"input-group\"> <span class=\"input-group-addon\">" +
            allcolumns[i].title +
            "</span> <input type=\"text\" class=\"form-control\" id=\"" +
            allcolumns[i].field +
            "\"</div></div>";
        $("#inputItemAdd").append(html);
    }
    $("#itemAdd").modal('show');

}
//添加行数据
function addItem() {
    var allcolumns = $('#myBootstrapTable').bootstrapTable('getVisibleColumns');
    rowdata=new Object();
    for(var i=1;i<allcolumns.length-1;i++){

        rowdata[allcolumns[i].field]=$("#"+allcolumns[i].field).val();

    }
    $('#myBootstrapTable').bootstrapTable('append', rowdata);

}
//删除行
function deleteRow()
{
    var ids = $.map($('#myBootstrapTable').bootstrapTable('getSelections'), function (row) {
        return row.state;
    });
    $('#myBootstrapTable').bootstrapTable('remove', {field: 'state', values: ids});
}
//编辑
function actionFormatter(value, row, index) {
    return [
        '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
        '<i class="glyphicon glyphicon-edit"></i> 编辑',
        '</a>'
    ].join('');
}
var updateIndex = 1;
window.actionEvents = {
    'click .edit': function (e, value, row, index) {
        //清空模态对话框
        $("#dataEditGroup").empty();
        var allcolumns = $('#myBootstrapTable').bootstrapTable('getVisibleColumns');
        for (var i=1;i<allcolumns.length-1;i++) {
            var title = allcolumns[i].title;
            var id = allcolumns[i].field;
            var value = row[id];
            var html = "<div class=\"col-lg-6\"><div class=\"input-group\"><span class=\"input-group-addon\">" +
                title +
                "</span> <input type=\"text\" class=\"form-control\" value =\"" + value + "\"id=\"" + id +"\"></div></div>"
            $("#dataEditGroup").append(html);
        }
        updateIndex = index;
        $('#itemEdit').modal('show');
    }
};
//编辑后添加到表格中
function editItem() {
    $('#itemEdit').modal('hide');
    rowdata=new Object();
    var updates = $("#dataEditGroup input");
    for(var i=0;i<updates.length;i++){

        rowdata[updates[i].id]=updates[i].value;

    }
    $('#myBootstrapTable').bootstrapTable('updateRow',{index: updateIndex, row: rowdata});
}
//画图
function showGraph() {
    //////////////////////
    //获取表格字段
    var allColumnName=[];//数组存储表格字段信息
    var allcolumns = $('#myBootstrapTable').bootstrapTable('getVisibleColumns');
    for (var i=1;i<allcolumns.length-1;i++) {
        var title = allcolumns[i].title;
        var id = allcolumns[i].field;
        allColumnName.push(title);
    }
    //获取表格数据
    var tableData=$('#myBootstrapTable').bootstrapTable('getData');
    //图例（legend）
    var legendArray=[];
    for(var i=1;i<allColumnName.length;i++){
        legendArray.push(allColumnName[i]);
    }
    //X轴刻度(xAxis)
    var xData=[];
    for(var i=0;i<tableData.length;i++){
        xData.push(tableData[i]["input0"]);
    }
    //系列数据(series)
    seriesData=[];
    for(var i=1;i<allColumnName.length;i++){
        var rowData=[];
        for(var j=0;j<tableData.length;j++){
            rowData.push(parseFloat(tableData[j]["input"+i]));
        }
        seriesData.push({name:allColumnName[i],type:'bar',data:rowData});
    }
    //配置echarts图表
    var dom = document.getElementById("histogramCharts");
    var myChart = echarts.init(dom);

    var app = {};
    option = null;
    app.title = '折柱混合';

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
                data:legendArray
        },
        xAxis: [
            {
                type: 'category',
                data:xData,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: {},
        series:seriesData
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}