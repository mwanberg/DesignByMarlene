$Id: README.txt,v 1.2.4.3 2010/12/28 18:14:32 himerus Exp $
##########################################################################################
      _                _                                  _                     _
   __| | _____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_    __ _  ___  ___| | _____
  / _` |/ _ \ \ / / _ \ |/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __|  / _` |/ _ \/ _ \ |/ / __|
 | (_| |  __/\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_  | (_| |  __/  __/   <\__ \
  \__,_|\___| \_/ \___|_|\___/| .__/|_| |_| |_|\___|_| |_|\__|  \__, |\___|\___|_|\_\___/
                              |_|                               |___/
##########################################################################################

##########################################################################################
##### Omega Theme
##########################################################################################
Project Page:   http://drupal.org/project/omega
Issue Queue:    http://drupal.org/project/issues/omega
Usage Stats:    http://drupal.org/project/usage/omega
Twitter:        http://twitter.com/Omeglicon
Maintainer(s):  Jake Strawn 
                http://himerus.com
                http://developmentgeeks.com
                http://facebook.com/developmentgeeks
                http://drupal.org/user/159141
                http://twitter.com/himerus
##########################################################################################

Omega Theme Information
=======================
The Omega Theme is a powerful and free Drupal theme based on the 960gs. 
It harneses the power and features of many popular themes to provide an 
excellent base theme, and sub-theming system to help you quickly prototype 
and theme your site...

Additional 960gs/Omega Resources
================================
  * http://himerus.com - for various videos on the Omega theme
  
  * http://himerus.com/drupalcamp-montreal-advanced-960gs-theming-omega
    
  * http://himerus.com/drupalcon-paris-accelerated-grid-theming-using-ninesixty
    
  * http://sf2010.drupal.org/conference/sessions/elevating-960gs-drupal-omega-theme

Creating your Omega Sub Theme (Automagically)
=============================================
1.  Download the Omega Tools Module (7.x-2.x branch)
    http://drupal.org/project/omega_tools

2.  Install Drush 
    http://drupal.org/project/drush
    
3.  Run fancy command
    # drush omega-subtheme "Awesome Theme Name"
    
4.  Visit admin/appearance/settings/subtheme and configure to your 
    hearts desire!!

Creating your Omega Sub Theme (Manually)
========================================

1.  Copy the starterkit folder from the default Omega theme directory 
    and place it in your sites/all/themes directory.

2.  Rename the folder to the theme name of your choice.
    (subtheme for this example)
    
3.  Rename omega_starterkit.info to subtheme.info and modify default
    information in the .info file as needed (name & description)
    
4.  Open template.php and search and replace omega_starterkit with
    "subtheme" or the appropriate name of the theme you are creating.
    
5.  Open theme-settings.php and search and replace omega_starterkit with
    "subtheme" or the appropriate name of the theme you are creating.
    
6.  Visit admin/appearance/settings/subtheme and configure to your 
    hearts desire!!

Contributors
============
- himerus (Jake Strawn)
