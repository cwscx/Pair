Template.introduction.rendered = function() {
	$(function() {
		$('.header').each(function(ids) {
			$(this).hide().delay(400 + 2800 * ids).fadeIn(2000);
		});
	});

	$(function() {
		$('#pair').on('click', function() {
			$('.header').delay(600).animate({
				opacity: 0.0,
				paddingLeft: '+=135'
			}, 2400, function() {
				$(this).remove();
				Session.set('introFinished', true);
			});
		});
	});
};