Template.introduction.rendered = function() {
	$(function() {
		Session.set('introFinished', false);
		$('.header').each(function(ids) {
			$(this).hide().delay(400 + 1400 * ids).fadeIn(2000);
		});
	});

	$(function() {
		$('#pair').on('click', function() {
			$('.header').delay(600).animate({
				opacity: 0.0,
				paddingLeft: '+=135'
			}, 1500, function() {
				$(this).remove();
				$('br').remove();
				Session.set('introFinished', true);
				Session.set('selectedTag', 'gender');
				Session.set('selectError', '');
			});
		});
	});
};