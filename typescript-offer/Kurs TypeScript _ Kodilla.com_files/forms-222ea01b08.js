App.Views.AjaxForm=Backbone.View.extend({events:function(){return{submit:"submit"}},initialize:function(e){this.$notifications=$(".alert"),this.prepareTagsInput(),this.loader=$("#preloader").eq(0)},showErrors:function(e){App.alertsView.showErrors(e)},showSuccess:function(e){e.redirect&&delete e.redirect,App.alertsView.showSuccess(e)},submit:function(e){var t=this;e.preventDefault(),this.loader.length&&this.loader.show(),t.$notifications.hide(),t.$el.find(".form-control-feedback").remove(),t.$el.children().removeClass("has-error");var a=this.$el.data("event"),i=$.extend(_.object(_.map(this.$el.serializeArray(),_.values)),(this.data||$.noop).call(this)),o=$(e.currentTarget).find('[data-role="submit-button"]');return o.length&&o.attr("disabled","disabled").find('[data-role="loading-icon"]').removeClass("display-none"),$.ajax(this.$el.attr("action"),$.extend({type:this.$el.attr("method")||"POST",data:i,dataType:"json"},(this.ajaxOptions||$.noop).call(this))).done((function(e){t.loader.length&&t.loader.hide(),t.trackGoogleAnalyticsEvent(i),a&&analytics.track(a+"_valid"),"auth_login"===a&&dataLayer.push({event:"login",userID:e.id}),e&&e.redirect&&window.location.replace(e.redirect),e&&e.message&&t.showSuccess(e)})).fail((function(e){t.loader.length&&t.loader.hide(),o.length&&o.removeAttr("disabled").find('[data-role="loading-icon"]').addClass("display-none"),a&&analytics.track(a+"_invalid"),e.redirect&&window.location.replace(e.redirect),422!==e.status&&403!==e.status||t.showErrors(e.responseJSON),t.$el.hasClass("highlight-form-errors")&&422===e.status&&(t.$notifications.hide(),$([document.documentElement,document.body]).animate({scrollTop:t.$el.find('[name="'+Object.keys(e.responseJSON)[0]+'"]').offset().top}),_.each(e.responseJSON,(function(e,a){let i=t.$el.find('[name="'+a+'"]').last();i.closest(".form-group").addClass("has-error"),"radio"===i.attr("type")?i.closest("label").after('<div class="form-control-feedback">'+e[0]+"</div>"):i.after('<div class="form-control-feedback">'+e+"</div>")})))})),!1},trackGoogleAnalyticsEvent:function(e){for(var t in e){var a=t.split("ga-")[1];a&&"dev"!==window.environment&&(dataLayer.push({event:a}),ga("send","event",a,e[t]))}},prepareTagsInput:function(){var e=this.$('input[data-role="tagsinput"]');e.length&&(e.tagsinput(),e.prev().find("input").keypress((function(e){13==e.keyCode&&e.preventDefault()})))}}),App.Views.NextVideoCallForm=App.Views.AjaxForm.extend({currentDateTime:"",initialize:function(){this._super();var e=this,t=this.$el.find('input[name="next_call_at"]'),a=t.data("position");this.currentDateTime=t.val(),t.datetimepicker({icons:{time:"fa fa-clock-o",date:"fa fa-calendar",up:"fa fa-arrow-up",down:"fa fa-arrow-down",next:"fa fa-arrow-right",previous:"fa fa-arrow-left"},format:"YYYY-MM-DD HH:mm",widgetPositioning:{vertical:a},locale:"pl"}).on("dp.hide",(function(){moment(t.val()).isSame(e.currentDateTime)||e.save()}))},save:function(){this.$el.submit()},showErrors:function(e){this._super(e),this.$el.find('input[name="next_call_at"]').val(this.currentDateTime)},showSuccess:function(e){this._super(e),this.currentDateTime=this.$el.find('input[name="next_call_at"]').val()}}),App.Views.AcceptNewTosForm=App.Views.AjaxForm.extend({showSuccess:function(e){this._super(e),this.$el.closest("section").remove()}}),App.Views.BootcampMailForm=App.Views.AjaxForm.extend({showSuccess:function(e){this._super(e),this.$('input[type="text"], textarea').val("")}}),App.Views.BootcampRegisterForm=App.Views.AjaxForm.extend({submit:function(e){this.$("button").prop("disabled",!0),this._super(e)},showSuccess:function(e){this._super(e),analytics.track("bootcamp_modal_send")},showErrors:function(e){this._super(e),this.$("button").prop("disabled",!1)}}),App.Views.InformatorForm=App.Views.AjaxForm.extend({submit:function(e){this.$("button").prop("disabled",!0).find('[data-role="loading-icon"]').removeClass("display-none"),this._super(e)},showSuccess:function(e){App.alertsView.showSuccess({dontShowAlert:!0}),window.open(document.getElementById("informator-link").getAttribute("href"),"_blank"),$('[data-target="#collapsingNavbar"]').click(),analytics.track("bootcamp_modal_send"),this.$("button").prop("disabled",!0).find('[data-role="loading-icon"]').addClass("display-none"),$("#informator").modal("hide")},showErrors:function(e){this._super(e),this.$('button[type="submit"]').prop("disabled",!1).find('[data-role="loading-icon"]').addClass("display-none")}}),App.Views.RegisterForm=App.Views.AjaxForm.extend({data:function(){var e=localStorage.getItem("lead_id");return e?{lead_id:e}:{}}});