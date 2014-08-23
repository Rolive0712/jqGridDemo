/// <reference path="_references.js" />
$(document).ready(function () {

    var $grid = $("#tblGrid");
    //ShowHoverPopUp();

    // custom formatter to create the hyperlink 
    function OrderID_Link(cellvalue, options, rowObject) {
        var selectedRowId = options.rowId;
        return '<a href="javascript:MethodJS(' + cellvalue + ')" class="popper" data-popbox="pop2" style="color: #3366ff" id="' + selectedRowId + '" >' + cellvalue + '</a>';
    }

    function MethodJS(selectedRowId) {
        document.location.href = "ViewContact.aspx?NoteID=" + selectedRowId;
    }

    function SetHoverPopUp() {
        var moveLeft = 0,
                moveDown = 0;

        $('a.popper').hover(function (e) {
            var target = '#' + ($(this).attr('data-popbox'));
            $(target).show();
            moveLeft = $(this).outerWidth();
            moveDown = ($(target).outerHeight() / 2);
        }, function () {
            //var target = '#' + ($(this).attr('data-popbox'));
            //$(target).hide();
        });

        $('div#pop2').hover(function (e) {
            //don't do anything here. hide once user hovers outside the popup
        }, function () {
            $(this).hide();
        });

        $('a.popper').mousemove(function (e) {
            var target = '#' + ($(this).attr('data-popbox'));

            leftD = e.pageX + parseInt(moveLeft);
            maxRight = leftD + $(target).outerWidth();
            windowLeft = $(window).width() - 40;
            windowRight = 0;
            maxLeft = e.pageX - (parseInt(moveLeft) + $(target).outerWidth() + 20);

            if (maxRight > windowLeft && maxLeft > windowRight) {
                leftD = maxLeft;
            }

            topD = e.pageY - parseInt(moveDown);
            maxBottom = parseInt(e.pageY + parseInt(moveDown) + 20);
            windowBottom = parseInt(parseInt($(document).scrollTop()) + parseInt($(window).height()));
            maxTop = topD;
            windowTop = parseInt($(document).scrollTop());
            if (maxBottom > windowBottom) {
                topD = windowBottom - $(target).outerHeight() - 20;
            } else if (maxTop < windowTop) {
                topD = windowTop + 20;
            }

            $(target).css('top', topD).css('left', leftD);
        });
    }

    function BindGrid(data) {

        $grid.jqGrid({ //set your grid id
            datastr: data, //insert data from the data object we created above
            datatype: "jsonstring",
            //datatype: "json",
            height: 500,
            //contentType: "application/json; charset-utf-8",
            width: 1300, //specify width; optional
            colNames: ['Order ID', 'Customer ID', 'Ship Name', 'Ship City', 'Ship Country'],
            //col: {
            //    caption: "Show/Hide Columns",
            //    bSubmit: "Submit",
            //    bCancel: "Cancel"
            //},
            colModel: [
                { name: 'OrderID', width: 60, sortable: true, formatter: OrderID_Link },
                { name: 'CustomerID', align: "left", width: 90, sortable: true },
                { name: 'ShipName', align: "left", width: 100, sortable: true },
                { name: 'ShipCity', width: 80, align: "left", sortable: true },
                { name: 'ShipCountry', width: 80, align: "left", sortable: true }
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
            sortable: true,
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
            loadComplete: SetHoverPopUp,
            //scrollOffset: 2,
            //autowidth: true,
            //toolbar: [true, "top"],
            //shrinkToFit: false,
            //hidegrid: false,
            //loadui: 'block'
            altrows: true,
            altclass: 'myAltRowClass',
            caption: "jqGrid Example" //title of grid
        });

        /*Grid Settings*/
        $grid.jqGrid('navGrid', '#divPager', { add: false, edit: false, del: false, search: true, refresh: false });
        $grid.jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false });

        /*column chooser*/
        $grid.jqGrid('navButtonAdd', '#divPager', {
            caption: "Columns",
            title: "Reorder Columns",
            onClickButton: function () {
                $grid.jqGrid('columnChooser');
            }
        });
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
