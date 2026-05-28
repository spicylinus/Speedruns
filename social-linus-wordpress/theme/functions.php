<?php
/**
 * Social Linus child theme functions.
 *
 * Responsibilities:
 *   - Enqueue parent theme + brand CSS
 *   - Load Google Fonts with font-display:swap
 *   - Inject GHL site tracking + chat widget in footer
 *   - Register Elementor global colors and typography programmatically
 */

// ─────────────────────────────────────────────────────────────
// GHL CONFIGURATION
// Replace with your actual GHL location ID.
// Found in: GHL → Settings → Business Profile → Location ID
// ─────────────────────────────────────────────────────────────
define( 'GHL_LOCATION_ID', 'YOUR_GHL_LOCATION_ID' );
// ─────────────────────────────────────────────────────────────

/**
 * Enqueue parent theme stylesheet, Google Fonts, and brand CSS.
 */
function social_linus_enqueue_styles() {
    // Parent theme (Hello Elementor)
    wp_enqueue_style(
        'hello-elementor-style',
        get_template_directory_uri() . '/style.css'
    );

    // Google Fonts — Space Grotesk, DM Sans, Space Mono
    wp_enqueue_style(
        'social-linus-google-fonts',
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap',
        [],
        null
    );

    // Brand CSS custom properties + utility classes
    wp_enqueue_style(
        'social-linus-brand',
        get_stylesheet_directory_uri() . '/assets/brand.css',
        [ 'social-linus-google-fonts' ],
        '1.0.0'
    );
}
add_action( 'wp_enqueue_scripts', 'social_linus_enqueue_styles' );


/**
 * Inject GHL site tracking and chat widget in the footer.
 * Scripts only inject when a real location ID has been set.
 */
function social_linus_ghl_scripts() {
    if ( GHL_LOCATION_ID === 'YOUR_GHL_LOCATION_ID' ) {
        return;
    }
    $location_id = esc_js( GHL_LOCATION_ID );
    ?>
    <!-- GHL Site Tracking -->
    <script>
    (function(c,b,d,e,a,f){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        a=b.createElement(d);f=b.getElementsByTagName(d)[0];
        a.async=1;a.src=e;f.parentNode.insertBefore(a,f);
    })(window,document,'script','https://widgets.leadconnectorhq.com/loader.js','hl_gtm');
    hl_gtm('init','<?php echo $location_id; ?>');
    </script>

    <!-- GHL Chat Widget -->
    <script>
    (function(d,s,c){
        var js,fjs=d.getElementsByTagName(s)[0];
        if(d.getElementById(c)){return;}
        js=d.createElement(s);js.id=c;js.async=true;
        js.src='https://widgets.leadconnectorhq.com/chat-widget/loader.js';
        js.setAttribute('data-location-id','<?php echo $location_id; ?>');
        fjs.parentNode.insertBefore(js,fjs);
    })(document,'script','ghl-chat-loader');
    </script>
    <?php
}
add_action( 'wp_footer', 'social_linus_ghl_scripts' );


/**
 * Register brand colors with Elementor's global color system.
 * These match the hex values in brand.css and global-kit.json.
 * Importing the kit via Elementor UI is the preferred method;
 * this registration is a fallback for programmatic setup.
 */
function social_linus_register_elementor_colors( $config ) {
    if ( ! isset( $config['globals']['colors'] ) ) {
        return $config;
    }

    $brand_colors = [
        [ 'id' => 'sl-void',   'title' => 'Void',   'value' => '#0D0F12' ],
        [ 'id' => 'sl-cobalt', 'title' => 'Cobalt', 'value' => '#1547E8' ],
        [ 'id' => 'sl-ember',  'title' => 'Ember',  'value' => '#FF4D1C' ],
        [ 'id' => 'sl-frost',  'title' => 'Frost',  'value' => '#EBF2FF' ],
        [ 'id' => 'sl-slate',  'title' => 'Slate',  'value' => '#4A5568' ],
        [ 'id' => 'sl-white',  'title' => 'White',  'value' => '#FFFFFF' ],
    ];

    foreach ( $brand_colors as $color ) {
        $config['globals']['colors'][] = $color;
    }

    return $config;
}
add_filter( 'elementor/editor/localize_settings', 'social_linus_register_elementor_colors' );


/**
 * Remove the emoji scripts WordPress adds by default — not needed.
 */
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
