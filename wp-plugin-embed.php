<?php
/*
Plugin Name: WP Plugin Embed
Plugin URI: http://www.brettshumaker.com
Description: Takes data from a plugin on the WordPress repo via the WP REST API and puts it on yo' site!
Version: 1.0
Author: Brett Shumaker
Author URI: http://www.brettshumaker.com/
License: GPL2
*/

/**
 * Load our Scripts and Styles
 */
function wppebas_add_scripts_styles(){

	wp_register_style( 'wp-plugin-embed', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'assets/css/wp-plugin-embed.css' );
	
	wp_register_script( 'wp-plugin-embed', trailingslashit( plugin_dir_url( __FILE__ ) ) . 'assets/js/wp-plugin-embed.js', array( 'jquery' ) );
}

add_action( 'wp_enqueue_scripts', 'wppebas_add_scripts_styles' );

/**
 * Register the shortcode
 */
function wppebas_wp_plugin_embed_cb( $atts ) {
	$atts = shortcode_atts( array(
		'slug' => '',
		'github' => '',
	), $atts );
	
	$github_out = '';
	
	if ( '' == $atts['slug'] )
		return '<!-- No plugin slug provided. - WP Plugin Embed -->';
	
	wp_enqueue_script( 'wp-plugin-embed' );
	wp_enqueue_style( 'wp-plugin-embed' );
	wp_enqueue_style( 'dashicons' );
	
	if ( '' !== $atts['github'] ) {
		$github_out = '<a class="github-url" href="' . $atts['github'] . '" title="View on GitHub" target="_blank"><i class="genericon genericon-github"></i></a>';
	}
	
	$output = '
	<div class="wp-plugin-embed empty" data-plugin-slug="' . $atts['slug'] . '">
		<div class="loader"></div>
		<div class="wp-plugin-embed-inner">
			<div class="plugin-header-image">
				<img src="" />
			</div>
			<div class="plugin-info-main panel-closed clearfix">
				<div class="plugin-icon">
					<img src="" />
				</div>
				<div class="plugin-name">
					<h3>{{plugin-name}}</h3>
					<p class="plugin-by">By {{author-name}}</p>
				</div>
				<div class="plugin-info">
					<p class="active-installs">{{active-installs}}+ Active Installs</p>
					<p class="rating">{{rating}}</p>
					<p class="expand-more-info">View Details</p>
				</div>
			</div>
			<div class="plugin-info-extra clearfix">
				<div class="plugin-details">
					<p class="version">Latest Version: <span>{{version}}</span></p>
					<p class="last-updated">Last Updated: <span>{{last-updated}}</span></p>
					<p class="download"><a href="" title="Download from WordPress.org">Download</a></p>
					<p class="platform-icons"><a class="wordpress-url" href="" title="View Plugin Homepage" target="_blank"><i class="genericon genericon-wordpress"></i></a>' . $github_out . '</p>
				</div>
				<div class="plugin-description">
					{{description}}
				</div>
			</div>
		</div>
	</div>';
	
	return $output;
}
add_shortcode( 'wp-plugin-embed', 'wppebas_wp_plugin_embed_cb' );

/**
 * Maybe pre-build the content
 */
function wppebas_build_plugin_output( $data ) {
	
}