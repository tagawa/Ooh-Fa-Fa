(function() {
  'use strict';
  
  window.addEventListener('load', function() {
    const frm_options = document.getElementById('frm_options');
    const input_chart_color = document.getElementById('input_chart_color');
    const input_chart_yaxis = document.getElementById('input_chart_yaxis');
    const input_chart_title = document.getElementById('input_chart_title');
    const input_chart_credits = document.getElementById('input_chart_credits');
    const input_icons = document.getElementById('input_icons');
    const input_views_visitor = document.getElementById('input_views_visitor');
    const btn_save = document.getElementById('btn_save');
    const output_save = document.getElementById('output_save');
    
    frm_options.addEventListener('change', function() {
      btn_save.textContent = 'Save'
      output_save.textContent = '';
    });
    
    // Populate form with existing storage data, if any.
    function onError(error) {
      console.log('Error: ' + error);
    }
    
    let storage_values = chrome.storage.local.get(['chart_color', 'hide_chart_yaxis', 'hide_chart_title', 'hide_chart_credits', 'hide_icons', 'hide_views_visitor']);
    storage_values.then(function(options) {
      input_chart_color.value = options['chart_color'];
      input_chart_yaxis.checked = options['hide_chart_yaxis'];
      input_chart_title.checked = options['hide_chart_title'];
      input_chart_credits.checked = options['hide_chart_credits'];
      input_icons.checked = options['hide_icons'];
      input_views_visitor.checked = options['hide_views_visitor'];
    }, onError);
  
    // Set storage data when the options form is submitted.
    frm_options.onsubmit = function(event) {
      event.preventDefault();
      btn_save.textContent = 'Saved!';
      output_save.textContent = 'You may need to reload the Fathom Analytics page.';
    
      chrome.storage.local.set({
        chart_color: input_chart_color.value,
        hide_chart_yaxis: input_chart_yaxis.checked,
        hide_chart_title: input_chart_title.checked,
        hide_chart_credits: input_chart_credits.checked,
        hide_icons: input_icons.checked,
        hide_views_visitor: input_views_visitor.checked
      });
    };
  });
})();
