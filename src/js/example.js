var PopoverConfirm = require( 'bs-popover-confirm' );

var vm = null, 
    URL = null,
    main = null,
    Status = null;

// ajax 地址
URL = {
    changeStatus: '/api/subActivity/changeSubActivityStatus' // 更改启用、禁用状态 POST
};

// avalon vm
vm = avalon.define({
    $id: 'main',
    data: [
        {
            Kind: '抽奖活动',
            Name: '捕鱼达人单次抽奖',
            Id: 1,
            Status: true
        }, {
            Kind: '每日签到',
            Name: '欢乐斗地主',
            Id: 2,
            Status: false
        }
    ],
    showUpdateStatusConfirm: function( e, index, data ) {
        e.stopPropagation();
        Status.show( $(this), index, data );
    }
});

// 状态
Status = {
    show: function( $trigger, index, data ) {
        var _this = this;
        
        PopoverConfirm.init({
            UID: data.id + 'status', // 数据中唯一标识符，比如 ID，UserID 等，以确保重复点击显示、隐藏不会闪烁
            title: '确定'+ (data.status ? '启用' : '禁用') +'？',
            loadingContent: (data.status ? '启用生效' : '禁用生效') + '中.........', // Popover 加载中提示文字
            $trigger: $trigger, // 触发者
            ajax: {
                config: {
                    type: 'post',
                    url: URL.changeStatus,
                    data: data,
                },
                callback: function( res ) {
                    if ( res.Status ) {
                        avalon.vmodels.main.data[ index ].Status = data.status; // 更改数据状态
                        PopoverConfirm.destroy(); // 销毁
                    } else {
                        // 错误信息提示
                        PopoverConfirm.setContent({
                            title: '<span class="text-danger">操作失败</span>',
                            content: '<span class="text-danger">'+ res.Message +'</span>'
                        });
                    }
                }
            }
        });
    }
};

// 主函数
main = {
    init: function() {
        avalon.scan();
    }
};

main.init();