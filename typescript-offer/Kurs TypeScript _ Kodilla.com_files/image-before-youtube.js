var $youtubeImages = $('section[data-youtube]');

$youtubeImages.each(function () {
    $( this ).on('click', detachImage);
});

function detachImage () {
    var self = this;
    this.youtubeIframe = $( this ).attr('data-youtube');
    $( this ).children('#ytplayer').show().append(this.youtubeIframe);
    $( this ).children('#youtube-image').hide();
}
