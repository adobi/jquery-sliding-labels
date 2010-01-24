(function($) {
	
	$.fn.slidingLabels = function(options) {
		
		options = $.extend({}, $.fn.slidingLabels.defaults, options);
		
		var cssIn = cssOut = {
			position: 'relative'
		};
				
		
		var current, prev = 0;
		
		return this.each(function() {
			
			var self = $(this);
			var labels = self.find('label');

			labels.each(function(i, label) {
				
				switch(options.direction) {
					case 'vertical':
					
						break;
					case 'horizontal':
						cssIn.left = $(label).width() + 10;
						cssIn.opacity = 0.6;
						break;
					default:
				}
				
				$(label).css(cssIn);
			});
			
			self.find('input[type=text]').each(function(i, input) {
				
				$(input).focusin(function() {
					switch(options.direction) {
						case 'horizontal':
							
							cssOut.left = 0;
							cssOut.opacity = 1;
							break;
						case 'vertical':
						
							break;
						default:
					}
					$(labels[i]).animate(cssOut);
					current = i;
					//console.log('focusin '+current);
				})
				.focusout(function() {
					switch(options.direction) {
						case 'horizontal':
	
							if(!jQuery.trim($(input).val())) {
								
								cssIn.left = $(labels[current]).width() + 10;
								cssIn.opacity = 0.6;
							}
							break;
						case 'vertical':
						
							break;
						default:
					}
					$(labels[current]).animate(cssIn);
					//console.log('focusout '+current);
				});
			});
			
			
		});
	};
	
	$.fn.slidingLabels.defaults = {
		direction:'horizontal'
	};
	
})(jQuery);