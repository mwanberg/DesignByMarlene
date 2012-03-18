<?php
// $Id: region--menu.tpl.php,v 1.1.2.1 2010/11/04 03:25:45 himerus Exp $

/**
 * @file
 * Default theme implementation to display a region.
 *
 * Available variables:
 * - $content: The content for this region, typically blocks.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the following:
 *   - region: The current template type, i.e., "theming hook".
 *   - region-[name]: The name of the region with underscores replaced with
 *     dashes. For example, the page_top region would have a region-page-top class.
 * - $region: The name of the region variable as defined in the theme's .info file.
 *
 * Helper variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $is_admin: Flags true when the current user is an administrator.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 *
 * @see template_preprocess()
 * @see template_preprocess_region()
 * @see template_process()
 * @see template_process_region()
 */
//drupal_set_message('<strong>region--branding.tpl.php</strong> loaded... (omega)');
?>
<div class="<?php print $classes; ?>" <?php print $attributes; ?>>
  <div class="primary-navigation">
    <?php if($main_menu): ?>
    <div class="main-menu">
      <?php print $main_menu; ?>
    </div>
    <?php endif; ?>
    <?php if($secondary_menu): ?>
    <div class="main-menu">
      <?php print $secondary_menu; ?>
    </div>
    <?php endif; ?>
  </div>
</div>
