Template.introduction.rendered = function() {
	$(function() {
		Session.set('introFinished', false);
		$('.header').each(function(ids) {
			$(this).hide().delay(100 + 900 * ids).fadeIn(700);
		});
	});

	$(function() {
		$('#pair').on('click', function() {
			$('.header').delay(200).animate({
				opacity: 0.0,
				paddingLeft: '+=135'
			}, 1000, function() {
				$(this).remove();
				$('br').remove();
				Session.set('introFinished', true);
				Session.set('selectedTag', 'gender');
				Session.set('selectError', '');
			});
		});
	});
};