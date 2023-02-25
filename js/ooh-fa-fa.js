(function() {
  'use strict';
  
  let debug = false; // Enable this for console logging.
  
  // TODO: Poll local storage every 1-2 seconds to check for changes. Not possible with cross-browser background scripts.
  // TODO: Improve the onError function

  function onError(error) {
    if (!!debug) console.log('Error getting options: ' + error);
  }
  
  /*
   * Set the main colour for the chart using user options, if set.
   */
  function setChartColor() {
    if (!!debug) console.log('setChartColor()');
    // Set the chart colours now we've got the values.
    function onGot(options) {
      // Set main colour on visitors chart.
      const path_list = document.querySelectorAll('g.highcharts-series-0 path.highcharts-graph, g.highcharts-series-0 path.highcharts-area, g.highcharts-series-1 path.highcharts-graph, g.highcharts-series-1 path.highcharts-area');

      for (let i = 0, path; i < path_list.length; i++) {
        path = path_list[i];
        if (path.classList.contains('highcharts-graph')) { // Set the colour of the chart lines.
          path.setAttribute('stroke', options['chart_color']);
        } else { // Set the colour of the chart areas.
          path.setAttribute('fill', options['chart_color']);
          path.setAttribute('opacity', 0.2);
        }
      }
    }

    let storage_values = chrome.storage.local.get(['chart_color']);
    storage_values.then(onGot, onError);
  }
  
  /*
   * Take a screenshot of the chart.
   */
  function takeScreenshot(event) {
    event.preventDefault();
    if (!!debug) console.log('btn_screenshot clicked.');
    let hide_chart_yaxis = false;
    let hide_chart_title = false;
    let hide_chart_credits = false;
    
    // Get chart preferences from options storage data.
    let storage_values = chrome.storage.local.get(['hide_chart_yaxis', 'hide_chart_title', 'hide_chart_credits']);
    storage_values.then(function(options) {
      hide_chart_yaxis = options['hide_chart_yaxis'];
      hide_chart_title = options['hide_chart_title'];
      hide_chart_credits = options['hide_chart_credits'];
    }, onError);

    // Hide the crosshair on the chart.
    const highcharts_crosshair = document.querySelector('.highcharts-crosshair');
    if (!!highcharts_crosshair) {
      highcharts_crosshair.setAttribute('stroke-width', 0);
    }
    
    const svg_graph = document.querySelector('svg.highcharts-root');
    
    const loadImage = async url => {
      const img_tmp = document.createElement('img');
      img_tmp.src = url;
      return new Promise((resolve, reject) => {
        img_tmp.onload = () => resolve(img_tmp);
        img_tmp.onerror = reject;
      })
    }

    const convertSVGtoImg = async e => {
      const svgAsXML = (new XMLSerializer()).serializeToString(svg_graph);
      const svgData = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);
      const img_svg = await loadImage(svgData);
      const img_canvas = document.createElement('canvas');
      const margin_left = 10;
      const margin_top = 24;
      
      // Prepare canvas
      img_canvas.width = svg_graph.clientWidth;
      img_canvas.height = svg_graph.clientHeight + (margin_top * 4);
      let canvas_context = img_canvas.getContext('2d');
      
      canvas_context.fillStyle = "#ffffff";
      canvas_context.fillRect(0, 0, img_canvas.width, img_canvas.height);
      
      canvas_context.drawImage(img_svg, 0, margin_top, svg_graph.clientWidth, svg_graph.clientHeight + (margin_top * 2));
      
      // Add the y-axis labels to the chart.
      if (!hide_chart_yaxis) {
        canvas_context.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
        canvas_context.fillStyle = '#666666';
        
        const yax_list = document.querySelectorAll('div.yax');
        const yax_heights = [400 + margin_top, 325 + margin_top, 250 + margin_top, 175 + margin_top, 100 + margin_top, 25 + margin_top];
        for (var i = 0, yax; i < yax_list.length; i++) {
          yax = yax_list[i];
          canvas_context.fillText(yax.textContent, margin_left * 2, yax_heights[i]);
        }
      }
      
      if (!hide_chart_title) {
        const site_name = document.querySelector('.site-name a span').textContent;
        const date_range = document.querySelector('#datepicker span').textContent;
        const date_range_list = date_range.split(': ');
        
        canvas_context.font = '18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
        canvas_context.fillStyle = '#666666';
        canvas_context.fillText(site_name + ': ' + date_range_list[1], margin_left, margin_top);
      }

      if (!hide_chart_credits) {
        canvas_context.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
        canvas_context.fillStyle = '#666666';
        canvas_context.fillText('Source: Fathom Analytics & Ooh Fa Fa', margin_left, svg_graph.clientHeight + (margin_top * 3.5));
      }

      let dataURL = await img_canvas.toDataURL('image/png', 1.0);

      let img_download = document.createElement('a');
      img_download.download = "image.png";
      img_download.href = dataURL.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
      img_download.click();
    }
    convertSVGtoImg();

    // Re-show the crosshair and y-axis on the chart
    if (!!highcharts_crosshair) {
      highcharts_crosshair.setAttribute('stroke-width', 1);
    }
  }
  
  
  /*
   * Add a screenshot button to the dashboard navigation
   */
  function addScreenshotButton() {
    if (!!debug) console.log('addScreenshotButton()');
    let btn_screenshot = document.querySelector('.screenshot-button');
    if (!btn_screenshot) {
      const nav_dash = document.querySelector('nav.dash');
      const btn_date_range = nav_dash.querySelector('div.date-range');
      btn_screenshot = document.createElement('div');
      btn_screenshot.className = 'screenshot-button';
      btn_screenshot.innerHTML = '<div class="icon-border icon-block" title="Take a screenshot of the chart." style="cursor: pointer;"><fa-icon class="far ooh-fa-fa-icon-camera fa-fw"></fa-icon></div>';
    
      // Insert the screenshot button before the calendar button, and update the nav CSS to fit it in.
      btn_date_range.insertAdjacentElement('beforebegin', btn_screenshot);
      nav_dash.style.gridTemplateColumns = '1fr min-content min-content min-content';

      btn_screenshot.addEventListener('click', takeScreenshot, false);
    }
  }
  
  /*
   * Show the views per visitor in the Referrers data box.
   */
  // TODO: Make the same thing for views per entry for the Pages data box.
  function showViewsPerVisitor(type) {
    if (!!debug) console.log('showViewsPerVisitor()');
    
    function onGot(options) {
      if (!options['hide_views_visitor']) {
        const selector = (type == 'referrers') ? '#referrer-data-box' : '#utm-data-box';
        const data_box = document.querySelector(selector);
    
        // Add a new column header.
        const row_header = data_box.querySelector('div.row.header');
        if (row_header.className.indexOf('ooh-fa-fa') < 0) {
          let col_header = document.createElement('div');
          col_header.innerHTML = '<span data-tippy="<small style=\'text-transform: capitalize;\'>views/visitor</small> The average number of pageviews per visitor from this referrer."><span style="text-transform: capitalize;">views/visitor</span><!----><!----></span>';
          row_header.appendChild(col_header);
          row_header.style.gridTemplateColumns = 'minmax(0,1fr) minmax(0,12ch) minmax(0,12ch) minmax(0,12ch)';
  
          // Create a new data column and calculate view/visitor values for each row.
          const rows = data_box.querySelectorAll('div.box-content div.row.fade');
          let row, visitors, views, visitors_value, views_value, views_per_visitor, col_cell;
  
          //for (let i = 0, len = rows.length; i < len; i++) {
          rows.forEach((row) => {
            row.style.gridTemplateColumns = 'minmax(0,1fr) minmax(0,12ch) minmax(0,12ch) minmax(0,12ch)';
            visitors = row.querySelector('div:nth-of-type(2)');
            views = row.querySelector('div:nth-of-type(3)');
            if (!!visitors && !!views) {
              visitors_value = visitors.getAttribute('title').replace(',', '');
              views_value = views.getAttribute('title').replace(',', '');
              views_per_visitor = (views_value > 0 && visitors_value > 0) ? (views_value / visitors_value).toFixed(1) : '';
              col_cell = document.createElement('div');
              col_cell.innerHTML = '<span><span>' + views_per_visitor + '</span></span>';
              col_cell.setAttribute('title', views_per_visitor);
              row.appendChild(col_cell);
            }
          });
          row_header.classList.add('ooh-fa-fa-updated'); // Set a class name so we can avoid editing rows that have already been updated.
        }
      }
    }

    let storage_values = chrome.storage.local.get(['hide_views_visitor']);
    storage_values.then(onGot, onError);
  }
  
  function enhanceReferrers() {
    if (!!debug) console.log('enhanceReferrers()');
    function onGot(options) {
      let referrer_rows = document.querySelectorAll('#referrer-data-box div.box-content div.row.fade');
      let item, name, type;

      referrer_rows.forEach((row) => {
        item = row.querySelector('div span');
        if (!!item && item.className.indexOf('ooh-fa-fa') < 0) { // Only edit rows that haven't been updated yet.
          // Determine type (search or website) and append relevant class
          type = 'website'; // Default to website type
          name = item.textContent.trim();
          // Convert names to readable versions when there's just a URL.
          if (referrer_lookup.hasOwnProperty(name)) {
            // Set the referrer type
            type = referrer_lookup[name]['type'];
            if (!!referrer_lookup[name]['name']) {
              name = referrer_lookup[name]['name'];
              item.title = item.textContent.trim();
            }
          } else {
            if (name.indexOf('search') > -1 || name.indexOf('suche') > -1) {
              type = 'search';
            } else if (name.indexOf('mail') > -1 || name.indexOf('messenger') > -1) {
              type = 'mail';
            } else if (name.indexOf('forum') > -1) {
              type = 'social';
            }
          }
          
          if (!options['hide_icons']) {
            item.classList.add('ooh-fa-fa-icon-' + type);
          }
          item.textContent = name;
          name = name.toLowerCase().replace(' ', '-');
        }
      });
    }
    
    let storage_values = chrome.storage.local.get(['hide_icons']);
    storage_values.then(onGot, onError);
  }
  
  function showLogos(type = 'browsers') {
    if (!!debug) console.log('showLogos()');
    function onGot(options) {
      if (!options['hide_icons']) {
        let rows = document.querySelectorAll('#' + type + ' div.box-content div.row.fade');
        let item, name;
        // List of browsers with font icons
        const browser_icons = ['chrome', 'edge', 'firefox', 'ie', 'opera', 'safari'];
        const icons = {
          'browsers': ['chrome', 'edge', 'firefox', 'ie', 'opera', 'safari'],
          'device-type': ['phone', 'desktop', 'tablet']
        }

        rows.forEach((row) => {
          console.log(row);
          item = row.querySelector('span');
          if (!!item) {
      
            name = item.textContent.trim();
            name = name.toLowerCase().replace(' ', '-');
            if (icons[type].includes(name)) {
              item.classList.add('ooh-fa-fa-icon-' + name);
            } else {
              if (name === '0') { // Some user agents are detected as "0", so give them a human-friendly reference.
                item.textContent = 'Unknown';
              }
              item.classList.add('ooh-fa-fa-icon-website'); // Use the generic globe icon for unlisted items.
            }
          }
        });
      }
    }
    
    let storage_values = chrome.storage.local.get(['hide_icons']);
    storage_values.then(onGot, onError);
  }
  
  function showRegionFlags() {
    if (!!debug) if (!!debug) console.log('showRegionFlags()');
    function onGot(options) {
      if (!options['hide_icons']) {
        // Add new classes for regions
        let rows = document.querySelectorAll('#countries div.box-content div.row.fade');
        let item, name, region_code;

        rows.forEach((row) => {
          item = row.querySelector('span');
          if (!!item) {
            name = item.textContent.trim();
            region_code = flags[name];
            item.classList.add('ooh-fa-fa-flag_' + region_code);
          }
        });
      }
    }

    let storage_values = chrome.storage.local.get(['hide_icons']);
    storage_values.then(onGot, onError);
  }
 
 
 
  
  /*
   * Set up observers to listen for when elements on the page appear or change.
   */
  let previous_chart = '';
  let refresh_chart = false;
  let previous_referrer = '';
  let refresh_referrer = false;
  let previous_device_type = '';
  let refresh_device_type = false;
  let previous_browsers = '';
  let refresh_browsers = false;
  let previous_regions = '';
  let refresh_regions = false;
  let previous_utm = '';
  let refresh_utm = false;
  const observer_page = new MutationObserver(function(mutations, obs) {
    const svg_graph = document.querySelector('#dashboard-graph svg');
    if (!!svg_graph && (svg_graph.innerHTML !== previous_chart || refresh_chart)) {
      refresh_chart = false;
      previous_chart = svg_graph.innerHTML;
      addScreenshotButton();
      setChartColor();
    }
    
    let referrers_box_row = document.querySelector('#referrer-data-box div.box-content div.row.fade');
    if (!!referrers_box_row && referrers_box_row.className.indexOf('empty-row') < 0 && (referrers_box_row.textContent !== previous_referrer || refresh_referrer)) {
      previous_referrer = referrers_box_row.textContent;
      refresh_referrer = false;
      showViewsPerVisitor('referrers');
      enhanceReferrers();
    }
    
    let device_type_box_row = document.querySelector('#device-type div.box-content div.row.fade');
    if (!!device_type_box_row && (device_type_box_row.textContent !== previous_device_type || refresh_device_type)) {
      previous_device_type = device_type_box_row.textContent;
      refresh_device_type = false;
      showLogos('device-type');
    }
    
    let browsers_box_row = document.querySelector('#browsers div.box-content div.row.fade');
    if (!!browsers_box_row && (browsers_box_row.textContent !== previous_browsers || refresh_browsers)) {
      previous_browsers = browsers_box_row.textContent;
      refresh_browsers = false;
      showLogos('browsers');
    }
    
    let regions_box_row = document.querySelector('#countries div.box-content div.row.fade');
    if (!!regions_box_row && (regions_box_row.textContent !== previous_regions || refresh_regions)) {
      previous_regions = regions_box_row.textContent;
      refresh_regions = false;
      showRegionFlags();
    }
    
    let utms_box_row = document.querySelector('#utm-data-box div.box-content div.row.fade');
    if (!!utms_box_row && (utms_box_row.textContent !== previous_utm || refresh_utm)) {
      previous_utm = utms_box_row.textContent;
      refresh_utm = false;
      showViewsPerVisitor('utms');
    }
  });
  
  function doPageRefresh() {
    if (!!debug) console.log('doPageRefresh()');
    refresh_chart = true;
    refresh_referrer = true;
    refresh_device_type = true;
    refresh_browsers = true;
    refresh_regions = true;
    refresh_utm = true;
  }
  observer_page.observe(document.body, {childList: true, subtree: true});
  
  /*
   * Observer to listen for when the page URL changes, i.e. the date range has changed.
   */
  let previous_url = '';
  const observer_url = new MutationObserver(function(mutations) {
    if (window.location.href !== previous_url) {
        previous_url = window.location.href;
        doPageRefresh();
      }
  });
  observer_url.observe(document, {childList: true, subtree: true});


  /*
   * On page load, set default options if none have been set.
   */
  let storage_values = chrome.storage.local.get(['chart_color', 'hide_chart_yaxis', 'hide_chart_title', 'hide_chart_credits', 'hide_icons', 'hide_views_visitor']);
  storage_values.then(function(options) {
    chrome.storage.local.set({
      chart_color: (!!options['chart_color']) ? options['chart_color'] : '#5345EA',
      hide_chart_yaxis: (!!options['hide_chart_yaxis']) ? options['hide_chart_yaxis'] : false,
      hide_chart_title: (!!options['hide_chart_title']) ? options['hide_chart_title'] : false,
      hide_chart_credits: (!!options['hide_chart_credits']) ? options['hide_chart_credits'] : false,
      hide_icons: (!!options['hide_icons']) ? options['hide_icons'] : false,
      hide_views_visitor: (!!options['hide_views_visitor']) ? options['hide_views_visitor'] : false
    });
  }, onError);
  
})();
