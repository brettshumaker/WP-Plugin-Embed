jQuery(document).ready(function($) {
	
	// Plugin oEmbed
	$('.wp-plugin-embed.empty').each( function(){
		var pluginSlug = $(this).attr('data-plugin-slug');
		var thisContainer = $(this);
		var pluginData = $.getJSON( 'https://wordpress.org/plugins-wp/wp-json/plugins/v1/plugin/' + pluginSlug,	function( data ){
			
			console.log( data );
			
			thisContainer.find('.plugin-header-image > img').attr('src', data.banners.high);
			thisContainer.find('.plugin-icon > img').attr('src', data.icons['2x']);
			thisContainer.find('.plugin-name > h3').text( thisContainer.find('.plugin-name > h3').text().replace( '{{plugin-name}}', data.name ) );
			
			var cc = 0;
			$.each( data.contributors, function(key, value){
				if ( 0 == cc ) {
					thisContainer.find('.plugin-name > .plugin-by').text( thisContainer.find('.plugin-name > .plugin-by').text().replace( '{{author-name}}', value.display_name ) );
				}
				
				cc++;
			});
			
			thisContainer.find('.active-installs').text( thisContainer.find('.active-installs').text().replace( '{{active-installs}}', data.active_installs ) );
			
			thisContainer.find('.rating').html( thisContainer.find('.rating').text().replace( '{{rating}}', buildStarRating( data.rating, 5 ) ) );
			
			var description = data.description.split( '<br />\n' ).join( ' ' );
			thisContainer.find('.plugin-description').html( thisContainer.find('.plugin-description').text().replace( '{{description}}', description ) );
			
			thisContainer.find('.version span').text( thisContainer.find('.version span').text().replace( '{{version}}', data.version ) );
			
			var lastUpdated = timeSince( new Date( fixDateString(data.last_updated) ) );
			thisContainer.find('.last-updated span').text( thisContainer.find('.last-updated span').text().replace( '{{last-updated}}', lastUpdated ) );
			
			$('.platform-icons .wordpress-url').attr( 'href', data.homepage );
			
			$('.plugin-details .download a').attr( 'href', data.download_link );
			
			// Would like to do a better reveal here
			thisContainer.removeClass('empty');
			
		});
	});
	
	// Expand Details
	$(document).on('click', '.expand-more-info', function(e){
		
		var targetContainer = $(this).closest('.plugin-info-main');
		
		if ( -1 !== $(e.target).text().indexOf('View') ) {
			
			targetContainer.toggleClass('panel-open').toggleClass('panel-closed').next('.plugin-info-extra').stop().slideToggle();
			
			$(e.target).text('Hide Details');
			
		} else {
			
			targetContainer.next('.plugin-info-extra').stop().slideToggle( function(){
				targetContainer.toggleClass('panel-open').toggleClass('panel-closed');
			});
			
			$(e.target).text('View Details');
			
		}
		
	});
	
	function fixDateString(dateString) {
		
		dateStringArray = dateString.split(' ');
		
		// Remove the timezone - should always be "GMT"
		dateStringArray.pop();
		
		// Fix the time to 12hr with leading "0"
		var timeArray = dateStringArray[1].split(':');
		
		if ( timeArray[1].indexOf('pm') >= 0 ) {
			timeArray[1] = timeArray[1].slice(0, -2);

			if ( parseInt(timeArray[0]) !== 12 )
				timeArray[0] = parseInt(timeArray[0]) + 12;
			
		} else {
			timeArray[1] = timeArray[1].slice(0, -2);
			
			if ( parseInt(timeArray[0]) == 12 )
				timeArray[0] = '0';
		}
		
		if ( timeArray[0].length == 1 )
			timeArray[0] = '0' + timeArray[0];
		
		dateStringArray[1] = timeArray.join(':');
		dateStringArray[1] += ':00';
		
		return dateStringArray.join('T');
	}
	
	function timeSince(date) {

		var seconds = Math.floor((new Date() - date) / 1000);
	
		var interval = Math.floor(seconds / 31536000);
	
		if (interval > 1) {
			return interval + " years ago";
		}
		interval = Math.floor(seconds / 2592000);
		if (interval > 1) {
			return interval + " months ago";
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days ago";
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours ago";
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes ago";
		}
		return Math.floor(seconds) + " seconds ago";
	}
	
	function buildStarRating(rawRating, totalStars) {

		// Since we started with a value out of 100, we
		// need to divide the rating by 100 to get a 
		// percentage. Then we'll multiply by the total
		// number of stars to see how many stars we need.

		// Convert the rating to a number between 0 and totalStars
		var rating = (rawRating / 100) * totalStars;

		var ratingOutput = '';

		for (i = 1; i <= totalStars; i++) {

			if (i <= rating) {

				// i is still less than our rating - full star
				ratingOutput += "<i class='dashicons dashicons-star-filled'></i>";

			} else if ((i - 1) < rating && rating < i) {

				// rating is greater than the last i value but less than the current i value - half star
				ratingOutput += "<i class='dashicons dashicons-star-half'></i>";

			} else {

				// only other possibility is that the rating is less than i - empty star
				ratingOutput += "<i class='dashicons dashicons-star-empty'></i>";

			}
		}

		return ratingOutput;

	}
	
});