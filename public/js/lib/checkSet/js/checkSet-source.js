/**
 * 校验集合模块
 * @author zym
 * @version 1.0
 * @since 2016-10-20
*/

define(function(require, exports, module) {
    var CheckSet = function(options) {
        this.settings = $.extend({}, CheckSet.defaults, options);
    };

    CheckSet.prototype = {
            /**
             * 错误提示公用函数
             */
            errorTip : function($target, tip){
                $target.show();
                $target.text(tip);

                setTimeout(function(){
                    $target.removeClass('error-tip');
                    $target.addClass('error-tip-fade');

                    setTimeout(function(){
                        $target.removeClass('error-tip-fade');
                        $target.addClass('error-tip');

                        $target.hide();
                    },500);
                },2000);
            },

            /**
             * 计算字节公用函数
             */
            getStrLen : function(str){
                return str.replace(/[^\x00-\xff]/g, '__').length;
            },

            /**
             * 校验名字(真实姓名或昵称)
             * return:boolean类型
             * $name:Object类型 - 名字对象
             * type:String类型 - 真实姓名('realName')；昵称('nickName')
             * $tip:Object类型 - 错误提示语载体对象
             * required:boolean类型 - 必填(true)或非必填(false)
             */
            validateName : function($name, type, $tip, required){
                var _this = this;

                var result = false;

                var nameFlag = (required || (!required && $.trim($name.val()) !== ''));

                if(nameFlag && !(/^[\u4e00-\u9fa5a-zA-Z0-9]+$/g.test($.trim($name.val())))){
                    var tip = type === 'realName' ? '真实姓名为数字、字母或中文' : '昵称为数字、字母或中文';

                    _this.errorTip($tip,tip);

                    result = false;
                }else if(nameFlag && _this.getStrLen($.trim($name.val())) > 15){
                    var tip = type === 'realName' ? '真实姓名最多15个字符' : '昵称最多15个字符';

                    _this.errorTip($tip,tip);

                    result = false;
                }else{
                    result = true;
                }

                return result;
            },

            /**
             * 校验身份证
             * return:boolean类型
             * $IdCard:Object类型 - 身份证对象
             * $tip:Object类型 - 错误提示语载体对象
             * required:boolean类型 - 必填(true)或非必填(false)
             */
            validateIdCard : function($IdCard, $tip, required){
                var _this = this;

                var result = false;

                if((required || (!required && $.trim($IdCard.val()) !== '')) && !(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/.test($.trim($IdCard.val())))){
                    var tip = '请填写有效的身份证件号码';

                    _this.errorTip($tip,tip);

                    result = false;
                }else{
                    result = true;
                }

                return result;
            },

            /**
             * 校验手机号码
             * return:boolean类型
             * $phone:Object类型 - 手机号码对象
             * $tip:Object类型 - 错误提示语载体对象
             * required:boolean类型 - 必填(true)或非必填(false)
             */
            validateMobilePhone : function($phone, $tip, required){
                var _this = this;

                var result = false;

                if((required || (!required && $.trim($phone.val()) !== '')) && !(/^(13[0-9]|14[57]|15[012356789]|18[0-9]|17[0-9])\d{8}$/.test($.trim($phone.val())))){
                    var tip = '请填写正确的手机号码';

                    _this.errorTip($tip,tip);

                    result = false;
                }else{
                    result = true;
                }

                return result;
            },

            /**
             * 校验家庭号码(匹配手机号码和带区号的电话号码)
             * return:boolean类型
             * $phone:Object类型 - 家庭号码对象
             * $tip:Object类型 - 错误提示语载体对象
             * required:boolean类型 - 必填(true)或非必填(false)
             */
            validateTelePhone : function($phone, $tip, required){
                var _this = this;

                var result = false;

                if((required || (!required && $.trim($phone.val()) !== '')) && !(/^((0\d{2,3}-\d{5,8})|((13[0-9]|14[57]|15[012356789]|18[0-9]|17[0-9])\d{8}))$/.test($.trim($phone.val())))){
                    var tip = '请填写正确的家庭号码';

                    _this.errorTip($tip,tip);

                    result = false;
                }else{
                    result = true;
                }

                return result;
            },

            /**
             * 校验电子邮箱
             * return:boolean类型
             * $email:Object类型 - 电子邮箱对象
             * $tip:Object类型 - 错误提示语载体对象
             * required:boolean类型 - 必填(true)或非必填(false)
             */
            validateEmail : function($email, $tip, required){
                var _this = this;

                var result = false;

                if((required || (!required && $.trim($email.val()) !== '')) && !(/^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/.test($.trim($email.val())))){
                    var tip = '请填写正确的电子邮箱';

                    _this.errorTip($tip,tip);

                    result = false;
                }else{
                    result = true;
                }

                return result;
            },

            /**
             * 校验金额
             * return:boolean类型
             * $money:Object类型 - 金额对象
             * minNumber:Number类型(float) - 最小金额
             * maxNumber:Number类型(float) - 最大金额
             * $tip:Object类型 - 错误提示语载体对象
             * required:boolean类型 - 必填(true)或非必填(false)
             */
            validateMoney : function($money, minNumber, maxNumber, $tip, required){
                var _this = this;

                var result = false;

                var moneyFlag = (required || (!required && $.trim($money.val()) !== ''));

                if(moneyFlag && parseFloat($.trim($money.val())) < minNumber){
                    var tip = '金额不能小于' + minNumber + '哦';

                    _this.errorTip($tip,tip);

                    result = false;
                }else if(moneyFlag && parseFloat($.trim($money.val())) > maxNumber){
                    var tip = '金额不能大于' + maxNumber + '哦';

                    _this.errorTip($tip,tip);

                    result = false;
                }else if(moneyFlag && !(/^[0-9]{1,6}([.][0-9]{1,2})?$/.test($.trim($money.val())))){
                    var tip = '请填写有效的金额';

                    _this.errorTip($tip,tip);

                    result = false;
                }else{
                    result = true;
                }

                return result;
            },

            /**
             * 校验密码
             * return:boolean类型
             * $pwd:Object类型 - 登录密码对象
             * $rePwd:Object类型 - 确认密码对象
             * type:String类型 - 密码类型('pwd':校验登录密码;'rePwd':校验确认密码)
             * $tip:Object类型 - 错误提示语载体对象
             * required:boolean类型 - 必填(true)或非必填(false)
             */
             validatePwd : function($pwd, $rePwd, type, $tip, required){
                var _this = this;

                var result = false;

                var pwdFlag = (required || (!required && $.trim($pwd.val()) !== ''));

                if(type === 'pwd'){
                    if(pwdFlag && !(/^((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!$~%^&*])|(?=.*\d)(?=.*[#@!$~%^&*]))[a-z\d#@!$~%^&*]{6,16}$/i.test($.trim($pwd.val())))){
                        var tip = '6-16位字母、数字或字符组合的登录密码';

                        _this.errorTip($tip,tip);

                        result = false;
                    }else{
                        result = true;
                    }
                }else{
                    var rePwdFlag = (required || (!required && $.trim($rePwd.val()) !== ''));

                    if(rePwdFlag && !(/^((?=.*[a-z])(?=.*\d)|(?=[a-z])(?=.*[#@!$~%^&*])|(?=.*\d)(?=.*[#@!$~%^&*]))[a-z\d#@!$~%^&*]{6,16}$/i.test($.trim($rePwd.val())))){
                        var tip = '6-16位字母、数字或字符组合的确认密码';

                        _this.errorTip($tip,tip);

                        result = false;
                    }else if(pwdFlag && rePwdFlag && $.trim($rePwd.val()) !== $.trim($pwd.val())){
                        var tip = '确认密码跟登录密码不一致哦';

                        _this.errorTip($tip,tip);

                        result = false;
                    }else{
                        result = true;
                    }
                }

                return result;
            }
    };

    /**
     * 默认配置
     */
    CheckSet.defaults = {};

    var rCheckSet = function(options) {
        var CheckSetInstance = new CheckSet(options);

        return CheckSetInstance;
    };

    window.rCheckSet = $.rCheckSet = $.checkSet = rCheckSet;
});