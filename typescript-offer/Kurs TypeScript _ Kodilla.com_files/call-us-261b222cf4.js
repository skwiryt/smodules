var CallUs={showOnStart:!1,dates:[],todayCalls:void 0,container:function(){return $("#call-us")},button:function(){return $("#call-us-icon")},callTriger:function(){return $('[data-target="#call-us-modal"]')},callDesc:function(){return $("#call-us-desc")},callSecNumber:function(){return $(".call-section .number-circle")},callSecPlural:function(){return $(".call-section .count-plural")},modal:function(){return $("#call-us-modal")},section:function(){return $("#call-section-form")},phoneField:function(){return $("#call-us-input-phone")},phoneFieldSec:function(){return $("#call-us-section-phone")},dateField:function(){return $("#call-us-input-date")},dateFieldSec:function(){return $("#call-us-section-day")},timeField:function(){return $("#call-us-input-time")},timeFieldSec:function(){return $("#call-us-section-hour")},counter:function(){return $("#call-us-counter")},counterHolder:function(){return $("#call-us-counter-holder")},counterText:function(){return $("#call-us-counter-text")},counterTextFill:function(l){var e="more";1===l?e="one":l>=2&&l<5&&(e="few"),CallUs.counterText().text(CallUs.counterText().data(e)),CallUs.callSecPlural().text(CallUs.counterText().data(e))},getCallCount:function(){void 0!==CallUs.counter().data("url")&&$.ajax({url:CallUs.counter().data("url"),method:"get"}).done((function(l){CallUs.todayCalls=l.counter,CallUs.handleCallCount(l.counter)}))},handleCallCount:function(l){$(".call-section .section-description.hidden").show(),$(".call-section .section-description.empty").hide(),CallUs.counter().text(l),CallUs.callSecNumber().text(l),CallUs.counterTextFill(l),CallUs.counterHolder().fadeIn()},updateCallSectionCount:function(){$number=CallUs.callSecNumber(),void 0!==$number&&(void 0===CallUs.todayCalls?CallUs.getCallCount():CallUs.handleCallCount(CallUs.todayCalls))},liveValidatePhoneNumber:function(l){var e=l.value.replace(/[^0-9\.]/g,"");l.value!=e&&(l.value=e)},validatePhoneNumber:function(l){let e=/^[+-]?\d+$/.test(l);return 9==l.length&&e?(CallUs.handleValidationErrorMessage("phone",!1),!0):(CallUs.handleValidationErrorMessage("phone",!0),!1)},handleValidationErrorMessage:function(l,e){let a="#validation-message-"+l;e?$(a).removeClass("display-none"):$(a).addClass("display-none")},validateStep1:function(){return CallUs.validatePhoneNumber(CallUs.phoneField().val())},updateCallDates:function(l,e){var a=$(l).val(),t=void 0===CallUs.dates[a]?[]:CallUs.dates[a].times,n=e?CallUs.timeFieldSec():CallUs.timeField();n.find("option").remove(),t.forEach((function(l){n.append('<option value="'+l+'">'+l+"</option>")}))},addBodyClass:function(){$("body").addClass("callus-enabled")},addBodyClassMessenger:function(){(document.getElementsByClassName("fb-customerchat")[0]||document.getElementById("fb-customerchat"))&&CallUs.addBodyClass()},open:function(){CallUs.showOnStart=!0},callUsButtons:()=>{let l=$(".call-us-nav-button"),e=$(".contact-us-button-container .call-us-nav-button");$("#skontaktuj-sie-z-nami").length&&($(window).width()>767?(l.show(),e.hide()):(l.hide(),e.show()))},init:function(){if(CallUs.modal()){if(CallUs.modal().on("shown.bs.modal",(function(){CallUs.getCallCount()})),CallUs.callTriger().on("click",(function(){FB.CustomerChat?FB.CustomerChat.hideDialog():window.fcWidget&&window.fcWidget.close()})),CallUs.phoneField().on("keyup",(function(){CallUs.liveValidatePhoneNumber(this)})),CallUs.dateField().on("change",(function(){CallUs.updateCallDates(this,!1)})),$("#call-us-submit-phone").on("click",(function(l){l.preventDefault(),CallUs.validateStep1()&&$.ajax({url:$("#call-us-form1").attr("action"),method:"get"}).done((function(l){CallUs.dates=l,Object.keys(CallUs.dates).forEach((function(l){CallUs.dateField().append('<option value="'+l+'">'+CallUs.dates[l].label+"</option>")})),CallUs.dateField().change(),$("#call-us-step1").hide(),$("#call-us-step2").fadeIn()}))})),$("#call-us-submit-call").on("click",(function(l){l.preventDefault(),$.ajax({url:$("#call-us-form2").attr("action"),method:"post",data:{phone:CallUs.phoneField().val(),date:CallUs.dateField().val(),time:CallUs.timeField().val()}}).done((function(l){CallUs.todayCalls++,$("#call-us-step2").hide(),$("#call-us-step3").fadeIn()}))})),window.fcWidget){var l=this;window.fcWidget.on("widget:loaded",(function(){l.addBodyClass()}))}else window.useMessenger||this.addBodyClass();CallUs.showOnStart&&CallUs.modal().modal("show")}CallUs.section()&&(CallUs.phoneFieldSec().on("keyup",(function(){CallUs.liveValidatePhoneNumber(this)})),CallUs.phoneFieldSec()&&$.ajax({url:"/"+App.getLang()+"/call-center/dates/phone_calls",method:"get"}).done((function(l){CallUs.dates=l,Object.keys(CallUs.dates).forEach((function(l){CallUs.dateFieldSec().append('<option value="'+l+'">'+CallUs.dates[l].label+"</option>")})),CallUs.dateFieldSec().change()})),CallUs.dateFieldSec().on("change",(function(){CallUs.updateCallDates(this,!0)})),$("#call-us-section-submit-call").on("click",(function(l){l.preventDefault(),$.ajax({url:"/"+App.getLang()+"/call-center/step2/phone_calls",method:"post",data:{phone:CallUs.phoneFieldSec().val(),date:CallUs.dateFieldSec().val(),time:CallUs.timeFieldSec().val()}}).done((function(l){CallUs.todayCalls++,$("#call-section-form").hide(),$("#call-section-success").show(0,(function(){var l=$("#call-section-success").offset().top,e=$(window).height(),a=$(window).scrollTop();(a+e<l+50||a>l+50)&&$("html, body").animate({scrollTop:$("#page-call-section").offset().top},800)}))}))}))),this.callUsButtons(),$(window).resize(this.callUsButtons)}};$(document).ready((function(){setTimeout((function(){CallUs.init()}),3e3)}));