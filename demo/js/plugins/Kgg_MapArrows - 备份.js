//=====================================================================================
// Kgg_MapArrows.js
//=====================================================================================
/*:
 * @plugindesc v1.1 地图箭头 MapArrows
 * @author 开关关
 *
 * @help 
 * ==========================================================
 * 简介
 * ==========================================================
 * 功能：
 * 本插件为RPG游戏的地图场景显示多个箭头，箭头在预先设定好的边框上
 * 移动，指向指定事件或坐标。
 * 本插件提供添加、移除、按样式清除箭头的插件指令。
 * 请在插件面板中预先设置好样式，然后在游戏过程中添加。
 * 参数较多，建议下载demo参考。
 * 
 * 注意事项：
 * 1.箭头图像文件请放置在img/system/文件夹
 * 2.箭头图像中箭头朝右
 * 
 * 使用许可：
 * 可免费商用，可修改，无需报告。
 * 以上未提及的事项，参考MIT License。
 * 
 * 感谢：
 * 此插件是拜读Drill_up的插件教程写出来的，感谢Drill_up大佬！
 * 感谢honmarei指出缺少未定义检查的问题。
 * ==========================================================
 * 插件指令
 * ==========================================================
 * 功能：在本地图添加箭头，指向事件或位置，可以用常量或变量指定
 * 插件指令：
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 事件[15]
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 事件变量[15]
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 位置[15,16]
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 位置变量[15,16]
 * 说明：
 * 1.名称是自定义的。为箭头设置名称作用是区分不同箭头，移除箭头时用。
 * 2.样式名可在插件管理器自定。
 * 3.事件变量[15]代表箭头目标是“编号为第15号变量的值的事件”。
 * 4.位置[15,16]代表地图中x为15，y为16的格子。
 * 5.添加的箭头仅在当前地图生效，重新进入地图仍然生效。
 * 6.变量[15]取的是当前的变量值，后续不会跟随变量变化。
 * 举例：
 * >地图箭头 : 添加箭头 : 测试箭头 : 默认样式 : 事件[15]
 * ----------------------------------------------------------
 * 功能：在指定地图添加箭头，指向事件
 * 插件指令：
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 事件[15] : 地图[1]
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 事件[15] : 地图变量[1]
 * 说明：
 * 在上一种指令基础上，可以指定生效的地图编号。
 * ----------------------------------------------------------
 * 功能：按名称移除箭头
 * 插件指令：
 * >地图箭头 : 移除箭头 : 名称
 * 说明：
 * 移除指定名称的箭头。
 * ----------------------------------------------------------
 * 功能：按样式清除箭头
 * 插件指令：
 * >地图箭头 : 按样式清除箭头 : 样式名
 * 说明：
 * 移除每一个指定样式的箭头。
 * ==========================================================
 * 脚本
 * ==========================================================
 * 功能：根据样式名称添加箭头
 * 描述：
 * 使用设置好的样式，添加指向特定ID的事件的箭头，仅生效于一张地图。
 * 请在开始游戏后调用，勿在主菜单调用。
 * 脚本：
 * Kgg_MapArrows.addArrow(name, arrowStyleName, eventId, mapId)
 * 参数：
 * {String} name 新建箭头名称 用于移除箭头
 * {String} arrowStyleName 箭头样式名称
 * {Number} eventId 箭头指向的事件ID
 * {Number} mapId 生效的地图ID 若不填则默认当前地图
 * ----------------------------------------------------------
 * 功能：根据箭头名称移除箭头
 * 脚本：
 * Kgg_MapArrows.removeArrow(name)
 * ----------------------------------------------------------
 * 功能：根据样式名称移除箭头
 * 描述：一次性移除所有指定样式的箭头。
 * 脚本：
 * Kgg_MapArrows.clearArrowsByArrowStyle(arrowStyleName)
 * ==========================================================
 * 其他信息
 * ==========================================================
 * 兼容性：
 * 仅在RMMV1.6.3版本进行过测试。
 * 更新记录：
 * 2023.11.12 v1.0 完成demo，做成可以发布的版本。
 * 未完成 v1.1
 * 插件影响范围：
 * 重写了多个自带函数，它们属于以下3个类。
 * Scene_Map Game_System Game_Interpreter
 * 本插件影响存档文件，因为有给$gameSystem添加成员。所有写入的
 * 对象名都有前缀“_kgg_MapArrows”。
 * ==========================================================
 * 
 * @param 显示边界线
 * @type boolean
 * @on 显示
 * @off 关闭
 * @desc 添加箭头时，同时显示箭头样式的边界线，包括上界、下界、左界、右界。建议仅调试时开启。
 * @default false
 * 
 * @param 起点设置
 * @default
 * 
 * @param 起点类型
 * @parent 起点设置
 * @type select
 * @option 边框中心(border_center)
 * @value border_center
 * @option 画面中心(screen_center)
 * @value screen_center
 * @option 玩家位置(player_screen_position)
 * @value player_screen_position
 * @option 左上角(top_left)
 * @value top_left
 * @desc 选择箭头方向的起点的位置。选择“边框中心”或“画面中心”将无视下面设置的XY坐标。
 * @default screen_center
 * 
 * @param 起点X
 * @parent 起点设置
 * @desc 起点与屏幕左上角的X轴距离。若0-1之间为比例，大于1则为像素数。起点类型选择“左上角”时才生效。
 * @default 0.5
 * 
 * @param 起点Y
 * @parent 起点设置
 * @desc 起点与屏幕左上角的Y轴距离。若0-1之间为比例，大于1则为像素数。起点类型选择“左上角”时才生效。
 * @default 0.5
 * 
 * @param 箭头样式设置
 * @default
 *
 * @param 箭头-1
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-2
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-3
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-4
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-5
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-6
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-7
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-8
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-9
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-10
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-11
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-12
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-13
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-14
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-15
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-16
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-17
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-18
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-19
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 *
 * @param 箭头-20
 * @parent 箭头样式设置
 * @type struct<MenuArrowStyle>
 * @desc 设置箭头的样式。
 * @default 
 */
/*~struct~MenuArrowStyle:
 * 
 * @param 名称
 * @desc 作为该箭头样式的唯一标识，用于添加箭头时选择样式。不可包含空格。
 * @default 未命名
 *
 * @param 箭头图像
 * @desc 箭头的图片资源。
 * @default Shadow2
 * @require 1
 * @dir img/system/
 * @type file
 * 
 * @param 是否可旋转
 * @type boolean
 * @on 可旋转
 * @off 不可旋转
 * @desc 箭头图像是否跟随指向进行旋转。
 * @default true
 * 
 * @param 锚点原点类型(AnchorOriginType)
 * @type select
 * @option 图像中心(image_center)
 * @value image_center
 * @option 左上角(top_left)
 * @value top_left
 * @desc 选择箭头图像的锚点从图像内的哪个点开始偏移。
 * @default top_left
 * 
 * @param 锚点X
 * @desc 箭头图像中锚点在X方向上偏移的距离。若在0-1之间则为比例，若大于1则视为像素数。
 * @default 0.8
 *
 * @param 锚点Y
 * @desc 箭头图像中锚点在Y方向上偏移的距离。若在0-1之间则为比例，若大于1则视为像素数。
 * @default 0.5
 * 
 * @param 渐变最远距离
 * @desc 当屏幕中心与指定事件接近到一定程度，箭头图片就会开始变透明。填距离的像素数。
 * @default 300
 * 
 * @param 渐变最近距离
 * @desc 当接近到更近时，箭头会彻底透明。填距离的像素数。
 * @default 150
 * 
 * @param 边框类型(BorderType)
 * @type select
 * @option 矩形(rectangle)
 * @value rectangle
 * @option 椭圆(ellipse)
 * @value ellipse
 * @desc 箭头指向的目标在框外时，箭头在边框上移动。椭圆为对应矩形的内切椭圆。
 * @default rectangle
 * 
 * @param 边框原点类型(BorderOrigin)
 * @type select
 * @option 屏幕四边(screen_edges)
 * @value screen_edges
 * @option 屏幕中心(screen_center)
 * @value screen_center
 * @option 左上角(top_left)
 * @value top_left
 * @desc 选择边框线从哪个位置开始偏移。屏幕四边：边线从四周向内坍缩；屏幕中心：边线从中心向外膨胀。
 * @default screen_edges
 * 
 * @param 上界(topBound)
 * @desc 矩形边框上边与原点的距离。若在0-1之间则为比例，若大于1则视为像素数。
 * @default 30
 * 
 * @param 下界(bottomBound)
 * @desc 矩形边框下边与原点的距离。若在0-1之间则为比例，若大于1则视为像素数。
 * @default 30
 * 
 * @param 左界(leftBound)
 * @desc 矩形边框左边与原点的距离。若在0-1之间则为比例，若大于1则视为像素数。
 * @default 30
 * 
 * @param 右界(rightBound)
 * @desc 矩形边框右边与原点的距离。若在0-1之间则为比例，若大于1则视为像素数。
 * @default 30
 * 
 * @param 箭头与事件最近距离
 * @desc 箭头会被目标事件挤开一定距离。填写像素数。
 * @default 30
 *
 * @param 混合模式
 * @type select
 * @option 0-普通
 * @value 0
 * @option 1-叠加
 * @value 1
 * @option 2-实色混合(正片叠底、相乘)
 * @value 2
 * @option 3-浅色
 * @value 3
 * @desc pixi的渲染混合模式。
 * @default 0
 *
 */

/**
 * Kgg_MapArrows
 * 地图箭头 命名空间
 */
var Kgg_MapArrows = Kgg_MapArrows || {};

// 加载插件设置
var Imported = Imported || {};
Imported.Kgg_MapArrows = true;
Kgg_MapArrows.parameters = PluginManager.parameters('Kgg_MapArrows');


// =================================================================
// 定义相关
// =================================================================

// 锚点原点类型的枚举
Kgg_MapArrows.AnchorOriginType = {
    IMAGE_CENTER: "image_center",   // 图像中心
    TOP_LEFT: "top_left"            // 左上角
};

// 边框类型的枚举
Kgg_MapArrows.BorderType = {
    RECTANGLE: "rectangle",         // 矩形
    ELLIPSE: "ellipse"              // 椭圆
};

// 边框原点的枚举
Kgg_MapArrows.BorderOrigin = {
    SCREEN_EDGES: "screen_edges",   // 屏幕四边
    SCREEN_CENTER: "screen_center", // 屏幕中心
    TOP_LEFT: "top_left"            // 左上角
};

// 起点类型的枚举
Kgg_MapArrows.StartingPointType = {
    BORDER_CENTER: "border_center", // 边框中心
    SCREEN_CENTER: "screen_center", // 屏幕中心
    PLAYER_SCREEN_POSITION: "player_screen_position", // 玩家位置
    TOP_LEFT: "top_left"            // 左上角
};

/**
 * 箭头样式类
 */
Kgg_MapArrows.ArrowStyle = function (name, imagePath, canRotate,
    anchorOrigin, anchorX, anchorY, gradientMaxDistance, gradientMinDistance,
    borderType, borderOrigin, topBound, bottomBound, leftBound, rightBound,
    arrowEventDistance, blendMode) {
    this.name = name;                                           // name 名称
    this.imagePath = imagePath;                                 // imagePath 图像（文件路径的string）
    this.canRotate = canRotate;                                 // canRotate 是否可旋转
    this.anchorOrigin = anchorOrigin;                           // anchorOrigin 锚点原点类型（二选一：图像中心、左上角） AnchorOriginType
    this.anchor = { "x": anchorX, "y": anchorY };               // anchorX anchorY 锚点（xy坐标）
    this.gradientMaxDistance = gradientMaxDistance;             // gradientMaxDistance 渐变最远距离（number）
    this.gradientMinDistance = gradientMinDistance;             // gradientMinDistance 渐变最近距离（number）
    this.borderType = borderType;                               // borderType 边框类型（二选一：矩形、椭圆形） BorderType
    this.borderOrigin = borderOrigin;                           // borderOrigin 边框原点类型（三选一：屏幕四边、屏幕中心、左上角） BorderOrigin
    this.topBound = topBound;                                   // topBound 上界（number）
    this.bottomBound = bottomBound;                             // bottomBound 下界（number）
    this.leftBound = leftBound;                                 // leftBound 左界（number）
    this.rightBound = rightBound;                               // rightBound 右界（number）
    this.arrowEventDistance = arrowEventDistance;               // arrowEventDistance 箭头与事件最近距离（number）
    this.blendMode = blendMode;                                 // blendMode 混合模式（0 1 2 3）
    this.border = null;                                         // border 初始化后存储矩形或椭圆对象
};

/**
 * 箭头指向的目标
 */
Kgg_MapArrows.Target = function () {
    this.type = "";
    this.mapId = 0;
    this.eventId = 0;
    this._mapX = 0;
    this._mapY = 0;
    this._screenX = 0;
    this._screenY = 0;
};
// 当前屏幕坐标x
Kgg_MapArrows.Target.prototype.x = function () {
    switch (this.type) {
        case "EventId":
            return $gameMap.event(this.eventId).screenX();
        case "MapPoint": // 照抄Game_CharacterBase.prototype.screenX
            var tw = $gameMap.tileWidth();
            var scrolledX = $gameMap.adjustX(this._mapX);
            return Math.round(scrolledX * tw + tw / 2);
        case "ScreenPoint":
            return this._screenX;
        default:
            return;
    }
};
// 当前屏幕坐标y
Kgg_MapArrows.Target.prototype.y = function () {
    switch (this.type) {
        case "EventId":
            return Kgg_MapArrows.Screen.correctedTargetY($gameMap.event(this.eventId).screenY());
        case "MapPoint":
            var th = $gameMap.tileHeight();
            var scrolledY = $gameMap.adjustY(this._mapY);
            return Math.round(scrolledY * th + th / 2);
        case "ScreenPoint":
            return this._screenY;
        default:
            return;
    }
};
// 初始化：指定ID的事件
Kgg_MapArrows.Target.prototype.initEventId = function (mapId, eventId) {
    this.type = "EventId";
    this.mapId = mapId;
    this.eventId = eventId;
};
// 初始化：地图固定位置
Kgg_MapArrows.Target.prototype.initMapPoint = function (mapId, x, y) {
    this.type = "MapPoint";
    this.mapId = mapId;
    this._mapX = x;
    this._mapY = y;
};
// 初始化：屏幕固定位置
Kgg_MapArrows.Target.prototype.initScreenPoint = function (mapId, x, y) {
    this.type = "ScreenPoint";
    this.mapId = mapId;
    this._screenX = x;
    this._screenY = y;
};
// 静态方法：取当前屏幕坐标
Kgg_MapArrows.Target.getXY = function (target) {
    return {x: target.x(), y: target.y()};
    // switch (target.type) {
    //     case "EventId":
    //         return {
    //             x: $gameMap.event(target.eventId).screenX(),
    //             y: Kgg_MapArrows.Screen.correctedTargetY($gameMap.event(target.eventId).screenY())
    //         };
    //     case "MapPoint": // 照抄Game_CharacterBase.prototype.screenX
    //         var tw = $gameMap.tileWidth();
    //         var scrolledX = $gameMap.adjustX(target._mapX);
    //         var th = $gameMap.tileHeight();
    //         var scrolledY = $gameMap.adjustY(target._mapY);
    //         return {
    //             x: Math.round(scrolledX * tw + tw / 2),
    //             y: Math.round(scrolledY * th + th / 2)
    //         };
    //     case "ScreenPoint":
    //         return {
    //             x: target._screenX,
    //             y: target._screenY
    //         };
    //     default:
    //         return;
    // }
};


/**
 * 活动的箭头
 */
Kgg_MapArrows.ActiveArrow = function () {
    this.arrowStyle = null;
    this.target = null;
    this.sprite = null;
};
// 依据SavedArrow初始化ActiveArrow
Kgg_MapArrows.ActiveArrow.prototype.initialize = function (savedArrow) {
    this.arrowStyle = Kgg_MapArrows.arrowStyle(savedArrow.arrowStyleName);
    this.target = savedArrow.target;
};

Kgg_MapArrows.ActiveArrow.prototype.setSprite = function (sprite) {
    this.sprite = sprite;
};

/**
 * 保存的箭头
 * 用于写入存档，需保证成员可序列化且足够简单。
 */
Kgg_MapArrows.SavedArrow = function () {
    this.arrowStyleName = "";   // 箭头样式名称
    this.target = null;         // 目标 {Kgg_MapArrows.Target}
};

Kgg_MapArrows.SavedArrow.prototype.initialize = function (arrowStyleName, target) {
    this.arrowStyleName = arrowStyleName;
    this.target = target;
};

// =================================================================
// 业务逻辑相关
// =================================================================

// $gameTemp._kgg_MapArrows_activeArrowMap 存放活动的箭头
// $gameSystem._kgg_MapArrows_arrowMap 存放需写入存档的箭头 不直接使用

/**
 * 添加箭头，目标为事件
 * 添加指向特定ID的事件的箭头，仅生效于一张地图。
 * @param {String} name 新建箭头名称 用于移除箭头
 * @param {String} arrowStyleName 箭头样式名称
 * @param {Number} eventId 箭头指向的事件ID
 * @param {Number} mapId 生效的地图ID 若不填则默认当前地图
 */
Kgg_MapArrows.addArrowToEvent = function (name, arrowStyleName, eventId, mapId) {
    mapId = mapId || $gameMap.mapId();
    // 创建箭头目标
    var target = new Kgg_MapArrows.Target();
    target.initEventId(mapId, eventId);
    return Kgg_MapArrows.addArrow(name, arrowStyleName, target);
};

/**
 * 添加箭头，目标为位置
 * 添加指向特定地图坐标的箭头，仅生效于一张地图。
 * @param {String} name 新建箭头名称 用于移除箭头
 * @param {String} arrowStyleName 箭头样式名称
 * @param {Number} mapX 箭头指向的地图X坐标
 * @param {Number} mapY 箭头指向的地图Y坐标
 * @param {Number} mapId 生效的地图ID 若不填则默认当前地图
 */
Kgg_MapArrows.addArrowToLocation = function (name, arrowStyleName, mapX, mapY, mapId) {
    mapId = mapId || $gameMap.mapId();
    // 创建箭头目标
    var target = new Kgg_MapArrows.Target();
    target.initMapPoint(mapId, mapX, mapY);
    return Kgg_MapArrows.addArrow(name, arrowStyleName, target);
};

/**
 * 添加箭头
 * 使用设置好的样式，添加指向目标的箭头，仅生效于一张地图。
 * @param {String} name 新建箭头名称 用于移除箭头
 * @param {String} arrowStyleName 箭头样式名称
 * @param {Kgg_MapArrows.Target} target 箭头指向的目标
 */
Kgg_MapArrows.addArrow = function (name, arrowStyleName, target) {
    $gameSystem._kgg_MapArrows_arrowMap = $gameSystem._kgg_MapArrows_arrowMap || {};
    if (!!$gameSystem._kgg_MapArrows_arrowMap[name]) { // name已占用，中止。
        console.warn(`Kgg_MapArrows: 箭头名称 ${name} 已被占用。`);
        return false;
    }
    if (!Kgg_MapArrows.arrowStyle(arrowStyleName)) { // 样式不存在，中止。
        console.warn(`Kgg_MapArrows: 样式名称 ${arrowStyleName} 不存在。`);
        return false;
    }
    // 创建保存的箭头
    var savedArrow = new Kgg_MapArrows.SavedArrow();
    savedArrow.initialize(arrowStyleName, target);
    // 创建活动箭头
    var activeArrow = new Kgg_MapArrows.ActiveArrow();
    activeArrow.initialize(savedArrow);
    // 初始化图像
    Kgg_MapArrows.Image.initImage(activeArrow);
    // 添加到显示layer
    if (SceneManager._scene instanceof Scene_Map) {
        Kgg_MapArrows.Screen.addToLayer(activeArrow);
        Kgg_MapArrows.Screen.updateVisibility(activeArrow);
    }
    // 添加到存档和不存档临时位置
    $gameSystem._kgg_MapArrows_arrowMap[name] = savedArrow;
    $gameTemp._kgg_MapArrows_activeArrowMap[name] = activeArrow;
    return true;
};

/**
 * 指定名称的箭头是否存在
 * @param {String} name 箭头名称
 * @returns 是否存在
 */
Kgg_MapArrows.arrowExist = function (name) {
    if (!!$gameSystem._kgg_MapArrows_arrowMap && !!$gameSystem._kgg_MapArrows_arrowMap[name]) return true;
    return false;
};

/**
 * 移除指定名称的箭头
 * @param {String} name 箭头名称
 * @returns 此箭头是否存在并被清除
 */
Kgg_MapArrows.removeArrow = function (name) {
    if (!this.arrowExist(name)) { // 若name不存在，中止。
        return false;
    }
    // 移出layer
    var activeArrow = $gameTemp._kgg_MapArrows_activeArrowMap[name];
    Kgg_MapArrows.Screen.removeFromLayer(activeArrow);
    delete $gameTemp._kgg_MapArrows_activeArrowMap[name];
    delete $gameSystem._kgg_MapArrows_arrowMap[name];
    return true;
};

/**
 * 清除指定样式的箭头
 * @param {String} arrowStyleName 样式名称
 */
Kgg_MapArrows.clearArrowsByArrowStyle = function (arrowStyleName) {
    if (!$gameSystem._kgg_MapArrows_arrowMap) return;   // 检查存放
    var removingArrowNames = [];
    Object.keys($gameSystem._kgg_MapArrows_arrowMap).forEach(name => {
        if ($gameSystem._kgg_MapArrows_arrowMap[name].arrowStyleName == arrowStyleName) {
            removingArrowNames.push(name);
        }
    });
    removingArrowNames.forEach(name => {
        Kgg_MapArrows.removeArrow(name);
    });
};
// =================================================================
// 起点相关处理
// =================================================================

Kgg_MapArrows.StartingPoint = {};
// 起点类型
// 起点一般是屏幕画面中心，也可能是玩家所在位置
Kgg_MapArrows.StartingPoint.type = Kgg_MapArrows.StartingPointType.SCREEN_CENTER;
// 起点与屏幕左上角的距离。若在0-1之间则为比例，若大于1则视为像素数。只有起点类型选择“左上角”时才会生效。
Kgg_MapArrows.StartingPoint.x = 0.5;
Kgg_MapArrows.StartingPoint.y = 0.5;

/**
 * 获取起点在屏幕上的位置
 * @param {Kgg_MapArrows.ArrowStyle} arrowStyle 箭头样式
 * @returns 起点在屏幕上的位置
 */
Kgg_MapArrows.StartingPoint.screenPoint = function (arrowStyle) {
    switch (Kgg_MapArrows.StartingPoint.type) {
        case Kgg_MapArrows.StartingPointType.BORDER_CENTER: // 边界中心
            if (arrowStyle.borderType == Kgg_MapArrows.BorderType.ELLIPSE) {
                return {    // 椭圆中心
                    x: arrowStyle.border.centerX,
                    y: arrowStyle.border.centerY
                };
            } else {
                return {    // 矩形中心
                    x: arrowStyle.border.x + arrowStyle.border.width / 2,
                    y: arrowStyle.border.y + arrowStyle.border.height / 2
                };
            }
        case Kgg_MapArrows.StartingPointType.SCREEN_CENTER: // 画面中心
            return { x: Graphics.width / 2, y: Graphics.height / 2 };
        case Kgg_MapArrows.StartingPointType.PLAYER_SCREEN_POSITION: // 玩家位置
            if (!!$gamePlayer) {
                return { x: $gamePlayer.screenX(), y: $gamePlayer.screenY() };
            }
        // 注意，这里不break。如果$gamePlayer不存在，就继续往下运行，取左上角像素位置。
        case Kgg_MapArrows.StartingPointType.TOP_LEFT:
        default:
            var x = (this.x > 0 && this.x < 1) ? Graphics.width * this.x : this.x;
            var y = (this.y > 0 && this.y < 1) ? Graphics.height * this.y : this.y;
            return { x: x, y: y }; // 以左上角为原点的像素位置
    }
};

// =================================================================
// 箭头样式相关处理
// =================================================================

Kgg_MapArrows.arrowStyleList = [];          // 箭头样式列表
Kgg_MapArrows.arrowStyleList.length = 20;   // 箭头样式列表元素数

// 根据名称获取样式
Kgg_MapArrows.arrowStyle = function (name) {
    return Kgg_MapArrows.arrowStyleList.find((style) => {
        return style.name == name;
    });
};

// 初始化全部样式的边框
Kgg_MapArrows.initAllBorder = function () {
    for (var i = 0; i < Kgg_MapArrows.arrowStyleList.length; i++) {
        Kgg_MapArrows.initBorder(Kgg_MapArrows.arrowStyleList[i]);
    }
};

// 根据边框类型初始化边框对象
Kgg_MapArrows.initBorder = function (arrowStyle) {
    if (!arrowStyle) return;
    var x1 = arrowStyle.leftBound, x2 = arrowStyle.rightBound, y1 = arrowStyle.topBound, y2 = arrowStyle.bottomBound;
    switch (arrowStyle.borderOrigin) {
        case Kgg_MapArrows.BorderOrigin.SCREEN_EDGES: // 屏幕四边
            x1 = (x1 < 1 && x1 > 0) ? Graphics.width * x1 : x1;         // 转换为左上角参考系的像素数
            x2 = (x2 < 1 && x2 > 0) ? Graphics.width * (1 - x2) : Graphics.width - x2;
            y1 = (y1 < 1 && y1 > 0) ? Graphics.height * y1 : y1;
            y2 = (y2 < 1 && y2 > 0) ? Graphics.height * (1 - y2) : Graphics.height - y2;
            break;
        case Kgg_MapArrows.BorderOrigin.SCREEN_CENTER: // 屏幕中心
            x1 = Graphics.width / 2 - ((x1 < 1 && x1 > 0) ? Graphics.width * x1 : x1); // 转换为左上角参考系的像素数
            x2 = Graphics.width / 2 + ((x2 < 1 && x2 > 0) ? Graphics.width * x2 : x2);
            y1 = Graphics.height / 2 - ((y1 < 1 && y1 > 0) ? Graphics.height * y1 : y1);
            y2 = Graphics.height / 2 + ((y2 < 1 && y2 > 0) ? Graphics.height * y2 : y2);
            break;
        default: // 左上角
            x1 = (x1 < 1 && x1 > 0) ? Graphics.width * x1 : x1;
            x2 = (x2 < 1 && x2 > 0) ? Graphics.width * x2 : x2;
            y1 = (y1 < 1 && y1 > 0) ? Graphics.height * y1 : y1;
            y2 = (y2 < 1 && y2 > 0) ? Graphics.height * y2 : y2;
            break;
    }
    var border = Kgg_MapArrows.Caculation.getRectangle(x1, x2, y1, y2);
    if (arrowStyle.borderType == Kgg_MapArrows.BorderType.ELLIPSE) {
        border = Kgg_MapArrows.Caculation.getInscribedEllipse(border);
    }
    arrowStyle.border = border;
};

// =================================================================
// 图像相关
// =================================================================
Kgg_MapArrows.Image = {};

// 初始化图像
Kgg_MapArrows.Image.initImage = function (activeArrow) {
    // 读取图像
    var filename = activeArrow.arrowStyle.imagePath;
    var img = ImageManager.loadBitmap('img/system/', filename);
    // 不确定路径是否这样设置，要看ArrowStyle是怎么设置的。
    var sprite = new Sprite(img);
    // Kgg：20231101 若要载入多张图片，就在这里写个循环。
    // Kgg：20231115 不做一个箭头样式多张图片的功能了，有需要的可以叠加显示多个箭头。
    // 将图片交给活动箭头
    activeArrow.setSprite(sprite);
    // 根据样式设置锚点
    Kgg_MapArrows.Image.initAnchorFromStyle(activeArrow);
};

// 根据箭头样式初始化活动箭头的sprite的锚点
Kgg_MapArrows.Image.initAnchorFromStyle = function (activeArrow) {
    if (!activeArrow || !activeArrow.sprite) return;
    var arrowStyle = activeArrow.arrowStyle;
    var anchor = arrowStyle.anchor;
    // PIXI的anchor默认是基于比例的，而不是像素数。因此这里要把大于1的转换为比例。
    var anchorX = anchor.x > 1 ? anchor.x / activeArrow.sprite.width : anchor.x;
    var anchorY = anchor.y > 1 ? anchor.y / activeArrow.sprite.height : anchor.y;
    // 若选择锚点的原点是图片中心，则给锚点位置的比例值再加上0.5。
    switch (arrowStyle.anchorOrigin) {
        case Kgg_MapArrows.AnchorOriginType.IMAGE_CENTER:
            anchorX += 0.5;
            anchorY += 0.5;
            break;
        case Kgg_MapArrows.AnchorOriginType.TOP_LEFT:
            break;
        default:
            break;
    }
    activeArrow.sprite.anchor.set(anchorX, anchorY);
};

// 旋转图像
Kgg_MapArrows.Image.setRotationByTwoPoints = function (activeArrow, x1, y1, x2, y2) {
    if (!activeArrow) return;
    var rotation = Kgg_MapArrows.Caculation.getAngle(x1, y1, x2, y2);
    activeArrow.sprite.rotation = rotation;
};

// =================================================================
// 地图相关
// 负责与Scene_Map交互
// =================================================================
Kgg_MapArrows.Map = {};

// 地图场景创建显示层时，加入箭头显示层。
Kgg_MapArrows.Map.createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function () {
    Kgg_MapArrows.Map.createDisplayObjects.apply(this, arguments);
    Kgg_MapArrows.Screen.addLayer(this);
};

// 切换地图时，显示设为在当前地图显示的箭头。
Kgg_MapArrows.Map.start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function () {
    Kgg_MapArrows.Map.start.apply(this, arguments);
    if (!Kgg_MapArrows.arrowStyleBorderReady) {
        Kgg_MapArrows.initAllBorder(); // 初始化ArrowStyle的border
        // 之所以选择在进入地图的时候初始化边框，是因为初始化太早会导致取不到Graphics的属性。
        Kgg_MapArrows.arrowStyleBorderReady = true; // 避免重复计算
    }
    Kgg_MapArrows.Map.needFirstUpdate = true;
};

// 地图场景刷新时，地图箭头也刷新。
Kgg_MapArrows.Map.update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
    Kgg_MapArrows.Map.update.apply(this, arguments);
    Kgg_MapArrows.Map.firstUpdate();
    Kgg_MapArrows.Screen.updateAllArrow();
};

// 进入地图首次刷新时，加载箭头。
Kgg_MapArrows.Map.firstUpdate = function () {
    if (Kgg_MapArrows.Map.needFirstUpdate) {
        Kgg_MapArrows.Map.needFirstUpdate = false;
        // 加载所有箭头
        // $gameSystem._kgg_MapArrows_arrowMap = $gameSystem._kgg_MapArrows_arrowMap || {}; // 取存档中的gameSystem中的savedArrow
        $gameTemp._kgg_MapArrows_activeArrowMap = $gameTemp._kgg_MapArrows_activeArrowMap || {}; // 读取临时数据中的activeArrowMap
        var arrowMap = $gameTemp._kgg_MapArrows_activeArrowMap; // 读取临时数据中的每个activeArrow
        Object.keys(arrowMap).forEach(name => {
            var activeArrow = arrowMap[name];
            // 将$gameTemp._kgg_MapArrows_activeArrowMap中的每一个箭头按条件加入显示层。
            if (activeArrow.target.mapId == $gameMap.mapId()) {
                // 初始化图像
                Kgg_MapArrows.Image.initImage(activeArrow);
                // 添加到显示layer
                Kgg_MapArrows.Screen.addToLayer(activeArrow);
                // Kgg_MapArrows.Screen.updateVisibility(activeArrow);
            }
            // Kgg_MapArrows.addArrow(name, activeArrow.arrowStyle.name, activeArrow.target);
            Kgg_MapArrows.Screen.addToLayer($gameTemp._kgg_MapArrows_activeArrowMap[name]); // 加入Layer
        });
        Kgg_MapArrows.Screen.updateAllVisibility(); // 刷新可见性，依据地图ID是否等于生效的mapId条件。
    }
};

// =================================================================
// 存读档相关
// 负责与Game_System交互
// =================================================================
/*
 * 添加箭头或读取存档时，会向$gameSystem._kgg_MapArrows_arrowMap加入箭头
 * 数据，并复制一份放在$gameTemp._kgg_MapArrows_activeArrowMap。
 * $gameTemp同时会存放Sprite对象。
 * 后续的处理使用$gameTemp中的数据。
 * 容易与之混淆的是$gameTemp._kgg_MapArrows_arrowLayer，这个是全部
 * 箭头所在的层。
 */
Kgg_MapArrows.SaveLoad = {};

// 存进$gameSystem的数据会自动保存进存档，存档时无需额外处理

// 读取存档后处理，加入地图箭头的处理
Kgg_MapArrows.SaveLoad.onAfterLoad = Game_System.prototype.onAfterLoad;
Game_System.prototype.onAfterLoad = function () {
    Kgg_MapArrows.SaveLoad.onAfterLoad.call(this);
    Kgg_MapArrows.onLoadData();
};

// 读取存档后地图箭头的处理
Kgg_MapArrows.onLoadData = function () {
    var savedArrows = $gameSystem._kgg_MapArrows_arrowMap || {}; // 取存档中的gameSystem中的savedArrow
    $gameTemp._kgg_MapArrows_activeArrowMap = {};
    Object.keys(savedArrows).forEach(name => { // 在$gameTemp中创建$gameSystem中的每一个箭头
        var savedArrow = savedArrows[name];
        // 创建活动箭头
        var activeArrow = new Kgg_MapArrows.ActiveArrow();
        activeArrow.initialize(savedArrow);
        // 添加到不存档临时位置
        $gameTemp._kgg_MapArrows_activeArrowMap[name] = activeArrow;
    });
};

// =================================================================
// 屏幕相关
// =================================================================
Kgg_MapArrows.Screen = {};

Kgg_MapArrows.Screen.displayBorder = false; // 是否显示边框线，默认为否。

// 坐标y轴固定偏移18像素
Kgg_MapArrows.Screen.correctedTargetY = function (targetY) {
    return targetY - 18;
};

// 添加箭头显示层
Kgg_MapArrows.Screen.addLayer = function (scene) {
    $gameTemp._kgg_MapArrows_arrowLayer = new Sprite();
    $gameTemp._kgg_MapArrows_arrowLayer.__note__ = "显示箭头的层";
    if (!!scene) {
        scene.addChild($gameTemp._kgg_MapArrows_arrowLayer);
    } else {
        SceneManager._scene.addChild($gameTemp._kgg_MapArrows_arrowLayer);
    }
};

// 刷新整个箭头层级的透明度，依据是是否正在对话
Kgg_MapArrows.Screen.updateArrowLayerOpacity = function () {
    if (!$gameTemp._kgg_MapArrows_arrowLayer) return;
    $gameTemp._kgg_MapArrows_arrowLayer.opacity += !$gameMessage.isBusy() ? 12 : -12;
};

// 将箭头加入显示层级
Kgg_MapArrows.Screen.addToLayer = function (activeArrow) {
    if (!activeArrow || !activeArrow.sprite) {
        console.warn("Kgg_MapArrows.Screen.addToLayer: 参数错误");
        return;
    }
    if (!!$gameTemp._kgg_MapArrows_arrowLayer) {
        $gameTemp._kgg_MapArrows_arrowLayer.addChild(activeArrow.sprite);
    }
    if (this.displayBorder) {
        this.addTestLine(activeArrow.arrowStyle);
    }
};

// 将箭头移出显示层级
Kgg_MapArrows.Screen.removeFromLayer = function (activeArrow) {
    if (!activeArrow || !activeArrow.sprite) return;
    if (!!$gameTemp._kgg_MapArrows_arrowLayer) {
        $gameTemp._kgg_MapArrows_arrowLayer.removeChild(activeArrow.sprite);
    }
};

// 刷新某个箭头可见性
Kgg_MapArrows.Screen.updateVisibility = function (activeArrow) {
    if (!activeArrow || !activeArrow.sprite) return;
    activeArrow.sprite.visible = activeArrow.target.mapId == $gameMap.mapId();
};

// 刷新所有箭头的可见性
Kgg_MapArrows.Screen.updateAllVisibility = function () {
    for (var key in $gameTemp._kgg_MapArrows_activeArrowMap) {
        var o = $gameTemp._kgg_MapArrows_activeArrowMap[key];
        Kgg_MapArrows.Screen.updateVisibility(o);
    }
};

// 刷新某个箭头位置
Kgg_MapArrows.Screen.updatePosition = function (activeArrow) {
    // 计算与边框交点
    // A是起点（屏幕中心点），B是目标点，C是直线AB与边框border的交点（交点有两个取距离B近的），F是最终确定的箭头位置。
    // activeArrow.sprite.x = 0;
    // activeArrow.sprite.y = 0;
    var arrowEventDistance = activeArrow.arrowStyle.arrowEventDistance;
    var borderType = activeArrow.arrowStyle.borderType;
    var border = activeArrow.arrowStyle.border;
    var pointA = Kgg_MapArrows.StartingPoint.screenPoint(activeArrow.arrowStyle);
    var pointB = Kgg_MapArrows.Target.getXY(activeArrow.target);
    // console.log(pointB);
    var pointC = { x: 0, y: 0 };
    var pointF = { x: -7777, y: -7777 };
    var pointBInsideBorder;

    // 判断B是否在border内
    if (borderType == Kgg_MapArrows.BorderType.RECTANGLE) {
        pointBInsideBorder = Kgg_MapArrows.Caculation.isPointInRectangle(border, pointB);
    } else if (borderType == Kgg_MapArrows.BorderType.ELLIPSE) {
        pointBInsideBorder = Kgg_MapArrows.Caculation.isPointInEllipse(border, pointB);
    }

    if (pointBInsideBorder) {
        // 若B在border内，则取射线BA上符合BC距离的点。
        pointF = Kgg_MapArrows.Caculation.getPointOnRay(pointB, pointA, arrowEventDistance);
    } else {
        // 若B在border外，且C距离B 大于 BC最近距离，则取交点C
        // 若B在border外，且C距离B 小于 BC最近距离，则取射线BA上符合BC距离的点。
        if (borderType == Kgg_MapArrows.BorderType.RECTANGLE) {
            pointC = Kgg_MapArrows.Caculation.getIntersectionPoint(border, pointA, pointB);
        } else if (borderType == Kgg_MapArrows.BorderType.ELLIPSE) {
            pointC = Kgg_MapArrows.Caculation.getEllipseIntersectionPoint(border, pointA, pointB);
        }
        if ((pointC.x - pointB.x) * (pointC.x - pointB.x) + (pointC.y - pointB.y) * (pointC.y - pointB.y) >= arrowEventDistance * arrowEventDistance) {
            // 当C距离B 大于 BC最近距离
            pointF = pointC;
        } else {
            // 当C距离B 小于 BC最近距离
            pointF = Kgg_MapArrows.Caculation.getPointOnRay(pointB, pointA, arrowEventDistance);
        }
    }

    // 设置箭头Sprite的位置
    activeArrow.sprite.position.set(pointF.x, pointF.y);
};

// 刷新某个箭头旋转
Kgg_MapArrows.Screen.updateRotation = function (activeArrow) {
    if (activeArrow.arrowStyle.canRotate == false) return;
    var startingPoint = Kgg_MapArrows.StartingPoint.screenPoint(activeArrow.arrowStyle);
    var targetPoint = Kgg_MapArrows.Target.getXY(activeArrow.target);
    Kgg_MapArrows.Image.setRotationByTwoPoints(activeArrow, startingPoint.x, startingPoint.y, targetPoint.x, targetPoint.y);
};

// 刷新某个箭头渐变透明度，依据画面中心坐标是否足够接近目标
Kgg_MapArrows.Screen.updateAlpha = function (activeArrow) {
    var minDistance = activeArrow.arrowStyle.gradientMinDistance; // 渐变开始距离（完全透明）
    var maxDistance = activeArrow.arrowStyle.gradientMaxDistance; // 渐变结束距离（完全不透明）
    var startingPoint = Kgg_MapArrows.StartingPoint.screenPoint(activeArrow.arrowStyle);  // 起点
    var targetPoint = Kgg_MapArrows.Target.getXY(activeArrow.target); // 目标点
    // 求当前距离在渐变数轴的哪个位置
    var gradientDistance = maxDistance - minDistance;
    var targetDistance = Math.sqrt((startingPoint.x - targetPoint.x) ** 2 + (startingPoint.y - targetPoint.y) ** 2) - minDistance;
    var ratio = Math.min(Math.max(targetDistance / gradientDistance, 0), 1);
    activeArrow.sprite.alpha = ratio;
};

// 刷新所有箭头（位置、旋转、透明度）
Kgg_MapArrows.Screen.updateAllArrow = function () {
    // console.log('Kgg_MapArrows.Screen.updateAllArrow');
    this.updateArrowLayerOpacity();
    for (var key in $gameTemp._kgg_MapArrows_activeArrowMap) {
        var o = $gameTemp._kgg_MapArrows_activeArrowMap[key];
        if (!!o.sprite && o.sprite.visible) {
            // Kgg_MapArrows.Screen.updateVisibility(o);
            // if (o.target.mapId != $gameMap.mapId()) continue; // 校验地图是否正确
            Kgg_MapArrows.Screen.updatePosition(o);
            Kgg_MapArrows.Screen.updateRotation(o);
            Kgg_MapArrows.Screen.updateAlpha(o);
        }
    }
};

// 显示边界线 仅调试用
// 注意，没有提供清除这些边界线的方法。
Kgg_MapArrows.Screen.addTestLine = function (arrowStyle) {
    var stage = SceneManager._scene;
    // 随机颜色
    var color = Math.random() * 0xffffff;
    if (arrowStyle.borderType == Kgg_MapArrows.BorderType.ELLIPSE) {
        var x = arrowStyle.border.centerX;
        var radiusX = arrowStyle.border.radiusX;
        var y = arrowStyle.border.centerY;
        var radiusY = arrowStyle.border.radiusY;
        // 绘制边框线
        var borderTestLine = new PIXI.Graphics();
        borderTestLine.lineStyle(5, color);
        borderTestLine.drawEllipse(x, y, radiusX, radiusY);
        stage.addChild(borderTestLine);
    } else {
        var x = arrowStyle.border.x;
        var width = arrowStyle.border.width;
        var y = arrowStyle.border.y;
        var height = arrowStyle.border.height;
        // 绘制边框线
        var borderTestLine = new PIXI.Graphics();
        borderTestLine.lineStyle(5, color);
        borderTestLine.drawRect(x, y, width, height);
        stage.addChild(borderTestLine);
    }
};

// =================================================================
// 计算相关
// =================================================================
Kgg_MapArrows.Caculation = {};

// 定义一个矩形，由两条垂直线（x1和x2）和两条水平线（y1和y2）组成
Kgg_MapArrows.Caculation.getRectangle = function (x1, x2, y1, y2) {
    var width = Math.abs(x2 - x1);    // 宽
    var height = Math.abs(y2 - y1);   // 高
    var x = Math.min(x1, x2);         // 左上点x
    var y = Math.min(y1, y2);         // 左上点y
    return { x, y, width, height };
};
// 定义一个椭圆，是根据矩形得到的内切椭圆
Kgg_MapArrows.Caculation.getInscribedEllipse = function (rectangle) {
    var centerX = rectangle.x + rectangle.width / 2;  // 中点x
    var centerY = rectangle.y + rectangle.height / 2; // 中点y
    var radiusX = rectangle.width / 2;                // 水平半径
    var radiusY = rectangle.height / 2;               // 垂直半径
    return { centerX, centerY, radiusX, radiusY };
};
// 根据两点得到一条直线（后来没用上这个函数）
Kgg_MapArrows.Caculation.getLine = function (point1, point2) {
    var slope = (point2.y - point1.y) / (point2.x - point1.x);
    var yIntercept = point1.y - slope * point1.x;
    return { slope, yIntercept }; // 直线方程： y = slope * x + yIntercept
};
// 根据矩形、点A与点B的坐标，输出点A向点B发射的射线与矩形的交点
Kgg_MapArrows.Caculation.getIntersectionPoint = function (rectangle, pointA, pointB) {
    var { x: rectX, y: rectY, width: rectWidth, height: rectHeight } = rectangle;
    var { x: pointAX, y: pointAY } = pointA;
    var { x: pointBX, y: pointBY } = pointB;

    // 计算射线斜率
    var slope = (pointBX - pointAX) === 0 ? null : (pointBY - pointAY) / (pointBX - pointAX);

    // 计算射线与矩形四条边的交点
    var topIntersection = slope === null ? { x: pointAX, y: rectY } : slope === 0 ? null : { x: pointAX + (rectY - pointAY) / slope, y: rectY };
    var bottomIntersection = slope === null ? { x: pointAX, y: rectY + rectHeight } : slope === 0 ?
        null : { x: pointAX + (rectY + rectHeight - pointAY) / slope, y: rectY + rectHeight };
    var leftIntersection = slope === null ? null : { x: rectX, y: pointAY + (rectX - pointAX) * slope };
    var rightIntersection = slope === null ? null : { x: rectX + rectWidth, y: pointAY + (rectX + rectWidth - pointAX) * slope };

    // 判断交点是否在矩形内部
    var intersections = [topIntersection, bottomIntersection, leftIntersection, rightIntersection].filter(intersection => intersection !== null);
    var validIntersections = intersections.filter(intersection => {
        return intersection.x >= rectX && intersection.x <= rectX + rectWidth && intersection.y >= rectY && intersection.y <= rectY + rectHeight;
    });

    // 返回最近的交点
    if (validIntersections.length === 0) {
        return { x: -8888, y: -8888 };
    } else {
        var minDistance = Infinity;
        var closestIntersection = null;
        validIntersections.forEach(intersection => {
            var distance = Math.sqrt((intersection.x - pointBX) ** 2 + (intersection.y - pointBY) ** 2);
            if (distance < minDistance) {
                minDistance = distance;
                closestIntersection = intersection;
            }
        });
        return closestIntersection;
    }
};

// 点B是否在矩形内
Kgg_MapArrows.Caculation.isPointInRectangle = function (rectangle, pointB) {
    return pointB.x >= rectangle.x && pointB.x <= rectangle.x + rectangle.width &&
        pointB.y >= rectangle.y && pointB.y <= rectangle.y + rectangle.height;
};
// 点B是否在椭圆内
Kgg_MapArrows.Caculation.isPointInEllipse = function (ellipse, pointB) {
    var { centerX, centerY, radiusX, radiusY } = ellipse;
    var dx = pointB.x - centerX;
    var dy = pointB.y - centerY;
    return (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1;
};

// 输入点A、B坐标，输入点C与点B的距离，得到在射线BA上的点C的坐标。
Kgg_MapArrows.Caculation.getPointOnRay = function (pointA, pointB, distanceCB) {
    // 计算向量AB
    var vectorAB = { x: pointB.x - pointA.x, y: pointB.y - pointA.y };
    // 计算向量AB的长度
    var lengthAB = Math.sqrt(vectorAB.x * vectorAB.x + vectorAB.y * vectorAB.y);
    // 计算单位向量AB
    var unitVectorAB = { x: vectorAB.x / lengthAB, y: vectorAB.y / lengthAB };
    // 计算向量AC
    var vectorAC = { x: unitVectorAB.x * distanceCB, y: unitVectorAB.y * distanceCB };
    // 计算点C的坐标
    var pointC = { x: pointA.x + vectorAC.x, y: pointA.y + vectorAC.y };
    return pointC;
};

// 根据椭圆、点A与点B的坐标，输出点A向点B发射的射线与椭圆的交点
/*
* 2023.10.27
* 椭圆可以做，只是我高中数学都忘了。
* 1 把坐标系变换到椭圆中心
* 2 得到直线方程和椭圆方程
* 3 联立直线方程和椭圆方程，得到一元二次方程
* 4 用判别式b^2-4ac知道是否有交点
* 5 求出两个交点，看方向。
* 
* 如果第2步算y=kx+b的时候得不到k，说明直线是竖直的，直接代入x看有没有交点，若有就取交点看方向。
*/
// __times__ = 0;
Kgg_MapArrows.Caculation.getEllipseIntersectionPoint = function (ellipse, pointA, pointB) {
    // __times__++;
    var { centerX, centerY, radiusX, radiusY } = ellipse; // 获取椭圆属性
    var { x: x1, y: y1 } = pointA;                        // 获取点A（屏幕中心）
    var { x: x2, y: y2 } = pointB;                        // 获取点B（目标点）

    // 将直线的坐标系变换到椭圆中心
    var x1_ = x1 - centerX;
    var y1_ = y1 - centerY;
    var x2_ = x2 - centerX;
    var y2_ = y2 - centerY;

    // 计算直线AB的斜率
    var k = (y2_ - y1_) / (x2_ - x1_);
    // 直线斜率不存在的情况
    if (k === Infinity || k === -Infinity) {
        if (Math.abs(x1_) < radiusX) { // 有交点
            var x_ = x1_;
            var y_ = radiusY * Math.sqrt(radiusX ** 2 - x_ ** 2) / radiusX;
            if (y2_ < 0) y_ = -y_; // 区分在上还是在下
            var x = x_ + centerX;
            var y = y_ + centerY;
            return { x, y };
        }
        return { x: 9999, y: 9999 };
    }

    // 计算直线AB的截距
    var c = y1_ - k * x1_;

    // 计算判别式
    // A、B、C是一元二次方程中的项系数，一元二次标准方程Ax^2+Bx+C=0
    var A = radiusY ** 2 + radiusX ** 2 * k ** 2;
    var B = 2 * radiusX ** 2 * k * c;
    var C = radiusX ** 2 * c ** 2 - radiusX ** 2 * radiusY ** 2;
    var delta = B ** 2 - 4 * A * C;

    // 分类讨论交点个数
    if (delta < 0) { // 没有交点
        return { x: 9999, y: 9999 };
    } else if (delta === 0) { // 有一个交点
        var x_ = -B / (2 * A);
        var y_ = k * x_ + c;
        // 转回屏幕坐标
        var x = x_ + centerX;
        var y = y_ + centerY;
        return { x, y };
    } else { // 有两个交点
        // 用求根公式
        var x_3 = (-B + Math.sqrt(delta)) / (2 * A); // 第一个根
        var y_3 = k * x_3 + c;
        var x_4 = (-B - Math.sqrt(delta)) / (2 * A); // 第二个根
        var y_4 = k * x_4 + c;
        var distance3_square = (x_3 - x2_) * (x_3 - x2_) + (y_3 - y2_) * (y_3 - y2_);
        var distance4_square = (x_4 - x2_) * (x_4 - x2_) + (y_4 - y2_) * (y_4 - y2_);
        // if (__times__ % 2) { // 让两个都显示出来用于测试
        if (distance3_square < distance4_square) { // 判断哪个点离目标点近
            var x = x_3 + centerX; // 转回屏幕坐标
            var y = y_3 + centerY;
            return { x, y };
        } else {
            var x = x_4 + centerX; // 转回屏幕坐标
            var y = y_4 + centerY;
            return { x, y };
        }
    }
};

Kgg_MapArrows.Caculation.getAngle = function (x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.atan2(dy, dx);
};

// =================================================================
// 插件指令相关
// 负责与Game_Interpreter交互
// =================================================================
/*
 * 插件指令格式：
 * ----------------------------------------------------------
 * 用法
 * ----------------------------------------------------------
 * 功能：在本地图添加箭头，指向事件或位置，可以用常量或变量指定
 * 插件指令：
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 事件[15]
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 事件变量[15]
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 位置[15,16]
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 位置变量[15,16]
 * 说明：
 * 1.名称是自定义的。为箭头设置名称作用是区分不同箭头，移除箭头时用。
 * 2.样式名可在插件管理器自定。
 * 3.事件变量[15]代表箭头目标是“编号为第15号变量的值的事件”。
 * 4.位置[15,16]代表地图中x为15，y为16的格子。
 * 5.添加的箭头仅在当前地图生效，重新进入地图仍然生效。
 * 举例：
 * >地图箭头 : 添加箭头 : MyArrow1 : 默认样式 : 事件[15]
 * ----------------------------------------------------------
 * 功能：在指定地图添加箭头，指向事件
 * 插件指令：
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 事件[15] : 地图[1]
 * >地图箭头 : 添加箭头 : 名称 : 样式名 : 事件[15] : 地图变量[1]
 * 说明：
 * 在上一种指令基础上，可以指定生效的地图编号。
 * ----------------------------------------------------------
 * 功能：按名称移除箭头
 * 插件指令：
 * >地图箭头 : 移除箭头 : 名称
 * ----------------------------------------------------------
 * 功能：按样式清除箭头
 * 插件指令：
 * >地图箭头 : 按样式清除箭头 : 样式名
 * 说明：
 * 移除每一个指定样式的箭头。
 * =================================================================
 */
Kgg_MapArrows.Interpreter = {};

// 重写pluginCommand
Kgg_MapArrows.Interpreter.pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    Kgg_MapArrows.Interpreter.pluginCommand.call(this, command, args);

    if (command == ">地图箭头") {
        // 双数位置是冒号“:”，例如args[0]，args[2]等。
        if (args.length == 4) {
            var type = String(args[1]);
            var name = String(args[3]);
            if (type == "移除箭头") {
                Kgg_MapArrows.removeArrow(name);
            }
            if (type == "按样式清除箭头") {
                Kgg_MapArrows.clearArrowsByArrowStyle(name);
            }
        }
        if (args.length == 8 || args.length == 10) {
            var type = String(args[1]);
            var name = String(args[3]);
            var style = String(args[5]);
            var unit = String(args[7]);
            // 地图编号处理
            var mapId = $gameMap.mapId();
            if (args.length == 10) {
                if (args[9].indexOf("地图[") != -1) {
                    mapId = Number(args[9].replace("地图[", "").replace("]", ""));
                } else if (args[9].indexOf("地图变量[") != -1) {
                    mapId = $gameVariables.value(Number(args[9].replace("地图变量[", "").replace("]", "")));
                }
            }
            // 判断指令类型
            if (type == "添加箭头") {
                if (unit.indexOf("事件[") != -1) {
                    unit = unit.replace("事件[", "");
                    unit = unit.replace("]", "");
                    var e_id = Number(unit);
                    Kgg_MapArrows.addArrowToEvent(name, style, e_id, mapId);
                }
                if (unit.indexOf("事件变量[") != -1) {
                    unit = unit.replace("事件变量[", "");
                    unit = unit.replace("]", "");
                    var e_id = $gameVariables.value(Number(unit));
                    Kgg_MapArrows.addArrowToEvent(name, style, e_id, mapId);
                }
                if (unit.indexOf("位置[") != -1) {
                    unit = unit.replace("位置[", "");
                    unit = unit.replace("]", "");
                    var pos = unit.split(/[,，]/);
                    if (pos.length >= 2) {
                        var x = Number(pos[0]);
                        var y = Number(pos[1]);
                        Kgg_MapArrows.addArrowToLocation(name, style, x, y, mapId);
                    }
                }
                if (unit.indexOf("位置变量[") != -1) {
                    unit = unit.replace("位置变量[", "");
                    unit = unit.replace("]", "");
                    var pos = unit.split(/[,，]/);
                    if (pos.length >= 2) {
                        var x = $gameVariables.value(Number(pos[0]));
                        var y = $gameVariables.value(Number(pos[1]));
                        Kgg_MapArrows.addArrowToLocation(name, style, x, y, mapId);
                    }
                }
            }
        }
    }
};


// =================================================================
// 进入游戏时立即处理
// =================================================================
// 读取插件设置的ArrowStyle，写入键值对。
// 显示边界线设置
Kgg_MapArrows.Screen.displayBorder = Boolean(Kgg_MapArrows.parameters["显示边界线"] == "true");
// 起点设置
Kgg_MapArrows.StartingPoint.type = String(Kgg_MapArrows.parameters["起点类型"] || "screen_center");
Kgg_MapArrows.StartingPoint.x = Number(Kgg_MapArrows.parameters["起点X"] || 0.5);
Kgg_MapArrows.StartingPoint.y = Number(Kgg_MapArrows.parameters["起点Y"] || 0.5);
// 箭头样式设置
for (var i = 0; i < Kgg_MapArrows.arrowStyleList.length; i++) {
    if (Kgg_MapArrows.parameters["箭头-" + String(i + 1)] != undefined &&
        Kgg_MapArrows.parameters["箭头-" + String(i + 1)] != "") {
        var arrowStyleData = JSON.parse(Kgg_MapArrows.parameters["箭头-" + String(i + 1)]);
        // constructor(name, imagePath, anchorOrigin, anchorX, anchorY, gradientMaxDistance, gradientMinDistance, borderType, 
        // borderOrigin, topBound, bottomBound, leftBound, rightBound, arrowEventDistance, blendMode) {
        var arrowStyle = new Kgg_MapArrows.ArrowStyle(
            String(arrowStyleData["名称"] || "未命名"),                 // name 名称
            String(arrowStyleData["箭头图像"] || "Shadow1"),            // imagePath 图像（文件路径的string）
            Boolean(arrowStyleData["是否可旋转"] == "true" || true),    // canRotate 是否可旋转
            String(arrowStyleData["锚点原点类型(AnchorOriginType)"] || "top_left"),// anchorOrigin 锚点原点类型（二选一：图像中心、左上角） AnchorOriginType
            Number(arrowStyleData["锚点X"] || 0.16667),                 // anchorX 锚点（xy坐标）
            Number(arrowStyleData["锚点Y"] || 0.16667),                 // anchorY
            Number(arrowStyleData["渐变最远距离"] || 300),              // gradientMaxDistance 渐变最远距离（number）
            Number(arrowStyleData["渐变最近距离"] || 150),              // gradientMinDistance 渐变最近距离（number）
            String(arrowStyleData["边框类型(BorderType)"] || "rectangle"),// borderType 边框类型（二选一：矩形、椭圆形） BorderType
            String(arrowStyleData["边框原点类型(BorderOrigin)"] || "screen_edges"),// borderOrigin 边框原点类型（三选一：屏幕四边、屏幕中心、左上角） BorderOrigin
            Number(arrowStyleData["上界(topBound)"] || 0),              // topBound 上界（number）
            Number(arrowStyleData["下界(bottomBound)"] || 0),           // bottomBound 下界（number）
            Number(arrowStyleData["左界(leftBound)"] || 0),             // leftBound 左界（number）
            Number(arrowStyleData["右界(rightBound)"] || 0),            // rightBound 右界（number）
            Number(arrowStyleData["箭头与事件最近距离"] || 30),         // arrowEventDistance 箭头与事件最近距离（number）
            Number(arrowStyleData["混合模式"] || 30)                    // blendMode 混合模式（0 1 2 3）
        );
        Kgg_MapArrows.arrowStyleList[i] = arrowStyle;
    }
};
