/// <reference path="_references.js" />
$(document).ready(function () {

    function BindGrid(data) {

        $("#tblGrid").jqGrid({ //set your grid id
            datastr: data, //insert data from the data object we created above
            datatype: "jsonstring",
            //datatype: "json",
            height: 500,
            //contentType: "application/json; charset-utf-8",
            width: 1300, //specify width; optional
            colNames: ['Order ID', 'Customer ID', 'Ship Name', 'Ship City', 'Ship Country'],
            colModel: [
                { name: 'OrderID', width: 60 },
                { name: 'CustomerID', width: 90 },
                { name: 'ShipName', width: 100 },
                { name: 'ShipCity', width: 80, align: "right" },
                { name: 'ShipCountry', width: 80, align: "right" }
            ],
            //jsonReader: {
            //    root: "rows",
            //    page: "page",
            //    total: "total",
            //    records: "records",
            //    repeatitems: true,
            //    cell: "cell",
            //    id: "id",
            //    userdata: "userdata"
            //},
         
            pager: '#divPager', //set your pager div id
            sortname: 'OrderID', //the column according to which data is to be sorted; optional
            viewrecords: true, //if true, displays the total number of records, etc. as: &quot;View X to Y out of Z”; optional
            sortorder: "asc", //sort order; optional
            rowNum: 50,
            rowList: [10, 50, 100],
            gridview: true,
            loadonce: true, //since server side paging not done.so client side paging enabled
            autoencode: true,
            pgbuttons: true,
            rownumbers: true,
            scrollOffset: 2,
            altrows: true,
            altclass: 'myAltRowClass',
            caption: "jqGrid Example" //title of grid
        });
        $("#tblGrid").jqGrid('navGrid', "#divPager", { edit: false, add: false, del: false, search: true });
        $("#tblGrid").jqGrid('inlineNav', "#divPager");

    }

    $('#btnGet').click(function (e) {
        e.preventDefault();

        $.ajax({
            url: "/WebService/ajaxService.asmx/GetOrders",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //data: null,
            dataType: "json",
            async: true,
            cache: false,
            success: function (data) {
                //var jsonObject = $.parseJSON(data.d);
                BindGrid(data.d);
            },
            error: function (e) {
                alert("error");
            }
        });
    });
});
