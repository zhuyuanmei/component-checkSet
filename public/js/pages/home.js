/**
 * 移动官网
 * @since 2015.10.31
 */
define(function (require, exports, module) {
    //'校验集合'模块 -- 以下示例 对字段作失焦校验
    if($('#J_CheckSet').length){
        var checkSet = require('checkSet');
        var checkSetInstance = $.checkSet();

        var $errorTip = $('#J_ErrorTip');

        /**
         * 校验名字(真实姓名或昵称)
         * return:boolean类型
         * $name:Object类型 - 名字对象
         * type:String类型 - 真实姓名('realName')；昵称('nickName')
         * $tip:Object类型 - 错误提示语载体对象
         * required:boolean类型 - 必填(true)或非必填(false)
         */
        //真实姓名校验
        var $realName = $('#J_RealName');
        $realName.on('blur',function(){
            var validateRealNameFlag = checkSetInstance.validateName($realName,'realName',$errorTip,true);
        });

        //昵称校验
        var $nickName = $('#J_NickName');
        $nickName.on('blur',function(){
            var validateNickNameFlag = checkSetInstance.validateName($nickName,'nickName',$errorTip,false);
        });

        /**
         * 校验身份证
         * return:boolean类型
         * $IdCard:Object类型 - 身份证对象
         * $tip:Object类型 - 错误提示语载体对象
         * required:boolean类型 - 必填(true)或非必填(false)
         */
        //身份证校验
        var $IdCard = $('#J_IdCard');
        $IdCard.on('blur',function(){
            var validateIdCardFlag = checkSetInstance.validateIdCard($IdCard,$errorTip,true);
        });

        /**
         * 校验手机号码
         * return:boolean类型
         * $phone:Object类型 - 手机号码对象
         * $tip:Object类型 - 错误提示语载体对象
         * required:boolean类型 - 必填(true)或非必填(false)
         */
        //手机号码校验
        var $mobilePhone = $('#J_MobilePhone');
        $mobilePhone.on('blur',function(){
            var validateMobilePhoneFlag = checkSetInstance.validateMobilePhone($mobilePhone,$errorTip,true);
        });

        /**
         * 校验家庭号码(匹配手机号码和带区号的电话号码)
         * return:boolean类型
         * $phone:Object类型 - 家庭号码对象
         * $tip:Object类型 - 错误提示语载体对象
         * required:boolean类型 - 必填(true)或非必填(false)
         */
        //家庭电话校验
        var $telePhone = $('#J_TelePhone');
        $telePhone.on('blur',function(){
            var validateTelePhoneFlag = checkSetInstance.validateTelePhone($telePhone,$errorTip,false);
        });

        /**
         * 校验电子邮箱
         * return:boolean类型
         * $email:Object类型 - 电子邮箱对象
         * $tip:Object类型 - 错误提示语载体对象
         * required:boolean类型 - 必填(true)或非必填(false)
         */
        //电子邮箱校验
        var $email = $('#J_Email');
        $email.on('blur',function(){
            var validateEmailFlag = checkSetInstance.validateEmail($email,$errorTip,false);
        });

        /**
         * 校验金额
         * return:boolean类型
         * $money:Object类型 - 金额对象
         * minNumber:Number类型(float) - 最小金额
         * maxNumber:Number类型(float) - 最大金额
         * $tip:Object类型 - 错误提示语载体对象
         * required:boolean类型 - 必填(true)或非必填(false)
         */
        //金额校验
        var $money = $('#J_Money');
        $money.on('blur',function(){
            var validateMoneyFlag = checkSetInstance.validateMoney($money,0,100,$errorTip,false);
        });

        /**
         * 校验密码
         * return:boolean类型
         * $pwd:Object类型 - 登录密码对象
         * $rePwd:Object类型 - 确认密码对象
         * type:String类型 - 密码类型('pwd':校验登录密码;'rePwd':校验确认密码)
         * $tip:Object类型 - 错误提示语载体对象
         * required:boolean类型 - 必填(true)或非必填(false)
         */
        //登录密码校验
        var $pwd = $('#J_Pwd');
        var $rePwd = $('#J_RePwd');

        $pwd.on('blur',function(){
            var validatePwdFlag = checkSetInstance.validatePwd($pwd,null,'pwd',$errorTip,true);
        });

        //确认密码校验
        $rePwd.on('blur',function(){
            var validateRePwdFlag = checkSetInstance.validatePwd($pwd,$rePwd,'rePwd',$errorTip,true);
        });
    }
});