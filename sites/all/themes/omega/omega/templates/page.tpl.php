<?php
// $Id: page.tpl.php,v 1.1.2.5 2010/12/07 01:11:46 himerus Exp $

/**
 * @file
 * Theme implementation to display a single Drupal page.
 */
 //krumo('called page.tpl.php (omega)');
?>
<div id="page" class="clearfix">
  <?php if (isset($zones_above)): ?>
  <div id="zones-above" class="clearfix"><?php print $zones_above; ?></div>
  <?php endif; ?>
  
  <?php if (isset($messages)): ?>
  <div id="message-container" class="container-<?php print $default_container_width; ?> clearfix">
    <div class="grid-<?php print $default_container_width; ?>">
      <?php print $messages; ?>
    </div>
  </div><!-- /.container-xx -->
  <?php endif; ?>

  <div id="zones-content" class="clearfix"><?php print $content_zone; ?></div>
  
  <?php if (isset($zones_below)): ?>
  <div id="zones-below" class="clearfix"><?php print $zones_below; ?></div>
  <?php endif; ?>
</div><!-- /#page -->